import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { GameComponent } from './components/game/game.component';
import { DarkComponent } from './components/game/dark/dark.component';
import {EstablecimientosComponent} from './components/establecimientos/establecimientos.component';

const routes: Routes = [
  { path: 'game/:asig/:bloque/:leccion/:idEstudiante/:nombre/:apellido', component: GameComponent },
  { path: 'game', component: DarkComponent },
  { path: 'establecimientos', component: EstablecimientosComponent },
  { path: '', component: LandingComponent},
  { path: '', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
