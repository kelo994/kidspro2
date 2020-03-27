import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//import { DashService } from '../../services/dash.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzFormatEmitEvent, NzNotificationService } from 'ng-zorro-antd';
import { CursoService } from 'src/app/services/cursos.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BloqueService } from 'src/app/services/bloque.service';
import { CoursesService } from 'src/app/services/courses.service';


@Component({
  selector: 'ngx-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {
  cursoNombre = '';
  secciones = [];
  selectSeccion;
  asignaturas = [];
  selectAsginatura = 'Seleccione Asignatura';
  // Codigo
  modalGetCode = false;
  codigo = '';

  editUnidades = false;
  searchValue = '';
  selectedValue;

  flagUnidades = 0;

  unidades = [];

  loading = false;

  private parametersObservable: any;

  constructor(private routeActive: ActivatedRoute,
    private notification: NzNotificationService, private router: Router, public cService: CursoService,
    public coursesService: CoursesService, public bloqService: BloqueService) {
  }

  ngOnInit(): void {
    this.parametersObservable = this.routeActive.params.subscribe(params => {
      // console.log(params);
      if (Number(this.routeActive.snapshot.params.idCurso) != 0) {
        this.cursoNombre = localStorage.getItem('CursoName');
        this.asignaturas = JSON.parse(localStorage.getItem('asignaturas'));
        this.secciones = []
        this.unidades = [];

        localStorage.setItem('NivelId', this.routeActive.snapshot.params.idCurso);

        // if (this.asignaturas.length > 1) {
        //   //  console.log("asignaturas")
        //   $('#firstStepSecciones').removeClass('active').addClass('afterActive');
        //   $('#secondStep').removeClass('desactive').addClass('active');
        //   $('#progressBar').css('width', 48 + '%').attr('aria-valuenow', 48);
        //   $('#pointTwo').removeClass('point-blank').addClass('point-blue');
        // }
        console.log(this.asignaturas)
        if(this.asignaturas.length > 0) {
          this.coursesService.obtenerCursosProfesor(localStorage.getItem('idEstablecimiento'), localStorage.getItem('idFuncionario'), this.asignaturas[0].asignatura_id).subscribe((data: any) => { // Success
            if (data.length != 0) {
              console.log(data);
              localStorage.setItem('CursoEspecifico', data[0].curso_especifico_id);
              localStorage.setItem('letterSeccion', data[0].seccion_nombre)
              this.secciones = data;
              this.selectSeccion = this.secciones[0].curso_id;
              localStorage.setItem('CursoEspecifico', String(data[0].curso_especifico_id));
              this.unidades = [];
              this.flagUnidades = 1;
              localStorage.setItem('AsignaturaId', this.asignaturas[0].asignatura_id);
              this.getUnidades();
            }
  
          }, (error) => {
            console.log(error)
            if (error.status === 401) { this.router.navigate(['/auth/login']); }
          });
        }
       
      }
    });
  }

  openAsignatura(element) {
    localStorage.setItem('AsignaturaId', this.asignaturas[Number(element)].asignatura_id);
   // localStorage.setItem('AsignaturaNombre', item.asignatura_nombre);
    //this.selectAsginatura = item.asignatura_nombre;
    this.getUnidades();
  }

  getUnidades() {
    console.log(localStorage.getItem('idFuncionario') + ' ' +  localStorage.getItem('AsignaturaId') + ' ' +   localStorage.getItem('CursoEspecifico'))
    this.bloqService.getGrupos(localStorage.getItem('idFuncionario'), localStorage.getItem('AsignaturaId'), localStorage.getItem('CursoEspecifico'))
      .subscribe(
        (data: any) => { // Success
          console.log(data)
          this.unidades = data;
          if(this.unidades.length > 0) this.flagUnidades =2;
        },
        (error) => {
          if (error.status == 401) {
            this.router.navigate(['/auth/login']);
          }
        }
      );
  }

  onChangeSeccion(item) {
    localStorage.setItem('CursoEspecifico', this.secciones[item].curso_especifico_id);
    this.bloqService.getGrupos(localStorage.getItem('idFuncionario'), localStorage.getItem('AsignaturaId'), localStorage.getItem('CursoEspecifico'))
      .subscribe(
        (data: any) => { // Success
          // console.log(data)
          this.unidades = data;
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

  goToUnidad(item): void {
    localStorage.setItem('unidadNombre', item.grupo_nombre);
    localStorage.setItem('unidadId', item.grupo_id);
    localStorage.setItem('nivelNombre', this.cursoNombre);
    this.router.navigateByUrl('pages/cursos/unidades/' + item.grupo_id,
      {
        state: {
          func: localStorage.getItem('idFuncionario'),
          asig: this.selectAsginatura, cur: localStorage.getItem('cursoId'),
          unidadNombre: item.grupo_nombre
        }
      });
  }

  showModal(): void {
    let idAsignatura = localStorage.getItem('AsignaturaId');
    let idCurso = localStorage.getItem('CursoEspecifico');
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
