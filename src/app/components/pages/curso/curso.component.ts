import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//import { DashService } from '../../services/dash.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzFormatEmitEvent, NzNotificationService } from 'ng-zorro-antd';
import { CursoService } from 'src/app/services/cursos.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'ngx-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {
  // Codigo
  modalGetCode = false;
  codigo = '';

  editUnidades = false;
  searchValue = '';
  selectedValue;

  cursoNombre = '';
  asignaturas;
  selectAsginatura = 'Sin asignatura Seleccionada';
  unidades;

  loading = false;

  private parametersObservable: any;

  constructor(private routeActive: ActivatedRoute,
    private notification: NzNotificationService, private router: Router, public cService: CursoService) {
  }

  ngOnInit(): void {

    this.parametersObservable = this.routeActive.params.subscribe(params => {
      // console.log(params);
      this.cursoNombre = localStorage.getItem('CursoName');
      localStorage.setItem('CursoId', this.routeActive.snapshot.params.idCurso);
      this.cService.getAsignaturas(this.routeActive.snapshot.params.idCurso)
        .subscribe(
          (data: any) => { // Success
            this.asignaturas = data;
            this.unidades = [];
            console.log(this.asignaturas.length);
            if (this.asignaturas.length === 0) {
              this.notification.warning('Error', 'No tienes asignaturas asociadas a este curso.');
            } else if (this.asignaturas.length > 0) {
              $('#firstStep').removeClass('active').addClass('afterActive');
              $('#secondStep').removeClass('desactive').addClass('active');
              $('#progressBar').css('width', 48 + '%').attr('aria-valuenow', 48);
              $('#pointTwo').removeClass('point-blank').addClass('point-blue');
              
              if (this.asignaturas.length === 1) {
                this.openAsignatura(this.asignaturas[0])
                // this.notification.success('Error', 'No tienes asignaturas asociadas a este curso.');
              } else {
                $('#btnmodalAsignature').click();
              }
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
    localStorage.setItem('AsignaturaId', element.asignatura_id);
    localStorage.setItem('AsignaturaNombre', element.materia_descripcion);
    this.selectAsginatura = element.materia_descripcion;
    this.cService.openAsignatura(localStorage.getItem('CursoId'), element.asignatura_id)
      .subscribe(
        (data: any) => { // Success
          this.unidades = data;
          // console.log(data);
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

  editarUnidades() {
    if (!this.editUnidades) {

    } else {
      let dataSend = {
        curso_id: localStorage.getItem('CursoId'),
        establecimiento_id: localStorage.getItem('idEstablecimiento'),
        grupos: this.unidades
      }
      console.log(dataSend);

      this.cService.putUnidades(dataSend, localStorage.getItem('AsignaturaId')).subscribe(
        (data: any) => { // Success
          console.log(data);
          this.unidades = data;
        },
        (error) => {
          console.log(error)
          if (error.status == 401) {
            this.router.navigate(['/auth/login']);
          } else if (error.status == 500) {
            // this.toast.showToast('danger', 'Error Inesperado', 'Por favor vuelva a intentarlo mas tarde');
          }
        }
      );
    }
    this.editUnidades = !this.editUnidades;
  }

  changeEstado(estado, i, j) {
    console.log(estado, i);
    if (estado == 1) estado = 0;
    else estado = 1;
    this.unidades[i].bloques[j].bloque_estado = estado;
    console.log(this.unidades);
  }

  destruir() {
    this.ngOnDestroy();
  }

  ngOnDestroy() {
    this.selectAsginatura = '';
    this.parametersObservable.unsubscribe();
  }

  drop(event: CdkDragDrop<{}[]>) {
    if (event.previousContainer == event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
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

  goToUnidad(grupoId): void {
    console.log(grupoId);
    this.router.navigateByUrl('pages/cursos/unidades/' + grupoId,
      {
        state: {
          func: localStorage.getItem('idFuncionario'),
          asig: this.selectAsginatura, cur: localStorage.getItem('cursoId')
        }
      });
  }

  showModal(): void {
    let idAsignatura = localStorage.getItem('AsignaturaId');
    let idCurso = localStorage.getItem('CursoId');
    this.cService.obtenerCodigoCursoAsignatura(idCurso, idAsignatura).subscribe((data: any) => { // Success
      this.codigo = data.codigo;
      this.modalGetCode = true;
    }, (error) => {
      if (error.status == 401) this.router.navigate(['/pages/login']);
    });

  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.modalGetCode = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.modalGetCode = false;
  }
}
