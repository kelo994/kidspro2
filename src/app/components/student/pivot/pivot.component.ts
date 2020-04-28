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
    nivel_descripcion: '',
    establecimiento_nombre: '',
    nivel_id: '',
    curso_id: ''
  };
<<<<<<< HEAD
  step = 'lecciones';
=======
  step = 'pivot';
  playleccion = '1/Build/1.json';
>>>>>>> 6ed38eb09d77acb016ad0cc5b26bebea5772d6da
  constructor(public router: Router,
              private notification: NzNotificationService,
              public lessonService: StudentLessonService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.codigoId = localStorage.getItem('currentCode');
    this.nombreEstudiante = localStorage.getItem('studentName');
    this.getDataByCode();
  }
  getDataByCode() {
    this.lessonService.getDataByCode(this.codigoId).subscribe((data: any) => {
      this.data = data;
      this.playleccion = data.nivel_id + '/Build/' + data.nivel_id + '.json'
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

  goToGame() {
    this.router.navigate(['/student/lesson/game'], { state: { play: this.playleccion } })
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
