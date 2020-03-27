import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { HighchartsService } from 'src/app/services/highcharts.service';
import { Router } from '@angular/router';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { NzNotificationService } from 'ng-zorro-antd';
import { ReporteService } from 'src/app/services/reporte.service';
import { CoursesService } from 'src/app/services/courses.service';
import { BloqueService } from 'src/app/services/bloque.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss']
})
export class ActividadesComponent implements OnInit {
  @Input() selectCurso: any;
  @Input() selectAsignatura: any;
  @Input() selectSeccion: any;

  secciones = [];
  selectedSeccion;
  exigencias = [50, 60, 70];
  selectExigencia = 0;

  actividad = [];
  selectActividades = 0;

  objetivosFlag = false;

  estudiantes = [];
  selectEstudiante;

  curso = {
    nivel_descripcion: 'Seleccione un Curso',
    nivel_id: 0
  }

  asignatura = {
    asignatura_nombre: 'Seleccione Asignatura',
    asignatura_id: 0
  }

  // graficos
  lineChartFlag = true;
  barChartFlag = true;
  pieChartFlag = true;
  puntajeFlag = true;
  public lineChartLabels: Label[];
  public lineChartData: ChartDataSets[] = [ { data:[], label: ''}];

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

  public barChartLabelsAct: Array<any>;
  public barChartDataAct: ChartDataSets[] = [
    { data: [], label: 'Puntaje Total de los Objetivos' }
  ];

  constructor(private highcharts: HighchartsService, public router: Router,
    private notification: NzNotificationService, public rService: ReporteService,
    public bloqService: BloqueService, public courseS: CoursesService) { }

  ngOnInit(): void {  }

