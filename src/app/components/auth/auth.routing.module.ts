import { RouterModule, Routes } from '@angular/router';

import { LoginGuardService as LoginGuard } from '../../services/auth-guard/login-guard.service';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ValidateComponent } from './validate/validate.component';
import { ResetPasswordComponent } from './reset-password/reset.component';
import { NewPasswordComponent } from './reset-password/new-password/newpassword.component';

const authroutes: Routes = [{
  path: 'auth',
  component: AuthComponent,
  canActivate: [LoginGuard],
  children: [
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'reset/password',
      component: ResetPasswordComponent,
    },
    {
      path: 'reset/password/:token',
      component: NewPasswordComponent,
    },
    {
      path: 'activate-account/:token',
      component: ValidateComponent
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' },
  ],
}];

export const AUTH_ROUTES = RouterModule.forChild( authroutes );
