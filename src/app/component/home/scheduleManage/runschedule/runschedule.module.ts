import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RunscheduleRoutingModule } from './runschedule-routing.module';

import { RunscheduleComponent } from './runschedule.component';
import { RunscheduleInputComponent } from './runschedule-input/runschedule-input.component';
import { RunscheduleItemComponent } from './runschedule-item/runschedule-item.component';
import { RunscheduleListComponent } from './runschedule-list/runschedule-list.component';
import { PopUpModule } from 'app/shared/component/popUp/popUp.module';

import { MyPaginationModule } from "app/shared/component/my-pagination/my-pagination.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RunscheduleRoutingModule,
    MyPaginationModule,
    PopUpModule
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