import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  styleUrls: ['./student.component.scss'],
  templateUrl: './student.component.html',
})
export class StudentComponent {
  constructor(private router: Router) { }

  isDrawer = false;
  drawerState = false;

  studentName = localStorage.getItem('studentName');

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.outerWidth <= 991) {
      this.isDrawer = true;
    } else {
      this.isDrawer = false;
    }
  }

  ngOnInit(): void {
    this.onResize();
  }

  toggleDrawer(): void {
    this.drawerState = !this.drawerState;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  reproducir(nombre) {
    const audio = new Audio('../../../../assets/audios/' + nombre);
    audio.play();
  }
}
