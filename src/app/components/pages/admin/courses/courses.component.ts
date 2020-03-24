import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NzFormatEmitEvent, NzNotificationService } from 'ng-zorro-antd';
import {CoursesService} from '../../../../services/courses.service';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesAdminComponent implements OnInit {

  loading = false;
  panelOpenState = false;
  curso: {
    nivel_id: any,
    cantidad_secciones: any,
  };
  cursos = [
    {
      curso_id: '',
      nivel_id: '',
      establecimiento_id: '',
      seccion_id: '',
      seccion_nombre: ''
    }
  ];
  niveles = [
    {
      nivel_descripcion: '',
      nivel_id: '',
      cursos: this.cursos,
      curso_especifico: [],
      asignaturas: []
    }
  ];
  nivelesSCrear = [];
  asignaturas = [];
  establecimientoId;
  modalCrearCurso = false;
  cursoForm: FormGroup;

  constructor(
    private notification: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    public coursesService: CoursesService) {
    this.cursoForm = new FormGroup({
      nivel: new FormControl('', [Validators.required, Validators.minLength(1)]),
      numeroSecciones: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

  ngOnInit(): void {
    this.establecimientoId = localStorage.getItem('idEstablecimiento');
    this.obtenerNivelesEstablecimiento();
    this.obtenerNivelesSinCrear();
  }

  obtenerNivelesEstablecimiento() {
    this.coursesService.obtenerNivelesEstablecimiento(this.establecimientoId).subscribe( (data: any) => { // Success
      this.niveles = data;
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }

  obtenerNivelesSinCrear() {
    this.coursesService.obtenerNivelesSinCrear(this.establecimientoId).subscribe( (data: any) => { // Success
      this.nivelesSCrear = data;
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }



  saveCurso() {
    if (this.cursoForm.valid) {
      const data = {
        establecimiento_id: this.establecimientoId,
        cantidad_secciones: this.cursoForm.controls.numeroSecciones.value,
        nivel_id: this.cursoForm.controls.nivel.value,
      };
      this.closeModal('curso');
      this.notification.info('Curso', 'Estamos procesando su solicitud');
      this.coursesService.crearCursos(data).subscribe((response: any) => {
        console.log(response);
        this.niveles = response;
        this.notification.success('Curso Creado con Éxito', 'Se le ha enviado un correo al funcionario');
      }, (error) => {
        if (error.status === 401) {
          this.router.navigate(['/auth/login']);
        } else if (error.status === 400 || error.status === 500) {
          this.notification.error('Error al Agregar Usuario', error.error.Warning);
        }
      });
    } else {
       this.validarForma();
    }
  }

  openModal(modal) {
    this.modalCrearCurso = true;
  }

  closeModal(modal) {
    this.modalCrearCurso = false;
  }

  validarForma() {
    if (this.cursoForm.controls.nivel.status !== 'VALID') {
      if (this.cursoForm.controls.nivel.value == null) {
        this.notification.warning('Usuario', 'Por favor seleccione un nivel.');
      }
    } else if (this.cursoForm.controls.numeroSecciones.status !== 'VALID') {
      if (this.cursoForm.controls.numeroSecciones.value == null) {
        this.notification.warning('Curso', 'Por favor ingrese una la cantidad de secciones');
      }
    }
  }
}
