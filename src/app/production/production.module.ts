import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';

import { ProductionComponent } from './production.component';
import { ProductionListComponent } from './production-list/production-list.component';
import { ProductionItemComponent } from './production-item/production-item.component';
import { ProductionInputComponent } from './production-input/production-input.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
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