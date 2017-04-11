import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RunscheduleComponent } from "./runschedule.component";

const routes: Routes = [
  {
    path: '',
    component: RunscheduleComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RunscheduleRoutingModule { }