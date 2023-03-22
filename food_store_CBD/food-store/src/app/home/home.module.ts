import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import { FoodDetailComponent } from './food-detail/food-detail.component';


@NgModule({
  declarations: [FoodDetailComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
