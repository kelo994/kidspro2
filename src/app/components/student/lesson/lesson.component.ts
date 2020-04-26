import { Component, OnInit, HostListener } from '@angular/core';
import { StudentLessonService } from '../../../services/student/lesson.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { EmbedVideoService } from 'ngx-embed-video';
import {ActivatedRoute, Router} from '@angular/router';
import {RepositorioService} from '../../../services/repositorio.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-student-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class StudentLessonComponent implements OnInit {

  constructor(
    private lessonService: StudentLessonService,
    public repositorioService: RepositorioService,
    private route: ActivatedRoute,
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
  url = `${environment.apiBaseUrl}`;
  innerWidth;
  isCollapsed;
  visibleDrawer = false;
  modalRepositorio = false;
  idEstudiante;
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
  playleccion = 'matematicas/1/1/Build/1.json';
  iframeHtml: any;
  loading = true;
  repositoriosProfesor: [
      {
        repositorio_id: '',
        repositorio_ruta: '',
        repositorio_name: '',
        tipo_repositorio_name: '',
        tipo_repositorio_icono: '',
        tipo_repositorio_color: '',
        nombre_descarga: '',
      }
  ];
  repositoriosSistema: [
      {
        repositorio_id: '',
        repositorio_ruta: '',
        repositorio_name: '',
        tipo_repositorio_name: '',
        tipo_repositorio_icono: '',
        tipo_repositorio_color: '',
        nombre_descarga: ''
      }
  ];
  repositorios: [
      {
        repositorio_id: '',
        repositorio_ruta: '',
        repositorio_name: '',
        tipo_repositorio_name: '',
        tipo_repositorio_icono: '',
        tipo_repositorio_color: '',
        nombre_descarga: ''
      }
  ];
  cursoId;
  asignaturaId;

  ngOnInit(): void {
      this.route.params.subscribe(params => {
          this.cursoId = params.course;
          this.asignaturaId = params.subject;
      });
    this.idEstudiante = localStorage.getItem('idEstudiante');
    this.loadContent();

    if (window.innerWidth >= 576) {
      this.innerWidth = window.innerWidth / 2;
    } else {
      this.innerWidth = window.innerWidth;
    }
  }

  loadContent() {
    this.lessonService.getBloqueAlumno(this.cursoId, this.asignaturaId).subscribe((data: any) => {
      this.lecciones = data.data;
      this.leccion = data.data[0];
      if (this.leccion != null) {
        localStorage.setItem('fastBloque', this.leccion.bloque_id);
        this.getRepositoriosBloque(this.leccion.bloque_id);
        this.playleccion = this.leccion.ruta_actividad;
        console.log(this.playleccion);
        this.loadVideo(this.leccion.recursos[0].url);
      } else {
        this.notification.warning('No hay lecciones activadas', '');
      }
      this.loading = false;
    }, (error) => {
      if (error.status === 500) this.notification.error('Error', error.error);
      if (error.status == 401) {
        localStorage.clear();
        this.router.navigate(['/auth/login']);
      }
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
    this.visibleDrawer = false;
    localStorage.setItem('fastBloque', this.leccion.bloque_id);
    this.loadVideo(lesson.recursos[0].url);
  }

  goToGame() {
    this.router.navigate(['/student/lesson/game'], { state: { play: this.playleccion, titulo: this.leccion.bloque_titulo } })
  }

  getRepositoriosBloque(bloqueId) {
    this.lessonService.getRepositoriosBloque(bloqueId).subscribe( (data: any) => { // Success
      this.repositorios = data;
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }

  descargarArchivo(nombreArchivo) {
    var ruta = nombreArchivo.split('/');
    console.log(nombreArchivo);
    this.lessonService.descargarArchivo(ruta[5]).subscribe( (data: any) => { // Success
      this.notification.info('Repositorio', 'Descarga exitosa');
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }

  reproducir(nombre) {
    const audio = new Audio('../../../../assets/audios/' + nombre);
    audio.play();
  }

  closeModal(modal) {
    if (modal === 'repositorio') {
      this.modalRepositorio = false;
    } else if (modal === 'crearRepositorio') {
    }
  }

  openModal(modal) {
    if (modal === 'repositorio') {
      this.getRepositoriosProfesor();
      this.getRepositoriosSistema();
      this.modalRepositorio = true;
    } else if (modal === 'crearRepositorio') {
    }
  }

  getRepositoriosProfesor() {
    this.lessonService.getRepositorios(1, this.leccion.bloque_id).subscribe( (data: any) => { // Success
      this.repositoriosProfesor = data;
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }

  getRepositoriosSistema() {
    this.lessonService.getRepositorios(2, this.leccion.bloque_id).subscribe( (data: any) => { // Success
      this.repositoriosSistema = data;
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }
}
