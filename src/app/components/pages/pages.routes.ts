import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { UnidadComponent } from './unidad/unidad.component';
import { SimceEvaluationsComponent } from './simce/evaluations/evaluations.component';
import { EvaluationResultsComponent } from './simce/results/results.component';
import { LeccionComponent } from './leccion/leccion.component';
import { CursoComponent } from './curso/curso.component';
import { AsignaturasComponent } from './asignaturas/asignaturas.component';

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
      path: 'simce',
      component: SimceEvaluationsComponent
    },
    {
      path: 'simce/resultados',
      component: EvaluationResultsComponent,
    }
  ]
}];

export const PAGES_ROUTES = RouterModule.forChild( pagesroutes );
