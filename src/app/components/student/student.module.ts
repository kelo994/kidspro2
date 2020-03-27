import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule} from 'ng-zorro-antd';
import { NZ_I18N, es_ES, NzI18nService } from 'ng-zorro-antd/i18n';
import { registerLocaleData, CommonModule } from '@angular/common';
import es from '@angular/common/locales/es';
registerLocaleData(es);

import { UnityLinkerModule } from '../modules/unity-linker/unity-linker.module';

import { STUDENT_ROUTES } from './student.routes';
import { StudentComponent } from './student.component';
import { StudentLessonComponent } from './lesson/lesson.component';
import { StudentLessonGameComponent } from './lesson/game/game.component'
import { StudentEvaluationComponent } from './evaluation/evaluation.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { StudentAuthGuardService } from '../../services/auth-guard/student-auth-guard.service';

@NgModule({
    imports: [
        STUDENT_ROUTES,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        Ng2SearchPipeModule,
        UnityLinkerModule
    ],
    declarations: [
        StudentComponent,
        StudentLessonComponent,
        StudentLessonGameComponent,
        StudentEvaluationComponent,
    ],
    providers: [{ provide: NZ_I18N, useValue: es_ES }, NzI18nService, StudentAuthGuardService],
    entryComponents: []
})
export class StudentModule { }

