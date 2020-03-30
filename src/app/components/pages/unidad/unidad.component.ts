import { Component, OnInit } from '@angular/core';
import { BloqueService } from '../../../services/bloque.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.scss']
})
export class UnidadComponent implements OnInit {
  unidad = { id: 0, nombre: '' };
  bloques = [];
  funcionario;
  asignatura = { id: 0, nombre: ''} ;
  curso = { id: 0, nombre: '' };
  grupos = [];
  grupoId;
  isCollapsed = false;

  loading = 0;
  nombreUnidad = '';

  constructor(
      public bloqueService: BloqueService, public router: Router, private route: ActivatedRoute) {
    console.log(this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit(): void {
    this.unidad.nombre = localStorage.getItem('unidadNombre');
    this.unidad.id = Number(localStorage.getItem('unidadId'));
    this.curso.nombre = localStorage.getItem('CursoName') + ' ' + localStorage.getItem('letterSeccion');
    this.curso.id = Number(localStorage.getItem('cursoId'));
    this.asignatura.nombre = localStorage.getItem('AsignaturaNombre');

    this.route.params.subscribe(params => {

      this.grupoId = params.unidad;
     // this.funcionario = history.state.func;
      this.funcionario = localStorage.getItem('idFuncionario');
     // this.asignatura = history.state.asig;
      this.asignatura.id = Number(localStorage.getItem('AsignaturaId'));
      // this.curso = history.state.cur;
      // this.curso = localStorage.getItem('CursoEspecifico');
      this.obtenerBloques();
      this.obtenerGrupos();
    });
  }

  obtenerBloques() {
    // console.log(this.grupoId);
    this.bloqueService.getBloquesGrupo(this.grupoId).subscribe( (data: any) => { // Success
      this.bloques = data;
      this.loading = 1;

    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }

  obtenerGrupos() {
    this.bloqueService.getGrupos(this.funcionario, this.asignatura.id, this.curso.id).subscribe( (data: any) => { // Success
      this.grupos = data;
      console.log(data);
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }

  cambiarEstadoBloqueGrupo(data) {
    this.bloqueService.cambiarEstadoBloqueGrupo(data, data.bloque_id).subscribe(
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

  goToUnidad(item): void {
    localStorage.setItem('unidadNombre', item.grupo_nombre);
    this.unidad.nombre = item.grupo_nombre;
    this.router
        .navigateByUrl('pages/cursos/unidades/' + item.grupo_id, {state: {func: this.funcionario,  asig: this.asignatura, cur: this.curso}});
  }

  goToLeccion(item): void {
    localStorage.setItem('leccionName', item.bloque_titulo);
    localStorage.setItem('leccionId', item.bloque_id);
    this.router
        .navigateByUrl('pages/cursos/unidades/lecciones/' + item.bloque_id, {state: {asignatura_id: this.asignatura.id,
            cursoId: this.curso.id, grupoId: this.unidad.id}});
  }

  backToCourses() {
    this.router.navigate(['/pages/curso/' + localStorage.getItem('NivelId')]);
  }
}
