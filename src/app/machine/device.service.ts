import { FileItem } from 'ng2-file-upload';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { Device } from './device.model';
import { environment } from "../../environments/environment";
import { AlertConfirmService } from "../shared/alert-confirm/alert-confirm.service";

@Injectable()
export class DeviceService {

    constructor(
        private _http: Http,
        private _alertConfirmService: AlertConfirmService
    ) { }

    devices: Device[] = [];

    //Alan:修改時使用
    device = new EventEmitter<Device>();

    get() {
        return this._http.get(environment.serverUrl + '/device')
            .map((response: Response) => {
                let devices = response.json().obj;
                let transformedList: Device[] = [];
                for (let device of devices) {
                    transformedList.push(this.createModel(device));
                }
                this.devices = transformedList;

                return transformedList;
            })
            .catch((error: Response) => {
                this._alertConfirmService.alert(error.json());
                return Observable.throw(error.json());
            });
    }

    add(device: Device, img: FileItem) {

        if (img) {
            return this.upload(img._file)
                .concatMap(
                (response: Response) => {
                    let file = response.json();

                    device.imageUrl = file.obj[0].path;
                    return this.postAdd(device);
                });
        } else {
            return this.postAdd(device);
        }

        // (inner, outter, eIndex, resIndex) => {
        //     // let result = outter.json();
        //     // let device = this.createModel(result.obj);
        //     // this.devices.push(device);
        //     // return device;
        // })
        // .catch((error: Response) => {
        //     this.alertConfirmService.alert(error.json());
        //     return Observable.throw(error.json())
        // });
    }

    update(device: Device, img: FileItem) {
        let body = JSON.stringify(device);

        if (img) {
            return this.upload(img._file)
                .concatMap(
                (response: Response) => {
                    let file = response.json();

                    device.imageUrl = file.obj[0].path;
                    return this.postUpdate(device);
                });
        } else {
            return this.postUpdate(device);
        }
    }

    delete(device: Device) {

        return this._http.delete(`${environment.serverUrl}/device/${device._id}`, environment.getRequestOptions())
            .map((response: Response) => {
                this.devices.splice(this.devices.indexOf(device), 1);
                return response.json();
            })
            .catch((error: Response) => {
                this._alertConfirmService.alert(error.json());
                return Observable.throw(error.json());
            });
    }

    switchEdit(device: Device) {
        this.device.emit(device);
    }
    clearEdit() {
        this.device.emit(null);
    }

    postAdd(device: Device): Observable<any> {
        let body = JSON.stringify(device);

        return this._http.post(environment.serverUrl + '/device', body, environment.getRequestOptions())
            .map((response: Response) => {
                let result = response.json();
                let device = this.createModel(result.obj);
                this.devices.push(device);
                return device;
            })
            .catch((error: Response) => {
                this._alertConfirmService.alert(error.json());
                return Observable.throw(error.json())
            });
    }

    postUpdate(device: Device): Observable<any> {
        let body = JSON.stringify(device);

        return this._http.patch(environment.serverUrl + '/device/' + device._id, body, environment.getRequestOptions())
            .map((response: Response) => {
                let result = response.json();
                return this.devices[this.devices.indexOf(device)]
                    = this.createModel(result.obj);
            })
            .catch((error: Response) => {
                this._alertConfirmService.alert(error.json());
                return Observable.throw(error.json());
            });
    }

    upload(file: File): Observable<any> {
        let formData: FormData = new FormData();
        formData.append('MMSUploadFile', file, file.name);
        formData.append('toUrl', 'device');

        return this._http.post(environment.serverUrl + "/file/upload", formData, new RequestOptions({
            headers: new Headers({
                'authorization': sessionStorage.getItem('token')
            })
        }))
            .map(res => res)
            .catch(error => Observable.throw(error))
    }


    private createModel(item): Device {
        return new Device(
            item._id,
            item.deviceId,
            item.name,
            item.creator,
            item.createData,
            item.schedule,
            item.imageUrl);
    }
}