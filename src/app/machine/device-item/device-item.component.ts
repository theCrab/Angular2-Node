import { AlertConfirmModel } from './../../shared/alert-confirm/alert-confirm.model';
import { Component, Input } from '@angular/core';

import { ToastComponent } from './../../shared/toast/toast.component';
import { PopUpComponent } from './../../shared/popUp/popUp.component';

import { DeviceService } from './../device.service';
import { Device } from './../device.model';
import { AlertConfirmService } from "../../shared/alert-confirm/alert-confirm.service";

@Component({
  selector: `[app-device-item]`,
  templateUrl: './device-item.component.html',
  styleUrls: ['../../production/production-item/production-item.component.css']
})
export class DeviceItemComponent  {

  //ALan:要修改的物件
  @Input('app-device-item') item: Device;

  constructor(
    private deviceService: DeviceService,
    private toast: ToastComponent,
    private popup: PopUpComponent,
    private alertConfirmService: AlertConfirmService) { }


  switchEdit(device: Device) {
    this.deviceService.switchEdit(device);
    this.popup.open(`修改設備－${device.name}`);
  }

  deleteItem(device: Device) {

    this.alertConfirmService.confirm(new AlertConfirmModel("刪除", "確定要刪除嗎？"))
      .ok(() => {
        this.deviceService.delete(device)
          .subscribe(
          data => {
            this.toast.setMessage('設備刪除成功.', 'success');
            console.log(data)
          },
          error => {
            this.toast.setMessage(error, 'warning');
            console.error(error)
          }
          );
      });
  }
}