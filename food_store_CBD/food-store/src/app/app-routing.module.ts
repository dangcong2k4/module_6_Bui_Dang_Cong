import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogInComponent} from "./log-in/log-in.component";
import {BodyComponent} from "./home/body/body.component";
import {CartComponent} from "./home/cart/cart.component";


const routes: Routes = [
  {path:'',component:BodyComponent},
  {path:'login',component:LogInComponent},
  {path:'body',component:BodyComponent},
  {path:'cart',component:CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
