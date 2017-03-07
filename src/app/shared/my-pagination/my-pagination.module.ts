import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Ng2PaginationModule } from 'ng2-pagination';
import { MyPaginationComponent } from './my-pagination.component';
/**
 * 參考來源
 * https://github.com/michaelbromley/ng2-pagination
 */
@NgModule({
  imports: [
    CommonModule,
    Ng2PaginationModule,
    FormsModule
  ],
  declarations: [
    MyPaginationComponent,
  ],
  providers: [
    MyPaginationComponent,
  ],
  exports: [
    MyPaginationComponent,
    Ng2PaginationModule
  ]
})
export class MyPaginationModule { }