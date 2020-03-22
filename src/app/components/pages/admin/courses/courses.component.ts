import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzFormatEmitEvent, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesAdminComponent implements OnInit {

  loading = false;

  constructor(
    private notification: NzNotificationService,
    private router: Router) {
  }

  ngOnInit(): void {
  }
  
}