  ngOnChanges(changes: any) {
    if (changes.selectCurso) {
      this.secciones = changes.selectCurso.currentValue.cursos;
      if (changes.selectCurso.currentValue.nivel_descripcion) {
        this.curso.nivel_descripcion = changes.selectCurso.currentValue.nivel_descripcion;
        this.curso.nivel_id = changes.selectCurso.currentValue.nivel_id;
        localStorage.setItem('NivelId', String(this.curso.nivel_id));
      }      
    } else if (!(Number(this.curso.nivel_id) > 0)) {
      this.notification.warning('Reporte de Objetivos', 'Error, no se ha seleccionado un curso.');
    }

    if (changes.selectAsignatura) {
      this.objetivosFlag = true;
      if (changes.selectAsignatura.currentValue.asignatura_nombre) {
        this.asignatura.asignatura_nombre = changes.selectAsignatura.currentValue.asignatura_nombre;
        this.asignatura.asignatura_id = changes.selectAsignatura.currentValue.asignatura_id;
        localStorage.setItem('AsignaturaId', String(this.asignatura.asignatura_id));
      }      
    } else if (!(Number(this.selectAsignatura.asignatura_id) > 0)) {
      this.notification.warning('Reporte de Objetivos', 'Error, no se ha seleccionado una asignatura.');
    }

    this.courseS.obtenerCursosProfesor(localStorage.getItem('idEstablecimiento'), localStorage.getItem('idFuncionario'), localStorage.getItem('AsignaturaId')).subscribe((data: any) => { // Success
      localStorage.setItem('CursoEspecifico', data[0].curso_especifico_id);
      console.log(data)
      this.secciones = data;
      this.selectedSeccion = this.secciones[0];
      localStorage.setItem('SeccionId', this.selectedSeccion.curso_id);
      this.selectExigencia = 50;
      this.selectActividades = 0;
      this.actividad = [];
      this.getActividades();
    }, (error) => {
      console.log(error)
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }

  getActividades() {
    this.rService.getObjetivosCursos(1)
      .subscribe(
        (data: any) => { // Success
          // console.log(data);
          this.actividad = data;
          //this.selectObjetivo = this.objetivos[0].id;
          this.objetivosFlag = false;
          this.getGraficoActividad();
        },
        (error) => {
          if (error.status == 401) {
            this.router.navigate(['/auth/login']);
          }
        }
      )
  }

  onChangeSeccion(item) {
    this.selectedSeccion = this.secciones[item];
    localStorage.setItem('SeccionId', this.selectedSeccion.curso_id);
    this.exigencias = [];
    this.actividad = [];
    this.selectExigencia = 0;
    this.selectActividades = 0;
    this.getGraficoActividad();
  }

  onChangeExigencia(item) {
    this.selectExigencia = this.exigencias[item];
    //this.getActividades();
  }

  onChangeActividades(item) {
    // this.selectActividades = this.actividad[item].id;
    this.getGraficoActividad();
  }

  getGraficoActividad() {
    // if(this.selectedSeccion.curso_id > 0 && this.selectExigencia == 0) {
    //    // console.log("filtro 1")
    //   this.rService.getGraficoCurso(this.selectedSeccion.curso_id).subscribe(
    //     (data: any) => { // Success
    //       // console.log(data);
    //       if(data.lineChartLabels) {
    //         this.lineChartLabels = data.lineChartLabels;
    //         this.lineChartData = data.lineChartData;
    //         this.lineChartFlag = true;
    //       } else this.lineChartFlag = false;
                    
    //       if(data.barChartLabels) {

    //         this.barChartLabels = data.barChartLabels;
    //       this.barChartData[0].data = data.barChartData;
    //         this.barChartFlag = true;
    //       } else this.barChartFlag = false;

    //       if(data.pieChartLabels) {
    //         // this.lineChartLabels = data.lineChartLabels;
    //         // this.lineChartData = data.lineChartData;
    //         this.pieChartFlag = true;
    //       } else this.pieChartFlag = false;

    //       if(data.puntaje) {
    //         // this.lineChartLabels = data.lineChartLabels;
    //         // this.lineChartData = data.lineChartData;
    //         this.puntajeFlag = true;
    //       } else this.puntajeFlag = false;

          
    //       // this.datos = data.datos;
    //       // this.gauges = data.gauge;
    //       // this.showSection = 2;
    //     },
    //     (error) => {
    //       if (error.status == 401) {
    //         this.router.navigate(['/auth/login']);
    //       } else if (error.status == 400) {
    //         this.router.navigate(['/auth/login']);
    //       }
    //     }
    //   );
    // } else if (this.selectedSeccion.curso_id > 0 && this.selectExigencia > 0 && this.selectActividades == 0) {
    //    // console.log("filtro 2")
    //   this.rService.getGraficoCursoUnidad(this.selectExigencia).subscribe(
    //     (data: any) => { // Success
    //       // console.log(data);
    //       if(data.lineChartLabels) {
    //         this.lineChartLabels = data.lineChartLabels;
    //         this.lineChartData = data.lineChartData;
    //         this.lineChartFlag = true;
    //       } else this.lineChartFlag = false;
                    
    //       if(data.barChartLabels) {
    //         this.barChartLabels = data.barChartLabels;
    //       this.barChartData[0].data = data.barChartData;
    //         this.barChartFlag = true;
    //       } else this.barChartFlag = false;

    //       if(data.pieChartLabels) {
    //         // this.lineChartLabels = data.lineChartLabels;
    //         // this.lineChartData = data.lineChartData;
    //         this.pieChartFlag = true;
    //       } else this.pieChartFlag = false;

    //       if(data.puntaje) {
    //         // this.lineChartLabels = data.lineChartLabels;
    //         // this.lineChartData = data.lineChartData;
    //         this.puntajeFlag = true;
    //       } else this.puntajeFlag = false;

          
    //       // this.datos = data.datos;
    //       // this.gauges = data.gauge;
    //       // this.showSection = 2;
    //     },
    //     (error) => {
    //       if (error.status == 401) {
    //         this.router.navigate(['/auth/login']);
    //       } else if (error.status == 400) {
    //         this.router.navigate(['/auth/login']);
    //       }
    //     }
    //   );
    // } else if (this.selectedSeccion.curso_id > 0 && this.selectExigencia > 0 && this.selectActividades > 0) {
    //    // console.log("filtro 3")
    //   this.rService.getGraficoCursoUnidadObjetivo(this.selectedSeccion.curso_id, this.selectActividades).subscribe(
    //     (data: any) => { // Success
    //       // console.log(data);
    //       if(data.lineChartLabels) {
    //         this.lineChartLabels = data.lineChartLabels;
    //         this.lineChartData = data.lineChartData;
    //         this.lineChartFlag = true;
    //       } else this.lineChartFlag = false;
                    
    //       if(data.barChartLabels) {
    //         this.barChartLabels = data.barChartLabels;
    //       this.barChartData[0].data = data.barChartData;
    //         this.barChartFlag = true;
    //       } else this.barChartFlag = false;

    //       if(data.pieChartLabels) {
    //         // this.lineChartLabels = data.lineChartLabels;
    //         // this.lineChartData = data.lineChartData;
    //         this.pieChartFlag = true;
    //       } else this.pieChartFlag = false;

    //       if(data.puntaje) {
    //         // this.lineChartLabels = data.lineChartLabels;
    //         // this.lineChartData = data.lineChartData;
    //         this.puntajeFlag = true;
    //       } else this.puntajeFlag = false;

          
    //       // this.datos = data.datos;
    //       // this.gauges = data.gauge;
    //       // this.showSection = 2;
    //     },
    //     (error) => {
    //       if (error.status == 401) {
    //         this.router.navigate(['/auth/login']);
    //       } else if (error.status == 400) {
    //         this.router.navigate(['/auth/login']);
    //       }
    //     }
    //   );
    // }
  } 

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  // barChart
  public labelMFL: Array<any> = [
    { data: this.barChartDataAct }
  ];
  // labels
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
  // public barChartDataAct: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40], label: 'Puntaje Total de los Objetivos' }
  // ];

  // public labelMFL: Array<any> = [
  //   { data: this.barChartDataAct[0] }
  // ];
  // labels
  //public barChartLabelsAct: Array<any> = ["01", "02", "03", "04", "05", "06", "07", "01", "02", "03", "04", "05", "06", "07"];

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
