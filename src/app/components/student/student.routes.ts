import { RouterModule, Routes } from '@angular/router';

import { StudentComponent } from './student.component';
import { StudentLessonComponent } from './lesson/lesson.component';
import { StudentEvaluationComponent } from './evaluation/evaluation.component';

const routes: Routes = [{
  path: 'student',
  component: StudentComponent,
  children: [
    {
      path: 'lesson',
      component: StudentLessonComponent,
    },
    {
      path: 'evaluation',
      component: StudentEvaluationComponent,
    }
  ],
}];

export const STUDENT_ROUTES = RouterModule.forChild( routes );