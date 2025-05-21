import { Component, Inject,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-eliminar-user-modal-2',
  templateUrl: './eliminar-user-modal-2.component.html',
  styleUrls: ['./eliminar-user-modal-2.component.scss']
})

export class EliminarUserModal2Component implements OnInit {

  public rol: string = '';

  constructor(
    private dialogRef: MatDialogRef<EliminarUserModal2Component>,
    private EventosService: EventosService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.rol = this.data?.tipo || 'registro';
  }

  public cerrar_modal(): void {
    this.dialogRef.close({ isDelete: false });
  }

  public eliminarUser(): void {
    // Solo cierra el modal con una bandera para que el componente padre realice la eliminación
    this.dialogRef.close({ isDelete: true });
  }

}