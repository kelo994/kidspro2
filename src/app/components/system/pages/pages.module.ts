import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule} from 'ng-zorro-antd';
import { NZ_I18N, es_ES, NzI18nService } from 'ng-zorro-antd/i18n';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { EstablishmentComponent } from './establishment/establishment.component';
import { SYSTEM_PAGES_ROUTES } from './pages.routes';
import {PagesComponent} from "./pages.component";
import { SubjectComponent } from './subject/subject.component';
import { UnitComponent } from './unit/unit.component';
import { BlockComponent } from './block/block.component';
import { ObjectivesComponent } from './objectives/objectives.component';
import { SkillComponent } from './skill/skill.component';
import { AttitudesComponent } from './attitudes/attitudes.component';
import { RepositoryComponent } from './repository/repository.component';
import { LinkobjetivesComponent } from './linkobjetives/linkobjetives.component';
import { OfficialComponent } from './official/official.component';
import { BlogComponent } from './blog/blog.component';


@NgModule({
  declarations: [
      EstablishmentComponent,
    PagesComponent,
    SubjectComponent,
    UnitComponent,
    BlockComponent,
    ObjectivesComponent,
    SkillComponent,
    AttitudesComponent,
    RepositoryComponent,
    LinkobjetivesComponent,
    OfficialComponent,
    BlogComponent,

  ],
  imports: [
    SYSTEM_PAGES_ROUTES,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    Ng2SearchPipeModule,
  ]
})
export class PagesModule { }
