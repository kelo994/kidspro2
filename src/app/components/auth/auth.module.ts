import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidateComponent } from './validate/validate.component';
import { RegisterComponent } from './register/register.component';
import { AUTH_ROUTES } from './auth.routing.module';
import { CommonModule } from '@angular/common';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { LoginGuardService } from '../../services/auth-guard/login-guard.service';

@NgModule({
    imports: [
        AUTH_ROUTES,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
    ],
    declarations: [
        AuthComponent, LoginComponent, ValidateComponent, RegisterComponent
    ],
    providers: [LoginGuardService],
    entryComponents: [ ]
})
export class AuthModule { }

