import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { ScheduleService } from './scheduleManage/schedule/schedule.service';
import { ProductionService } from './scheduleManage/production/production.service';
import { DeviceService } from './scheduleManage/machine/device.service';
import { HomeComponent } from './home.component';
import { NavBlack120Component } from './nav-black120/nav-black120.component';
import { homeRouting } from "./home.routing";

import { AppCanActivateService } from "app/app-canActivate.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    homeRouting,
  ],
  declarations: [
    HomeComponent,
    NavBlack120Component
],
  providers: [
    AppCanActivateService,
    DeviceService,
    ProductionService,
    ScheduleService,
  ]
})
export class HomeModule { }