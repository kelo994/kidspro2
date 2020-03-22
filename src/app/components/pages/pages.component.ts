import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  isCollapsed = false;

  cursos;

  admin = [
    { path: 'cursos', name: 'Cursos', icon: 'bank', nzIcon: true },
    { path: 'estudiantes', name: 'Estudiantes', icon :'smile', nzIcon: true },
    { path: 'profesores', name: 'Profesores', icon: 'fa fa-graduation-cap' },
    { path: 'usuarios', name: 'Usuarios', icon: 'team', nzIcon: true }
  ]

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  constructor(public router: Router) { }

  ngOnInit(): void {
    this.cursos = JSON.parse(localStorage.getItem('cursos'));
  }

  changeRoute(idx) {
    this.router.navigate(['/pages/curso', idx]);
  }

  adminRoute(route) {
    this.router.navigate(['/pages/administrar/' + route]);
  }

}
