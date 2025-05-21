import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // ✅ Añadido ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'; // ✅ Añadido
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

// ngx-mask
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { RegistroUsuariosScreenComponent } from './screens/registro-usuarios-screen/registro-usuarios-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { RegistroAdminComponent } from './partials/registro-admin/registro-admin.component';
import { RegistroAlumnosComponent } from './partials/registro-alumnos/registro-alumnos.component';
import { RegistroMaestrosComponent } from './partials/registro-maestros/registro-maestros.component';
import { AdminScreenComponent } from './screens/admin-screen/admin-screen.component';
import { AlumnosScreenComponent } from './screens/alumnos-screen/alumnos-screen.component';
import { MaestrosScreenComponent } from './screens/maestros-screen/maestros-screen.component';
import { EliminarUserModalComponent } from './modals/eliminar-user-modal/eliminar-user-modal.component';
import { GraficasScreenComponent } from './screens/graficas-screen/graficas-screen.component';
import { EventosScreenComponent } from './screens/registro-eventos-screen/registro-eventos-screen.component';
import { EventosComponent } from './partials/registro-eventos/registro-eventos.component';
import { NgChartsModule } from 'ng2-charts';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { DatePipe } from '@angular/common';
import { RegistroEventosScreen2Component } from './screens/registro-eventos-screen-2/registro-eventos-screen-2.component';
import { EliminarUserModal2Component } from './modals/eliminar-user-modal-2/eliminar-user-modal-2.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    RegistroUsuariosScreenComponent,
    HomeScreenComponent,
    NavbarComponent,
    RegistroAdminComponent,
    RegistroAlumnosComponent,
    RegistroMaestrosComponent,
    AdminScreenComponent,
    AlumnosScreenComponent,
    MaestrosScreenComponent,
    EliminarUserModalComponent,
    GraficasScreenComponent,
    EventosScreenComponent,
    EventosComponent,
    RegistroEventosScreen2Component,
    EliminarUserModal2Component,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule, // ✅ Añadido
    HttpClientModule,
    NgChartsModule,
    NgxMatTimepickerModule,
    

    // Material Modules
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule, // ✅ Añadido
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    

    // Directiva Mask
    NgxMaskDirective,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    provideNgxMask(),
    DatePipe     
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
