import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RutService } from 'src/app/services/forms/rut.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passwordVisible = false;

  formaLogin: FormGroup;
  loginIcon = 'login';

  formaCode: FormGroup;
  codeIcon = 'login';

  validCodeForm: FormGroup;

  validCode = false;
  estudiantes: any;
  studentToken: any;
  studentCode: any;

  constructor(
    private authService: AuthService,
    private rutService: RutService,
    private notification: NzNotificationService,
    private router: Router
  ) {
    // let userEmail = 'pitagoras@yopmail.com';
    // let userEmail = 'jorge@yopmail.com';
    let userRut = '19.195.225-1';
    this.formaLogin = new FormGroup({
      'rut': new FormControl(userRut, [Validators.required, Validators.minLength(3), this.rutService.validaRut]),
      'password': new FormControl('123456', [Validators.required, Validators.minLength(3)])
    })
    this.formaCode = new FormGroup({
      'codigo': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    })
    this.validCodeForm = new FormGroup({
      'rut': new FormControl('', [Validators.required, this.rutService.validaRut]),
    })
  }

  ngOnInit(): void {
    // if (localStorage.getItem('lastUser')) { this.formaLogin.controls.user_email.setValue(localStorage.getItem('lastUser')); }
  }

  login() {
    if (this.formaLogin.valid) {
      this.loginIcon = 'loading';
      this.authService.login(this.formaLogin.getRawValue()).subscribe((data) => {
        if (data.establecimientos.length > 0) {
          localStorage.setItem('perfil', JSON.stringify(data.user));
          localStorage.setItem('establecimientos', JSON.stringify(data.establecimientos));
          this.notification.create('success', 'Bienvenido', 'Has Iniciado Sesión Satisfactoriamente');

          if (data.establecimientos.length == 1) {
            this.openCollege(data.establecimientos[0]);
          } else {
            //MODAL
          }
        } else {
          this.notification.warning('Usuario sin Establecimiento', 'Lo sentimos, su usuario no cuenta con ningun establecimiento asociado.');
        }
        this.loginIcon = 'login';
      }, (error) => {
        this.loginIcon = 'login';
        this.formaLogin.controls['password'].setValue('');
        if (error.status == 401 || error == 'Unauthorized') {
          this.notification.error('Error en Acceso', 'Credenciales Inválidas');
        } else if (error.status == 403) {
          this.notification.error('Error en Acceso', error.error.error);
        } else {
          this.notification.error('Error de Conexión', 'Ocurrió un error inesperado, intentelo más tarde');
        }
      })
    } else {
      if (this.formaLogin.controls.password.status != 'VALID') {
        this.notification.error('La contraseña debe tener mínimo 3 caracteres', '');
      } else if (this.formaLogin.controls.rut.status != 'VALID') {
        this.notification.error('Por favor ingrese un rut válido', '');
      }
    }
  }

  openCollege(establecimiento) {
    localStorage.setItem('nameEstablecimiento', establecimiento.establecimiento_nombre)
    this.authService.detalleInicial(establecimiento.id).subscribe((data: any) => { // Success
      localStorage.setItem('roles', JSON.stringify(data.roles));
      localStorage.setItem('rolId', data.roles[0].rol_codigo);
      localStorage.setItem('cursos', JSON.stringify(data.data));
      localStorage.setItem('idEstablecimiento', establecimiento.id);
      this.router.navigate(['/pages/curso/0']);
    }, (error) => {
      console.log(error)
    });
  }

  loginCode() {
    this.codeIcon = 'loading';
    if (this.formaCode.valid) {
      this.authService.loginCode(this.formaCode.getRawValue()).subscribe((data) => {
        this.codeIcon = 'login';
        this.estudiantes = data.estudiantes;
        if (this.estudiantes.length > 0) {
          this.validCode = true
          this.studentToken = data.token;
          this.studentCode = data.codigo
        } else {
          this.notification.error('Error', 'El curso no tiene estudiantes');
        }
      }, (error) => {
        this.codeIcon = 'login';
        this.formaCode.controls['codigo'].setValue('');
        if (error.status == 401 || error == 'Unauthorized') {
          this.notification.error('Error en Acceso', 'Credenciales Inválidas');
        } else {
          this.notification.error('Error de Conexión', 'Ocurrió un error inesperado, intentelo más tarde');
        }
      })
    }
  }

  validateStudentRut() {
    if (this.validCodeForm.controls.rut.status != 'VALID') {
      this.notification.error('Por favor ingrese un rut válido', '');
    } else {
      let estudiante = this.estudiantes.find(estudiante => estudiante.persona_rut === this.validCodeForm.controls.rut.value);
      if (typeof estudiante === 'undefined') {
        if (this.studentCode.tipo_codigo_id == 1) {
          this.notification.error('Error', 'El RUT ingresado no pertenece a la lista de estudiantes del curso');
        } else {
          this.notification.error('Error', 'El RUT ingresado no está asociado a la evaluación');
        }
      } else {
        localStorage.setItem('idEstudiante', estudiante.id);
        let first_name = estudiante.persona_nombre.split(" ");
        let last_name = estudiante.persona_apellido.split(" ");
        localStorage.setItem('studentName', first_name[0] + ' ' + last_name[0]);
        localStorage.setItem('tokenStudent', this.studentToken);
        if (this.studentCode.tipo_codigo_id == 1) {
          this.router.navigate(['/student/pivot/' + this.studentCode.codigo_id]);
        } else {
          this.router.navigate(['/student/evaluation']);
        }
        this.notification.success('Bienvenido', 'Has Iniciado Sesión Satisfactoriamente');
      }
    }


  }

  openLeccion(idEstudiante, type) {
    localStorage.setItem('idEstudiante', idEstudiante);
    this.estudiantes.forEach(element => {
      if (element.id === idEstudiante) {
        localStorage.setItem('alumnoFast', element.persona_nombre + ' ' + element.persona_apellido);
        localStorage.setItem('tokenStudent', this.studentToken);
        this.notification.success('Inicio de Sesión Exitoso', '');
        if (type === 'Leccion') {
          this.router.navigate(['/student/pivot']);
        }
        if (type === 'Evaluacion') {
          this.router.navigate(['/student/evaluation']);
        }
      }
    });
  }

  formateaRut(index) {
    if (index === 1) {
      let rutFormat = this.rutService.formateaRut(this.formaLogin.controls['rut'].value);
      this.formaLogin.controls['rut'].setValue(rutFormat);
    }
    if (index === 2) {
      let rutFormat = this.rutService.formateaRut(this.validCodeForm.controls['rut'].value);
      this.validCodeForm.controls['rut'].setValue(rutFormat);
    }

  }

  setUpperCase(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }

  goToRegister() { this.router.navigate(['/auth/register']); }

}
