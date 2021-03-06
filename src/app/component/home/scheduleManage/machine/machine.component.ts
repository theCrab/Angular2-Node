import { Component, OnInit } from '@angular/core';


import { PopUpComponent } from "app/shared/component/popUp/popUp.component";
import { DeviceService } from "app/services/device.service";

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html'
})
export class MachineComponent {

  // public search$ = new Subject<string>();
  constructor(
    private _deviceService: DeviceService,
    public _popup: PopUpComponent) {
    // this.search$
    //   .debounceTime(500)
    //   .subscribe(value => this._deviceService.search(value));
  }

  add() {
    this._popup.open('新增設備');
  }

  callBackFun() {
    this._deviceService.clearEdit();
  }
}