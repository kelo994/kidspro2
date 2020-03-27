import { Component, OnInit, Input } from '@angular/core';

import { UnityService } from '../unity-service/unity-service.service';

@Component({
  selector: 'unity-app',
  templateUrl: './unity-app.component.html',
  styleUrls: ['./unity-app.component.css']
})
export class UnityAppComponent implements OnInit {
  @Input() path:string;
  constructor(private _unityService: UnityService) { 
  }

  ngOnInit() {
    this._unityService.load("gamecontainer", this.path);
  }

  fullscreen () {
    this._unityService.send()
  }

  alert() {
    this._unityService.alert();
  }

}
