import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SubjectService} from '../../../../services/system/subject.service';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {MattersService} from '../../../../services/system/matters.service';
import {LevelService} from '../../../../services/system/level.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  loading = true;
  subjects: [
      {
        id: '',
        asignatura_descripcion: '',
        nivel_id: '',
        materia_id: '',
        asignatura_estado: '',
        nivel_descripcion: '',
        materia_descripcion: '',
      }
  ];
  modalAgregarAsignatura = false;
  modalEditarAsignatura = false;
  establishmentForm  = new FormGroup({
    nivel_id: new FormControl(''),
    materia_id: new FormControl(''),
    asignatura_estado: new FormControl('')
  });
  asignaturaElminada;
  levels;
  matters;
  subjectEditId;

  constructor(
      private subjectService: SubjectService,
      private mattersService: MattersService,
      private levelService: LevelService,
      private modalService: NzModalService,
      private notification: NzNotificationService,
      private router: Router,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getSubjects();
    this.getMatters();
    this.getLevels();
  }

  getSubjects() {
    this.subjectService.getSubjects().subscribe((data: any) => {
      this.subjects = data;
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

  getMatters() {
    this.mattersService.getmatters().subscribe((data: any) => {
      this.matters = data;
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

  getLevels() {
    this.levelService.getlevels().subscribe((data: any) => {
      this.levels = data;
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
    this.modalAgregarAsignatura = true;
  }

  handleCancelAgregar(): void {
    console.log('Button cancel clicked!');
    this.modalAgregarAsignatura = false;
  }

  showModalUpdate(data): void {
    console.log(data);
    this.subjectEditId = data.id;
    this.establishmentForm.controls.nivel_id.setValue(data.nivel_id);
    this.establishmentForm.controls.materia_id.setValue(data.materia_id);
    this.establishmentForm.controls.asignatura_estado.setValue(data.asignatura_estado);
    this.modalEditarAsignatura = true;
  }

  handleCancelUpdate(): void {
    console.log('Button cancel clicked!');
    this.modalEditarAsignatura = false;
  }

  createSubject() {
    const data = this.establishmentForm.value;
    this.subjectService.save(data).subscribe((response: any) => {
      this.subjects = response;
      this.modalAgregarAsignatura = false;
      this.notification.success('Asignatura', 'Asignatura Creado con Éxito');
    }, (error) => {
      if (error.status === 401) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  updateSubject() {
    console.log(this.establishmentForm.value);
    const data = this.establishmentForm.value;
    this.subjectService.update(this.subjectEditId , data).subscribe((response: any) => {
      this.subjects = response;
      this.modalEditarAsignatura = false;
      this.notification.success('Asignatura', 'Asignatura Actualizada con Éxito');
    }, (error) => {
      if (error.status === 401) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  delete(EstablecimientoId) {
    this.asignaturaElminada = EstablecimientoId;
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
    this.subjectService.delete(this.asignaturaElminada).subscribe((data: any) => {
      this.subjects = data;
      this.notification.success('Asignaturas', 'La asignatura fue eliminada con exito');
    }, (error) => {
      console.log(error);
      if (error.status === 401) {
        this.router.navigate(['/auth/login']);
      } else if (error.status === 400 || error.status === 500) {
        this.notification.error('Error al Eliminar la Asignatura', error.error.message);
      }
    });
  }
  goToUnit(asignaturaId) {
    localStorage.setItem('subjectId', asignaturaId);
    this.router.navigateByUrl('system/pages/subjects/' + asignaturaId + '/units' );
  }

  goToObjective(asignaturaId) {
    this.router.navigateByUrl('system/pages/subjects/' + asignaturaId + '/objectives' );
  }
  goToSkill(asignaturaId) {
    this.router.navigateByUrl('system/pages/subjects/' + asignaturaId + '/skills' );
  }

}
