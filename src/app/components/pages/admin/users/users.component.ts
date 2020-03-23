import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormatEmitEvent, NzNotificationService } from 'ng-zorro-antd';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { RolService } from 'src/app/services/rol.service';
import { GeneroService } from 'src/app/services/genero.service';
import { RutService } from 'src/app/services/forms/rut.service';
import { EmailService } from 'src/app/services/forms/email.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersAdminComponent implements OnInit {

  loading = true;
  idEstablecimiento = localStorage.getItem('idEstablecimiento');

  users = [];
  usersData = [];
  roles = [];
  generos = [];

  formType = 'Agregar';
  userModal = false;
  userForm: FormGroup;
  userId;

  inputSearch = "";

  constructor(
    private userService: FuncionarioService,
    private rolService: RolService,
    private generoService: GeneroService,
    private rutService: RutService,
    private emailService: EmailService,
    private notification: NzNotificationService,
    private router: Router
  ) {
    this.userForm = new FormGroup({
      'rut': new FormControl('', [Validators.required, Validators.minLength(3), this.rutService.validaRut]),
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'apellido': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'telefono': new FormControl(''),
      'email': new FormControl('', [Validators.required, Validators.minLength(3), this.emailService.validarEmail]),
      'direccion': new FormControl(''),
      'nacionalidad': new FormControl(''),
      'genero': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'roles': new FormControl([], [Validators.required, Validators.minLength(1)])
    })
  }

  ngOnInit(): void {
    this.getUsers()
    this.getGeneros()
    this.getRoles()
  }

  getUsers() {
    this.userService.getFuncionariosEstablecimiento(this.idEstablecimiento).subscribe((data: any) => {
      this.users = data
      this.usersData = data
      this.loading = false
    }, (error) => {
      if (error.status == 401) {
        this.router.navigate(['/auth/login']);
      } else if (error.status == 400) {
        this.router.navigate(['/auth/login']);
        this.notification.error('Error Inesperado', 'Por favor vuelve a iniciar Sesión');
      }
    });
  }

  getRoles() {
    this.rolService.query().subscribe((data: any) => {
      this.roles = data
    }, (error) => {
      if (error.status == 401) {
        this.router.navigate(['/auth/login']);
      } else if (error.status == 400) {
        this.router.navigate(['/auth/login']);
        this.notification.error('Error Inesperado', 'Por favor vuelve a iniciar Sesión');
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
        persona_genero_id: this.userForm.controls.genero.value,
        persona_direccion: this.userForm.controls.direccion.value,
        roles: this.userForm.controls.roles.value
      }
      this.closeModal('user')
      if (this.formType === 'Agregar') {
        this.notification.info('Agregar Usuario', 'Estamos procesando su solicitud')
        this.userService.save(data).subscribe((response: any) => {
          this.users = response
          this.usersData = response
          this.notification.success('Usuario Creado con Éxito', 'Se le ha enviado un correo al funcionario');
        }, (error) => {
          if (error.status == 401) {
            this.router.navigate(['/auth/login']);
          } else if (error.status == 400 || error.status == 500) {
            this.notification.error('Error al Agregar Usuario', error.error.Warning);
            this.userForm.patchValue({ rut: '' });
          } else if (error.status == 422) {
            console.log(error)
            if (error.error.errors.persona_rut) {
              this.notification.error('Error al Agregar Usuario', error.error.errors.persona_rut[0]);
            }
          }
        });
      } else if (this.formType === 'Editar') {
        this.notification.info('Editar Usuario', 'Estamos procesando su solicitud')
        this.userService.update(this.userId, data).subscribe((data: any) => {
          this.usersData = data
          this.search()
          this.notification.success('Funcionario Editado con Éxito', '');
        }, (error) => {
          if (error.status == 401) {
            this.router.navigate(['/auth/login']);
          } else if (error.status == 400 || error.status == 500) {
            this.notification.error('Error al Editar Funcionario', error.error.Warning);
            this.userForm.patchValue({ rut: '' });
          } else if (error.status == 403) {
            this.notification.error('Error al Editar Funcionario', error.error.Error);
          }
        })
      }
    } else {
      this.validarForma();
    }
  }

  search() {
    if (this.inputSearch.length > 0) {
      this.users = this.usersData.filter(e => {
        const term = this.inputSearch.toLowerCase();
        return e.persona_nombre.toLowerCase().includes(term)
          || e.persona_apellido.toString().includes(term)
          || e.persona_rut.toString().includes(term)
          || e.persona_email.toString().includes(term);
      });
    } else {
      this.users = this.usersData
    }
  }

  openModal(modal) {
    if (modal === 'create') {
      this.userModal = true
      this.formType = 'Agregar'
    }
    if (modal === 'edit') {
      this.userModal = true
      this.formType = 'Editar'
    }
  }

  closeModal(modal) {
    if (modal === 'user') {
      this.userModal = false
    }
  }

  validarForma() {
    if (this.userForm.controls.rut.status != 'VALID') {
      if (this.userForm.controls.rut.value == null) {
        this.notification.warning('Usuario', 'Por favor ingrese rut del nuevo funcionario.');
      } else if (this.userForm.controls.rut.errors.validaRut) {
        this.notification.warning('Usuario', 'Por favor ingrese un rut válido.');
      }
    } else if (this.userForm.controls.nombre.status != 'VALID') {
      if (this.userForm.controls.nombre.value == null) {
        this.notification.warning('Usuario', 'Por favor ingrese nombre del nuevo funcionario.');
      } else if (this.userForm.controls.nombre.value.length < 3) {
        this.notification.warning('Usuario', 'Por favor ingrese un nombre válido, de mínimo 3 carácteres');
      }
    } else if (this.userForm.controls.apellido.status != 'VALID') {
      if (this.userForm.controls.apellido.value == null) {
        this.notification.warning('Usuario', 'Por favor ingrese apellido del nuevo funcionario.');
      } else if (this.userForm.controls.apellido.value.length < 3) {
        this.notification.warning('Usuario', 'Por favor ingrese un apellido válido, de mínimo 3 carácteres');
      }
    } else if (this.userForm.controls.email.status != 'VALID') {
      if (this.userForm.controls.email.value == null) {
        this.notification.warning('Usuario', 'Por favor ingrese email del nuevo funcionario.');
      } else if (!this.userForm.controls.email.errors.validarEmail) {
        this.notification.warning('Usuario', 'Por favor ingrese un email válido');
      }
    } else if (this.userForm.controls.genero.status != 'VALID') {
      if (this.userForm.controls.genero.value == null) {
        this.notification.warning('Usuario', 'Por favor seleccione genero del funcionario');
      }
    } else if (this.userForm.controls.roles.status != 'VALID') {
      if (this.userForm.controls.roles.value == null) {
        this.notification.warning('Usuario', 'Por favor seleccione al menos un rol para el funcionario');
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
    let roles = user.roles.map(rol => {
      return rol.id
    })
    this.userForm.controls['roles'].setValue(roles)
    this.userId = user.funcionario_id
    this.openModal('edit')
  }

  clearForm() {
    this.userForm.controls['rut'].setValue('')
    this.userForm.controls['nombre'].setValue('')
    this.userForm.controls['apellido'].setValue('')
    this.userForm.controls['email'].setValue('')
    this.userForm.controls['telefono'].setValue('')
    this.userForm.controls['direccion'].setValue('')
    this.userForm.controls['nacionalidad'].setValue('')
    this.userForm.controls['genero'].setValue('')
    this.userForm.controls['roles'].setValue([])
    this.userForm.reset()
  }



}
