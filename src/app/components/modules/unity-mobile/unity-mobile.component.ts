import { Component, OnInit, Input } from '@angular/core';

import { UnityService } from '../unity-service/unity-service.service';

@Component({
  selector: 'unity-mobile',
  templateUrl: './unity-mobile.component.html',
  styleUrls: ['./unity-mobile.component.css']
})
export class UnityMobileComponent implements OnInit {
  @Input() path: string;
  constructor(private _unityService: UnityService) {
  }

  ngOnInit() {
    this._unityService.load('mobilegamecontainer', this.path);
  }

  fullscreen () {
    this._unityService.send();
  }

  alert() {
    this._unityService.alert();
  }

}
