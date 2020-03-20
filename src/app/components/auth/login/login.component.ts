import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formaLogin: FormGroup;
  loginIcon = 'login';
  loginError = false;
  errorMessage = "";

  formaCode: FormGroup;
  codeIcon = 'login';

  constructor(private authService: AuthService, private notification: NzNotificationService, private router: Router) {
    // let userEmail = 'pitagoras@yopmail.com';
    // let userEmail = 'jorge@yopmail.com';
    let userRut = '19.195.225-1';
    this.formaLogin = new FormGroup({
      'rut': new FormControl(userRut, [Validators.required, Validators.minLength(3)]),
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
    this.loginError = false;
    if (this.formaLogin.valid) {
      this.loginIcon = 'loading';
      this.authService.login(this.formaLogin.getRawValue())
        .subscribe(
          (data) => {
            console.log(data)
            if (data.establecimientos.length > 0) {
              // this.colegios = data.establecimientos;
              localStorage.setItem('perfil', JSON.stringify(data.user));
              localStorage.setItem('establecimientos', JSON.stringify(data.establecimientos));
              // this.toast.showToast('success', 'Bienvenido', 'Has Iniciado Sesión Satisfactoriamente');

              if (data.establecimientos.length == 1) {
                 this.openCollege(data.establecimientos[0]);
              } else {
              //   this.modalService.open(this.modalUser,
              //     {
              //       size: 'xl', backdropClass: 'light-blue-backdrop',
              //       windowClass: 'animated fadeInDown', centered: true, scrollable: true
              //     });
              //   this.load = false;
              }
            } else {
              this.notification.create(
                'warning',
                'Usuario sin Establecimiento',
                'Lo sentimos, su usuario no cuenta con ningun establecimiento asociado.'
              );
            }
            this.loginIcon = 'login';
          },
          (error) => {
            this.loginIcon = 'login';
            console.log(error)
            this.formaLogin.controls['password'].setValue('');
            if (error.status == 401 || error == 'Unauthorized') {
              this.errorMessage = 'Credenciales Inválidas';
            } else {
              this.errorMessage = 'Error de conexión, intentelo más tarde';
            }
          }
        )
    } else {
      // Lanzar error
    }
  }

  loginCode () {
    this.codeIcon = 'loading';
  }

  openCollege (establecimiento) {
    localStorage.setItem('nameEstablecimiento', establecimiento.establecimiento_nombre)
    this.authService.detalleInicial(establecimiento.id).subscribe(
      (data: any) => { // Success
        localStorage.setItem('roles', JSON.stringify(data.roles));
        localStorage.setItem('rolId', data.roles[0].rol_codigo);
        localStorage.setItem('idEstablecimiento', establecimiento.id);
        this.router.navigate(['/pages/cursos']);
      }, (error) => {
        console.log(error)
      }
    );
  }

  setUpperCase(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }

  goToRegister() { this.router.navigate(['/auth/register']); }

}
