import { Component, OnInit, Input } from '@angular/core';

import { ToastComponent } from './../../shared/toast/toast.component';
import { PopUpComponent } from './../../shared/popUp/popUp.component';

import { DeviceService } from './../device.service';
import { Device } from './../device.model';
@Component({
  selector: '[app-device-item]',
  templateUrl: './device-item.component.html',
  styleUrls: ['./device-item.component.css']
})
export class DeviceItemComponent implements OnInit {

  //ALan:要修改的物件
  @Input() item: Device;

  constructor(
    private deviceService: DeviceService,
    private toast: ToastComponent,
    private popup: PopUpComponent) { }

  ngOnInit() { }

  switchEdit(device: Device) {
    this.deviceService.switchEdit(device);
    this.popup.open(`修改設備－${device.name}`);
  }

  deleteItem(device: Device) {
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
  }
}