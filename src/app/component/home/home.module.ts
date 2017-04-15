import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { HomeComponent } from './home.component';
import { NavBlack120Component } from './nav-black120/nav-black120.component';
import { HomeRoutingModule } from "./home-routing.module";
import { DeviceService } from "app/services/device.service";
import { ProductionService } from "app/services/production.service";
import { ScheduleService } from "app/services/schedule.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
    NavBlack120Component
],
  providers: [
    DeviceService,
    ProductionService,
    ScheduleService,
  ]
})
export class HomeModule { }