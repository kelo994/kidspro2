import { RouterModule, Routes } from '@angular/router';

import { StudentAuthGuardService as AuthGuard } from '../../services/auth-guard/student-auth-guard.service';

import { StudentComponent } from './student.component';
import { StudentLessonComponent } from './lesson/lesson.component';
import { StudentLessonGameComponent } from './lesson/game/game.component';
import { StudentEvaluationComponent } from './evaluation/evaluation.component';

const routes: Routes = [{
  path: 'student',
  component: StudentComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: 'lesson',
      component: StudentLessonComponent,
    },
    {
      path: 'lesson/game',
      component: StudentLessonGameComponent,
    },
    {
      path: 'evaluation',
      component: StudentEvaluationComponent,
    }
  ],
}];

export const STUDENT_ROUTES = RouterModule.forChild( routes );