import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {UnitService} from '../../../../services/system/unit.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {
  loading = true;
  units: [
      {
        unidad_nombre: '',
        unidad_descripcion: '',
        unidad_id: '',
      }
  ];
  modalAgregarUnidad = false;
  unitForm  = new FormGroup({
    unidad_nombre: new FormControl(''),
    unidad_descripcion: new FormControl(''),
  });
  unidadElminada;
  subjectId;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private unitService: UnitService,
      private modalService: NzModalService,
      private notification: NzNotificationService,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      this.subjectId = params.subject;
    });
    this.getUnitsPerSubject();
  }

  getUnitsPerSubject() {
    this.unitService.getUnitsPerSubject(this.subjectId).subscribe((data: any) => {
      this.units = data;
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
    this.modalAgregarUnidad = true;
  }

  handleCancelAgregar(): void {
    console.log('Button cancel clicked!');
    this.modalAgregarUnidad = false;
  }

  createUnit() {
    const data = this.unitForm.value;
    data.asignatura_id = this.subjectId;
    this.unitService.save(data).subscribe((response: any) => {
      this.units = response;
      this.modalAgregarUnidad = false;
      this.notification.success('Unidad', 'Unidad Creada con Éxito');
    }, (error) => {
      if (error.status === 401) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  delete(unidadId) {
    this.unidadElminada = unidadId;
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
    this.unitService.delete(this.unidadElminada).subscribe((data: any) => {
      this.units = data;
      this.notification.success('Unidad', 'La unidad fue eliminada con exito');
    }, (error) => {
      console.log(error);
      if (error.status === 401) {
        this.router.navigate(['/auth/login']);
      } else if (error.status === 400 || error.status === 500) {
        this.notification.error('Error al Eliminar la Unidad', error.error.message);
      }
    });
  }
  goToBlocks(unidadId) {
    this.router.navigateByUrl('system/pages/subjects/units/' + unidadId + '/blocks' );
  }

  goToAttitudes(unidadId) {
    this.router.navigateByUrl('system/pages/subjects/units/' + unidadId + '/attitudes' );
  }

  goToSkills(unidadId) {
    this.router.navigateByUrl('system/pages/subjects/units/' + unidadId + '/skills' );
  }

  goToSubjects() {
    this.router.navigateByUrl('system/pages/subject' );
  }
}
