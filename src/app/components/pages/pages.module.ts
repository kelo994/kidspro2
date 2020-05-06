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

import { AdminModule } from './admin/admin.module';
import { SimceModule } from './simce/simce.module';
import { LeccionComponent } from './leccion/leccion.component';
import { UnidadComponent} from './unidad/unidad.component';
import { AsignaturasComponent } from './asignaturas/asignaturas.component';
import { MaterialModule } from 'src/app/material.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReportesComponent } from './reportes/reportes.component';
import { ObjetivosComponent } from './reportes/objetivos/objetivos.component';
import { ActividadesComponent } from './reportes/actividades/actividades.component';
import { ChartModule } from 'angular-highcharts';
import { ChartsModule } from 'ng2-charts';

import { AuthGuardService } from '../../services/auth-guard/auth-guard.service';
import { AdminGuardService } from '../../services/auth-guard/admin-guard.service';

@NgModule({
    imports: [
        PAGES_ROUTES,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        AdminModule,
        SimceModule,
        MaterialModule,
        Ng2SearchPipeModule,
        ChartModule,
        ChartsModule
    ],
    declarations: [
        PagesComponent,
        HeaderComponent,
        CursoComponent,
        AsignaturasComponent,
        LeccionComponent,
        UnidadComponent,
        ReportesComponent,
        ObjetivosComponent,
        ActividadesComponent,
    ],
    providers: [{ provide: NZ_I18N, useValue: es_ES }, NzI18nService, AuthGuardService, AdminGuardService],
    entryComponents: [ ]
})
export class PagesModule { }

