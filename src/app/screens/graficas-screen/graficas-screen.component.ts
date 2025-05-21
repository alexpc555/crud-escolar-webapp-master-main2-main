import { Component, OnInit } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import { AdministradoresService } from 'src/app/services/administradores.service';

@Component({
  selector: 'app-graficas-screen',
  templateUrl: './graficas-screen.component.html',
  styleUrls: ['./graficas-screen.component.scss']
})
export class GraficasScreenComponent implements OnInit {
  public total_user: any = {};

  // Datos para la gráfica de línea
  lineChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data: [0, 0, 0],
        label: 'Registro de usuarios',
        backgroundColor: '#F88406',
        borderColor: '#F88406',
        fill: false
      }
    ]
  };
  lineChartOption = { responsive: false };
  lineChartPlugins = [DatalabelsPlugin];

    // Datos para la gráfica de barras
  barChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data: [0, 0, 0],
        label: 'Registro de usuarios',
        backgroundColor: ['#F88406', '#FCFF44', '#31E7E7']
      }
    ]
  };
  barChartOption = { responsive: false };
  barChartPlugins = [DatalabelsPlugin];


  // Datos para la gráfica circular
  pieChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data: [0, 0, 0], // Inicialmente vacío, se llenará dinámicamente
        label: 'Registro de usuarios',
        backgroundColor: ['#FCFF44', '#F1C8F2', '#31E731']
      }
    ]
  };
  pieChartOption = { responsive: false };
  pieChartPlugins = [DatalabelsPlugin];

  // Datos para la gráfica de dona
  doughnutChartData = {
    labels: ["Administradores", "Maestros", "Alumnos"],
    datasets: [
      {
        data: [0, 0, 0], // Inicialmente vacío, se llenará dinámicamente
        label: 'Registro de usuarios',
        backgroundColor: ['#F88406', '#FCFF44', '#31E7E7']
      }
    ]
  };
  doughnutChartOption = { responsive: false };
  doughnutChartPlugins = [DatalabelsPlugin];

  constructor(private administradoresServices: AdministradoresService) {}

  ngOnInit(): void {
    this.obtenerTotalUsers();
  }

  // Método para obtener datos dinámicos del servicio
  public obtenerTotalUsers(): void {
    this.administradoresServices.getTotalUsuarios().subscribe(
      (response) => {
        console.log('Datos recibidos:', response); // Confirmar que los datos lleguen aquí
        this.total_user = response;

        // Actualizar datos dinámicamente para las gráficas circular y de dona
        if (this.total_user) {
          const { admins, maestros, alumnos } = this.total_user;

          // Actualizar los datos
  const dataArray = [admins, maestros, alumnos];

  this.pieChartData.datasets[0].data = dataArray;
  this.doughnutChartData.datasets[0].data = dataArray;
  this.lineChartData.datasets[0].data = dataArray;
  this.barChartData.datasets[0].data = dataArray;
          // Forzar actualización de las gráficas
  this.refreshChart('pie');
  this.refreshChart('doughnut');
  this.refreshChart('line');
  this.refreshChart('bar');
        }
      },
      (error) => {
        console.error('Error al obtener datos de usuarios:', error);
        alert('No se pudo obtener el total de cada rol de usuarios');
      }
    );
  }

  // Método para refrescar las gráficas
private refreshChart(chartType: 'pie' | 'doughnut' | 'line' | 'bar'): void {
  if (chartType === 'pie') {
    this.pieChartData = { ...this.pieChartData };
  } else if (chartType === 'doughnut') {
    this.doughnutChartData = { ...this.doughnutChartData };
  } else if (chartType === 'line') {
    this.lineChartData = { ...this.lineChartData };
  } else if (chartType === 'bar') {
    this.barChartData = { ...this.barChartData };
  }
}
}
