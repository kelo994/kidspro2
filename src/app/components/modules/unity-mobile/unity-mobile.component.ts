import { Component, OnInit, Input } from '@angular/core';

import { UnityService } from '../unity-service/unity-service.service';

@Component({
  selector: 'unity-mobile',
  templateUrl: './unity-mobile.component.html',
  styleUrls: ['./unity-mobile.component.css']
})
export class UnityMobileComponent implements OnInit {
  @Input() path: string;
  @Input() studentName: string;
  @Input() idEstudiante: string;
  @Input() idBloque: string;
  constructor(private _unityService : UnityService) {
  }

  ngOnInit() {
    this._unityService.load('mobilegamecontainer', this.path);
  }

  alert() {
    this._unityService.alertMobile(this.studentName, this.idEstudiante, this.idBloque);
  }
}
