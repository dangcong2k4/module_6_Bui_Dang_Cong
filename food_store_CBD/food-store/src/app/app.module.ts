import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './log-in/log-in.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { BodyComponent } from './home/body/body.component';
import { CartComponent } from './home/cart/cart.component';
import { FoodDetailComponent } from './home/food-detail/food-detail.component';
import {HomeModule} from "./home/home.module";
import {LogInModule} from "./log-in/log-in.module";
import { ListComponent } from './food/list/list.component';
import {FoodModule} from "./food/food.module";
import {ShareService} from "./service/JWT/share.service";

@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    CartComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    LogInModule,
    FoodModule
  ],
  providers: [ShareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
