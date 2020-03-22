import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { CursosComponent } from './cursos/cursos.component';
import { SimceComponent } from './simce/simce.component';
import { SimceEvaluationsComponent } from './simce/evaluations/evaluations.component';
import { EvaluationResultsComponent } from './simce/results/results.component';

const pagesroutes: Routes = [{
  path: 'pages',
  component: PagesComponent,
  children: [
    {
      path: 'cursos',
      component: CursosComponent,
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
