import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { HighchartsService } from 'src/app/services/highcharts.service';
import { Router } from '@angular/router';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss']
})
export class ActividadesComponent implements OnInit {
  @Input() selectCurso: any;
  @Input() selectAsignatura: any;
  
  curso = {
    curso_nombre: 'Seleccione un Curso',
    id: 0
  }

  asignatura = {
    materia_descripcion: 'Seleccione Asignatura',
    asignatura_id: 0
  }

  constructor(private highcharts: HighchartsService, public router: Router, private notification: NzNotificationService) { }

  // @ViewChild('analisisComparativo') public analisisComparativo: ElementRef;

  ngOnInit(): void {  }

  ngOnChanges(changes: any) {
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
  public barChartData: Array<number> = [40, 48, 50, 40, 38, 40, 59];

  public labelMFL: Array<any> = [
    { data: this.barChartData }
  ];
  // labels
  public barChartLabels: Array<any> = ["01", "02", "03", "04", "05", "06", "07"];

  public barChartOptions: any = {
    responsive: true,
    legend: { display: false },
    scales: {
      yAxes: [{
        ticks: {
          max: 60,
          min: 0,
        }
      }],
      xAxes: [{}],
    },
  };

  _barChartColors: Array<any> = [{
    backgroundColor: '#56ccf2',
    borderColor: '#56ccf2',
    pointBackgroundColor: '#56ccf2',
    pointBorderColor: '#56ccf2',
    pointHoverBackgroundColor: '#56ccf2',
    pointHoverBorderColor: '#56ccf2'
  }];
  public ChartType = 'bar';

  // barChart
  // firstCopy = false;

  // data
  public barChartDataAct: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40], label: 'Puntaje Total de los Objetivos' }
  ];

  // public labelMFL: Array<any> = [
  //   { data: this.barChartDataAct[0] }
  // ];
  // labels
  public barChartLabelsAct: Array<any> = ["01", "02", "03", "04", "05", "06", "07", "01", "02", "03", "04", "05", "06", "07"];

  public barChartOptionsAct: any = {
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

  _barChartColorsAct: Array<any> = [{
    backgroundColor: '#6fcf97',
    borderColor: '#6fcf97',
    pointBackgroundColor: '#6fcf97',
    pointBorderColor: '#6fcf97',
    pointHoverBackgroundColor: '#6fcf97',
    pointHoverBorderColor: '#6fcf97'
  }];

  public ChartTypeAct = 'bar';

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
