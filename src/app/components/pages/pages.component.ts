import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  changeRoute(idx) {
    this.router.navigate(['/pages/asignaturas', idx]);
  }

}
