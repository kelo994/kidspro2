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

}
