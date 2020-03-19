import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';

const pagesroutes: Routes = [{
  path: 'pages',
  component: PagesComponent
}];

export const PAGES_ROUTES = RouterModule.forChild( pagesroutes );
