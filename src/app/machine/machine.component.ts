import { Component, OnInit } from '@angular/core';

import { DeviceService } from './device.service';
import { PopUpComponent } from './../shared/popUp/popUp.component';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html'
})
export class MachineComponent implements OnInit {

  constructor(public deviceService: DeviceService ,private popup: PopUpComponent) { }

  ngOnInit() {
  }


  add() {
    this.popup.open('新增設備');
  }

  callBackFun(){
    // window.alert('Callback Test');
    this.deviceService.clearEdit();
  }


}