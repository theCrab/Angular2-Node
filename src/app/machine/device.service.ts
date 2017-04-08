import { FileItem } from 'ng2-file-upload';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { Device } from './device.model';
import { environment } from "../../environments/environment";
import { AlertConfirmService } from "../shared/alert-confirm/alert-confirm.service";

import { Subject } from "rxjs/Subject";

@Injectable()
export class DeviceService {

    constructor(
        private _http: Http,
        private _alertConfirmService: AlertConfirmService
    ) { }

    devices: Device[] = [];

    device = new Subject<Device>();
    devicesChanged = new Subject<Device[]>();

    get() {
        return this._http.get(environment.serverUrl + '/device')
            .map((response: Response) => {
                this.devices = response.json().obj
                    .map((item) => {
                        return this.createModel(item)
                    });
                this.devicesChanged.next(this.devices.slice());
                return this.devices;
            })
            .catch((error: Response) => {
                this._alertConfirmService.alert(error.json());
                return Observable.throw(error.json());
            });
    }

    search(value: string) {
        let searchTmp = this.devices.filter(device => {
            return device.name.toLocaleLowerCase().includes(value);
        });
        this.devicesChanged.next(searchTmp);
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

                this.devicesChanged.next(this.devices.slice());
                return this.devices;
            })
            .catch((error: Response) => {
                this._alertConfirmService.alert(error.json());
                return Observable.throw(error.json());
            });
    }

    switchEdit(device: Device) {
        this.device.next(device);
    }
    clearEdit() {
        this.device.next(null);
    }

    postAdd(device: Device): Observable<any> {
        let body = JSON.stringify(device);

        return this._http.post(environment.serverUrl + '/device', body, environment.getRequestOptions())
            .map((response: Response) => {
                let result = response.json();
                let device = this.createModel(result.obj);
                this.devices.push(device);

                this.devicesChanged.next(this.devices.slice());

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
                this.devices[this.devices.indexOf(device)] = this.createModel(result.obj);

                this.devicesChanged.next(this.devices.slice());
                return this.devices;
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