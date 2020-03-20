import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule} from 'ng-zorro-antd';
import { NZ_I18N, es_ES, NzI18nService } from 'ng-zorro-antd/i18n';
import { registerLocaleData, CommonModule } from '@angular/common';
import es from '@angular/common/locales/es';
registerLocaleData(es);

import { PAGES_ROUTES } from './pages.routes';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CursosComponent } from './cursos/cursos.component';

@NgModule({
    imports: [
        PAGES_ROUTES,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule
    ],
    declarations: [
        PagesComponent,
        HeaderComponent,
        SidebarComponent,
        CursosComponent
    ],
    providers: [{ provide: NZ_I18N, useValue: es_ES }, NzI18nService],
    entryComponents: [ ]
})
export class PagesModule { }

