import { MyPaginationModule } from './../shared/my-pagination/my-pagination.module';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PopUpModule } from './../shared/popUp/popUp.module';

import { ScheduleComponent } from './schedule.component';
import { ScheduleInputComponent } from './schedule-input/schedule-input.component';
import { ScheduleItemComponent } from './schedule-item/schedule-item.component';

import { TimepickerModule } from 'ng2-bootstrap/timepicker';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { MyDatepickerComponent } from './../shared/my-datepicker/my-datepicker.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    PopUpModule,
    MyPaginationModule,


    TimepickerModule.forRoot(),
    DropdownModule.forRoot(),
    DatepickerModule.forRoot(),
  ],
  declarations: [
    ScheduleComponent,
    ScheduleListComponent,
    ScheduleInputComponent,
    ScheduleItemComponent,
    MyDatepickerComponent

  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ScheduleModule { }