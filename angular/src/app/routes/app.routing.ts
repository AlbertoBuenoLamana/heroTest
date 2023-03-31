import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesHomeComponent } from '../components/heroes-home/heroes-home.component';

const appRoutes: Routes = [
  //Por defecto redirigir al HOME, se puede poner una página no encontrada
  { path: '**', redirectTo: '/home' },
  { path: 'home', component: HeroesHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
