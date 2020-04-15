import { Component, OnInit } from '@angular/core';
import {RepositorioService} from '../../../../services/repositorio.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {
  blockId;
  repositoriosSistema;
  archivoElminado;
  archivo;
  modalRepositorio = false;
  modalCrearRepositorio = false;
  repositorioForm: FormGroup;
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
  constructor(
      public repositorioService: RepositorioService,
      public router: Router,
      private modalService: NzModalService,
      private notification: NzNotificationService,
      private route: ActivatedRoute,
  ) {
    this.repositorioForm = new FormGroup({
      tipoArchivo: new FormControl('', [Validators.required, Validators.minLength(1)]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      this.blockId = params.block;
    });
    this.getRepositoriosSistema();
  }

  getRepositoriosSistema() {
    this.repositorioService.getRepositoriosBlocks(1, this.blockId).subscribe( (data: any) => { // Success
      this.repositoriosSistema = data;
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }

  confirmDelete() {
    this.repositorioService.deleteRepositoriosAdmin(this.archivoElminado).subscribe((data: any) => {
      this.getRepositoriosSistema();
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

  saveRepositorio() {
    if (this.repositorioForm.valid) {
      var formData = new FormData();
      console.log(this.archivo);
      formData.append('file', this.archivo);
      formData.append('repositorio_name', this.repositorioForm.controls.nombre.value);
      formData.append('tipo_repositorio_id', this.repositorioForm.controls.tipoArchivo.value);
      formData.append('usuario_repositorio_id', '1');
      formData.append('bloque_id', this.blockId);
      this.closeModal('crearRepositorio');
      this.notification.info('Repositorio', 'Estamos procesando su solicitud');
      console.log(formData);
      this.repositorioService.crearRepositorioAdmin(formData).subscribe((response: any) => {
        this.getRepositoriosSistema();
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

}
