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
import { CursoService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss']
})
export class ActividadesComponent implements OnInit {
  // screen
  resolution = 1000;
  withSideBar = 200;
  // loading graficos
  loading = true;
  loadingText = 'Esperando Obtener Datos';
  noteDescription = 'Favor seleccione el curso que desea revisar';
  noteFlagFilter = true;

  // variables
  niveles = [];
  asignaturas = [];
  cursos = [];
  exigencias = [50, 60, 70];
  actividades = [];

  // variables seleccionada
  selectNivel = { nivel_id: 0, nivel_descripcion: '' };;
  selectAsignatura = { asignatura_id: 0, materia_descripcion: '' };
  selectCurso = { curso_id: 0, seccion_nombre: '' };
  selectExigencia = [50];
  selectActividad = { id: 0, bloque_titulo: '' };

  // flags
  flagSeccion = false;
  flagExigencia = false;
  flagActividad = false;

  // graficos
  lineChartFlag = true;
  barChartFlag = true;
  pieChartFlag = true;
  puntajeFlag = true;
  public lineChartLabels: Label[];
  public lineChartData: ChartDataSets[] = [{ data: [], label: '' }];

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

  constructor(public cursoService: CursoService, private highcharts: HighchartsService, public router: Router,
    private notification: NzNotificationService, public rService: ReporteService,
    public bloqService: BloqueService, public courseS: CoursesService) { }

  ngOnInit(): void {
    this.resolution = window.screen.width;
    if (window.screen.width > 768) this.withSideBar = 200;
    else this.withSideBar = 180;
    // Obtener Cursos Establecimiento
    this.cursoService
      .obtenerNivelesFuncionarioEstablecimiento(localStorage.getItem('idEstablecimiento'), localStorage.getItem('idFuncionario'))
      .subscribe((data: any) => { // Success
        this.niveles = data;
        console.log(data);
        if (this.niveles.length == 0) console.log("El usuario no tiene cursos asociados");
        else if (this.niveles.length == 1) {
          this.setSelectNivel(this.niveles[0]);
          this.noteDescription = 'Cargando Asignaturas';
        } else this.noteDescription = 'Seleccione un curso';
      }, (error) => {
        if (error.status === 401) { this.router.navigate(['/auth/login']); }
      });
  }

  setSelectNivel(itemNivel) {
    this.selectNivel = itemNivel;
    this.getAsignaturas();
  }

  getAsignaturas() {
    this.cursoService
      .obtenerAsignaturasPorEstablecimientoFuncionarioNivel(localStorage.getItem('idEstablecimiento')
        , localStorage.getItem('idFuncionario'), this.selectNivel.nivel_id)
      .subscribe((data: any) => { // Success
        this.asignaturas = data;
        console.log(data);
        if (this.asignaturas.length == 0) console.log("El Curso no cuenta con asignaturas");
        else if (this.asignaturas.length == 1) {
          this.setSelectAsignatura(this.asignaturas[0]);
          this.noteDescription = 'Cargando Cursos';
        } else this.noteDescription = 'Seleccione una Asignatura';
      }, (error) => {
        if (error.status === 401) { this.router.navigate(['/auth/login']); }
      });
  }

  setSelectAsignatura(itemAsignatura) {
    this.flagSeccion = true;
    this.flagActividad = true;
    this.selectAsignatura = itemAsignatura;

    this.selectActividad.id = 0;
    this.loading = true;
    this.getCursos();
    this.getActividades();
  }

  getCursos() {
    this.cursoService
      .obtenerCursosPorEstablecimientoFuncionarioNivelAsignatura(localStorage.getItem('idEstablecimiento')
        , localStorage.getItem('idFuncionario'), this.selectNivel.nivel_id, this.selectAsignatura.asignatura_id)
      .subscribe((data: any) => { // Success
        this.cursos = data;
        if (this.cursos.length == 0) console.log("La Asignatura no cuenta con cursos");
        else if (this.cursos.length == 1) {
          this.flagSeccion = false;
          this.setSelectCursos(0);
        } else {
          this.noteDescription = 'Seleccione Sección';
          this.flagSeccion = false;
        }
        console.log(data);
      }, (error) => {
        if (error.status === 401) { this.router.navigate(['/auth/login']); }
      });
  }

  setSelectCursos(itemCurso) {
    // this.flagExigencia = true;
    this.selectCurso = this.cursos[itemCurso];
    if (this.selectActividad.id != 0) {
      this.getGraficoActividad();
    }
  }

  setSelectExigencia(itemExigencia) {
    this.selectExigencia[0] = this.exigencias[itemExigencia];
    if (this.selectCurso.curso_id != 0 && this.selectActividad.id != 0) {
      this.getGraficoActividad();
    }
  }

  getActividades() {
    this.rService.getBloques(this.selectAsignatura.asignatura_id)
      .subscribe(
        (data: any) => { // Success
          console.log(data);
          this.actividades = data;
          this.flagActividad = false;

          if (this.actividades.length == 0) this.noteDescription = 'La asignatura no cuenta con actividades';
          else if (this.actividades.length == 1) {
            this.selectActividad = this.actividades[0];
            this.getGraficoActividad();
          } else this.noteDescription = 'Seleccione Actividad';
        },
        (error) => {
          if (error.status == 401) {
            this.router.navigate(['/auth/login']);
          }
        }
      )
  }

