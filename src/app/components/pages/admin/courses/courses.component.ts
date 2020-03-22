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
  panelOpenState = false;
  niveles = [];
  cursos = [];
  asignaturas = [];
  dataSet = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  constructor(
    private notification: NzNotificationService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

}
