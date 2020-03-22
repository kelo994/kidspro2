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

import { CursoComponent } from './curso/curso.component';

import { SimceModule } from './simce/simce.module';
import { LeccionComponent } from './leccion/leccion.component';
import { UnidadComponent} from './unidad/unidad.component';
import { AsignaturasComponent } from './asignaturas/asignaturas.component';
import { MaterialModule } from 'src/app/material.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
    imports: [
        PAGES_ROUTES,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        SimceModule,
        MaterialModule,
        Ng2SearchPipeModule
    ],
    declarations: [
        PagesComponent,
        HeaderComponent,
        CursoComponent,
        AsignaturasComponent,
        LeccionComponent,
        UnidadComponent
    ],
    providers: [{ provide: NZ_I18N, useValue: es_ES }, NzI18nService],
    entryComponents: [ ]
})
export class PagesModule { }

