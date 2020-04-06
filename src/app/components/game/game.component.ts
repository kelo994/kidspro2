import { Component, OnInit, HostListener } from '@angular/core';
import { UnityService } from '../modules/unity-service/unity-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  estudianteNombre;
  estudianteId;
  leccionId;
  asignaturaId;
  cursoId;
  playleccion = '';
  bloqueId;
  loadGame = false;

  constructor(
    private routeActive: ActivatedRoute,
    public unity: UnityService
  ) { }

  ngOnInit(): void {
    this.routeActive.params.subscribe(params => {
      this.estudianteNombre = params.nombre + ' ' + params.apellido;
      this.asignaturaId = params.asig;
      this.bloqueId = params.bloque;
      this.leccionId = params.leccion;
      this.estudianteId = params.idEstudiante;
      this.playleccion = this.asignaturaId + '/' + this.bloqueId + '/' + this.leccionId + '/Build/' + this.leccionId + '.json';
      this.loadGame = true;
    });
  }

  exit() {
    window.location.reload();
  }
}
