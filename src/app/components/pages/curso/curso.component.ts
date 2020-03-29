import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { DashService } from '../../services/dash.service';
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
  resolucion;
  step = 1;
  selecAsignatura;
  nivelSelected;
  cursos;
  selectCurso;
  cursoIdSeleccionado;
  cursoNombre = '';
  secciones = [];
  selectSeccion;
  asignaturas = [];
  nombreAsignaturaSeleccionada = 'Asignatura';
  nombreNivelSeleccionado = 'Curso';
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
    this.resolucion = window.screen.width;
    console.log(this.resolucion);
    this.routeActive.params.subscribe(params => {
      console.log(params);
      if ( params.idCurso == 0) {
        console.log('step 1: Seleccionar curso');
        this.step = 1;
        this.asignaturas = null;
        this.selecAsignatura = null;
        this.selectCurso = null;
        this.cursos = null;
        this.unidades = [];

      } else if (params.idCurso > 0) {
        console.log('step 2: Seleccionar asignatura');
        this.step = 2;
        this.nivelSelected = params.idCurso;
        this.getAsignaturas(params.idCurso);
        this.asignaturas = null;
        this.selecAsignatura = null;
        this.selectCurso = null;
        this.cursos = null;
        this.unidades = [];

      }


    });

  }

  openAsignatura(element) {
    localStorage.setItem('AsignaturaId', this.asignaturas[Number(element)].asignatura_id);
   // localStorage.setItem('AsignaturaNombre', item.asignatura_nombre);
    // this.selectAsginatura = item.asignatura_nombre;
    // this.getUnidades();
  }

  getUnidades(funcionarioId, asignaturaId, cursoId ) {
    this.bloqService.getGrupos( funcionarioId, asignaturaId, cursoId)
      .subscribe(
        (data: any) => { // Success
          console.log(data);
          this.unidades = data;
          if (this.unidades.length > 0) { this.flagUnidades = 2; }
        },
        (error) => {
          if (error.status == 401) {
            this.router.navigate(['/auth/login']);
          }
        }
      );
  }


  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  editarUnidades() {
    if (!this.editUnidades) {

    } else {
      const dataSend = {
        curso_id: this.cursoIdSeleccionado,
        establecimiento_id: localStorage.getItem('idEstablecimiento'),
        grupos: this.unidades
      };
      console.log(dataSend);

      this.cService.putUnidades(dataSend, this.selecAsignatura.asignatura_id).subscribe(
        (data: any) => { // Success
          console.log(data);
          this.unidades = data;
        },
        (error) => {
          console.log(error);
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
    if (estado == 1) { estado = 0; }
    else { estado = 1; }
    this.unidades[i].bloques[j].bloque_estado = estado;
    console.log(this.unidades);
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



  goToUnidad(item): void {
    localStorage.setItem('unidadNombre', item.grupo_nombre);
    localStorage.setItem('unidadId', item.grupo_id);
    localStorage.setItem('nivelNombre', this.cursoNombre);
    this.router.navigateByUrl('pages/cursos/unidades/' + item.grupo_id,
      {
        state: {
          func: localStorage.getItem('idFuncionario'),
          asig: this.nombreAsignaturaSeleccionada,
          cur: localStorage.getItem('cursoId'),
          unidadNombre: item.grupo_nombre
        }
      });
  }

  showModal(): void {
    const idAsignatura = localStorage.getItem('AsignaturaId');
    const idCurso = localStorage.getItem('CursoEspecifico');
    this.cService.obtenerCodigoCursoAsignatura(idCurso, idAsignatura).subscribe((data: any) => { // Success
      this.codigo = data.codigo;
      this.modalGetCode = true;
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/pages/login']); }
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

  getAsignaturas(nivelId) {

    this.cService
        .obtenerAsignaturasPorEstablecimientoFuncionarioNivel(localStorage.getItem('idEstablecimiento')
            , localStorage.getItem('idFuncionario'), nivelId)
        .subscribe((data: any) => { // Success
          this.asignaturas = data;
          // console.log(data);
        }, (error) => {
          if (error.status === 401) { this.router.navigate(['/auth/login']); }
        });
  }
  getCursos(nivelId, asignaturaId) {
    this.cService
        .obtenerCursosPorEstablecimientoFuncionarioNivelAsignatura(localStorage.getItem('idEstablecimiento')
            , localStorage.getItem('idFuncionario'), nivelId, asignaturaId)
        .subscribe((data: any) => { // Success
          this.cursos = data;
          // console.log(data);
        }, (error) => {
          if (error.status === 401) { this.router.navigate(['/auth/login']); }
        });
  }

  selectAsignatura(value) {
    console.log('step 3: select seccion');
    this.selecAsignatura = value;
    this.selectCurso = null;
    this.cursos = null;
    this.unidades = [];
    this.getCursos(this.nivelSelected, value.asignatura_id);
    this.nombreAsignaturaSeleccionada = value.materia_descripcion;
    this.step = 3;
  }

  selectCursoEvent(value) {
    console.log(value);
    this.cursoIdSeleccionado = value.curso_id
    this.getUnidades( localStorage.getItem('idFuncionario'), this.selecAsignatura.asignatura_id, value.curso_id);
    this.step = 4;
  }
}
