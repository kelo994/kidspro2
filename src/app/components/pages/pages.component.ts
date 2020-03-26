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

  // Collapse one submenu
  openMap: { [name: string]: boolean } = {
    sub1: false,
    sub2: false,
    sub3: false,
    sub4: false
  };

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  constructor(public router: Router) { }

  ngOnInit(): void {
    this.cursos = JSON.parse(localStorage.getItem('cursos'));
  }

  changeRoute(item) {
    localStorage.setItem('CursoName', item.curso_nombre);
    this.router.navigate(['/pages/curso', item.curso_id]);
  }

  gotoReportes(text) {
    this.router.navigate(['/pages/reportes/' + text]);
  }

  goToSimce () {
    this.router.navigate(['//pages/simce']);
  }

  adminRoute(route) {
    this.router.navigate(['/pages/administrar/' + route]);
  }

}
