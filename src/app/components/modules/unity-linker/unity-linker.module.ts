import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnityAppComponent } from '../unity-app/unity-app.component';
import { UnityService } from '../unity-service/unity-service.service';
import { UnityMobileComponent } from '../unity-mobile/unity-mobile.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UnityAppComponent,
    UnityMobileComponent
  ],
  exports: [
    UnityAppComponent,
    UnityMobileComponent
  ],
  providers: [UnityService]
})
export class UnityLinkerModule { }
