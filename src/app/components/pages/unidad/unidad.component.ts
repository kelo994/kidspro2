import { Component, OnInit } from '@angular/core';
import { BloqueService } from '../../../services/bloque.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.scss']
})
export class UnidadComponent implements OnInit {
  bloques = [];
  funcionario;
  asignatura;
  curso;
  grupos = [];
  grupoId;
  isCollapsed = false;

  constructor(
      public bloqueService: BloqueService, public router: Router, private route: ActivatedRoute) {
    console.log(this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      console.log(params);
      console.log(history.state);
      this.grupoId = params.unidad;
     // this.funcionario = history.state.func;
      this.funcionario = 2;
     // this.asignatura = history.state.asig;
      this.asignatura = 1;
      // this.curso = history.state.cur;
      this.curso = 1;
      this.obtenerBloques();
      this.obtenerGrupos();
    });



  }

  obtenerBloques() {
    console.log(this.grupoId);
    this.bloqueService.getBloquesGrupo(this.grupoId).subscribe( (data: any) => { // Success
      this.bloques = data;
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }

  obtenerGrupos() {
    this.bloqueService.getGrupos(this.funcionario, this.asignatura, this.curso).subscribe( (data: any) => { // Success
      this.grupos = data;
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }

  cambiarEstadoBloqueGrupo(data) {
    this.bloqueService.cambiarEstadoBloqueGrupo(data, data.bloque_id).subscribe(
        (response: any) => { // Success
          data.estado = !data.estado;
          if (data.estado) {
           // this.toast.showToast('success', 'Lección Activada', '');
          } else {
          // this.toast.showToast('success', 'Lección Desactivada', '');
          }

        },
        (error) => {
          if (error.status === 401) {
            this.router.navigate(['/auth/login']);
          } else if (error.status === 500) {
           // this.toast.showToast('danger', 'Error Inesperado', 'Por favor vuelva a intentarlo mas tarde');
          }
        });
  }

  goToUnidad(grupoId): void {
    console.log(grupoId);
    this.router
        .navigateByUrl('pages/cursos/unidades/' + grupoId, {state: {func: this.funcionario,  asig: this.asignatura, cur: this.curso}});
  }

  goToLeccion(leccionId): void {
    console.log(leccionId);
    this.router
        .navigateByUrl('pages/cursos/unidades/lecciones/' + leccionId, {state: {}});
  }
}
