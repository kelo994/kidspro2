import { Component, OnInit } from '@angular/core';
import { SimceService } from '../../../../services/simce.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simce-evaluation-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class EvaluationResultsComponent implements OnInit {

  constructor(public simceService: SimceService,  public router: Router) { }

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
  alumnoSelected;

  dataChart: object;

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });
    this.evaluation = history.state.simce
    this.getStats()
  }

  getStats() {
    if (typeof this.evaluation !== 'undefined') {
      this.simceService.estadisticasPrueba(this.evaluation.prueba_id).subscribe((data: any) => { // Success
        this.dataLoading = false
        this.data = data.data
        this.preguntas = data.preguntas;
        this.preguntaSelected = this.preguntas[0];
        this.puntajes = data.dash_puntajes_simce
        this.niveles = data.levels
        this.dataChart = data
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
    //if ()
    vistaAlumno[Math.floor(this.preguntas.length / 6) - 1] = array;
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

  back () {
    this.router.navigate(['/pages/simce'])
  }

}
