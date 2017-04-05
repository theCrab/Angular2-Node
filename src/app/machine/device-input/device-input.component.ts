import { PopUpComponent } from './../../shared/popUp/popUp.component';
import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


import { ToastComponent } from './../../shared/toast/toast.component';
import { DeviceService } from './../device.service';
import { Device } from './../device.model';
import { environment } from "../../../environments/environment";

import { FileUploader, FileItem } from "ng2-file-upload";

@Component({
  selector: 'app-device-input',
  templateUrl: './device-input.component.html',
  styleUrls: ['./device-input.component.css']
})
export class DeviceInputComponent {

  private uploader: FileUploader = environment.getUploadConfig('device');
  private isAdd: Boolean = true;

  private device: Device;
  private myForm: FormGroup;

  private filePreviewPath: SafeUrl;
  private fileBoloUrl: string;
  constructor(
    private _deviceService: DeviceService,
    private _toast: ToastComponent,
    private _popup: PopUpComponent,
    private _sanitizer: DomSanitizer) {
    //Alan: generate preview image
    //https://github.com/valor-software/ng2-file-upload/issues/158
    this.uploader.onAfterAddingFile = (fileItem: FileItem) => {

      //Alan:if lenght more than 1, remove first element
      if (this.uploader.queue.length > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[0]);
      }
      //Alan:remove previous blob
      window.URL.revokeObjectURL(this.fileBoloUrl);

      //Alan:create new blob
      this.fileBoloUrl = window.URL.createObjectURL(fileItem._file);
      this.filePreviewPath = this._sanitizer.bypassSecurityTrustUrl((this.fileBoloUrl));
    }

    //Alan:訂閱Service裡面的參數
    this._deviceService.device.subscribe(
      (device: Device) => {
        this.device = device;
        if (device) {
          this.isAdd = false;

          this.filePreviewPath = device.imageUrl;
        } else {
          this.isAdd = true;

          this.filePreviewPath = null;
          //Alan:remove previous blob
          if (this.fileBoloUrl) {
            window.URL.revokeObjectURL(this.fileBoloUrl);
						this.uploader.clearQueue();
            this.fileBoloUrl = null;
            this.filePreviewPath = null;
          }
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
      this._deviceService.add(device, this.uploader.queue[0])
        .subscribe(
        data => {
          this._toast.setMessage('設備建立成功.', 'success');
          console.log(data)
        },
        error => {
          this._toast.setMessage(error, 'warning');
          console.error(error)
        },
        () => {
          this.complete();
        }
        );
    } else {
      // Edit
      this.device.deviceId = this.myForm.value.deviceId;
      this.device.name = this.myForm.value.name;

      this._deviceService.update(this.device, this.uploader.queue[0])
        .subscribe(
        data => {
          this._toast.setMessage('設備修改成功.', 'success');
          console.log(data)
        },
        error => {
          this._toast.setMessage(error, 'warning');
          console.error(error)
        },
        () => {
          this.complete();
        }
        );
    }
  }

  complete() {
    this.myForm.reset();
    this._popup.close();
  }



  // totalProgress: number = 0;
  // upload() {
  //   this.uploader.authToken = localStorage.getItem('token');

  //   // this.uploader.options.additionalParameter = {toUrl};

  //   this.uploader.queue[0].upload();

  //   this.uploader.onProgressAll = (progress: number) => {
  //     this.totalProgress = progress;
  //     // console.log(progress);
  //   };
  // }
}