import { Component, ElementRef } from '@angular/core';

import { PopUpComponent } from './../shared/popUp/popUp.component';

import { ScheduleService } from './../schedule/schedule.service';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent {

  constructor(
    private _scheduleService: ScheduleService ,
    private _popup: PopUpComponent,
    private _elem: ElementRef) { }

  add() {
    this._popup.open('新增設備');
  }

  callBackFun() {    
    this._scheduleService.clearEdit();
  }
}