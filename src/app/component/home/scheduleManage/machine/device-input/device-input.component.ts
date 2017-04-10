import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { ToastComponent } from "app/shared/component/toast/toast.component";
import { PopUpComponent } from "app/shared/component/popUp/popUp.component";

import { DeviceService } from './../device.service';
import { Device } from './../device.model';

import { FileUploader, FileItem } from "ng2-file-upload";
import { Subscription } from "rxjs/Subscription";

import { environment } from "environments/environment";

@Component({
  selector: 'app-device-input',
  templateUrl: './device-input.component.html',
  styleUrls: ['./device-input.component.css']
})
export class DeviceInputComponent implements OnDestroy {

  private subscription$: Subscription;

  public uploader: FileUploader = environment.getUploadConfig('device');
  public isAdd: Boolean = true;

  public device: Device;
  public myForm: FormGroup;
  public submitted: boolean = false;


  public filePreviewPath: SafeUrl;
  public fileBoloUrl: string;

  constructor(
    private _deviceService: DeviceService,
    private _toast: ToastComponent,
    private _popup: PopUpComponent,
    private _sanitizer: DomSanitizer) {

    this.myForm = new FormGroup({
      deviceId: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
    });
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
    this.subscription$ = this._deviceService.device.subscribe(
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
  }

  onSubmit() {
    this.submitted = true;
    if (this.myForm.valid) {
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
            // console.log(data)
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
            // console.log(data)
          },
          error => {
            this._toast.setMessage(error, 'warning');
            // console.error(error)
          },
          () => {
            this.complete();
          }
          );
      }
    }
  }

  complete() {
    this.submitted = false;
    this.myForm.reset();
    this._popup.close();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
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