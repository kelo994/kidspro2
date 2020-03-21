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
  leccion = {};
  lecciones = [];
  isCollapsed = false;
  asignaturaId;
  cursoId;
  grupoId;
  showSection = 0;
  playleccion = 'matemáticas/1/1/Build/1.json';
  iframeHtml: any;

  constructor(public router: Router, private route: ActivatedRoute,  private embedService: EmbedVideoService,
              public leccionService: LeccionService, public bloqueService: BloqueService) { }

/*
  openXl(content) {
    this.modalService.open(content, { size: 'xl', centered: true, windowClass: 'animated fadeInDown' }).result.then((result) => {
      document.getElementById("gamecontainer").outerHTML = "";
    }, (reason) => {
      document.getElementById("gamecontainer").outerHTML = "";
    });
  }
*/

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      console.log(history.state);
      this.leccionId = params.leccion;
      this.asignaturaId = 1;
      this.cursoId = 1;
      this.grupoId = 28;
      this.loadContent();
      this.obtenerBloques();
      //this.obtenerBloquesActivos();
    });
  }

  goToLeccion(leccionId): void {
    console.log(leccionId);
    this.router
        .navigateByUrl('cursos/unidades/lecciones/' + leccionId, {state: {}});
  }


  loadContent() {
    this.leccionService.getBloque(this.cursoId, this.asignaturaId, this.leccionId).subscribe(
        (data: any) => { // Success
          this.leccion = data.data;
          this.showSection = 2;
          this.playleccion = this.leccion.ruta_actividad;
          this.loadVideo(this.leccion.recursos[0].url);
        },
        (error) => {
          console.log(error);
          this.showSection = 1;
          if (error.status === 401) {
            this.router.navigate(['/auth/login']);
          }
        }
    );
  }

    obtenerBloquesActivos() {
        this.leccionService.getBloquesActivos(this.cursoId, this.asignaturaId).subscribe(
            (data: any) => {
                console.log(data);
                this.lecciones = data.data;
            },
            (error) => {
                if (error.status === 401) {
                    this.router.navigate(['/auth/login']);
                }
            }
        );
    }

    obtenerBloques() {
        console.log(this.grupoId);
        this.bloqueService.getBloquesGrupo(this.grupoId).subscribe( (data: any) => { // Success
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
  /*
     @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
       //console.log("presionaste Escape te piller");
       this.unity.exitFullScreen();
     }

     setFull(title): void {
       this.unity.send();
     }

     obtenerBloques(content) {
       let idAsignatura = localStorage.getItem('asignatureOpen');
       let idCurso = localStorage.getItem('CursoId');
       this.getCode = false;
       this.dashboard.openAsignatura(idCurso, idAsignatura).subscribe(
           (data: any) => { // Success
             console.log(data);
             this.unidades = data;
             //this.openSaveRuta(data, true);
             this.modalService.open(content, { size: 'xl', centered: true, windowClass: 'animated fadeInDown' });
           },
           (error) => {
             if (error.status == 401) {
               console.log("error token")
               this.router.navigate(['/auth/login']);
               console.log("error token")
             }
           }
       );
     }



     addSelectBloque(idx: any, item) {
       if (this.bloquesSave.find(item => item.id === idx)) {
         this.bloquesSave.some(function (obj) {
           if (obj.id == idx) {
             //change the value here
             obj.estado = !obj.estado;
             return true;    //breaks out of he loop
           }
         });
       } else {
         let a = { id: idx, estado: true }
         this.bloquesSave.push(a);
       }
       console.log(this.bloquesSave)
     }

     sendBloques() {
       if (this.bloquesSave.find(item => item.estado === true)) {
         console.log("curso: " + localStorage.getItem('CursoId'))
         let data = {
           //url: 'mis-cursos/unidades/leccion/' + localStorage.getItem('leccionOpen'),
           curso_id: localStorage.getItem('CursoId'),
           asignatura_id: localStorage.getItem('asignatureOpen'),
           //bloque_id: localStorage.getItem('leccionOpen'),
           bloques: this.bloquesSave
         }
         this.dashboard.activarBloques(data).subscribe( (data: any) => { // Success
           this.codigo = data.codigo;
           this.getCode = true;
           this.modalService.dismissAll();
           this.modalService.open(this.studentCode, {
             size: 'lg', backdropClass: 'light-blue-backdrop', windowClass: 'animated fadeInDown', centered: true, scrollable: true
           });
         }, (error) => {
           if (error.status == 401) this.router.navigate(['/pages/login']);
         });
       } else {
         this.toast.showToast('warning', 'Error al Activar Lecciones', 'No ha seleccionado ningúna lección.');
       }
     }

     hideBloques() {
       let data = {
         curso_id: localStorage.getItem('CursoId'),
         asignatura_id: localStorage.getItem('asignatureOpen'),
       }
       this.dashboard.desactivarBloques(data).subscribe( (data: any) => { // Success
         this.toast.showToast('success', data, '');
       }, (error) => {
         this.toast.showToast('warning', 'Error al Desactivar Lecciones', error.error);
         if (error.status == 401) this.router.navigate(['/pages/login']);
       });
     }



     openSaveRuta(object: any, hasScroll: boolean) {
       this.dialognbService.open(DialogRutaComponent, {
         context: {
           body: object
         },
         hasScroll
       });
     }

     closeActivity() {
       this.modalService.dismissAll();
       window.location.reload();
     }


   */
}
