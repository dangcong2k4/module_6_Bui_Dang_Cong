import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {path:'',loadChildren: () => import('./home/home-routing.module').then(module => module.HomeRoutingModule)},
  {path:'login',loadChildren: () => import('./log-in/log-in-routing.module').then(module => module.LogInRoutingModule)},
  {path:'food',loadChildren: () => import('./food/food-routing.module').then(module => module.FoodRoutingModule)},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
