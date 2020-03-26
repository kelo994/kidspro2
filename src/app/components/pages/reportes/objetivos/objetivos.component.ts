import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { HighchartsService } from '../../../../services/highcharts.service';
import { Router } from '@angular/router';

import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { ReporteService } from '../../../../services/reporte.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.component.html',
  styleUrls: ['./objetivos.component.scss']
})
export class ObjetivosComponent implements OnInit {
  @Input() selectCurso: any;
  @Input() selectAsignatura: any;

  unidades = [];
  selectUnidad;
  lecciones = [];
  selectLeccion;
  objetivos = [];
  selectObjetivo;

  estudiantes = [];
  selectEstudiante;

  curso = {
    curso_nombre: 'Seleccione un Curso',
    id: 0
  }

  asignatura = {
    materia_descripcion: 'Seleccione Asignatura',
    asignatura_id: 0
  }

  constructor(private highcharts: HighchartsService, public router: Router,
    private notification: NzNotificationService, public rService: ReporteService) { }

  // @ViewChild('analisisComparativo') public analisisComparativo: ElementRef;

  ngOnInit(): void {
    // obtener Cursos
  }

  ngOnChanges(changes: any) {
    $('#cursoIdx').click();
    console.log(changes);
    if (changes.selectCurso) {
      if (changes.selectCurso.currentValue.curso_nombre) this.curso.curso_nombre = changes.selectCurso.currentValue.curso_nombre;
      if (changes.selectCurso.currentValue.id) this.curso.id = changes.selectCurso.currentValue.id;
    } else if (!(Number(this.curso.id) > 0)) {
      this.notification.warning('Reporte de Objetivos', 'Error, no se ha seleccionado un curso.');
    }

    if (changes.selectAsignatura) {
      if (changes.selectAsignatura.currentValue.materia_descripcion) this.asignatura.materia_descripcion = changes.selectAsignatura.currentValue.materia_descripcion;
      if (changes.selectAsignatura.currentValue.asignatura_id) this.asignatura.asignatura_id = changes.selectAsignatura.currentValue.asignatura_id;
    } else if (!(Number(this.selectAsignatura.asignatura_id) > 0)) {
      this.notification.warning('Reporte de Objetivos', 'Error, no se ha seleccionado una asignatura.');
    }

    if (this.curso.id > 0 && this.asignatura.asignatura_id > 0) {
      this.getDataAsignatura();
      this.getEstudiantes();
    }
  }

  getDataAsignatura() {
    this.rService.getDataAsignatura(this.curso.id, this.asignatura.asignatura_id).subscribe(
      (data: any) => { // Success
        console.log(data);
        this.unidades = data;
        if (this.unidades.length > 0) {
          this.selectUnidad = this.unidades[0];
          this.setLecciones(this.selectUnidad);
        }
      },
      (error) => {
        console.log(error)
        if (error.status == 401) {
          this.router.navigate(['/auth/login']);
        } else if (error.status == 400) {
          this.router.navigate(['/auth/login']);
        }
      }
    );
  }

  setLecciones(itemU) {
    this.lecciones = itemU.bloques;
    this.selectLeccion = this.lecciones[0];
    this.setObjetivos(this.selectLeccion);
  }

  setObjetivos(itemL) {
    this.objetivos = itemL.objetivos;
    this.selectObjetivo = this.objetivos[0];
    console.log(itemL.objetivos);
    this.obtenerDataGraficos();
  }

  getEstudiantes() {
    this.rService.getEstudiantesCurso(this.selectCurso.id).subscribe(
      (data: any) => { // Success
        console.log(data);
        this.estudiantes = data;
      },
      (error) => {
        console.log(error)
        if (error.status == 401) {
          this.router.navigate(['/auth/login']);
        } else if (error.status == 400) {
          this.router.navigate(['/auth/login']);
        }
      }
    );
  }

  onChangeUnidad(item) {
    this.selectUnidad = this.unidades[item];
    this.setLecciones(this.selectUnidad);
  }

  onChangeLeccion(item) {
    this.selectLeccion = this.lecciones[item];
    this.setObjetivos(this.selectLeccion);
  }

  onChangeObjetivo(item) {
    this.selectObjetivo = this.objetivos[item];
    this.obtenerDataGraficos();
  }

  onChangeEstudiante(item) {
    this.selectEstudiante = this.estudiantes[item];
  }

  obtenerDataGraficos() {
    this.rService.getObjetivosCursos(this.selectCurso.id, this.selectAsignatura.asignatura_id, this.selectObjetivo.id).subscribe(
      (data: any) => { // Success
        console.log(data);
        // this.datos = data.datos;
        // this.gauges = data.gauge;
        // this.showSection = 2;
      },
      (error) => {
        if (error.status == 401) {
          this.router.navigate(['/auth/login']);
        } else if (error.status == 400) {
          this.router.navigate(['/auth/login']);
        }
      }
    );
  }
  // lineChart
  public lineChartData: ChartDataSets[] = [
    { data: [830, 850, 840, 820, 860, 855, 840], label: 'Puntajes Mínimos' },
    { data: [728, 748, 740, 719, 876, 727, 790], label: 'Puntajes Máximos' },
    { data: [980, 980, 970, 990, 900, 970, 900], label: 'Puntaje Promedio' }
  ];
  public lineChartLabels: Label[] = ['01', '02', '03', '04', '05', '06', '07'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true, legend: { position: 'bottom', align: 'start' },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // green
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderColor: 'rgba(33,150,83,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(148,159,177,0.8)',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // yellow
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderColor: 'rgba(242,153,74,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // red
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  // barChart
  public SystemName: string = "MF1";
  firstCopy = false;

  // data
  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40], label: 'Puntaje Total de los Objetivos' }
  ];

  public labelMFL: Array<any> = [
    { data: this.barChartData[0] }
  ];
  // labels
  public barChartLabels: Array<any> = ["01", "02", "03", "04", "05", "06", "07", "01", "02", "03", "04", "05", "06", "07"];

  public barChartOptions: any = {
    responsive: true,
    legend: { position: 'bottom', align: 'start' },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Puntaje total de las Unidades',
          },
          ticks: {
            max: 60,
            min: 0,
          }
        }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Lecciones',
        }
      }],
    },
  };

  _barChartColors: Array<any> = [{
    backgroundColor: '#6fcf97',
    borderColor: '#6fcf97',
    pointBackgroundColor: '#6fcf97',
    pointBorderColor: '#6fcf97',
    pointHoverBackgroundColor: '#6fcf97',
    pointHoverBorderColor: '#6fcf97'
  }];
  public ChartType = 'bar';

  // pie chart
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left', align: 'end'
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['Iniciales', 'Intermedio', 'Avanzado'];
  public pieChartData: number[] = [50, 30, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
}
