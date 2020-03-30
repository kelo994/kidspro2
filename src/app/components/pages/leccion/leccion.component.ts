import { Component, OnInit } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LeccionService } from '../../../services/leccion.service';
import {NzFormatEmitEvent, NzModalService, NzNotificationService} from 'ng-zorro-antd';
import { BloqueService } from '../../../services/bloque.service';
import { RepositorioService } from '../../../services/repositorio.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
    unidad_id: '',
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
  objetivos: { objetivo_descripcion: '' };
  habilidades: { habilidad_nombre: '' };
  lecciones = [];
  isCollapsed = false;
  asignaturaId;
  cursoId;
  grupoId;
  showSection = 0;
  playleccion = 'matemáticas/1/1/Build/1.json';
  iframeHtml: any;
  repositorioForm: FormGroup;
  modalCrearRepositorio = false;
  modalRepositorio = false;
  tipoArchivo = [
      {
          tipo_id: 1,
          nombre: 'pdf',
      },
      {
          tipo_id: 2,
          nombre: 'imagen',
      },
      {
          tipo_id: 3,
          nombre: 'doc',
      },
      {
          tipo_id: 4,
          nombre: 'ppt',
      },
      {
          tipo_id: 5,
          nombre: 'excel',
      },
  ];
    archivo;
    funcionarioId;
    repositoriosProfesor: [
        {
            repositorio_id: '',
            repositorio_ruta: '',
            repositorio_name: '',
            tipo_repositorio_name: '',
            tipo_repositorio_icono: '',
            tipo_repositorio_color: ''
        }
        ];
    repositoriosSistema: [
        {
            repositorio_id: '',
            repositorio_ruta: '',
            repositorio_name: '',
            tipo_repositorio_name: '',
            tipo_repositorio_icono: '',
            tipo_repositorio_color: ''
        }
        ];
    repositorios: [
        {
            repositorio_id: '',
            repositorio_ruta: '',
            repositorio_name: '',
            tipo_repositorio_name: '',
            tipo_repositorio_icono: '',
            tipo_repositorio_color: ''
        }
    ];
    archivoElminado;
    loading = false;
    unidadNombre;
    nombreAsignatura;

  constructor(public router: Router, private route: ActivatedRoute,
              private embedService: EmbedVideoService,
              public leccionService: LeccionService,
              private notification: NzNotificationService,
              private modalService: NzModalService,
              public repositorioService: RepositorioService,
              public bloqueService: BloqueService) {
      this.repositorioForm = new FormGroup({
          tipoArchivo: new FormControl('', [Validators.required, Validators.minLength(1)]),
          nombre: new FormControl('', [Validators.required, Validators.minLength(1)]),
      });
  }



  ngOnInit(): void {
    this.route.params.subscribe(params => {
        console.log(params);
        this.leccionId = params.leccion;
    });
    this.funcionarioId  = localStorage.getItem('idFuncionario');
    this.cursoId = localStorage.getItem('cursoId');
    this.asignaturaId = localStorage.getItem('AsignaturaId');
    this.grupoId = localStorage.getItem('unidadId');
    this.unidadNombre = localStorage.getItem('unidadNombre');
    this.nombreAsignatura = localStorage.getItem('nombreAsignatura');
    this.loadContent();
    this.obtenerBloques();
    this.getRepositoriosBloque();
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
        this.loading = true;
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
    this.leccionId = item.bloque_id;
    this.cursoId = localStorage.getItem('cursoId');
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

    saveRepositorio() {
        if (this.repositorioForm.valid) {
            var formData = new FormData();
            console.log(this.archivo);
            formData.append('file', this.archivo);
            formData.append('repositorio_name', this.repositorioForm.controls.nombre.value);
            formData.append('tipo_repositorio_id', this.repositorioForm.controls.tipoArchivo.value);
            formData.append('usuario_repositorio_id', '1');
            formData.append('funcionario_id', this.funcionarioId);
            formData.append('bloque_id', this.leccionId);
            this.closeModal('crearRepositorio');
            this.notification.info('Repositorio', 'Estamos procesando su solicitud');
            console.log(formData);
            this.repositorioService.crearRepositorio(formData).subscribe((response: any) => {
                this.repositorios = response;
                this.notification.success('Repositorio Creado con Éxito', '');
            }, (error) => {
                if (error.status === 401) {
                    this.router.navigate(['/auth/login']);
                } else if (error.status === 400 || error.status === 500) {
                    this.notification.error('Error al Agregar un Repositorio', error.error.Warning);
                }
            });
        } else {
            this.validarForma();
        }
    }

    getRepositoriosProfesor() {
        this.repositorioService.getRepositorios(1, this.funcionarioId, this.leccionId).subscribe( (data: any) => { // Success
            this.repositoriosProfesor = data;
        }, (error) => {
            if (error.status === 401) { this.router.navigate(['/auth/login']); }
        });
    }

    getRepositoriosSistema() {
        this.repositorioService.getRepositorios(2, this.funcionarioId, this.leccionId).subscribe( (data: any) => { // Success
            this.repositoriosSistema = data;
        }, (error) => {
            if (error.status === 401) { this.router.navigate(['/auth/login']); }
        });
    }

    getRepositoriosBloque() {
        this.repositorioService.getRepositoriosBloque(this.funcionarioId, this.leccionId).subscribe( (data: any) => { // Success
            this.repositorios = data;
        }, (error) => {
            if (error.status === 401) { this.router.navigate(['/auth/login']); }
        });
    }

    descargarArchivo(nombreArchivo) {
        var ruta = nombreArchivo.split('/');
        this.repositorioService.descargarArchivo(ruta[5]).subscribe( (data: any) => { // Success
            this.notification.info('Repositorio', 'Descarga exitosa');
        }, (error) => {
            if (error.status === 401) { this.router.navigate(['/auth/login']); }
        });
    }

    confirmDelete() {
        this.repositorioService.deleteRepositorios(this.archivoElminado).subscribe((data: any) => {
            this.repositorios = data;
            this.closeModal('repositorio');
            this.notification.success('Repositorio', 'El archivo fue eliminado con exito');
        }, (error) => {
            console.log(error);
            if (error.status === 401) {
                this.router.navigate(['/auth/login']);
            } else if (error.status === 400 || error.status === 500) {
                this.notification.error('Error al Eliminar el Archivo', error.error.message);
            }
        });
    }

    procesarArchivo(event) {
      this.archivo = event.target.files[0];
    }

    closeModal(modal) {
      if (modal === 'repositorio') {
         this.modalRepositorio = false;
      } else if (modal === 'crearRepositorio') {
        this.modalCrearRepositorio = false;
      }
    }

    openModal(modal) {
        if (modal === 'repositorio') {
            this.getRepositoriosProfesor();
            this.getRepositoriosSistema();
            this.modalRepositorio = true;
        } else if (modal === 'crearRepositorio') {
            this.modalCrearRepositorio = true;
        }
    }

    validarForma() {
        if (this.repositorioForm.controls.tipoArchivo.status !== 'VALID') {
            if (this.repositorioForm.controls.tipoArchivo.value == null) {
                this.notification.warning('Repositorio', 'Por favor seleccione un tipo de archivo.');
            }
        } else if (this.repositorioForm.controls.nombre.status !== 'VALID') {
            if (this.repositorioForm.controls.nombre.value == null) {
                this.notification.warning('Repositorio', 'Por favor ingrese un nombre para el archivo.');
            }
        }
    }

    delete(archivoId) {
        this.archivoElminado = archivoId;
        this.modalService.confirm({
            nzTitle: '<i>¿Estas seguro de realizar esta acción?</i>',
            nzContent: '<b>Esta acción no se puede deshacer</b>',
            nzCancelText: 'Cancelar',
            nzOkText: 'Eliminar',
            nzClassName: 'modal-confirm-delete',
            nzOnOk: () => this.confirmDelete()
        });
    }

    goToUnidad(): void {
        this.router.navigateByUrl('pages/cursos/unidades/' + this.leccion.unidad_id);
    }
}
