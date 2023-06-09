import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {TrashCanComponent} from "./trash-can/trash-can.component";
import {CreateComponent} from "./create/create.component";
import {EditComponent} from "./edit/edit.component";


const routes: Routes = [
  {path:'',component:ListComponent},
  {path:'trashCan',component:TrashCanComponent},
  {path:'create',component:CreateComponent},
  {path:'edit/:id',component:EditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodRoutingModule { }
