import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageComponent } from './manage.component';
import { ManageRoutingModule } from './manage-routing.module';
import { NavBarModule } from "app/component/home/nav-bar/nav-bar.module";

@NgModule({
  imports: [
    CommonModule,
    ManageRoutingModule
  ],
  declarations: [
    ManageComponent
  ]

})
export class ManageModule { }
