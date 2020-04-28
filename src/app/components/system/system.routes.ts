import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './system.component';


const routes: Routes = [
    {
        path: 'system',
        component: SystemComponent
    }
];

export const SYSTEM_ROUTES = RouterModule.forChild( routes );
