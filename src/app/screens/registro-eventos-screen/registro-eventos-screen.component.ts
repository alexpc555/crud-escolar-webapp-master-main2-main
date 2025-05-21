import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EventosService } from 'src/app/services/eventos.service';
import { FacadeService } from 'src/app/services/facade.service';
import { EliminarUserModal2Component } from 'src/app/modals/eliminar-user-modal-2/eliminar-user-modal-2.component';

@Component({
  selector: 'app-eventos-screen',
  templateUrl: './registro-eventos-screen.component.html',
  styleUrls: ['./registro-eventos-screen.component.scss']
})
export class EventosScreenComponent implements OnInit, AfterViewInit {

  public name_user: string = "";
  public rol: string = "";
  public token: string = "";
  public lista_eventos: any[] = [];

displayedColumns: string[] = [
  'titulo',
  'tipo_de_evento',
  'fecha_de_realizacion',
  'hora_inicio',
  'hora_fin',
  'lugar',
  'publico_objetivo',
  'programa_educativo',
  'responsable_del_evento',
  'descripcion_breve',
  'cupo_max',
  'editar',
  'eliminar'
];


  dataSource = new MatTableDataSource<any>(this.lista_eventos);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private eventosService: EventosService,
    private facadeService: FacadeService,
    private router: Router,
    public dialog:MatDialog,
  ) {}

  ngOnInit(): void {
  this.name_user = this.facadeService.getUserCompleteName();
  this.rol = this.facadeService.getUserGroup();
  this.token = this.facadeService.getSessionToken();

  if (!this.token) {
    this.router.navigate([""]);
    return;
  }

  this.displayedColumns = [
    'titulo',
    'tipo_de_evento',
    'fecha_de_realizacion',
    'hora_inicio',
    'hora_fin',
    'lugar',
    'publico_objetivo',
    'programa_educativo',
    'responsable_del_evento',
    'descripcion_breve',
    'cupo_max'
  ];

  if (this.rol !== 'maestro' && this.rol !== 'alumno') {
    this.displayedColumns.push('editar', 'eliminar');
  }

  this.obtenerEventos();
}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.initPaginator();
  }

  public initPaginator(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) return `0 de ${length}`;
        const start = page * pageSize;
        const end = start < length ? Math.min(start + pageSize, length) : start + pageSize;
        return `${start + 1} - ${end} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    }, 500);
  }

  public obtenerEventos(): void {
    this.eventosService.obtenerEventos().subscribe(
      (response) => {
        this.lista_eventos = response;
        this.dataSource = new MatTableDataSource(this.lista_eventos);
      },
      (error) => {
        alert("No se pudo obtener la lista de eventos");
      }
    );
  }

public goEditar(idEvento: number): void {
  this.router.navigate(["eventos-2", this.rol, idEvento]);
}


public delete(idEvento: number): void {
  const dialogRef = this.dialog.open(EliminarUserModal2Component, {
    data: { id: idEvento, tipo: 'evento' },
    height: '288px',
    width: '328px',
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result?.isDelete) {
      this.eventosService.eliminarEvento(idEvento).subscribe(() => {
        alert("Evento eliminado correctamente.");
        this.obtenerEventos(); // recargar la lista
      }, () => {
        alert("Error al eliminar el evento.");
      });
    } else {
      alert("Evento no eliminado.");
      console.log("No se eliminó el evento");
    }
  });
}


}