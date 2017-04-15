import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ProductionComponent } from './production.component';
import { ProductionListComponent } from './production-list/production-list.component';
import { ProductionItemComponent } from './production-item/production-item.component';
import { ProductionInputComponent } from './production-input/production-input.component';
import { Ng2PaginationModule } from "ng2-pagination";

import { CalendarModule, SpinnerModule } from 'primeng/primeng';
import { FileUploadModule } from "ng2-file-upload";

import { PopUpModule } from "app/shared/component/popUp/popUp.module";
import { MyPaginationModule } from "app/shared/component/my-pagination/my-pagination.module";
import { FileUrlModule } from "app/shared/pipe/file-url.module";

import { ProductionRoutingModule } from "./production-routing.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductionRoutingModule,

    FileUploadModule,

    FormsModule,

    PopUpModule,
    MyPaginationModule,

    CalendarModule,
    SpinnerModule,
    FileUrlModule
  ],
  declarations: [
    ProductionComponent,
    ProductionListComponent,
    ProductionItemComponent,
    ProductionInputComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProductionModule { }