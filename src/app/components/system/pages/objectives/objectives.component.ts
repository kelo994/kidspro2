import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {ObjectiveService} from '../../../../services/system/Objective.service';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.scss']
})
export class ObjectivesComponent implements OnInit {
  loading = true;
  objectives: [
      {
        objetivo_id: '',
        objetivo_descripcion: '',
        objetivo_codigo: ''
      }
  ];
  modalAgregarObjetivo = false;
  objectiveForm  = new FormGroup({
    objetivo_codigo: new FormControl(''),
    objetivo_descripcion: new FormControl(''),
  });
  objetivoElminado;
  subjectId;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private objectiveService: ObjectiveService,
      private modalService: NzModalService,
      private notification: NzNotificationService,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      this.subjectId = params.subject;
    });
    this.getObjectivesPerSubject();
  }

  getObjectivesPerSubject() {
    this.objectiveService.getObjetivesPerSubject(this.subjectId).subscribe((data: any) => {
      this.objectives = data;
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
    this.modalAgregarObjetivo = true;
  }

  handleCancelAgregar(): void {
    this.modalAgregarObjetivo = false;
  }

  createUnit() {
    const data = this.objectiveForm.value;
    data.asignatura_id = this.subjectId;
    this.objectiveService.save(data).subscribe((response: any) => {
      this.objectives = response;
      this.modalAgregarObjetivo = false;
      this.notification.success('Objetivo', 'Objetivo Creado con Éxito');
    }, (error) => {
      if (error.status === 401) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  delete(objetivoId) {
    this.objetivoElminado = objetivoId;
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
    this.objectiveService.delete(this.objetivoElminado).subscribe((data: any) => {
      this.objectives = data;
      this.notification.success('Objetivos', 'El objetivo fue eliminado con exito');
    }, (error) => {
      console.log(error);
      if (error.status === 401) {
        this.router.navigate(['/auth/login']);
      } else if (error.status === 400 || error.status === 500) {
        this.notification.error('Error al Eliminar el Objetivo', error.error.message);
      }
    });
  }
  goToBlocks(unidadId) {
    this.router.navigateByUrl('system/pages/subjects/units/' + unidadId + '/blocks' );
  }
  goToSubjects() {
    this.router.navigateByUrl('system/pages/subject' );
  }
}
