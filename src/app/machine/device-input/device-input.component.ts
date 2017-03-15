import { PopUpComponent } from './../../shared/popUp/popUp.component';
import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';


import { ToastComponent } from './../../shared/toast/toast.component';
import { DeviceService } from './../device.service';
import { Device } from './../device.model';

@Component({
  selector: 'app-device-input',
  templateUrl: './device-input.component.html',
  styleUrls: ['./device-input.component.css']
})
export class DeviceInputComponent {

  private isAdd: Boolean = true;

  private device: Device;
  private myForm: FormGroup;

  constructor(
    private deviceService: DeviceService,
    private toast: ToastComponent,
    private popup: PopUpComponent) {

    //Alan:訂閱Service裡面的參數
    this.deviceService.device.subscribe(
      (device: Device) => {
        this.device = device;
        if (device) {
          this.isAdd = false;
        } else {
          this.isAdd = true;
        }
      }
    );

    this.myForm = new FormGroup({
      deviceId: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.isAdd) {
      // Create
      const device = new Device(
        null,
        this.myForm.value.deviceId,
        this.myForm.value.name,
      );
      this.deviceService.add(device)
        .subscribe(
        data => {
          this.toast.setMessage('設備建立成功.', 'success');
          console.log(data)
        },
        error => {
          this.toast.setMessage(error, 'warning');
          console.error(error)
        }
        );
    } else {
      // Edit
      this.device.deviceId = this.myForm.value.deviceId;
      this.device.name = this.myForm.value.name;

      this.deviceService.update(this.device)
        .subscribe(
        data => {
          this.toast.setMessage('設備修改成功.', 'success');
          console.log(data)
        },
        error => {
          this.toast.setMessage(error, 'warning');
          console.error(error)
        }
        );
    }
    this.myForm.reset();
    this.popup.close();
  }
}