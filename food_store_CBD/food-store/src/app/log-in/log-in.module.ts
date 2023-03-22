import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogInRoutingModule } from './log-in-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./log-in.component";
import {ShareService} from "../service/JWT/share.service";


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LogInRoutingModule,
    ReactiveFormsModule
  ],
  providers:[
    ShareService
  ]
})
export class LogInModule { }
