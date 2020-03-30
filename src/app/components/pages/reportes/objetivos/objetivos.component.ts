import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { HighchartsService } from '../../../../services/highcharts.service';
import { Router } from '@angular/router';

import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { ReporteService } from '../../../../services/reporte.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { BloqueService } from 'src/app/services/bloque.service';
import { CoursesService } from 'src/app/services/courses.service';
import { CursoService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.component.html',
  styleUrls: ['./objetivos.component.scss']
})
export class ObjetivosComponent implements OnInit {
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
  unidades = [];
  objetivos = [];

  // estudiantes = [];


  // variables seleccionada
  selectNivel = { nivel_id: 0, nivel_descripcion: '' };;
  selectAsignatura = { asignatura_id: 0, materia_descripcion: '' };
  selectCurso = { curso_id: 0, seccion_nombre: '' };
  selectUnidad = { grupo_id: 0, grupo_nombre: '' };
  selectObjetivo = { id: 0, objetivo_codigo: '' };

  // flags
  flagSeccion= false;
  flagUnidad = false;
  flagObjetivo = false;

  // selectEstudiante;

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

  public barChartLabels: Array<any>;
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Puntaje Total de los Objetivos' }
  ];

  constructor(public cursoService: CursoService, private highcharts: HighchartsService, public router: Router,
    private notification: NzNotificationService, public rService: ReporteService,
    public bloqService: BloqueService, public courseS: CoursesService) { }


  ngOnInit(): void {
    this.resolution = window.screen.width;
    if( window.screen.width > 768 ) this.withSideBar = 200;
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
        } else this.noteDescription = 'Favor seleccione la Asignatura que desea revisar';
      }, (error) => {
        if (error.status === 401) { this.router.navigate(['/auth/login']); }
      });
  }

  setSelectAsignatura(itemAsignatura) {
    this.flagSeccion = true;
    this.selectAsignatura = itemAsignatura;
    this.getCursos();
  }

  getCursos() {
    this.cursoService
      .obtenerCursosPorEstablecimientoFuncionarioNivelAsignatura(localStorage.getItem('idEstablecimiento')
        , localStorage.getItem('idFuncionario'), this.selectNivel.nivel_id, this.selectAsignatura.asignatura_id)
      .subscribe((data: any) => { // Success
        this.cursos = data;
        if (this.cursos.length == 0) console.log("La Asignatura no cuenta con cursos");
        else if(this.cursos.length == 1)  { 
          this.flagSeccion = false;
          this.setSelectCursos(0);          
        } else {
          this.noteDescription = '';
          this.flagSeccion = false;
        }
        console.log(data);
      }, (error) => {
        if (error.status === 401) { this.router.navigate(['/auth/login']); }
      });
  }

  setSelectCursos(itemCurso) {
    this.flagUnidad = true;
    this.selectCurso = this.cursos[itemCurso];
    this.getGraficoByCurso();
    this.getUnidades();
  }

  getUnidades() {
    this.bloqService.getGrupos(localStorage.getItem('idFuncionario'), this.selectAsignatura.asignatura_id, this.selectCurso.curso_id)
      .subscribe(
        (data: any) => { // Success
          this.unidades = data;
          if (this.unidades.length == 0) console.log("El Curso no cuenta con unidades");
          else if(this.unidades.length == 1) {
              this.setSelectUnidad(this.unidades[0]);
              this.flagUnidad = false;
          } else {
            this.flagUnidad = false;
          }
          console.log(data);
        },
        (error) => {
          if (error.status == 401) {
            this.router.navigate(['/auth/login']);
          }
        }
      )
  }

  setSelectUnidad(itemUnidad) {
    this.flagObjetivo = true;

    if(itemUnidad != 'Seleccione Unidad') {
      this.selectUnidad = this.unidades[itemUnidad];
      this.getGraficoByUnidad();
      this.getObjetivos();
    } else { 
      this.flagObjetivo = false;
      this.objetivos = [];
      this.getGraficoByCurso();
    }

  }

  getObjetivos() {
    this.rService.getObjetivosCursos(this.selectUnidad.grupo_id)
      .subscribe(
        (data: any) => { // Success
          console.log(data);
          this.objetivos = data;
          this.flagObjetivo = false;
        },
        (error) => {
          if (error.status == 401) {
            this.router.navigate(['/auth/login']);
          }
        }
      )
  }

  setSelectObjetivo(itemObjetivo) {
    if(itemObjetivo != 'Seleccione Objetivo') {
    this.selectObjetivo = this.objetivos[itemObjetivo];
    this.getGraficoByObjetivo();
    } else { 
      this.getGraficoByUnidad();
    }
  }

  getGraficoByCurso() {
    this.rService.getGraficoCurso(this.selectCurso.curso_id).subscribe(
      (data: any) => { // Success
        console.log(data);
        if (data.lineChartLabels) {
          this.lineChartLabels = data.lineChartLabels;
          this.lineChartData = data.lineChartData;
          this.lineChartFlag = true;
        } else this.lineChartFlag = false;

        if (data.barChartLabels) {

          this.barChartLabels = data.barChartLabels;
          this.barChartData[0].data = data.barChartData;
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

        this.noteFlagFilter = false;
        this.loading = false;
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

  getGraficoByUnidad() {
    this.rService.getGraficoCursoUnidad(this.selectUnidad.grupo_id).subscribe(
      (data: any) => { // Success
        // console.log(data);
        if (data.lineChartLabels) {
          this.lineChartLabels = data.lineChartLabels;
          this.lineChartData = data.lineChartData;
          this.lineChartFlag = true;
        } else this.lineChartFlag = false;

        if (data.barChartLabels) {
          this.barChartLabels = data.barChartLabels;
          this.barChartData[0].data = data.barChartData;
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

  getGraficoByObjetivo() {
    this.rService.getGraficoCursoUnidadObjetivo(this.selectCurso.curso_id, this.selectObjetivo.id).subscribe(
      (data: any) => { // Success
        // console.log(data);
        if (data.lineChartLabels) {
          this.lineChartLabels = data.lineChartLabels;
          this.lineChartData = data.lineChartData;
          this.lineChartFlag = true;
        } else this.lineChartFlag = false;

        if (data.barChartLabels) {
          this.barChartLabels = data.barChartLabels;
          this.barChartData[0].data = data.barChartData;
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

  getDataEstudiante() {
    this.rService.getEstudiantesCurso(this.selectUnidad.grupo_id)
      .subscribe(
        (data: any) => { // Success
          // console.log(data);
        },
        (error) => {
          if (error.status == 401) {
            this.router.navigate(['/auth/login']);
          }
        }
      )
  }

  // onChangeSeccion(item) {
  //   this.selectedSeccion = this.secciones[item];
  //   localStorage.setItem('SeccionId', this.selectedSeccion.curso_id);
  //   this.unidades = [];
  //   this.objetivos = [];
  //   this.selectObjetivo = { id:0, objetivo_codigo: ''};
  //   this.getUnidades();
  //   this.getGraficoObjetivo();
  //   this.getDataEstudiante();

  // }
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

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
