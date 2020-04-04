import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-password',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.scss']
})
export class NewPasswordComponent implements OnInit {

  newPasswordForm;
  codeForm;
  credential;
  step = 1;
  token;

  constructor(
    private authService: AuthService,
    private notification: NzNotificationService,
    public activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.newPasswordForm = new FormGroup({
      'password1': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'password2': new FormControl('', [Validators.required, Validators.minLength(6)])
    })
    this.codeForm = new FormGroup({
      'codigo': new FormControl('', [Validators.required, Validators.minLength(5)])
    })
  }

  ngOnInit(): void {
    this.token = this.activateRoute.params.pipe(map(p => p.token));
    this.token = this.token.source._value.token;
    //this.validarCodigo()
  }

  validarCodigo () {
    //let code = this.codeForm.controls['codigo'].value;
    let code = this.token;
    this.authService.requestCodigo(code).subscribe((data: any) => {
      this.credential = data;
    }, (error) => {
      this.notification.error('Error', error.error);
    });
  }

  newPassword() {
    if (this.newPasswordForm.valid) {
      if (this.newPasswordForm.controls['password1'].value == this.newPasswordForm.controls['password2'].value) {
        let data = {
          contrasena: this.newPasswordForm.controls['password1'].value
        }
        this.authService.requestNewPass(this.token, data).subscribe((data: any) => {
          if (data) {
            this.step = 2;
          }
        }, (error) => {
          this.notification.error('Error', error.error);
        });
      } else {
        this.notification.error('Error', 'Las contraseñas no coinciden');
      }
    } else {
      this.notification.error('Error', 'La contraseña debe tener un mínimo de 6 caracteres');
    }
  }

}
