import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodRoutingModule } from './food-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { TrashCanComponent } from './trash-can/trash-can.component';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [TrashCanComponent, CreateComponent],
  imports: [
    CommonModule,
    FoodRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class FoodModule { }
