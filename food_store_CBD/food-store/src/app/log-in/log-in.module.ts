import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogInRoutingModule } from './log-in-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./log-in.component";


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LogInRoutingModule,
    ReactiveFormsModule
  ]
})
export class LogInModule { }
