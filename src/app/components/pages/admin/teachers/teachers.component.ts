import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzFormatEmitEvent, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-admin-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersAdminComponent implements OnInit {

  loading = false;

  constructor(
    private notification: NzNotificationService,
    private router: Router) {
  }

  ngOnInit(): void {
  }
  
}
