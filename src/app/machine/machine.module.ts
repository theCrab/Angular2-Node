import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PopUpModule } from './../shared/popUp/popUp.module';
import { MyPaginationModule } from './../shared/my-pagination/my-pagination.module';

import { MachineComponent } from './machine.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceItemComponent } from './device-item/device-item.component';
import { DeviceInputComponent } from './device-input/device-input.component';

import { PopUpComponent } from './../shared/popUp/popUp.component';
import { MachineRoutes } from "./machine.routing";
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FileUploadModule,
    MachineRoutes,

    PopUpModule,
    MyPaginationModule
  ],
  declarations: [
    MachineComponent,
    DeviceListComponent,
    DeviceItemComponent,
    DeviceInputComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MachineModule { }