  setSelectActividades(itemActividad) {
    this.selectActividad = this.actividades[itemActividad];
    this.getGraficoActividad();
  }

  // graficos
  getGraficoByCurso() { }

  getGraficoActividad() {
    this.rService.getgraficoActividad(this.selectCurso.curso_id, this.selectActividad.id, this.selectExigencia[0]).subscribe(
      (data: any) => { // Success
        console.log(data);
        if (data.lineChartLabels) {
          this.lineChartLabels = data.lineChartLabels;
          this.lineChartData = data.lineChartData;
          this.lineChartFlag = true;
        } else this.lineChartFlag = false;

        if (data.barChartLabels) {
          this.barChartLabelsAct = data.barChartLabels;
          this.barChartDataAct[0].data = data.barChartData;
          this.barChartFlag = true;
        } else this.barChartFlag = false;

        if (data.pieChartLabels) {
          // this.lineChartLabels = data.lineChartLabels;
          // this.lineChartData = data.lineChartData;
          this.pieChartFlag = true;
        } else this.pieChartFlag = false;

        if (data.puntaje) {
          // this.lineChartLabels = data.lineChartLabels;
          // this.lineChartData = data.lineChartData;
          this.puntajeFlag = true;
        } else this.puntajeFlag = false;


        // this.datos = data.datos;
        // this.gauges = data.gauge;
        // this.showSection = 2;
        this.noteFlagFilter = false;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.notification.error('Reporte Actividad', 'El curso no cuenta con estudiantes')
        if (error.status == 401) {
          this.router.navigate(['/auth/login']);
        } else if (error.status == 400) {
          this.router.navigate(['/auth/login']);
        }
      }
    );
  }

  // ngOnChanges(changes: any) {
  //   if (changes.selectCurso) {
  //     this.secciones = changes.selectCurso.currentValue.cursos;
  //     if (changes.selectCurso.currentValue.nivel_descripcion) {
  //       this.curso.nivel_descripcion = changes.selectCurso.currentValue.nivel_descripcion;
  //       this.curso.nivel_id = changes.selectCurso.currentValue.nivel_id;
  //       localStorage.setItem('NivelId', String(this.curso.nivel_id));
  //     }
  //   } else if (!(Number(this.curso.nivel_id) > 0)) {
  //     this.notification.warning('Reporte de Objetivos', 'Error, no se ha seleccionado un curso.');
  //   }

  //   if (changes.selectAsignatura) {
  //     this.objetivosFlag = true;
  //     if (changes.selectAsignatura.currentValue.asignatura_nombre) {
  //       this.asignatura.asignatura_nombre = changes.selectAsignatura.currentValue.asignatura_nombre;
  //       this.asignatura.asignatura_id = changes.selectAsignatura.currentValue.asignatura_id;
  //       localStorage.setItem('AsignaturaId', String(this.asignatura.asignatura_id));
  //     }
  //   } else if (!(Number(this.selectAsignatura.asignatura_id) > 0)) {
  //     this.notification.warning('Reporte de Objetivos', 'Error, no se ha seleccionado una asignatura.');
  //   }

  //   this.courseS.obtenerCursosProfesor(localStorage.getItem('idEstablecimiento'), localStorage.getItem('idFuncionario'), localStorage.getItem('AsignaturaId')).subscribe((data: any) => { // Success
  //     // console.log(data);

  //     if (data.length > 0) {
  //       localStorage.setItem('CursoEspecifico', data[0].curso_especifico_id);
  //       this.secciones = data;
  //       this.selectedSeccion = this.secciones[0];
  //       localStorage.setItem('SeccionId', this.selectedSeccion.curso_id);
  //     } else this.notification.warning('Reportabilidad', 'El Usuario no tiene cursos asociados');
  //     this.selectExigencia = 50;
  //     this.selectActividades = { id: 0, bloque_titulo: '' };
  //     this.actividad = [];
  //     this.getActividades();
  //   }, (error) => {
  //     console.log(error)
  //     if (error.status === 401) { this.router.navigate(['/auth/login']); }
  //   });
  // }

  // getActividades() {
  //   
  // }

  // onChangeSeccion(item) {
  //   this.selectedSeccion = this.secciones[item];
  //   localStorage.setItem('SeccionId', this.selectedSeccion.curso_id);
  //   this.actividad = [];
  //   this.selectExigencia = this.exigencias[0];
  //   this.selectActividades = { id: 0, bloque_titulo: '' };
  //   this.getGraficoActividad();
  // }

  // onChangeExigencia(item) {
  //   this.selectExigencia = this.exigencias[item];
  //   //this.getActividades();
  // }

  // onChangeActividades(item) {
  //   this.selectActividades = this.actividad[item];
  //   this.getGraficoActividad();
  // }



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
