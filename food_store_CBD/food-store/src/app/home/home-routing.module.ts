import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BodyComponent} from "./body/body.component";
import {CartComponent} from "./cart/cart.component";
import {FoodDetailComponent} from "./food-detail/food-detail.component";
import {EmployeeGuard} from "../service/JWT/employee.guard";
import {CustomerGuard} from "../service/JWT/customer.guard";


const routes: Routes = [
  {path:'',component:BodyComponent},
  {path:'cart',component:CartComponent,canActivate:[CustomerGuard]},
  {path:'detail/:id',component:FoodDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
