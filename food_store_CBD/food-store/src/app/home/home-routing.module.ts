import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BodyComponent} from "./body/body.component";
import {CartComponent} from "./cart/cart.component";
import {FoodDetailComponent} from "./food-detail/food-detail.component";


const routes: Routes = [
  {path:'',component:BodyComponent},
  {path:'cart',component:CartComponent},
  {path:'detail',component:FoodDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
