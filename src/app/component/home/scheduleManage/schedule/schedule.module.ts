import { ScheduleRoutes } from './schedule.routing';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ScheduleComponent } from './schedule.component';
import { ScheduleInputComponent } from './schedule-input/schedule-input.component';
import { ScheduleItemComponent } from './schedule-item/schedule-item.component';

import { CalendarModule } from 'primeng/primeng';

import { PopUpModule } from "app/shared/component/popUp/popUp.module";
import { MyPaginationModule } from "app/shared/component/my-pagination/my-pagination.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScheduleRoutes,
    
    PopUpModule,
    MyPaginationModule,
    CalendarModule

  ],
  declarations: [
    ScheduleComponent,
    ScheduleListComponent,
    ScheduleInputComponent,
    ScheduleItemComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ScheduleModule { }