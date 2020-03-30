import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { GeneroService } from 'src/app/services/genero.service';
import { RutService } from 'src/app/services/forms/rut.service';
import { EmailService } from 'src/app/services/forms/email.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-admin-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersAdminComponent implements OnInit {

  loading = true;
  idEstablecimiento = localStorage.getItem('idEstablecimiento');

  teachers = [];
  teachersData = [];
  roles = [];
  generos = [];

  userModal = false;
  userForm: FormGroup;
  userId;

  inputSearch = "";

  constructor(
    private userService: FuncionarioService,
    private generoService: GeneroService,
    private rutService: RutService,
    private emailService: EmailService,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private router: Router) {
    this.userForm = new FormGroup({
      'rut': new FormControl('', [Validators.required, Validators.minLength(3), this.rutService.validaRut]),
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'apellido': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'telefono': new FormControl(''),
      'email': new FormControl('', [Validators.required, Validators.minLength(3), this.emailService.validarEmail]),
      'direccion': new FormControl(''),
      'nacionalidad': new FormControl(''),
      'genero': new FormControl('', [Validators.required, Validators.minLength(1)])
    })
  }

  ngOnInit(): void {
    this.getTeachers()
    this.getGeneros()
  }

  getTeachers() {
    this.userService.getProfesoresEstablecimiento(this.idEstablecimiento).subscribe((data: any) => {
      this.teachers = data
      this.teachersData = data
      this.loading = false
    }, (error) => {
      if (error.status == 401) {
        this.router.navigate(['/auth/login']);
      } else if (error.status == 422) {
        //this.toast.showToast('danger', 'Error en Formulario', 'Por favor revise que sus datos esten bien ingresados');
      }
    });
  }

  getGeneros() {
    this.generoService.query().subscribe((data: any) => {
      this.generos = data.generos
    }, (error) => {
      if (error.status == 401) {
        this.router.navigate(['/auth/login']);
      } else if (error.status == 400) {
        this.router.navigate(['/auth/login']);
        this.notification.error('Error Inesperado', 'Por favor vuelve a iniciar Sesión');
      }
    });
  }

  saveUser() {
    if (this.userForm.valid) {
      let data = {
        establecimiento_id: localStorage.getItem('idEstablecimiento'),
        persona_rut: this.userForm.controls.rut.value,
        persona_nombre: this.userForm.controls.nombre.value,
        persona_apellido: this.userForm.controls.apellido.value,
        persona_email: this.userForm.controls.email.value,
        persona_telefono: this.userForm.controls.telefono.value,
        persona_nacionalidad: this.userForm.controls.nacionalidad.value,
        genero_id: this.userForm.controls.genero.value,
        persona_direccion: this.userForm.controls.direccion.value
      }
      this.closeModal()
      this.notification.info('Editar Profesor', 'Estamos procesando su solicitud')
      this.userService.updateProfesor(this.userId, data).subscribe((data: any) => {
        this.teachersData = data
        this.search()
        this.notification.success('Profesor Editado con Éxito', '');
      }, (error) => {
        if (error.status == 401) {
          this.router.navigate(['/auth/login']);
        } else if (error.status == 400 || error.status == 500) {
          this.notification.error('Error al Editar Profesor', error.error.Warning);
          this.userForm.patchValue({ rut: '' });
        } else if (error.status == 403) {
          this.notification.error('Error al Editar Profesor', error.error.Error);
        }
      })
    } else {
      this.validarForma();
    }
  }

  search() {
    if (this.inputSearch.length > 0) {
      this.teachers = this.teachersData.filter(e => {
        const term = this.inputSearch.toLowerCase();
        return e.persona_nombre.toLowerCase().includes(term)
          || e.persona_apellido.toString().includes(term)
          || e.persona_email.toString().includes(term)
          || e.persona_rut.toString().includes(term);
      });
    } else {
      this.teachers = this.teachersData
    }
  }

  delete(userId) {
    //this.userId = userId
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
    this.userService.delete(this.userId).subscribe((data: any) => {
      //this.usersData = data
      this.search()
      this.notification.success('Profesores', 'El Profesor fue eliminado con exito');
    }, (error) => {
      console.log(error);
      if (error.status == 401) {
        this.router.navigate(['/auth/login']);
      } else if (error.status == 400 || error.status == 500) {
        this.notification.error('Error al Eliminar el Profesor', error.error.message);
      }
    });
  }

  openModal() {
    this.userModal = true
  }

  closeModal() {
    this.userModal = false
  }

  validarForma() {
    if (this.userForm.controls.rut.status != 'VALID') {
      if (this.userForm.controls.rut.value == null) {
        this.notification.warning('Profesor', 'Por favor ingrese rut del nuevo Profesor');
      } else if (this.userForm.controls.rut.errors.validaRut) {
        this.notification.warning('Profesor', 'Por favor ingrese un rut válido');
      }
    } else if (this.userForm.controls.nombre.status != 'VALID') {
      if (this.userForm.controls.nombre.value == null) {
        this.notification.warning('Profesor', 'Por favor ingrese nombre del nuevo Profesor');
      } else if (this.userForm.controls.nombre.value.length < 3) {
        this.notification.warning('Profesor', 'Por favor ingrese un nombre válido, de mínimo 3 carácteres');
      }
    } else if (this.userForm.controls.apellido.status != 'VALID') {
      if (this.userForm.controls.apellido.value == null) {
        this.notification.warning('Profesor', 'Por favor ingrese apellido del nuevo Profesor');
      } else if (this.userForm.controls.apellido.value.length < 3) {
        this.notification.warning('Profesor', 'Por favor ingrese un apellido válido, de mínimo 3 carácteres');
      }
    } else if (this.userForm.controls.email.status != 'VALID') {
      if (this.userForm.controls.email.value == null) {
        this.notification.warning('Profesor', 'Por favor ingrese email del nuevo Profesor');
      } else if (!this.userForm.controls.email.errors.validarEmail) {
        this.notification.warning('Profesor', 'Por favor ingrese un email válido');
      }
    } else if (this.userForm.controls.genero.status != 'VALID') {
      if (this.userForm.controls.genero.value == null) {
        this.notification.warning('Profesor', 'Por favor seleccione genero del Profesor');
      }
    } else if (this.userForm.controls.roles.status != 'VALID') {
      if (this.userForm.controls.roles.value == null) {
        this.notification.warning('Profesor', 'Por favor seleccione al menos un rol para el Profesor');
      }
    }
  }

  formateaRut() {
    let rutFormat = this.rutService.formateaRut(this.userForm.controls['rut'].value);
    this.userForm.controls['rut'].setValue(rutFormat);
  }

  setUser(user) {
    console.log(user)
    this.userForm.controls['rut'].setValue(user.persona_rut)
    this.userForm.controls['nombre'].setValue(user.persona_nombre)
    this.userForm.controls['apellido'].setValue(user.persona_apellido)
    this.userForm.controls['email'].setValue(user.persona_email)
    this.userForm.controls['telefono'].setValue(user.persona_telefono)
    this.userForm.controls['direccion'].setValue(user.persona_direccion)
    this.userForm.controls['genero'].setValue(user.genero_id)
    this.userForm.controls['nacionalidad'].setValue(user.persona_nacionalidad)
    this.userId = user.persona_id
    this.openModal()
  }

  clearForm() {
    this.userForm.controls['rut'].setValue('')
    this.userForm.controls['nombre'].setValue('')
    this.userForm.controls['apellido'].setValue('')
    this.userForm.controls['email'].setValue('')
    this.userForm.controls['telefono'].setValue('')
    this.userForm.controls['direccion'].setValue('')
    this.userForm.controls['nacionalidad'].setValue('')
    this.userForm.controls['genero'].setValue(null)
    this.userForm.reset()
  }
}
