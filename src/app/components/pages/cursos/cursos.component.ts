import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//import { DashService } from '../../services/dash.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  loading = false;
  data = [
    {
      title: '1° Básico A'
    },
    {
      title: '1° Básico B'
    },
    {
      title: '1° Básico C'
    }
  ];

  nivelSelected = '1° Básico';
  colegio: any;
  asignaturas: any;

  load = false;

  constructor(/*public dashboard: DashService,*/ public router: Router) { }

  ngOnInit() {
    this.load = true;
    /*this.dashboard.getCursos(localStorage.getItem('idEstablecimiento'), localStorage.getItem('rolId')).subscribe(
      (data: any) => { // Success
        this.cursos = data;
        this.colegio = localStorage.getItem('nameEstablecimiento');
        localStorage.setItem('cursos', JSON.stringify(data))
        this.load = false;

        if(this.cursos.length == 1) {
          $('#rowCursos').addClass('justify-content-md-center');
        }
      }, (error) => {
        console.log(error);
        if (error.status == 401) {
          this.router.navigate(['/auth/login']);
        } else if (error.status == 400) {
          this.router.navigate(['/auth/login']);
        }
      })*/
  }

  openCurso(item) {
    localStorage.setItem('CursoName', item.curso_nombre);
    localStorage.setItem('CursoId', item.curso_id);
    /*this.dashboard.getAsignaturas(item.curso_id)
      .subscribe(
        (data: any) => { // Success
          this.asignaturas = data;
          if (this.asignaturas.length === 0) {
            this.toast.showToast('danger', 'Error', 'No tienes asignaturas asociadas a este curso.');
          } else if (this.asignaturas.length === 1) {
            this.openAsignatura(this.asignaturas[0])
            this.toast.showToast('success', 'Asignatura Matemáticas', '')
          } else {
            $('#btnmodalAsignature').click();
          }
        },
        (error) => {
          if (error.status == 401) {
            this.router.navigate(['/auth/login']);
          }
        }
      )*/
  }

  openAsignatura(element) {
    $('#closeModalAsignatura').click();
    localStorage.setItem('asignatureOpen', element.asignatura_id);
    localStorage.setItem('titleAsignature', element.materia_descripcion);
    this.router.navigate(['/pages/cursos/unidades']);
  }

  change(): void {
    this.loading = true;
    if (this.data.length > 0) {
      setTimeout(() => {
        this.data = [];
        this.loading = false;
      }, 1000);
    } else {
      setTimeout(() => {
        this.data = [
          {
            title: 'Ant Design Title 1'
          },
          {
            title: 'Ant Design Title 2'
          },
          {
            title: 'Ant Design Title 3'
          },
          {
            title: 'Ant Design Title 4'
          }
        ];
        this.loading = false;
      }, 1000);
    }
  }
}