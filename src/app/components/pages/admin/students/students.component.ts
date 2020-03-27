import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { CoursesService } from '../../../../services/courses.service';
import { MultimediaService } from '../../../../services/multimedia.service';
import { GeneroService } from 'src/app/services/genero.service';
import { RutService } from 'src/app/services/forms/rut.service';
import { EmailService } from 'src/app/services/forms/email.service';

@Component({
  selector: 'app-admin-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsAdminComponent implements OnInit {

  loading = false;
  establecimientoId;
  cursos: [
    {
      seccion_nombre: '',
      nivel_descripcion: '',
      curso_id: '',
    }
  ];
  cursoSeleccionado: {
    seccion_nombre: '',
    nivel_descripcion: '',
    curso_id: '',
  };
  estudiantesCurso = [];
  step = 0;
  estudianteForm: FormGroup;
  generos: [
    {
      descripcion: '',
      id: '',
    }
  ];
  estudianteElminado;
  files: any = [];
  fileItem: File = null;

  constructor(
    private multimedia: MultimediaService,
    private notification: NzNotificationService,
    private router: Router,
    private generoService: GeneroService,
    private rutService: RutService,
    private modalService: NzModalService,
    public coursesService: CoursesService) {
    this.estudianteForm = new FormGroup({
      rut: new FormControl('', [Validators.required, Validators.minLength(3), this.rutService.validaRut]),
      matricula: new FormControl('', [Validators.required, Validators.minLength(3)]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
      telefono: new FormControl(''),
      direccion: new FormControl(''),
      nacionalidad: new FormControl(''),
      genero: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

  ngOnInit(): void {
    this.establecimientoId = localStorage.getItem('idEstablecimiento');
    this.obtenerCursosEstablecimiento();
    this.getGeneros();
  }


  obtenerCursosEstablecimiento() {
    this.coursesService.obtenerCursosEstablecimiento(this.establecimientoId).subscribe((data: any) => { // Success
      this.cursos = data;
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }

  estudiantesCursoEstudianteSCurso(cursoId) {
    this.coursesService.estudiantesCursoEstudianteSCurso(cursoId, this.establecimientoId).subscribe((data: any) => { // Success
      this.estudiantesCurso = data.estudiantesCurso;
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }

  getGeneros() {
    this.generoService.query().subscribe((data: any) => {
      this.generos = data.generos;
    }, (error) => {
      if (error.status === 401) {
        this.router.navigate(['/auth/login']);
      } else if (error.status === 400) {
        this.router.navigate(['/auth/login']);
        this.notification.error('Error Inesperado', 'Por favor vuelve a iniciar Sesión');
      }
    });
  }

  confirmDelete() {
    this.coursesService.deleteEstudiante(this.cursoSeleccionado.curso_id, this.estudianteElminado).subscribe((data: any) => {
      this.estudiantesCurso = data;
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

  guardarEstudiante() {
    if (this.estudianteForm.valid) {
      const data = {
        establecimiento_id: this.establecimientoId,
        curso_id: this.cursoSeleccionado.curso_id,
        matricula: this.estudianteForm.controls.matricula.value,
        persona_rut: this.estudianteForm.controls.rut.value,
        persona_nombre: this.estudianteForm.controls.nombre.value,
        persona_apellido: this.estudianteForm.controls.apellido.value,
        persona_telefono: this.estudianteForm.controls.telefono.value,
        persona_nacionalidad: this.estudianteForm.controls.nacionalidad.value,
        persona_genero_id: this.estudianteForm.controls.genero.value,
        persona_direccion: this.estudianteForm.controls.direccion.value,
      };
      this.notification.info('Agregar Usuario', 'Estamos procesando su solicitud');
      this.coursesService.crearEstudiante(data).subscribe((response: any) => {
        this.estudiantesCurso = response;
        this.step = 1;
        this.notification.success('Estudiante Creado con Éxito', '');
        this.clearForm();
      }, (error) => {
        if (error.status === 401) {
          this.router.navigate(['/auth/login']);
        } else if (error.status === 400 || error.status === 500) {
          this.notification.error('Error al Agregar Estudiante', error.error.Warning);
          this.estudianteForm.patchValue({ rut: '' });
        } else if (error.status === 422) {
          console.log(error);
          if (error.error.errors.persona_rut) {
            this.notification.error('Error al Agregar Estudiante', error.error.errors.persona_rut[0]);
          }
        }
      });
    } else {
      this.validarForma();
    }
  }

  selectCurso(curso) {
    this.cursoSeleccionado = curso;
    this.estudiantesCursoEstudianteSCurso(curso.curso_id);
    this.step = 1;
  }

  changeStep(step) {
    this.step = step;
  }


  formateaRut() {
    const rutFormat = this.rutService.formateaRut(this.estudianteForm.controls.rut.value);
    this.estudianteForm.controls.rut.setValue(rutFormat);
  }

  clearForm() {
    this.estudianteForm.controls.rut.setValue('');
    this.estudianteForm.controls.matricula.setValue('');
    this.estudianteForm.controls.nombre.setValue('');
    this.estudianteForm.controls.apellido.setValue('');
    this.estudianteForm.controls.telefono.setValue('');
    this.estudianteForm.controls.direccion.setValue('');
    this.estudianteForm.controls.nacionalidad.setValue('');
    this.estudianteForm.controls.genero.setValue(null);
    this.estudianteForm.reset();
  }
  validarForma() {
    if (this.estudianteForm.controls.rut.status !== 'VALID') {
      if (this.estudianteForm.controls.rut.value == null) {
        this.notification.warning('Usuario', 'Por favor ingrese rut del nuevo funcionario.');
      } else if (this.estudianteForm.controls.rut.errors.validaRut) {
        this.notification.warning('Usuario', 'Por favor ingrese un rut válido.');
      }
    } else if (this.estudianteForm.controls.nombre.status !== 'VALID') {
      if (this.estudianteForm.controls.nombre.value == null) {
        this.notification.warning('Usuario', 'Por favor ingrese nombre del nuevo funcionario.');
      } else if (this.estudianteForm.controls.nombre.value.length < 3) {
        this.notification.warning('Usuario', 'Por favor ingrese un nombre válido, de mínimo 3 carácteres');
      }
    } else if (this.estudianteForm.controls.apellido.status !== 'VALID') {
      if (this.estudianteForm.controls.apellido.value == null) {
        this.notification.warning('Usuario', 'Por favor ingrese apellido del nuevo funcionario.');
      } else if (this.estudianteForm.controls.apellido.value.length < 3) {
        this.notification.warning('Usuario', 'Por favor ingrese un apellido válido, de mínimo 3 carácteres');
      }
    } else if (this.estudianteForm.controls.genero.status !== 'VALID') {
      if (this.estudianteForm.controls.genero.value == null) {
        this.notification.warning('Usuario', 'Por favor seleccione genero del funcionario');
      }
    }
  }

  delete(estudianteId) {
    this.estudianteElminado = estudianteId;
    this.modalService.confirm({
      nzTitle: '<i>¿Estas seguro de realizar esta acción?</i>',
      nzContent: '<b>Esta acción no se puede deshacer</b>',
      nzCancelText: 'Cancelar',
      nzOkText: 'Eliminar',
      nzClassName: 'modal-confirm-delete',
      nzOnOk: () => this.confirmDelete()
    });
  }

  uploadFile(event) {
    if (this.files.length == 0) {
      this.files.push(event.target.files[0].name)
    } else {
      this.deleteAttachment(0);
      this.files.push(event.target.files[0].name)
    }
    this.fileItem = event.target.files[0];
  }

  deleteAttachment(index) {
    this.files.splice(index, 1)
  }

  saveFile() {
    if (this.cursoSeleccionado.curso_id != '') {
      this.step = 1;
      this.notification.info('Importar Estudiantes', 'Estamos procesando su solicitud')
      var formData = new FormData();
      formData.append('select_file', this.fileItem);
      formData.append('establecimiento_id', this.establecimientoId);
      this.deleteAttachment(0);
      this.multimedia.importEstudiantesACurso(formData, this.cursoSeleccionado.curso_id).subscribe((data: any) => {
        this.estudiantesCurso = data.curso
        this.notification.success('Estudiantes Importados con Éxito', '');
      }, (error) => {
        if (error.status == 401) {
          this.router.navigate(['/auth/login']);
        } else if (error.status == 400) {
          this.notification.error('Error Inesperado', 'Por favor vuelva a intentarlo mas tarde');
        } else if (error.status == 422) {
          this.notification.error('Archivo Inválido', 'El archivo no corresponde con el formato solicitado');
        }
      });
    } else {
      this.notification.error('Error', 'Debe seleccionar un Curso');
    }

  }

}
