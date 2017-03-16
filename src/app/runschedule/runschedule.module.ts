import { MyPaginationModule } from './../shared/my-pagination/my-pagination.module';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RunscheduleComponent } from './runschedule.component';
import { RunscheduleInputComponent } from './runschedule-input/runschedule-input.component';
import { RunscheduleItemComponent } from './runschedule-item/runschedule-item.component';
import { RunscheduleListComponent } from './runschedule-list/runschedule-list.component';
import { RunscheduleRoutes } from "./runschedule.routing";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RunscheduleRoutes,
    MyPaginationModule,
  ],
  declarations: [
    RunscheduleComponent,
    RunscheduleInputComponent,
    RunscheduleItemComponent,
    RunscheduleListComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class RunscheduleModule { }