import { Component } from '@angular/core';

import { PopUpComponent } from "app/shared/component/popUp/popUp.component";

import { ScheduleService } from './../schedule/schedule.service';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent {

  constructor(
    private _scheduleService: ScheduleService ,
    public _popup: PopUpComponent) { }

  add() {
    this._popup.open('新增設備');
  }

  callBackFun() {    
    this._scheduleService.clearEdit();
  }
}