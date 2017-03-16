import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { MachineModule } from './../machine/machine.module';
import { ProductionModule } from './../production/production.module';
import { ScheduleModule } from './../schedule/schedule.module';

import { RunscheduleComponent } from "./../runschedule/runschedule.component";

import { AppCanActivateService } from "../app-canActivate.service";

import { RunscheduleModule } from "../runschedule/runschedule.module";
import { DeviceService } from "../machine/device.service";
import { ProductionService } from "../production/production.service";
import { ScheduleService } from "../schedule/schedule.service";

import { homeRouting } from "./home.routing";
import { NavBlack120Component } from './nav-black120/nav-black120.component';

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