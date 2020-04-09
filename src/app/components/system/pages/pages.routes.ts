import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import {EstablishmentComponent} from './establishment/establishment.component';


const systempagesroutes: Routes = [
    {
        path: 'system/pages',
        component: PagesComponent,
        children: [
            {
                path: 'establishment',
                component: EstablishmentComponent,
            }
        ]
    },
];

export const SYSTEM_PAGES_ROUTES = RouterModule.forChild( systempagesroutes );
