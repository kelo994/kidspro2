import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule} from 'ng-zorro-antd';
import { NZ_I18N, es_ES, NzI18nService } from 'ng-zorro-antd/i18n';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { SYSTEM_ROUTES } from './system.routes';
import { PagesModule } from './pages/pages.module';
import { SystemComponent } from './system.component';

@NgModule({
  declarations: [
    SystemComponent,
  ],
  imports: [
    SYSTEM_ROUTES,
    CommonModule,
    FormsModule,
    PagesModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    Ng2SearchPipeModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }, NzI18nService],
  entryComponents: []
})
export class SystemModule { }
