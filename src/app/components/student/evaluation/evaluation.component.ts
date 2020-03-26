import { Component, OnInit, HostListener } from '@angular/core';
import { SimceService } from '../../../services/simce.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class StudentEvaluationComponent implements OnInit {

  constructor(
    private simceService: SimceService,
    private notification: NzNotificationService,
    public router: Router) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 860) {
      this.siderWidth = 80;
    } else {
      this.siderWidth = 200;
    }
  }

  idEstudiante = localStorage.getItem('idEstudiante');

  siderWidth = 200;
  isCollapsed;

  evaluation: any;
  questions = [];
  question: any;
  questionIndex: any;

  ngOnInit(): void {
    this.getEvaluation()
    if (window.innerWidth <= 860) {
      this.siderWidth = 80;
    } else {
      this.siderWidth = 200;
    }
  }

  getEvaluation() {
    this.simceService.getPruebaEstudiante(this.idEstudiante).subscribe((data: any) => {
      this.evaluation = data.prueba
      this.questions = data.preguntas
      this.question = data.preguntas[0]
      this.questionIndex = 0
    }, (error) => {
      if (error.status === 500) this.notification.error('Error', error.error);
      if (error.status == 401) {
        localStorage.clear();
        this.router.navigate(['/auth/login']);
      }
      //this.notFound = true
    });
  }

  guardarRespuesta(idPregunta, idRespuesta) {
    let data = {
      respuesta_id: idRespuesta
    }
    this.simceService.guardarRepuesta(this.evaluation.prueba_id, this.idEstudiante, idPregunta, data).subscribe((data: any) => { // Success
      this.notification.success(data, '');
    }, (error) => {
      if (error.status == 401) this.router.navigate(['/auth/login']);
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
