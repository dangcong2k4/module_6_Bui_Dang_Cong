import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {TrashCanComponent} from "./trash-can/trash-can.component";
import {CreateComponent} from "./create/create.component";


const routes: Routes = [
  {path:'',component:ListComponent},
  {path:'trashCan',component:TrashCanComponent},
  {path:'create',component:CreateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodRoutingModule { }
