import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import {EstablishmentComponent} from './establishment/establishment.component';
import {SubjectComponent} from './subject/subject.component';
import {UnitComponent} from './unit/unit.component';
import {BlockComponent} from './block/block.component';
import {ObjectivesComponent} from './objectives/objectives.component';
import {SkillComponent} from './skill/skill.component';
import {AttitudesComponent} from './attitudes/attitudes.component';


const systempagesroutes: Routes = [
    {
        path: 'system/pages',
        component: PagesComponent,
        children: [
            {
                path: 'establishment',
                component: EstablishmentComponent,
            },
            {
                path: 'subject',
                component: SubjectComponent,
            },
            {
                path: 'subjects/:subject/units',
                component: UnitComponent,
            },
            {
                path: 'subjects/units/:unit/blocks',
                component: BlockComponent,
            },
            {
                path: 'subjects/:subject/objectives',
                component: ObjectivesComponent,
            },
            {
                path: 'subjects/units/:unit/skills',
                component: SkillComponent,
            },
            {
                path: 'subjects/units/:unit/attitudes',
                component: AttitudesComponent,
            }
        ]
    },
];

export const SYSTEM_PAGES_ROUTES = RouterModule.forChild( systempagesroutes );
