import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SubjectService} from '../../../../services/system/subject.service';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

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
  asignaturaElminada;

  constructor(
      private subjectService: SubjectService,
      private modalService: NzModalService,
      private notification: NzNotificationService,
      private router: Router,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getSubjects();
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

  showModal(): void {
    this.modalAgregarAsignatura = true;
  }

  handleCancelAgregar(): void {
    console.log('Button cancel clicked!');
    this.modalAgregarAsignatura = false;
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
