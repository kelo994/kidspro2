import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SimceService } from '../../../../services/simce.service';
import { HighchartsService } from '../../../../services/highcharts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simce-evaluation-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class EvaluationResultsComponent implements OnInit {

  constructor(
    public simceService: SimceService,
    private highcharts: HighchartsService,
    public router: Router
  ) { }

  evaluation;
  dataLoading = true;
  data = [];
  preguntas;
  puntajes;
  niveles;
  preguntaSelected;

  vistaCompleta = true;
  vistaAlumno = [];
  rowsVistaAlumno;
  alumnoStats = [];
  rowsAlumnoStats;
  alumnoSelected;

  dataChart: any;
  nivelesChart: any;

  @ViewChild('chartPreguntas') public chartPreguntas: ElementRef;
  @ViewChild('chartNiveles') public chartNiveles: ElementRef;

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });
    this.evaluation = history.state.evaluation
    this.getStats()
  }

  getStats() {
    if (typeof this.evaluation !== 'undefined') {
      this.simceService.estadisticasPrueba(this.evaluation.prueba_id).subscribe((data: any) => { // Success
        this.data = data.data
        this.preguntas = data.preguntas;
        this.preguntaSelected = this.preguntas[0];
        this.puntajes = data.dash_puntajes_simce
        this.niveles = data.levels
        this.dataChart = data.dataChart
        this.nivelesChart = data.dataNiveles
        this.highcharts.createChart(this.chartPreguntas.nativeElement, this.dataChart);
        this.highcharts.createChart(this.chartNiveles.nativeElement, this.nivelesChart);
        this.dataLoading = false
        /*this.preguntas = data.preguntas
        this.question = this.preguntas[0]
        this.correctas = data.correctas
        this.notas = data.notas
        this.puntajes_promedio_simce = data.puntajes_promedio_simce
        this.porcentajes = data.porcentajes
        this.dash_puntajes = data.dash_puntajes
        this.dash_puntajes_simce = data.dash_puntajes_simce
        this.levels = data.levels
        this.data = data.stats
        this.levels_stats = data.levels_stats
        this.stats_puntajes_simce = data.stats_puntajes_simce*/
      }, (error) => {
        if (error.status == 401) this.router.navigate(['/auth/login'])
      })
    } else {
      this.router.navigate(['/pages/simce'])
    }
  }

  detalleAlumno (alumno) {
    this.alumnoSelected = alumno
    this.rowsVistaAlumno = this.data
    
    if (Math.floor(this.preguntas.length / 6) * 4 > this.data.length) {
      const total = (Math.floor(this.preguntas.length / 6) * 4) - this.data.length;
      for (let i = 0; i < total; i++) {
        this.rowsVistaAlumno.push({data: i})
      }
    }
    
    let vistaAlumno = new Array(Math.floor(this.preguntas.length / 6));
    let array = []
    for (let i = 0; i < this.preguntas.length; i++) {
      if (i % 6 === 0 && i > 0) {
        vistaAlumno[Math.floor(i / 6) - 1] = array;
        array = []
      }
      let data = {
        pregunta: this.preguntas[i],
        estado: alumno.respuestas[i].estado_respuesta,
        colspan: 4
      }
      array.push(data)
    }
    vistaAlumno[Math.floor(this.preguntas.length / 6) - 1] = array;

    let newRows = new Array();
    if (this.preguntas.length % 6 !== 1 && this.preguntas.length % 6 !== 2) {
      for (let a = 0; a < 4; a++) {
        this.rowsVistaAlumno.push({data: a})
      }
    }

    if (this.preguntas.length % 6 === 0 || this.preguntas.length % 6 === 1 || this.preguntas.length % 6 === 2) {
      this.rowsAlumnoStats = this.rowsVistaAlumno.length - 4
    } else {
      this.rowsAlumnoStats = this.rowsVistaAlumno.length - 8
    }

    let dataResultados = []
    dataResultados[0] = {
      name: 'Porcentaje Correctas',
      value: alumno.porcentaje + '%'
    }
    dataResultados[1] = {
      name: 'Preguntas Correctas',
      value: alumno.correctas
    }
    dataResultados[2] = {
      name: 'Nota',
      value: alumno.notas
    }
    dataResultados[3] = {
      name: 'Puntaje SIMCE',
      value: alumno.puntajes_simce
    }

    let newArray = [];
    let j = 0;
    for (let i = 0; i < 4; i++) {
      if (6 - this.preguntas.length % 6 === i && i > 0) {
        newRows[j] = newArray;
        newArray = []
      }
      newArray.push(dataResultados[i])
    }
    newRows[j] = newArray;
    this.alumnoStats = newRows;
    
    this.vistaAlumno = vistaAlumno
    this.vistaCompleta = false
  }

  getColor (state) {
    let color = 'green'
    if (state === 0) color = 'red'
    let style = {
      backgrounColor: color
    }
    return style
  }

  getFirstWord (string) {
    // Para evitar nombres tan largos
    let str = string.split(" ");
    return str[0];
  }

  back () {
    this.router.navigate(['/pages/simce'])
  }

}
