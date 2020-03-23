import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NZ_I18N, es_ES, NzI18nService } from 'ng-zorro-antd/i18n';
import { registerLocaleData, CommonModule } from '@angular/common';
import es from '@angular/common/locales/es';
import { MaterialModule } from '../../../material.module';
import { PAGES_ROUTES } from '../pages.routes';
registerLocaleData(es);

import { CoursesAdminComponent } from './courses/courses.component';
import { StudentsAdminComponent } from './students/students.component';
import { TeachersAdminComponent } from './teachers/teachers.component';
import { UsersAdminComponent } from './users/users.component';

@NgModule({
  imports: [
    PAGES_ROUTES,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    MaterialModule
  ],
  declarations: [
    CoursesAdminComponent,
    StudentsAdminComponent,
    TeachersAdminComponent,
    UsersAdminComponent,
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }, NzI18nService],
  entryComponents: []
})
export class AdminModule { }

