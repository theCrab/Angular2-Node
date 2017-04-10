import { Component, Input } from '@angular/core';

import { ToastComponent } from "app/shared/component/toast/toast.component";
import { PopUpComponent } from "app/shared/component/popUp/popUp.component";

import { DeviceService } from './../device.service';
import { Device } from './../device.model';

import { AlertConfirmService } from "app/shared/component/alert-confirm/alert-confirm.service";
import { AlertConfirmModel } from "app/shared/component/alert-confirm/alert-confirm.model";

@Component({
  selector: `[app-device-item]`,
  templateUrl: './device-item.component.html',
  styleUrls: ['../../production/production-item/production-item.component.css']
})
export class DeviceItemComponent {

  //ALan:要修改的物件
  @Input('app-device-item') item: Device;
  @Input('index') index: number;

  constructor(
    private _deviceService: DeviceService,
    private _toast: ToastComponent,
    private _popup: PopUpComponent,
    private _alertConfirmService: AlertConfirmService) { }


  switchEdit(device: Device) {
    this._deviceService.switchEdit(this.index, device);
    this._popup.open(`修改設備－${device.name}`);
  }

  deleteItem(device: Device) {

    this._alertConfirmService.confirm(new AlertConfirmModel("刪除", "確定要刪除嗎？"))
      .ok(() => {
        this._deviceService.delete(this.index, device)
          .subscribe(
          data => {
            this._toast.setMessage('設備刪除成功.', 'success');
            // console.log(data)
          },
          error => {
            this._toast.setMessage(error, 'warning');
            // console.error(error)
          }
          );
      });
  }
}