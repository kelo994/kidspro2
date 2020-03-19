import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ValidateComponent } from './validate/validate.component';
import { RegisterComponent } from './register/register.component';

const authroutes: Routes = [{
  path: 'auth',
  component: AuthComponent,
  children: [
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'register',
      component: RegisterComponent,
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
