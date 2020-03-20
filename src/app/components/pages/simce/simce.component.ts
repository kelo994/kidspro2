import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simce',
  templateUrl: './simce.component.html',
  styleUrls: ['./simce.component.scss']
})
export class SimceComponent implements OnInit {

  constructor() { }

  listOfData = [
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

  ngOnInit(): void {
  }

}
