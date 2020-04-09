import { Component, OnInit } from '@angular/core';
import { EstablishmentService } from '../../../../services/system/establishment.service';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.scss']
})
export class EstablishmentComponent implements OnInit {
  loading = true;
  establishments: [
      {
        id: '',
        establecimiento_nombre: '',
        establecimiento_direccion: '',
        establecimiento_comuna: '',
        establecimiento_email: '',
        establecimiento_web: '',
        establecimiento_director: '',
        establecimiento_sostenedor: '',
        establecimiento_rbd: '',
        establecimiento_reconocimiento_oficial: '',
        establecimiento_dependencia: '',
        establecimiento_nivel_ensenanza: '',
        establecimiento_alumnos: '',
        establecimiento_promedio_alumnos: '',
        establecimiento_telefono: '',
        establecimiento_logo: '',
        establecimiento_mapa: '',
        created_at: '',
      }
  ];
  modalAgregarEstablecimiento = false;
  establishmentForm  = new FormGroup({
      establecimiento_nombre: new FormControl(''),
      establecimiento_direccion: new FormControl(''),
      establecimiento_comuna: new FormControl(''),
      establecimiento_email: new FormControl(''),
      establecimiento_web: new FormControl(''),
      establecimiento_director: new FormControl(''),
      establecimiento_rbd: new FormControl(''),
      establecimiento_reconocimiento_oficial: new FormControl(''),
      establecimiento_dependencia: new FormControl(''),
      establecimiento_nivel_ensenanza: new FormControl(''),
      establecimiento_alumnos: new FormControl(''),
      establecimiento_promedio_alumnos: new FormControl(''),
      establecimiento_telefono: new FormControl(''),
      establecimiento_logo: new FormControl(''),
      establecimiento_mapa: new FormControl(''),
      establecimiento_sostenedor: new FormControl(''),
  });
  establecimientoElminado;

  constructor(
      private establishmentService: EstablishmentService,
      private modalService: NzModalService,
      private notification: NzNotificationService,
      private router: Router,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getEstablishment();
  }

  getEstablishment() {
    this.establishmentService.getEstablishment().subscribe((data: any) => {
      this.establishments = data;
      this.loading = false;
    }, (error) => {
      if (error.status === 401) {
        this.router.navigate(['/auth/login']);
      } else if (error.status === 400) {
        this.router.navigate(['/auth/login']);
        this.notification.error('Error Inesperado', 'Por favor vuelve a iniciar Sesión');
      }
    });
  }

    showModal(): void {
        this.modalAgregarEstablecimiento = true;
    }

    handleCancelAgregar(): void {
        console.log('Button cancel clicked!');
        this.modalAgregarEstablecimiento = false;
    }

    createEstablishment() {
      const data = this.establishmentForm.value;
      this.establishmentService.save(data).subscribe((response: any) => {
        this.establishments = response;
        this.modalAgregarEstablecimiento = false;
        this.notification.success('Establecimiento', 'Establecimiento Creado con Éxito');
        }, (error) => {
            if (error.status === 401) {
               this.router.navigate(['/auth/login']);
         }
         });
    }

    delete(EstablecimientoId) {
        this.establecimientoElminado = EstablecimientoId;
        this.modalService.confirm({
            nzTitle: '<i>¿Estás seguro de realizar esta acción?</i>',
            nzContent: '<b>Esta acción no se puede deshacer</b>',
            nzCancelText: 'Cancelar',
            nzOkText: 'Eliminar',
            nzClassName: 'modal-confirm-delete',
            nzOnOk: () => this.confirmDelete()
        });
    }

    confirmDelete() {
        this.establishmentService.delete(this.establecimientoElminado).subscribe((data: any) => {
            this.establishments = data;
            this.notification.success('Establecimientos', 'El establecimiento fue eliminado con exito');
        }, (error) => {
            console.log(error);
            if (error.status === 401) {
                this.router.navigate(['/auth/login']);
            } else if (error.status === 400 || error.status === 500) {
                this.notification.error('Error al Eliminar el Establecimiento', error.error.message);
            }
        });
    }

}
