import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';
import {CursoService} from '../../services/cursos.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  isCollapsed = false;
  isDrawer = false;
  drawerState = false;

  cursos;
  niveles;
  open = true;

  rolId = parseInt(localStorage.getItem('rolId'));

  admin = [
    { path: 'cursos', name: 'Cursos', icon: 'bank', nzIcon: true },
    { path: 'estudiantes', name: 'Estudiantes', icon: 'smile', nzIcon: true },
    { path: 'profesores', name: 'Profesores', icon: 'fa fa-graduation-cap' },
    { path: 'usuarios', name: 'Usuarios', icon: 'team', nzIcon: true }
  ]

  // Collapse one submenu
  openMap: { [name: string]: boolean } = {
    sub1: false,
    sub2: false,
    sub3: false,
  };

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.outerWidth <= 991) {
      this.isDrawer = true;
    } else {
      this.isDrawer = false;
    }
  }

  openHandler(value: string): void {
    if (value === 'sub1' ) {
      this.router.navigate(['/pages/curso', 0]);
    }
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }

  toggleDrawer(): void {
    this.drawerState = !this.drawerState;
  }
  constructor(public router: Router, public coursesService: CoursesService,  public cursoService: CursoService) { }

  ngOnInit(): void {
    this.onResize();
    this.getCursos();
    this.getNiveles();
  }

  getCursos() {
    this.coursesService.obtenerNivelesEstablecimiento(localStorage.getItem('idEstablecimiento')).subscribe((data: any) => { // Success
      this.cursos = data;
      // console.log(data);
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }

  getNiveles() {
    this.cursoService
        .obtenerNivelesFuncionarioEstablecimiento(localStorage.getItem('idEstablecimiento'), localStorage.getItem('idFuncionario'))
        .subscribe((data: any) => { // Success
      this.niveles = data;
      // console.log(data);
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }

  changeRoute(item) {

    localStorage.setItem('CursoName', item.nivel_descripcion);
    localStorage.setItem('secciones', JSON.stringify(item.cursos));
    localStorage.setItem('asignaturas', JSON.stringify(item.asignaturas));

    // console.log(item.asignaturas);

    this.router.navigate(['/pages/curso', item.nivel_id]);
  }

  gotoReportes(text) {
    this.router.navigate(['/pages/reportes/' + text]);
  }

  goToSimce () {
    this.router.navigate(['/pages/simce']);
  }

  adminRoute(route) {
    this.router.navigate(['/pages/administrar/' + route]);
  }

  newSystemChange (event) {
    console.log(event)
    this.rolId = event;
    this.router.navigate(['/pages/curso/0']);
  }

  openDrawer (): void {
    this.drawerState = true;
  }

  closeDrawer (): void {
    this.drawerState = false;
  }

}
