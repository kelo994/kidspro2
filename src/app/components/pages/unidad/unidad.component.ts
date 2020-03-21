import { Component, OnInit } from '@angular/core';
import { BloqueService } from '../../../services/bloque.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.scss']
})
export class UnidadComponent implements OnInit {
  bloques = [];
  funcionario = 2;
  asignatura  = 1;
  curso = 1;
  grupos = [];
  grupoId = 7;

  constructor(public bloqueService: BloqueService, public router: Router) { }

  ngOnInit(): void {
    this.obtenerBloques();
    this.obtenerGrupos();
  }

  obtenerBloques() {
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


}
