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

  constructor(private authService: AuthService, private router: Router) {
    // let userEmail = 'pitagoras@yopmail.com';
    // let userEmail = 'jorge@yopmail.com';
    let userEmail = 'josecamposh95@gmail.com';
    this.formaLogin = new FormGroup({
      'password': new FormControl('123456', [Validators.required, Validators.minLength(3)]),
      'user_email': new FormControl(userEmail, [Validators.required, Validators.minLength(3)]),
    })
  }

  ngOnInit(): void {
    if (localStorage.getItem('lastUser')) { this.formaLogin.controls.user_email.setValue(localStorage.getItem('lastUser')); }
  }

  login() {
    /*
    if (this.formaLogin.valid) {
      this.authService.login(this.formaLogin.getRawValue())
        .subscribe(
          (userData: any) => {
            if (userData.user_account_type == 7) {
              this.router.navigate(['/pages/administrador']);
            } else {
              this.authService.getLicenses().subscribe(
                (licenseData: any) => {
                  if (licenseData.length > 0) userData.rol_system = 2;
                  else userData.rol_system = 1;
                  localStorage.setItem('lastUser', this.formaLogin.controls.user_email.value);
                  localStorage.setItem('user', JSON.stringify(userData));
                  this.router.navigate(['/pages']);
                },
                (error) => { console.log(error) }
              );
            }
          },
          (error) => {
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

  goToRegister() { this.router.navigate(['/auth/register']); }

}
