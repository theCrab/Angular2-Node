import { DataLoadingDirective } from './../../../../shared/directive/data-loading.directive';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MachineRoutingModule } from "./machine-routing.module";

import { MachineComponent } from './machine.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceItemComponent } from './device-item/device-item.component';
import { DeviceInputComponent } from './device-input/device-input.component';
import { FileUploadModule } from 'ng2-file-upload';

import { PopUpModule } from "app/shared/component/popUp/popUp.module";
import { MyPaginationModule } from "app/shared/component/my-pagination/my-pagination.module";
import { FileUrlModule } from "app/shared/pipe/file-url.module";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FileUploadModule,
    MachineRoutingModule,

    PopUpModule,
    MyPaginationModule,
    FileUrlModule
  ],
  declarations: [
    MachineComponent,
    DeviceListComponent,
    DeviceItemComponent,
    DeviceInputComponent,
    DataLoadingDirective

  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MachineModule { }