import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NzConfig, NZ_CONFIG, NZ_I18N, es_ES } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { LandingComponent, DialogDataExampleDialog } from './components/landing/landing.component';
import { MaterialModule } from './material.module';
import { AuthModule } from './components/auth/auth.module';
import { PagesModule } from './components/pages/pages.module';
import { StudentModule } from './components/student/student.module';
//
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EmbedVideo } from 'ngx-embed-video';
import { UnityLinkerModule } from './components/modules/unity-linker/unity-linker.module';

// Charts
import { ChartsModule } from 'ng2-charts';
import { ChartModule } from 'angular-highcharts';
import { HighchartsService } from './services/highcharts.service';
import { GameComponent } from './components/game/game.component';
registerLocaleData(es);

// Configuraciones sglobales ngZorro
const ngZorroConfig: NzConfig = {
  notification: { nzPlacement: "bottomRight" }
};

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DialogDataExampleDialog,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthModule,
    PagesModule,
    StudentModule,
    Ng2SearchPipeModule,
    EmbedVideo.forRoot(),
    ChartModule,
    ChartsModule,
    UnityLinkerModule,
  ],
  exports: [Ng2SearchPipeModule],
  entryComponents: [DialogDataExampleDialog],
  providers: [{ provide: NZ_I18N, useValue: es_ES }, { provide: NZ_CONFIG, useValue: ngZorroConfig }, HighchartsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
