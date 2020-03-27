
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable()
export class AdminGuardService implements CanActivate {

  constructor(public router: Router) {}

  isAdmin (): boolean {
    if (parseInt(localStorage.getItem('rolId')) === 2) {
      return true
    } else {
      return false;
    }
  }
  
  canActivate(): boolean {
    if (!this.isAdmin()) {
      this.router.navigate(['auth/login']);
      localStorage.clear();
      return false;
    }
    return true;
  }
}
  