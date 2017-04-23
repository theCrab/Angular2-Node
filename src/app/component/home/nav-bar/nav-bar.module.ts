import { NavBarComponent } from './nav-bar.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from "app/component/home/home-routing.module";

@NgModule({
  imports: [
    CommonModule,    HomeRoutingModule,

  ],
  declarations: [
    NavBarComponent
  ],
  exports:[
    NavBarComponent,
    HomeRoutingModule
  ],
})
export class NavBarModule { }