import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentLessonService} from '../../../services/student/lesson.service';
import {NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-pivot',
  templateUrl: './pivot.component.html',
  styleUrls: ['./pivot.component.scss']
})
export class PivotComponent implements OnInit {
  nombreEstudiante;
  codigoId;
  data: {
    asignaturas: [],
    establecimiento_nombre: '',
    nivel_descripcion: '',
    curso_id: ''
  };
  step = 'lecciones';
  constructor(public router: Router,
              private notification: NzNotificationService,
              public lessonService: StudentLessonService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.codigoId = params.code;
    });
    this.nombreEstudiante = localStorage.getItem('studentName');
    this.getDataByCode();
  }
  getDataByCode() {
    this.lessonService.getDataByCode(this.codigoId).subscribe((data: any) => {
      this.data = data;
    }, (error) => {
      if (error.status === 500) { this.notification.error('Error', error.error); }
      if (error.status === 401) {
        localStorage.clear();
        this.router.navigate(['/auth/login']);
      }
    });
  }

  goLecciones() {
    this.step = 'lecciones';
  }

  goPivot() {
    this.step = 'pivot';
  }

  goSimce() {
    this.step = 'simce';
  }

  goToLesson(asignaturaId) {
      console.log(asignaturaId);
      this.router.navigate(['student/courses/' + this.data.curso_id + '/subjects/' + asignaturaId + '/lesson']);
  }

}
