import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { EventosService } from 'src/app/services/eventos.service'; // Asegúrate de tenerlo creado

@Component({
  selector: 'app-registro-eventos-screen-2',
  templateUrl: './registro-eventos-screen-2.component.html',
  styleUrls: ['./registro-eventos-screen-2.component.scss']
})
export class RegistroEventosScreen2Component implements OnInit {

  public tipo: string = "registro-eventos";
  public evento: any = {};

  @Input() datos_evento: any = {};
  

  public editar: boolean = false;
  public idEvento: number = 0;
  public rol: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventosService: EventosService
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['rol']) {
      this.rol = this.activatedRoute.snapshot.params['rol'];
      console.log("Rol detectado:", this.rol);
    }

    if (this.activatedRoute.snapshot.params['id']) {
      this.editar = true;
      this.idEvento = this.activatedRoute.snapshot.params['id'];
      console.log("ID Evento:", this.idEvento);
      this.obtenerEventoByID();
    }
  }

  public obtenerEventoByID(): void {
    this.eventosService.getEventoByID(this.idEvento).subscribe(
      (response) => {
        this.evento = response;
        // Aquí puedes desglosar o mapear los datos si lo necesitas
        console.log("Datos evento: ", this.evento);
      },
      (error) => {
        alert("No se pudieron obtener los datos del evento.");
      }
    );
  }

}