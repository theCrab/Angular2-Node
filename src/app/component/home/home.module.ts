import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { HomeComponent } from './home.component';
import { DeviceService } from "app/services/device.service";
import { ProductionService } from "app/services/production.service";
import { ScheduleService } from "app/services/schedule.service";
import { NavBarModule } from "app/component/home/nav-bar/nav-bar.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavBarModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    DeviceService,
    ProductionService,
    ScheduleService,
  ]
})
export class HomeModule { }