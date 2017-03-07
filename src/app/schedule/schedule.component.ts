import { Component, OnInit } from '@angular/core';

import { PopUpComponent } from './../shared/popUp/popUp.component';

import { ScheduleService } from './../schedule/schedule.service';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent implements OnInit {

  constructor(
    private scheduleService: ScheduleService ,
    private popup: PopUpComponent) { }

  ngOnInit() {
  }

  add() {
    this.popup.open('新增設備');
  }

  callBackFun() {
    // window.alert('Callback Test');
    this.scheduleService.clearEdit();
  }
}