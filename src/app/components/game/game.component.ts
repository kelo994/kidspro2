import { Component, OnInit, HostListener } from '@angular/core';
import { UnityService } from '../modules/unity-service/unity-service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  innerWidth;
  idEstudiante;
  leccionId;
  asignaturaId;
  cursoId;
  titulo: any;
  playleccion = '';
  loadGame = false;


  asig;
  bloque;
  leccion;

  constructor(
    private routeActive: ActivatedRoute,
    public unity: UnityService
  ) { }

  // playleccion = 'matematicas/1/1/Build/1.json';

  ngOnInit(): void {
    this.loadGame = true;
    this.routeActive.params.subscribe(params => {
      this.asig = params.asig;
      this.bloque = params.bloque;
      this.leccion = params.leccion;
      this.idEstudiante = params.idEstudiante;
      this.playleccion = this.asig + '/' + this.bloque + '/' + this.leccion + '/Build/' + this.leccion + '.json';
    });
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.unity.exitFullScreen();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth >= 576) {
      this.innerWidth = window.innerWidth / 2;
    } else {
      this.innerWidth = window.innerWidth;
    }
  }
  setFull(): void {
    this.unity.send();
  }

  exit() {
    window.location.reload();
  }
}
