import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  styleUrls: ['./student.component.scss'],
  templateUrl: './student.component.html',
})
export class StudentComponent {
  constructor(private router: Router) { }

  studentName = localStorage.getItem('studentName');

  ngOnInit(): void {
  }

  collapseMenu() {
  }

  logout () {
    localStorage.setItem('tokenStudent', '');
    this.router.navigate(['/auth/login']);
  }
}
