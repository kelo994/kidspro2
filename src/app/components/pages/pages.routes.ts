import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { CursosComponent } from './cursos/cursos.component';

const pagesroutes: Routes = [{
  path: 'pages',
  component: PagesComponent,
  children: [
    {
      path: 'cursos',
      component: CursosComponent,
    }
  ]
}];

export const PAGES_ROUTES = RouterModule.forChild( pagesroutes );
