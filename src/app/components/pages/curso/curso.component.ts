import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
    this.routeActive.params.subscribe(params => {
      if ( params.idCurso == 0) {
        this.step = 1;
        this.asignaturas = null;
        this.selecAsignatura = null;
        this.selectCurso = null;
        this.cursos = null;
        this.unidades = [];

      } else if (params.idCurso > 0) {
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
  }

  editarUnidades() {
    if (!this.editUnidades) {

    } else {
      const dataSend = {
        curso_id: this.cursoIdSeleccionado,
        establecimiento_id: localStorage.getItem('idEstablecimiento'),
        grupos: this.unidades
      };

      this.cService.putUnidades(dataSend, this.selecAsignatura.asignatura_id).subscribe(
        (data: any) => { // Success
          this.unidades = data;
        },
        (error) => {
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
    if (estado == 1) { estado = 0; }
    else { estado = 1; }
    this.unidades[i].bloques[j].bloque_estado = estado;
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
    localStorage.setItem('AsignaturaId', this.selecAsignatura.asignatura_id);
    localStorage.setItem('cursoId', this.cursoIdSeleccionado);
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
    const idAsignatura = this.selecAsignatura.asignatura_id;
    const idCurso = this.cursoIdSeleccionado;
    this.cService.obtenerCodigoCursoAsignatura(idCurso, idAsignatura).subscribe((data: any) => { // Success
      this.codigo = data.codigo;
      this.modalGetCode = true;
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/pages/login']); }
    });

  }

  handleOk(): void {
    this.modalGetCode = false;
  }

  handleCancel(): void {
    this.modalGetCode = false;
  }

  getAsignaturas(nivelId) {

    this.cService
        .obtenerAsignaturasPorEstablecimientoFuncionarioNivel(localStorage.getItem('idEstablecimiento')
            , localStorage.getItem('idFuncionario'), nivelId)
        .subscribe((data: any) => { // Success
          this.asignaturas = data;
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
        }, (error) => {
          if (error.status === 401) { this.router.navigate(['/auth/login']); }
        });
  }

  selectAsignatura(value) {
    this.selecAsignatura = value;
    this.selectCurso = null;
    this.cursos = null;
    this.unidades = [];
    localStorage.setItem('nombreAsignatura', value.materia_descripcion);
    this.getCursos(this.nivelSelected, value.asignatura_id);
    this.nombreAsignaturaSeleccionada = value.materia_descripcion;
    this.step = 3;
  }

  selectCursoEvent(value) {
    this.cursoIdSeleccionado = value.curso_id;
    localStorage.setItem('letterSeccion', value.seccion_nombre);
    this.getUnidades( localStorage.getItem('idFuncionario'), this.selecAsignatura.asignatura_id, value.curso_id);
    this.step = 4;
  }

  cambiarEstadoBloqueGrupo(data, grupo_id) {
    console.log(data);
    data.bloque_id = data.id;
    data.grupo_id = grupo_id;
    this.bloqService.cambiarEstadoBloqueGrupo(data, data.id).subscribe(
        (response: any) => { // Success
          data.estado = !data.estado;

        },
        (error) => {
          if (error.status === 401) {
            this.router.navigate(['/auth/login']);
          } else if (error.status === 500) {
            // this.toast.showToast('danger', 'Error Inesperado', 'Por favor vuelva a intentarlo mas tarde');
          }
        });
  }
}
