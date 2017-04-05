import { Component, OnInit } from '@angular/core';

import { DeviceService } from './device.service';
import { PopUpComponent } from './../shared/popUp/popUp.component';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html'
})
export class MachineComponent implements OnInit {

  constructor(
    public _deviceService: DeviceService,
    private _popup: PopUpComponent) { }

  ngOnInit() {
  }


  add() {
    this._popup.open('新增設備');
  }

  callBackFun() {
    this._deviceService.clearEdit();
  }


}