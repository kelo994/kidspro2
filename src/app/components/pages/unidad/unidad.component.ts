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

  constructor(public bloqueService: BloqueService, public router: Router) { }

  ngOnInit(): void {
    this.obtenerBloques();
  }

  obtenerBloques() {
    this.bloqueService.getBloquesGrupo(1).subscribe( (data: any) => { // Success
      this.bloques = data;
    }, (error) => {
      if (error.status === 401) { this.router.navigate(['/auth/login']); }
    });
  }


}
