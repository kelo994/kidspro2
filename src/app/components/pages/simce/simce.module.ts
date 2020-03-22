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

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule
    ],
    declarations: [
        SimceComponent,
        SimceCreateComponent,
        SimceEvaluationsComponent,
        EvaluationResultsComponent
    ],
    providers: [{ provide: NZ_I18N, useValue: es_ES }, NzI18nService],
    entryComponents: [  ]
})
export class SimceModule { }

