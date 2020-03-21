import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { CursoComponent } from './curso/curso.component';
import { SimceComponent } from './simce/simce.component';
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
      path: 'simce',
      component: SimceComponent,
    }
  ]
}];

export const PAGES_ROUTES = RouterModule.forChild( pagesroutes );
