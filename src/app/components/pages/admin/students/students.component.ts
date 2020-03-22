import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzFormatEmitEvent, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-admin-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsAdminComponent implements OnInit {

  loading = false;

  constructor(
    private notification: NzNotificationService,
    private router: Router) {
  }

  ngOnInit(): void {
  }
  
}
