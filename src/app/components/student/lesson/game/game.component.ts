import { Component, OnInit, HostListener } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { UnityService } from '../../../modules/unity-service/unity-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-lesson-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class StudentLessonGameComponent implements OnInit {

  constructor(
    public unity: UnityService,
    private notification: NzNotificationService,
    public router: Router
  ) { }

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

  innerWidth;
  idEstudiante;
  leccionId;
  asignaturaId;
  cursoId;
  playleccion = '';

  loadGame = false;

  ngOnInit(): void {
    this.idEstudiante = localStorage.getItem('idEstudiante');
    if (typeof history.state.play !== 'undefined') {
      this.playleccion = history.state.play
      this.loadGame = true;
    } else {
      this.goBack()
    }
  }

  ngOnDestroy() {
    window.location.reload();
  }

  goBack () {
    this.router.navigate(['/student/pivot'])
  }

  setFull(): void {
    this.unity.send();
  }

  exit () {
    window.location.reload();
  }

  reproducir(nombre) {
    const audio = new Audio('../../../../assets/audios/' + nombre);
    audio.play();
  }
}
