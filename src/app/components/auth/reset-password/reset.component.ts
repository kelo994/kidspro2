import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RutService } from 'src/app/services/forms/rut.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private rutService: RutService,
    private notification: NzNotificationService,
    private router: Router
  ) {
    this.resetPasswordForm = new FormGroup({
      'rut': new FormControl('', [Validators.required, Validators.minLength(3), this.rutService.validaRut])
    })
  }

  resetPasswordForm: FormGroup;
  step = 1;

  ngOnInit(): void {
  }

  goToLogin() { this.router.navigate(['/auth/login']); }

  formateaRut() {
    let rutFormat = this.rutService.formateaRut(this.resetPasswordForm.controls['rut'].value);
    this.resetPasswordForm.controls['rut'].setValue(rutFormat);
  }

  resetPassword() {
    let rut = this.resetPasswordForm.controls['rut'].value;
    this.authService.requestPass(rut).subscribe((data: any) => {
      this.step = 2;
    }, (error) => {
      this.notification.error('Error', error.error);
    });
  }

}
