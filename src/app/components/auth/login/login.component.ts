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

  formaLogin: FormGroup;
  loginIcon = 'login';

  formaCode: FormGroup;
  codeIcon = 'login';

  constructor (
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
      'code': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
    })
  }

  ngOnInit(): void {
    // if (localStorage.getItem('lastUser')) { this.formaLogin.controls.user_email.setValue(localStorage.getItem('lastUser')); }
  }

  login() {
    if (this.formaLogin.valid) {
        this.loginIcon = 'loading';
        this.authService.login(this.formaLogin.getRawValue()).subscribe( (data) => {
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
          } else {
            this.notification.error('Error de Conexión', 'Ocurrió un error inesperado, intentelo más tarde');
          }
        })
    } else {
      this.notification.error('RUT Invalido', '');
    }
  }

  loginCode () {
    this.codeIcon = 'loading';
  }

  openCollege (establecimiento) {
    localStorage.setItem('nameEstablecimiento', establecimiento.establecimiento_nombre)
    this.authService.detalleInicial(establecimiento.id).subscribe( (data: any) => { // Success
      localStorage.setItem('roles', JSON.stringify(data.roles));
      localStorage.setItem('rolId', data.roles[0].rol_codigo);
      localStorage.setItem('idEstablecimiento', establecimiento.id);
      this.router.navigate(['/pages/cursos']);
    }, (error) => {
      console.log(error)
    });
  }

  formateaRut () {
    let rutFormat = this.rutService.formateaRut(this.formaLogin.controls['rut'].value);
    this.formaLogin.controls['rut'].setValue(rutFormat);
  }

  setUpperCase(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }

  goToRegister() { this.router.navigate(['/auth/register']); }

}
