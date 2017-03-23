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
                    transformedList.push(this.createModel(device));
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

        return this.http.post(environment.serverUrl + '/device', body, environment.getRequestOptions())
            .map((response: Response) => {
                const result = response.json();
                const device = this.createModel(result.obj);
                this.devices.push(device);
                return device;
            })
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
                return Observable.throw(error.json())
            });
    }


    delete(device: Device) {

        return this.http.delete(environment.serverUrl + '/device/' + device._id, environment.getRequestOptions())
            .map((response: Response) => {
                this.devices.splice(this.devices.indexOf(device), 1);
                return response.json();
            })
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
                return Observable.throw(error.json());
            });
    }

    switchEdit(device: Device) {
        this.device.emit(device);
    }

    clearEdit() {
        this.device.emit(null);
    }


    update(device: Device) {
        const body = JSON.stringify(device);

        return this.http.patch(environment.serverUrl + '/device/' + device._id, body, environment.getRequestOptions())
            .map((response: Response) => {
                const result = response.json();
                return this.devices[this.devices.indexOf(device)]
                    = this.createModel(result.obj);
            })
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
                return Observable.throw(error.json());
            });
    }

    private createModel(item): Device {
        return new Device(
            item._id,
            item.deviceId,
            item.name,
            item.creator,
            item.createData,
            item.schedule);
    }
}