import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//import { DashService } from '../../services/dash.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzFormatEmitEvent, NzNotificationService } from 'ng-zorro-antd';
import { CursoService } from 'src/app/services/cursos.service';

@Component({
  selector: 'ngx-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {
  searchValue = '';
  selectedValue;

  asignaturas;
  selectAsginatura = '';
  unidades;

  loading = false;

  private parametersObservable: any;

  constructor(private routeActive: ActivatedRoute,
    private notification: NzNotificationService, private router: Router, public cService: CursoService) {
  }

  ngOnInit(): void {

    this.parametersObservable = this.routeActive.params.subscribe(params => {
      console.log(params);

      // localStorage.setItem('CursoName', item.curso_nombre);
      localStorage.setItem('CursoId', this.routeActive.snapshot.params.idCurso);
      this.cService.getAsignaturas(this.routeActive.snapshot.params.idCurso)
        .subscribe(
          (data: any) => { // Success
            this.asignaturas = data;
            console.log(data);
            if (this.asignaturas.length === 0) {
              this.notification.warning('Error', 'No tienes asignaturas asociadas a este curso.');
            } else if (this.asignaturas.length === 1) {
              this.openAsignatura(this.asignaturas[0].asignatura_id)
              // this.notification.success('Error', 'No tienes asignaturas asociadas a este curso.');
            } else {
              $('#btnmodalAsignature').click();
            }
          },
          (error) => {
            if (error.status == 401) {
              this.router.navigate(['/auth/login']);
            }
          }
        )
    });
  }

  openAsignatura(element) {
    localStorage.setItem('AsignaturaId', element);
    this.cService.openAsignatura(localStorage.getItem('CursoId'), element)
        .subscribe(
          (data: any) => { // Success
            this.unidades = data;
            console.log(data);
          },
          (error) => {
            if (error.status == 401) {
              this.router.navigate(['/auth/login']);
            }
          }
        )
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

}