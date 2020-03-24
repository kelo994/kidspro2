import { Component, OnInit, HostListener } from '@angular/core';
import { StudentLessonService } from '../../../services/student/lesson.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { EmbedVideoService } from 'ngx-embed-video';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class StudentLessonComponent implements OnInit {

  constructor(
    private lessonService: StudentLessonService,
    private notification: NzNotificationService,
    private embedService: EmbedVideoService,
    public router: Router
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth >= 576) {
      this.innerWidth = window.innerWidth / 2;
    } else {
      this.innerWidth = window.innerWidth;
    }
  }

  innerWidth;
  isCollapsed;
  visibleDrawer = false;

  estudianteId = localStorage.getItem('idEstudiante');
  leccionId;
  leccion = {
    bloque_id: '',
    bloque_titulo: '',
    leccion_titulo: '',
    bloque_imagen: '',
    ruta_actividad: '',
    lecciones: {
      leccion_titulo: ''
    },
    objetivos: {
      objetivo_descripcion: ''
    },
    habilidades: {
      habilidad_nombre: ''
    },
    recursos: []
  };
  lecciones = [];
  asignaturaId;
  cursoId;
  grupoId;
  showSection = 0;
  playleccion = 'matemáticas/1/1/Build/1.json';
  iframeHtml: any;

  ngOnInit(): void {
    this.loadContent()
    if (window.innerWidth >= 576) {
      this.innerWidth = window.innerWidth / 2;
    } else {
      this.innerWidth = window.innerWidth;
    }
  }

  loadContent() {
    this.lessonService.getBloqueAlumno(this.estudianteId).subscribe((data: any) => { // Success
      this.leccion = data.data[0];
      if (this.leccion != null) {
        this.playleccion = this.leccion.ruta_actividad;
        this.loadVideo(this.leccion.recursos[0].url);
      } else {
        //this.notFound = true
      }
      //this.load = true;
      //this.estudent = localStorage.getItem('alumnoFast');
      this.lecciones = data.data;
      if (this.lecciones.length <= 1) {
        //this.sinLeccion = true;
      } else {
        //this.sinLeccion = false;
      }
    }, (error) => {
      if (error.status === 500) this.notification.error('Error', error.error);
      if (error.status == 401) this.router.navigate(['/auth/login']);
    });
  }

  loadVideo(url: any) {
    let urlGet = url.split('https://player.vimeo.com/video/');
    urlGet = urlGet[1].split('?');
    this.iframeHtml = this.embedService.embed_vimeo(urlGet[0], {
      query: { title: 0, byline: 0, portrait: 0 },
      attr: { width: '100%', height: '100%' }
    });
  }

  goToLesson(lesson) {
    this.leccion = lesson;
    this.playleccion = this.leccion.ruta_actividad;
    this.loadVideo(lesson.recursos[0].url);
  }

}