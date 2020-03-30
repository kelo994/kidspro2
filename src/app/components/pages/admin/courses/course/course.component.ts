import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import {CoursesService} from '../../../../../services/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  cursoId;
  asignaturaId;
  curso = {
    nivel_descripcion: '',
    seccion_nombre: '',
  };
  asignatura = {
    materia_descripcion: '',
  };
  establecimientoId;
  data = {
    estudiantesCurso: [
        {
          id: 1,
          persona_nombre: '',
          persona_apellido: '',
        }
    ],
    estudiantesColegioLibres: [],
  };
  profesores: [
    {
      tipo: '',
      persona_nombre: '',
      persona_apellido: '',
      persona_rut: '',
      funcionario_id: '',
    }
  ];
  profesoresEstablecimiento: [];
  tipoProfesores = [
    {id: 1, tipo: 'Titular'},
    {id: 2, tipo: 'Suplente con permiso de editado'},
    {id: 3, tipo: 'Suplente sin permiso de editado'},
  ];
  selectedValue = {id: 1, tipo: 'Titular'};
  current = 0;
  modalProfesor = false;
  funcionarioSeleccionado;
  tipoProfesorSeleccionado;
  nombreTipoProfesorSeleccionado;
  nombreFuncionarioSeleccionado;
  apellidoFuncionarioSeleccionado;
  loading = false;
  funcionarioElminado;

  constructor( private notification: NzNotificationService,
               private router: Router,
               private modalService: NzModalService,
               private route: ActivatedRoute,
               public coursesService: CoursesService) {
  }

  ngOnInit(): void {
    this.establecimientoId = localStorage.getItem('idEstablecimiento');
    this.route.params.subscribe(params => {
      this.cursoId = params.curso;
      this.asignaturaId = params.asignatura;
      console.log(history.state);
      this.obtenerCurso();
      this.obtenerAsignatura();
      this.estudiantesCursoEstudianteSCurso();
      this.obtenerProfesoresCursoAsignatura();
      this.obtenerProfesoresEstablecimiento();
    });

  }

  obtenerCurso() {
    this.coursesService.obtenerCurso(this.cursoId).subscribe( (data: any) => { // Success
      this.loading = true;
      this.curso = data;
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }

  obtenerAsignatura() {
    this.coursesService.obtenerAsignatura(this.asignaturaId).subscribe( (data: any) => { // Success
      this.asignatura = data;
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }

  estudiantesCursoEstudianteSCurso() {
    this.coursesService.estudiantesCursoEstudianteSCurso(this.cursoId, this.establecimientoId).subscribe( (data: any) => { // Success
      this.data = data;
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }

  obtenerProfesoresCursoAsignatura() {
    this.coursesService.obtenerProfesoresCursoAsignatura(this.asignaturaId, this.cursoId).subscribe( (data: any) => { // Success
      this.profesores = data;
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }

  obtenerProfesoresEstablecimiento() {
    this.coursesService.obtenerProfesoresEstablecimiento(this.establecimientoId).subscribe( (data: any) => { // Success
      this.profesoresEstablecimiento = data;
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }


  agregarProfesor() {
    const data = {
      curso_id: this.cursoId,
      establecimiento_id: this.establecimientoId,
      asignatura_id: this.asignaturaId,
      tipo_profesor_id: this.tipoProfesorSeleccionado,
      funcionario_id: this.funcionarioSeleccionado
    };
    this.coursesService.agregarFuncionarioCurso(data).subscribe((response: any) => {
      this.profesores = response.data;
      this.modalProfesor = false;
      this.funcionarioSeleccionado = '';
      this.tipoProfesorSeleccionado =  '';
      this.nombreTipoProfesorSeleccionado = '';
      this.nombreFuncionarioSeleccionado = '';
      this.apellidoFuncionarioSeleccionado = '';
      this.current = 0;
      this.notification.success('Profesor', 'Profesor agregado con exito');
    }, (error) => {
      if (error.status === 401) {
        this.router.navigate(['/auth/login']);
      } else if (error.status === 400 || error.status === 500) {
        this.notification.error('Error al agregar un Profesor', error.error.Warning);
      }
    });
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  done(): void {
    this.agregarProfesor();
  }
  openModalProfesor() {
    this.modalProfesor = true;
  }

  seleccionarProfesor(funcionarioId, nombreFuncionario, apellidoFuncionarioSeleccionado) {
    this.funcionarioSeleccionado = funcionarioId;
    this.nombreFuncionarioSeleccionado = nombreFuncionario;
    this.apellidoFuncionarioSeleccionado = apellidoFuncionarioSeleccionado;
    this.current += 1;
  }
  seleccionarTipoProfesor(value) {
    this.selectedValue = value;
    this.tipoProfesorSeleccionado = value.id;
    this.nombreTipoProfesorSeleccionado = value.tipo;
  }

  closeModalProfesor(): void {
    this.modalProfesor = false;
    this.funcionarioSeleccionado = '';
    this.tipoProfesorSeleccionado =  '';
    this.nombreTipoProfesorSeleccionado = '';
    this.nombreFuncionarioSeleccionado = '';
    this.apellidoFuncionarioSeleccionado = '';
  }

  delete(funcionarioId) {
    this.funcionarioElminado = funcionarioId;
    this.modalService.confirm({
      nzTitle: '<i>¿Estas seguro de realizar esta acción?</i>',
      nzContent: '<b>Esta acción no se puede deshacer</b>',
      nzCancelText: 'Cancelar',
      nzOkText: 'Eliminar',
      nzClassName: 'modal-confirm-delete',
      nzOnOk: () => this.confirmDelete()
    });
  }

  confirmDelete() {
    this.coursesService.deleteFuncionarioCurso(this.cursoId, this.funcionarioElminado, this.asignaturaId).subscribe((data: any) => {
      this.obtenerProfesoresCursoAsignatura();
      this.notification.success('Estudiantes', 'El estudiante fue eliminado con exito');
    }, (error) => {
      console.log(error);
      if (error.status === 401) {
        this.router.navigate(['/auth/login']);
      } else if (error.status === 400 || error.status === 500) {
        this.notification.error('Error al Eliminar el Estudiante', error.error.message);
      }
    });
  }

  backToCourses() {
    this.router.navigate(['/pages/administrar/cursos/']);
  }

}
