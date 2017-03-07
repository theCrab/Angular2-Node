import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PopUpModule } from './../shared/popUp/popUp.module';
import { MyPaginationModule } from './../shared/my-pagination/my-pagination.module';

import { ProductionComponent } from './production.component';
import { ProductionListComponent } from './production-list/production-list.component';
import { ProductionItemComponent } from './production-item/production-item.component';
import { ProductionInputComponent } from './production-input/production-input.component';
import { Ng2PaginationModule } from "ng2-pagination";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    PopUpModule,
    MyPaginationModule
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