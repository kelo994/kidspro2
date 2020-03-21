import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { CursosComponent } from './cursos/cursos.component';
import { UnidadComponent } from './unidad/unidad.component';
import { SimceComponent } from './simce/simce.component';
import {LeccionComponent} from './leccion/leccion.component';

const pagesroutes: Routes = [{
  path: 'pages',
  component: PagesComponent,
  children: [
    {
      path: 'cursos',
      component: CursosComponent,
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
      component: SimceComponent,
    }
  ]
}];

export const PAGES_ROUTES = RouterModule.forChild( pagesroutes );
