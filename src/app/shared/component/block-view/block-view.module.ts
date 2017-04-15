import { BlockViewService } from './block-view.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockViewComponent } from './block-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BlockViewComponent
  ],
  providers: [
    BlockViewComponent,
    BlockViewService
  ],
  exports: [
    BlockViewComponent
  ]
})
export class BlockViewModule { }