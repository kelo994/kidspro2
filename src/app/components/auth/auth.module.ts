import { NgModule } from '@angular/core';

import { AUTH_ROUTES } from './auth.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { LoginGuardService } from '../../services/auth-guard/login-guard.service';

import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { ValidateComponent } from './validate/validate.component';
import { ResetPasswordComponent } from './reset-password/reset.component';
import { NewPasswordComponent } from './reset-password/new-password/newpassword.component';

@NgModule({
    imports: [
        AUTH_ROUTES,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
    ],
    declarations: [
        AuthComponent, LoginComponent, ValidateComponent, ResetPasswordComponent, NewPasswordComponent
    ],
    providers: [LoginGuardService],
    entryComponents: [ ]
})
export class AuthModule { }

