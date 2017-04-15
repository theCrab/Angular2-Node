import { FileItem } from 'ng2-file-upload';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { Device } from 'app/model/device.model';

import { environment } from "environments/environment";
import { AlertConfirmService } from "app/shared/component/alert-confirm/alert-confirm.service";
import { BlockViewService } from "app/shared/component/block-view/block-view.service";

import { Subject } from "rxjs/Subject";

@Injectable()
export class DeviceService {

    constructor(
        private _http: Http,
        private _alertConfirmService: AlertConfirmService,
        private _blockViewService: BlockViewService
    ) { }

    private devices: Device[] = [];
    private editIndex: number;

    public device = new Subject<Device>();
    public devicesChanged = new Subject<Device[]>();

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
        this._blockViewService.block("儲存中...");
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
        this._blockViewService.block("儲存中...");
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

    delete(index: number, device: Device) {
        this._blockViewService.block("刪除中...");

        return this._http.delete(`${environment.serverUrl}/device/${device._id}`, environment.getRequestOptions())
            .map((response: Response) => {
                this.devices.splice(index, 1);

                this.devicesChanged.next(this.devices.slice());
                return this.devices;
            })
            .do(() => {
                this._blockViewService.unblock();
            })
            .catch((error: Response) => {
                this._blockViewService.unblock();
                this._alertConfirmService.alert(error.json());
                return Observable.throw(error.json());
            });
    }

    switchEdit(index: number, device: Device) {
        this.editIndex = index;
        this.device.next(Object.assign({}, device));
    }
    clearEdit() {
        this.editIndex = null;
        this.device.next(null);
    }

    postAdd(device: Device): Observable<any> {
        let body = JSON.stringify(device);

        return this._http.post(environment.serverUrl + '/device', body, environment.getRequestOptions())
            .map((response: Response) => {
                let device = this.createModel(response.json().obj);
                this.devices.push(device);

                this.devicesChanged.next(this.devices.slice());

                return device;
            })
            .do(() => {
                this._blockViewService.unblock();
            })
            .catch((error: Response) => {
                this._blockViewService.unblock();
                this._alertConfirmService.alert(error.json());
                return Observable.throw(error.json())
            });
    }

    postUpdate(device: Device): Observable<any> {
        let body = JSON.stringify(device);

        return this._http.patch(environment.serverUrl + '/device/' + device._id, body, environment.getRequestOptions())
            .map((response: Response) => {
                this.devices[this.editIndex]
                    = this.createModel(response.json().obj);

                this.devicesChanged.next(this.devices.slice());
                return device;
            })
            .do(() => {
                this._blockViewService.unblock();
            })
            .catch((error: Response) => {
                this._blockViewService.unblock();
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