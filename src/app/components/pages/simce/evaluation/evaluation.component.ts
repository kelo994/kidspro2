import { Component, OnInit, HostListener } from '@angular/core';
import { SimceService } from '../../../../services/simce.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simce-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class SimceEvaluationComponent implements OnInit {

  constructor(
    private simceService: SimceService,
    private notification: NzNotificationService,
    public router: Router) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 860) {
      this.siderWidth = 80;
    } else {
      this.siderWidth = 170;
    }
  }

  siderWidth = 170;

  evaluation: any;
  questions = [];
  question: any;
  questionIndex;

  ngOnInit(): void {
    this.evaluation = history.state.evaluation
    this.getEvaluation()
    if (window.innerWidth <= 860) {
      this.siderWidth = 80;
    } else {
      this.siderWidth = 170;
    }
  }

  getEvaluation() {
    if (typeof this.evaluation !== 'undefined') {
      this.simceService.getPreguntasPrueba(this.evaluation.prueba_id).subscribe((data: any) => { // Success
        this.questions = data
        this.question = data[0]
        this.questionIndex = 0
      }, (error) => {
        if (error.status == 401) this.router.navigate(['/auth/login'])
      })
    } else {
      this.router.navigate(['/pages/simce'])
    }
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

  back () {
    this.router.navigate(['/pages/simce'])
  }

}
