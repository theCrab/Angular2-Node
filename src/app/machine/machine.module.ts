import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';

import { MachineComponent } from './machine.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceItemComponent } from './device-item/device-item.component';
import { DeviceInputComponent } from './device-input/device-input.component';

import { PopUpComponent } from './../shared/popUp/popUp.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
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