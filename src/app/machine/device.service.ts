import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { Device } from './device.model';
import { environment } from "../../environments/environment";
import { AlertConfirmService } from "../shared/alert-confirm/alert-confirm.service";

@Injectable()
export class DeviceService {

    constructor(
        private http: Http,
        private alertConfirmService: AlertConfirmService
    ) { }

    devices: Device[] = [];

    //Alan:修改時使用
    device = new EventEmitter<Device>();

    get() {
        return this.http.get(environment.serverUrl + '/device')
            .map((response: Response) => {
                const devices = response.json().obj;
                let transformedList: Device[] = [];
                for (let device of devices) {
                    transformedList.push(new Device(
                        device._id,
                        device.deviceId,
                        device.name,
                        device.creator)
                    );
                }
                this.devices = transformedList;

                return transformedList;
            })
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
                return Observable.throw(error.json());
            });
    }

    add(device: Device) {
        const body = JSON.stringify(device);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.post(environment.serverUrl + '/device' + token, body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                const device = new Device(
                    result.obj._id,
                    result.obj.deviceId,
                    result.obj.name,
                    result.obj.creator);
                this.devices.push(device);
                return device;
            })
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
                return Observable.throw(error.json())
            });
    }


    delete(device: Device) {
        this.devices.splice(this.devices.indexOf(device), 1);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete(environment.serverUrl + '/device/' + device._id + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
                return Observable.throw(error.json());
            });
    }

    switchEdit(device: Device) {
        this.device.emit(device);
    }

    clearEdit() {
        // this.device.emit(null);
    }


    update(device: Device) {
        const body = JSON.stringify(device);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch(environment.serverUrl + '/device/' + device._id + token, body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                return this.devices[this.devices.indexOf(device)] = new Device(
                    result.obj._id,
                    result.obj.deviceId,
                    result.obj.name,
                    result.obj.creator);
            })
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
                return Observable.throw(error.json());
            });
    }

}