import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule} from 'ng-zorro-antd';
import { NZ_I18N, es_ES, NzI18nService } from 'ng-zorro-antd/i18n';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { EstablishmentComponent } from './establishment/establishment.component';
import { SYSTEM_PAGES_ROUTES } from './pages.routes';
import {PagesComponent} from "./pages.component";


@NgModule({
  declarations: [
      EstablishmentComponent,
    PagesComponent,

  ],
  imports: [
    SYSTEM_PAGES_ROUTES,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    Ng2SearchPipeModule,
  ]
})
export class PagesModule { }
