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

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RunscheduleModule,
    ScheduleModule,
    ProductionModule,
    MachineModule,
    homeRouting,
  ],
  declarations: [
  ],
  providers: [
    AppCanActivateService,
    DeviceService,
    ProductionService,
    ScheduleService,
  ]
})
export class HomeModule { }