import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NZ_I18N, es_ES, NzI18nService } from 'ng-zorro-antd/i18n';
import { registerLocaleData, CommonModule } from '@angular/common';
import es from '@angular/common/locales/es';
registerLocaleData(es);

import { CoursesAdminComponent } from './courses/courses.component';
import { StudentsAdminComponent } from './students/students.component';
import { TeachersAdminComponent } from './teachers/teachers.component';
import { UsersAdminComponent } from './users/users.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
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

