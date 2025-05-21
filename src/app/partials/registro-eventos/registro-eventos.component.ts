import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, formatDate, Location } from '@angular/common';
import { FacadeService } from 'src/app/services/facade.service';
import { EventosService } from 'src/app/services/eventos.service';

declare var $: any;

@Component({
  selector: 'app-registro-eventos',
  templateUrl: './registro-eventos.component.html',
  styleUrls: ['./registro-eventos.component.scss']
})
export class EventosComponent implements OnInit {
  @Input() datos_evento: any = {};

  public evento: any = {};
  public errors: any = {};
  public editar: boolean = false;
  public responsables: any[] = [];
  public mostrarResponsable: boolean = false;
  public fechaHoy: Date = new Date();


  

  public programas: string[] = [
    'Ingeniería en Ciencias de la Computacion', 
    'Licenciatura en Ciencias de la Computacion', 
    'Ingeniería en Tecnologias de la Informacion'];
  public tiposEvento: string[] = ['Conferencia', 'Taller', 'Seminario', 'Congreso'];
  public publicos: string[] = ['Estudiantes', 'Profesores', 'Público General'];

  constructor(
    private eventosService: EventosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private facadeService: FacadeService,
    private datePipe: DatePipe
  ) {}


 ngOnChanges(changes: SimpleChanges): void {
  if (changes['datos_evento'] && changes['datos_evento'].currentValue) {
    this.evento = { ...this.datos_evento };

    // Convierte string a array 
    if (typeof this.evento.publico_objetivo === 'string') {
      this.evento.publico_objetivo = this.evento.publico_objetivo.split(',').map(p => p.trim());
    }

    this.editar = true;
    console.log("Evento cargado en ngOnChanges:", this.evento);
    this.mostrarResponsable = this.evento.publico_objetivo?.includes('Estudiantes');

  }
}




ngOnInit(): void {
  const id = this.activatedRoute.snapshot.params['id'];

  this.fechaHoy.setHours(0, 0, 0, 0); 

  if (id !== undefined) {
    this.editar = true;
    this.evento = { ...this.datos_evento };
  } else {
    this.evento = {
      ...this.eventosService.esquemaEvento(),
      publico_objetivo: []
    };
  }

  this.obtenerResponsables();
  this.mostrarResponsable = this.evento.publico_objetivo?.includes('Estudiantes');
}


public obtenerResponsables(): void {
  this.eventosService.obtenerUsuariosResponsables().subscribe({
    next: (usuarios) => {
      console.log('Usuarios desde backend:', usuarios); 
      this.responsables = usuarios;
    },
    error: (err) => {
      console.error('Error al cargar responsables:', err);
      alert('No se pudo cargar la lista de responsables.');
    }
  });
}

  public regresar(): void {
    this.location.back();
  }

  private to24(t12: string): string | null {
    if (!t12 || typeof t12 !== 'string') return null;

    const date = new Date('1970-01-01 ' + t12);
    if (isNaN(date.getTime())) {
      console.error(`Hora inválida: "${t12}"`);
      return null;
    }

    return formatDate(date, 'HH:mm:ss', 'en-US');
  }

  private construirBodyEvento(): any | null {
    const raw = this.evento;

    const horaInicio = this.to24(raw.horaInicio);
    const horaFin = this.to24(raw.horaFin);

    if (!horaInicio || !horaFin) {
      alert('Por favor, ingresa una hora de inicio y fin válidas. Formato esperado: "3:30 PM" o "15:30".');
      return null;
    }

    const fecha = raw.fecha_de_realizacion instanceof Date
      ? raw.fecha_de_realizacion.toISOString().split('T')[0]
      : raw.fecha_de_realizacion
        ? new Date(raw.fecha_de_realizacion).toISOString().split('T')[0]
        : null;

    const cupo = raw.cupo_max !== null && raw.cupo_max !== '' ? Number(raw.cupo_max) : null;

    const body = {
      titulo: raw.titulo,
      tipo_de_evento: raw.tipo_de_evento,
      fecha_de_realizacion: fecha,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
      lugar: raw.lugar,
      publico_objetivo: raw.publico_objetivo?.join(', '),
      programa_educativo: raw.programa_educativo,
      responsable_del_evento: raw.responsable_del_evento,
      descripcion_breve: raw.descripcion_breve,
      cupo_max: cupo
    };

    if (
      !body.titulo || !body.tipo_de_evento || !body.lugar || !body.fecha_de_realizacion || !body.publico_objetivo ||
      !body.programa_educativo || !body.descripcion_breve || body.cupo_max == null
    ) {
      alert("Por favor completa todos los campos obligatorios.");
      return null;
    }

    if (body.cupo_max <= 0 || body.cupo_max > 999) {
      alert("El cupo máximo debe ser un número entre 1 y 999.");
      return null;
    }

    return body;
  }

  public registrar(): void {
    const body = this.construirBodyEvento();
    if (!body) return;

    this.eventosService.registrarEvento(body).subscribe({
      next: () => {
        alert('✅ Evento registrado correctamente.');
        this.router.navigate(['/home']);
      },
      error: e => console.error('Backend devolvió:', e.error)
    });
  }

  public actualizar(): void {
    const body = this.construirBodyEvento();
    if (!body) return;

    
    body.id = this.evento.id;

    this.eventosService.editarEvento(body).subscribe({
      next: () => {
        alert(' Evento actualizado correctamente.');
        this.router.navigate(['/registro-eventos']);
      },
      error: () => {
        alert(' No se pudo actualizar el evento.');
      }
    });
  }

public checkboxPublicoChange(event: any): void {
  const value = event.source.value;

  if (!this.evento.publico_objetivo) {
    this.evento.publico_objetivo = [];
  }

  if (event.checked) {
    if (!this.evento.publico_objetivo.includes(value)) {
      this.evento.publico_objetivo.push(value);
    }
  } else {
    this.evento.publico_objetivo = this.evento.publico_objetivo.filter((p: string) => p !== value);
  }

  this.mostrarResponsable = this.evento.publico_objetivo.includes('Estudiantes');

  if (this.mostrarResponsable) {
    this.obtenerResponsables();
  }
}



  public revisarPublico(valor: string): boolean {
    return this.evento.publico_objetivo?.includes(valor);
  }

  public changeFechaInicio(event: any): void {
    const fecha = event.value;
    if (fecha) {
      this.evento.fecha_de_realizacion = fecha.toISOString().split('T')[0];
    }
  }

  public changeFechaFin(event: any): void {
    const fecha = event.value;
    if (fecha) {
      this.evento.fecha_fin = fecha.toISOString().split('T')[0];
    }
  }

  public changeFechaRealizacion(event: any): void {
    const fecha = event.value;
    if (fecha) {
      this.evento.fecha_de_realizacion = fecha.toISOString().split('T')[0];
    }
  }

  
}