import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';

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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.outerWidth <= 860) {
      setTimeout(() => {
        this.isCollapsed = true;
        $('#colCollapse').addClass('d-none');
      }, 200);
    } else {
      this.isCollapsed = false;
    }
  }

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
  constructor(public router: Router, public coursesService: CoursesService) { }

  ngOnInit(): void {
    this.getCursos();

    if (window.outerWidth <= 860) {
      setTimeout(() => {
        this.isCollapsed = true;
        $('#colCollapse').addClass('d-none');
      }, 200); 
    } else {
      this.isCollapsed = false;
    }
  }

  getCursos() {
    this.coursesService.obtenerNivelesEstablecimiento(localStorage.getItem('idEstablecimiento')).subscribe( (data: any) => { // Success
      this.cursos = data;
      console.log(data);
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }

  changeRoute(item) {
    localStorage.setItem('CursoName', item.nivel_descripcion);
    localStorage.setItem('secciones', JSON.stringify(item.cursos));
    localStorage.setItem('asignaturas', JSON.stringify(item.asignaturas));
    this.router.navigate(['/pages/curso', item.nivel_id]);
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
