import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//import { DashService } from '../../services/dash.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzFormatEmitEvent } from 'ng-zorro-antd';

@Component({
  selector: 'ngx-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {
  searchValue = '';
  selectedValue;

  asignaturas = [
    {
      title: 'Lenguaje, Comunicación y Literatura',
      key: 'lenguaje',
      isLeaf: true
    },
    {
      title: 'Matemáticas',
      key: 'matematicas',
      isLeaf: true
    },
  ];

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

  private parametersObservable: any;

  asignaturasList = {
    asign1: ['Lenguaje'],
    asign2: ['Matemática'],
    asign3: ['Inglés'],
    asign4: ['Ciencia'],
  }

  selectAsginatura = '';

  name = 'Angular 6';

  constructor(private routeActive: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.parametersObservable = this.routeActive.params.subscribe(params => {
      console.log(params);
      if (this.routeActive.snapshot.params.idCurso == '1') {
        this.selectAsginatura = this.asignaturasList.asign1[0];
      } else if (this.routeActive.snapshot.params.idCurso == '2') {
        this.selectAsginatura = this.asignaturasList.asign2[0];
      } else if (this.routeActive.snapshot.params.idCurso == '3') {
        this.selectAsginatura = this.asignaturasList.asign3[0];
      } else if (this.routeActive.snapshot.params.idCurso == '4') {
        this.selectAsginatura = this.asignaturasList.asign4[0];
      }
    });
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }
  
  destruir() {
    this.ngOnDestroy();
  }

  ngOnDestroy() {
    this.selectAsginatura = '';
    this.parametersObservable.unsubscribe();
  }

  openAsignatura(element) {
    // this.router.navigate(['/pages/cursos/unidades']);

    // $('#closeModalAsignatura').click();
    // localStorage.setItem('asignatureOpen', element.asignatura_id);
    // localStorage.setItem('titleAsignature', element.materia_descripcion);
    // 
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