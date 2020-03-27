import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent implements OnInit {

  activeAccountForm;
  token;

  constructor(
    private authService: AuthService,
    private notification: NzNotificationService,
    public activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activeAccountForm = new FormGroup({
      'password1': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'password2': new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnInit(): void {

    this.token = this.activateRoute.params.pipe(map(p => p.token));
    this.token = this.token.source._value.token;
  }

  verifiedAccount() {
    if (this.activeAccountForm.valid) {
      this.authService.activeAccount(this.activeAccountForm.getRawValue(), this.token).subscribe(data => {
        this.notification.success('Cuenta Activada', data);
        this.router.navigate(['/auth/login']);
      }, (error) => {
        this.activeAccountForm.controls['password1'].setValue('');
        this.activeAccountForm.controls['password2'].setValue('');
        if (error.status == 401 || error == 'Unauthorized') {
          this.notification.error('Error en Acceso', 'Credenciales Inválidas');
        } else {
          this.notification.error('Error de Conexión', 'Ocurrió un error inesperado, intentelo más tarde');
        }
      })
    } else {
      this.notification.error('Error', 'La contraseña debe tener un mínimo de 6 caracteres');
    }
  }

}
