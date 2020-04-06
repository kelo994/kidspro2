import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { GameComponent } from './components/game/game.component';

const routes: Routes = [
  { path: 'game/:asig/:bloque/:leccion/:idEstudiante/:nombre/:apellido', component: GameComponent },
  { path: '', component: LandingComponent},
  { path: '', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
