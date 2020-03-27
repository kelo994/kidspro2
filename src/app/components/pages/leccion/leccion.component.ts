import { Component, OnInit } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LeccionService } from '../../../services/leccion.service';
import { BloqueService } from '../../../services/bloque.service';

@Component({
  selector: 'app-leccion',
  templateUrl: './leccion.component.html',
  styleUrls: ['./leccion.component.scss']
})
export class LeccionComponent implements OnInit {
  leccionId;
  leccion = {
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
    }
  };
  lecciones = [];
  isCollapsed = false;
  asignaturaId;
  cursoId;
  grupoId;
  showSection = 0;
  playleccion = 'matemáticas/1/1/Build/1.json';
  iframeHtml: any;

  constructor(public router: Router, private route: ActivatedRoute, private embedService: EmbedVideoService,
    public leccionService: LeccionService, public bloqueService: BloqueService) { }



  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   console.log(params);
    //   console.log(history.state);
    this.leccionId = localStorage.getItem('leccionId');
    this.cursoId = localStorage.getItem('CursoEspecifico');
    this.asignaturaId = localStorage.getItem('AsignaturaId');
    this.grupoId = localStorage.getItem('unidadId');
    this.loadContent();
    this.obtenerBloques();
    //});


  }

  goToLeccion(leccionId): void {
    this.router
      .navigateByUrl('pages/cursos/unidades/lecciones/' + leccionId, {
        state: {
          asignatura_id: this.asignaturaId,
          cursoId: this.cursoId, grupoId: this.grupoId
        }
      });
  }


  loadContent() {
    this.leccionService.getBloque(this.cursoId, this.asignaturaId, this.leccionId).subscribe(
      (data: any) => { // Success
        this.leccion = data.data;
        this.showSection = 2;
        this.playleccion = this.leccion.ruta_actividad;
        // @ts-ignore
        this.loadVideo(this.leccion.recursos[0].url);
      },
      (error) => {
        this.showSection = 1;
        if (error.status === 401) {
          this.router.navigate(['/auth/login']);
        }
      }
    );
  }

  reloadLeccion(item) {
    localStorage.setItem('leccionId', item.bloque_id);
    this.leccionId = localStorage.getItem('leccionId');
    this.cursoId = localStorage.getItem('CursoEspecifico');
    this.asignaturaId = localStorage.getItem('AsignaturaId');
    this.grupoId = localStorage.getItem('unidadId');
    this.loadContent();
    this.obtenerBloques();
  }

  obtenerBloques() {
    this.bloqueService.getBloquesGrupo(this.grupoId).subscribe((data: any) => { // Success
      this.lecciones = data;
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }

  loadVideo(url: any) {
    let urlGet = url.split('https://player.vimeo.com/video/');
    urlGet = urlGet[1].split('?');
    this.iframeHtml = this.embedService.embed_vimeo(urlGet[0],
      {
        query: { title: 0, byline: 0, portrait: 0 },
        attr: { width: '100%', height: '100%' }
      });
  }

}
