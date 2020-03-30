import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable()
export class LoginGuardService implements CanActivate {

  constructor(public router: Router) {}

  isLoggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true
    } else {
      return false;
    }
  }
  
  canActivate(): boolean {
    if (this.isLoggedIn()) {
      this.router.navigate(['pages/curso/0']);
      return false;
    }
    return true;
  }
}