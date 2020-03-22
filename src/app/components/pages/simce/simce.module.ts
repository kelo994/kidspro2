import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule} from 'ng-zorro-antd';
import { NZ_I18N, es_ES, NzI18nService } from 'ng-zorro-antd/i18n';
import { registerLocaleData, CommonModule } from '@angular/common';
import es from '@angular/common/locales/es';
registerLocaleData(es);

import { SimceComponent } from './simce.component';
import { SimceCreateComponent } from './create/create.component';
import { SimceEvaluationsComponent } from './evaluations/evaluations.component';
import { EvaluationResultsComponent } from './results/results.component';
import { PreguntasChartComponent } from './results/charts/preguntas.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        Ng2SearchPipeModule
    ],
    declarations: [
        SimceComponent,
        SimceCreateComponent,
        SimceEvaluationsComponent,
        EvaluationResultsComponent,
        PreguntasChartComponent
    ],
    providers: [{ provide: NZ_I18N, useValue: es_ES }, NzI18nService],
    entryComponents: [  ]
})
export class SimceModule { }

