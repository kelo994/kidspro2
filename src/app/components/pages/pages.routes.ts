import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { UnidadComponent } from './unidad/unidad.component';
import { SimceEvaluationsComponent } from './simce/evaluations/evaluations.component';
import { EvaluationResultsComponent } from './simce/results/results.component';
import { LeccionComponent } from './leccion/leccion.component';
import { CursoComponent } from './curso/curso.component';
import { AsignaturasComponent } from './asignaturas/asignaturas.component';

import { CoursesAdminComponent } from './admin/courses/courses.component';
import { CourseComponent } from './admin/courses/course/course.component';
import { StudentsAdminComponent } from './admin/students/students.component';
import { TeachersAdminComponent } from './admin/teachers/teachers.component';
import { UsersAdminComponent } from './admin/users/users.component';
import { ReportesComponent } from './reportes/reportes.component';
import { ObjetivosComponent } from './reportes/objetivos/objetivos.component';
import { ActividadesComponent } from './reportes/actividades/actividades.component';

const pagesroutes: Routes = [{
  path: 'pages',
  component: PagesComponent,
  children: [
    {
      path: 'curso/:idCurso',
      component: CursoComponent,
    },
    {
      path: 'asignaturas',
      component: AsignaturasComponent,
    },
    {
      path: 'cursos/unidades/:unidad',
      component: UnidadComponent,
    },
    {
      path: 'cursos/unidades/lecciones/:leccion',
      component: LeccionComponent,
    },
    {
      path: 'reportes',
      component: ReportesComponent,
      children: [
        {
          path: 'objetivos',
          component: ObjetivosComponent
        },
        {
          path: 'actividades',
          component: ActividadesComponent
        }
      ]
    },
    {
      path: 'simce',
      component: SimceEvaluationsComponent
    },
    {
      path: 'simce/resultados',
      component: EvaluationResultsComponent,
    },
    // administrar
    {
      path: 'administrar/cursos',
      component: CoursesAdminComponent,
    },
    {
      path: 'administrar/profesores',
      component: TeachersAdminComponent,
    },
    {
      path: 'administrar/estudiantes',
      component: StudentsAdminComponent,
    },
    {
      path: 'administrar/usuarios',
      component: UsersAdminComponent,
    },
    {
      path: 'administrar/cursos/:curso/asignaturas/:asignatura',
      component: CourseComponent,
    },
  ]
}];

export const PAGES_ROUTES = RouterModule.forChild( pagesroutes );
