import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) { }

  isCollapsed = false;
  userName = localStorage.getItem('nombreCompleto');
  siglas;

  ngOnInit(): void {
    this.siglas = this.getFirstCharacter(this.userName)
  }

  collapseMenu() {
    $('#btnCollapse').click();
    this.isCollapsed = !this.isCollapsed;
  }

  getFirstCharacter (string) {
    let str = string.split(" ");
    return str[0].charAt(0) + str[1].charAt(0);
  }

  logout () {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

}
