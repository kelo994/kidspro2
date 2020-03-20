import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formaLogin: FormGroup;
  loginIcon = 'login';
  loginError = false;

  formaCode: FormGroup;
  codeIcon = 'login';

  constructor(private authService: AuthService, private router: Router) {
    // let userEmail = 'pitagoras@yopmail.com';
    // let userEmail = 'jorge@yopmail.com';
    let userRut = '19.195.225-1';
    this.formaLogin = new FormGroup({
      'user_rut': new FormControl(userRut, [Validators.required, Validators.minLength(3)]),
      'password': new FormControl('123456', [Validators.required, Validators.minLength(3)])
    })
    this.formaCode = new FormGroup({
      'code': new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
    })
  }

  ngOnInit(): void {
    if (localStorage.getItem('lastUser')) { this.formaLogin.controls.user_email.setValue(localStorage.getItem('lastUser')); }
  }

  login() {
    this.loginIcon = 'loading';
    this.loginError = false;
    /*
    if (this.formaLogin.valid) {
      this.loginIcon = 'loading';
      this.authService.login(this.formaLogin.getRawValue())
        .subscribe(
          (data) => {
            if (data.establecimientos.length > 0) {
              // this.colegios = data.establecimientos;
              localStorage.setItem('perfil', JSON.stringify(data.user));
              localStorage.setItem('establecimientos', JSON.stringify(data.establecimientos));
              // this.toast.showToast('success', 'Bienvenido', 'Has Iniciado Sesión Satisfactoriamente');

              // if (this.colegios.length == 1) {
              //   this.openCollege(this.colegios[0].id);
              // } else {
              //   this.modalService.open(this.modalUser,
              //     {
              //       size: 'xl', backdropClass: 'light-blue-backdrop',
              //       windowClass: 'animated fadeInDown', centered: true, scrollable: true
              //     });
              //   this.load = false;
              // }
            } else {
              //this.toast.showToast('warning', 'Usuario sin Establecimiento', 'Lo sentimos, su usuario no cuenta con ningun establecimiento asociado');
              // this.load = false;
            }

          },
          (error) => {
            this.loginIcon = '';
            console.log(error)
            this.formaLogin.controls['password'].setValue('');
            if (error.status == 401 || error == 'Unauthorized') {
              // this.toast.showToast('danger', 'Error en Acceso', 'Credenciales Inválidas');
            } else {
              // this.toast.showToast('danger', 'Error de Conexión', 'Ocurrió un error inesperado, intentelo más tarde');
            }
          }
        )
    }
    */
   this.router.navigate(['/pages']);
  }

  loginCode () {
    this.codeIcon = 'loading';
  }

  setUpperCase(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }

  goToRegister() { this.router.navigate(['/auth/register']); }

}
