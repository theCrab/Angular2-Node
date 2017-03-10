import { MyPaginationModule } from './../shared/my-pagination/my-pagination.module';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PopUpModule } from './../shared/popUp/popUp.module';

import { ScheduleComponent } from './schedule.component';
import { ScheduleInputComponent } from './schedule-input/schedule-input.component';
import { ScheduleItemComponent } from './schedule-item/schedule-item.component';

import { CalendarModule } from 'primeng/primeng';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

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