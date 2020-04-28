import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AttitudeService} from '../../../../services/system/attitude.service';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  loading = true;
  attitudes: [];
  modalAgregarActitud = false;
  attitudeForm  = new FormGroup({
    actitud_nombre: new FormControl(''),
  });
  AttitudeDelete;
  unitId;

  constructor(
      private router: Router,
      private location: Location,
      private route: ActivatedRoute,
      private attitudeService: AttitudeService,
      private modalService: NzModalService,
      private notification: NzNotificationService,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAttitudesPerUnit();
  }

  getAttitudesPerUnit() {
    this.attitudeService.getAttitudesPerUnit(this.unitId).subscribe((data: any) => {
      this.attitudes = data;
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
    this.modalAgregarActitud = true;
  }

  handleCancelAgregar(): void {
    this.modalAgregarActitud = false;
  }

  createAttitude() {
    const data = this.attitudeForm.value;
    data.unidad_id = this.unitId;
    console.log(data);
    this.attitudeService.save(data).subscribe((response: any) => {
      this.attitudes = response;
      this.modalAgregarActitud = false;
      this.notification.success('Actitud', 'Actitud Creado con Éxito');
    }, (error) => {
      if (error.status === 401) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  delete(AttitudeId) {
    this.AttitudeDelete = AttitudeId;
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
    this.attitudeService.delete(this.AttitudeDelete).subscribe((data: any) => {
      this.attitudes = data;
      this.notification.success('Actitud', 'La actitud fue eliminada con exito');
    }, (error) => {
      console.log(error);
      if (error.status === 401) {
        this.router.navigate(['/auth/login']);
      } else if (error.status === 400 || error.status === 500) {
        this.notification.error('Error al Eliminar la actitud', error.error.message);
      }
    });
  }

  goBack() {
    this.location.back();
  }

}
