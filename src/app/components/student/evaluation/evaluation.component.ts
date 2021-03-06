import { Component, OnInit, HostListener } from '@angular/core';
import { SimceService } from '../../../services/simce.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class StudentEvaluationComponent implements OnInit {

  constructor(
    private simceService: SimceService,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    public router: Router) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 860) {
      this.siderWidth = 80;
    } else {
      this.siderWidth = 180;
    }
  }

  idEstudiante = localStorage.getItem('idEstudiante');

  siderWidth = 180;
  isCollapsed;

  evaluation: any;
  questions = [];
  question: any;
  questionIndex: any;

  loading = true;

  ngOnInit(): void {
    this.getEvaluation()
    if (window.innerWidth <= 860) {
      this.siderWidth = 80;
    } else {
      this.siderWidth = 180;
    }
  }

  getEvaluation() {
    this.simceService.getPruebaEstudiante(this.idEstudiante).subscribe((data: any) => {
      this.evaluation = data.prueba
      this.questions = data.preguntas
      this.question = data.preguntas[0]
      this.questionIndex = 0
      this.loading = false
    }, (error) => {
      if (error.status === 500) this.notification.error('Error', error.error);
      if (error.status == 401) {
        localStorage.clear();
        this.router.navigate(['/auth/login']);
      }
      this.loading = false
      //this.notFound = true
    });
  }

  guardarRespuesta(idPregunta, idRespuesta) {
    let data = {
      respuesta_id: idRespuesta
    }
    this.simceService.guardarRepuesta(this.evaluation.prueba_id, this.idEstudiante, idPregunta, data).subscribe((data: any) => { // Success
      //this.notification.success(data, '');
      $('#question' + this.questionIndex).removeClass('check-slider').addClass('check-slider-active');
    }, (error) => {
      if (error.status == 401) this.router.navigate(['/auth/login']);
    })
  }

  preguntasFaltantes () {
    let q = this.questions.filter(e => e.respuesta_id === null)
    let string = '';
    q.forEach(e => {
      string = string + e.pregunta_numero + ', ';
    });
    string = string.substr(0, string.length - 2);
    return string;
  }

  confirm() {
    let nzContent;
    if (this.preguntasFaltantes().length > 0) {
      nzContent = 'Aun te falta por responder las siguientes preguntas: <b>' + this.preguntasFaltantes() + '</b>';
    } else {
      nzContent = '<b>Esta acción no se puede deshacer</b>';
    }
    this.modalService.confirm({
      nzTitle: '¿Estás seguro de finalizar la Evaluación?',
      nzContent: nzContent,
      nzCancelText: 'Cancelar',
      nzOkText: 'Finalizar',
      nzClassName: 'modal-confirm',
      nzOnOk: () => this.finalizarPrueba()
    });
  }

  finalizarPrueba () {
    this.simceService.finalizarPruebaEstudiante(this.evaluation.prueba_id, this.idEstudiante).subscribe((data: any) => { // Success
      this.notification.success('Evaluación SIMCE', 'Evaluación Finalizada');
      this.router.navigate(['/auth/login']);
    })
  }

  setQuestion(q, index) {
    this.question = q
    this.questionIndex = index 
  }

  next () {
    this.questionIndex = this.questionIndex + 1
    this.question = this.questions[this.questionIndex]
  }
  
  prev () {
    this.questionIndex = this.questionIndex - 1
    this.question = this.questions[this.questionIndex]
  }
}
