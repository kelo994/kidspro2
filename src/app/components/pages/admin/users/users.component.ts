import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzFormatEmitEvent, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersAdminComponent implements OnInit {

  loading = false;

  users;

  constructor(
    private notification: NzNotificationService,
    private router: Router) {
  }

  ngOnInit(): void {
  }
  
}
