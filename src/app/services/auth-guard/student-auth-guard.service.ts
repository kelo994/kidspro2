import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable()
export class StudentAuthGuardService implements CanActivate {

  constructor(public router: Router) {}
  
  public isLoggedIn(): boolean {
    if (localStorage.getItem('tokenStudent')) {
      return true
    } else {
      return false;
    }
  }

  canActivate(): boolean {
    if (!this.isLoggedIn()) {
      this.router.navigate(['auth/login']);
      return false;
    }
    return true;
  }

}