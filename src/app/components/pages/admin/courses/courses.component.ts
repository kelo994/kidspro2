import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzFormatEmitEvent, NzNotificationService } from 'ng-zorro-antd';
import {CoursesService} from '../../../../services/courses.service';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesAdminComponent implements OnInit {

  loading = false;
  panelOpenState = false;
  cursos = [
    {
      curso_id: '',
      nivel_id: '',
      establecimiento_id: '',
      seccion_id: '',
      seccion_nombre: ''
    }
  ];
  niveles = [
    {
      nivel_descripcion: '',
      nivel_id: '',
      cursos: this.cursos,
      curso_especifico: [],
      asignaturas: []
    }
  ];
  nivelesSCrear = [];
  asignaturas = [];
  establecimientoId;
  dataSet = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  constructor(
    private notification: NzNotificationService,
    private router: Router,
    public coursesService: CoursesService) {
  }

  ngOnInit(): void {
    this.establecimientoId = localStorage.getItem('idEstablecimiento');
    this.obtenerNivelesEstablecimiento();
    this.obtenerNivelesSinCrear();
  }

  obtenerNivelesEstablecimiento() {
    this.coursesService.obtenerNivelesEstablecimiento(this.establecimientoId).subscribe( (data: any) => { // Success
      this.niveles = data;
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }

  obtenerNivelesSinCrear() {
    this.coursesService.obtenerNivelesSinCrear(this.establecimientoId).subscribe( (data: any) => { // Success
      this.nivelesSCrear = data;
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }


}
