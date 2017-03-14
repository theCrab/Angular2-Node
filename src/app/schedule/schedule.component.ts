import { Component } from '@angular/core';

import { PopUpComponent } from './../shared/popUp/popUp.component';

import { ScheduleService } from './../schedule/schedule.service';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent  {

  constructor(
    private scheduleService: ScheduleService ,
    private popup: PopUpComponent) { }

  add() {
    this.popup.open('新增設備');
    this.scheduleService.switchEdit(null);
  }

  callBackFun() {
    // window.alert('Callback Test');
  }
}