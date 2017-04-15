import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from "rxjs/Observable";
import { Subject } from 'rxjs/Subject';

import { Schedule } from "app/model/schedule.model";

import { AlertConfirmService } from "app/shared/component/alert-confirm/alert-confirm.service";
import { environment } from "environments/environment";
import { BlockViewService } from "app/shared/component/block-view/block-view.service";

@Injectable()
export class ScheduleService {

    constructor(
        private _http: Http,
        private _alertConfirmService: AlertConfirmService,
        private _blockViewService: BlockViewService
    ) { }

    private schedules: Schedule[] = [];
    private editIndex: number;

    public schedule = new Subject<Schedule>();
    public schedulesChanged = new Subject<Schedule[]>();

    public isLoading = new Subject<boolean>();

    get() {
        this.isLoading.next(true);

        return this._http.get(environment.serverUrl + '/schedule')
            .map((response: Response) => {
                this.schedules = response.json().obj
                    .map((item) => {
                        return this.createModel(item)
                    });
                this.schedulesChanged.next(this.schedules.slice());
                return this.schedules;
            })
            .do(() => {
                this.isLoading.next(false);
            })
            .catch((error: Response) => {
                this._alertConfirmService.alert(error.json());
                return Observable.throw(error.json());
            });
    }

    add(schedule: Schedule) {
        this._blockViewService.block("儲存中...");

        const body = JSON.stringify(schedule);

        return this._http.post(environment.serverUrl + '/schedule', body, environment.getRequestOptions())
            .map((response: Response) => {
                let schedule = this.createModel(response.json().obj);
                this.schedules.push(schedule);

                this.schedulesChanged.next(this.schedules.slice());

                return schedule;
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

    update(formData: any) {
        this._blockViewService.block("儲存中...");
        var tmp: any;
        if (!formData._id) {
            tmp = Object.assign({}, this.schedules[this.editIndex]);

            tmp.scheduleDate = formData.scheduleDate;
            tmp.production = formData.production;
            tmp.device = formData.device;
            tmp.createData = new Date();
        } else {
            tmp = formData;
        }
        const body = JSON.stringify(tmp);

        return this._http.patch(environment.serverUrl + '/schedule/' + tmp._id, body, environment.getRequestOptions())

            .map((response: Response) => {
                this.schedules[this.editIndex]
                    = this.createModel(response.json().obj);

                this.schedulesChanged.next(this.schedules.slice());

                return this.schedules[this.editIndex];
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

    delete(index: number, schedule: Schedule) {
        this._blockViewService.block("刪除中...");

        return this._http.delete(environment.serverUrl + '/schedule/' + schedule._id, environment.getRequestOptions())
            .map((response: Response) => {
                this.schedules.splice(index, 1);

                this.schedulesChanged.next(this.schedules.slice());

                return this.schedule;
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

    switchEdit(index: number, schedule: Schedule) {
        this.editIndex = index;
        this.schedule.next(Object.assign({}, schedule));
    }

    clearEdit() {
        this.editIndex = null;
        this.schedule.next(null);
    }

    search(schedule?: Schedule) {
        this.isLoading.next(true);

        const body = JSON.stringify(schedule);

        return this._http.post(environment.serverUrl + '/schedule/s', body, environment.getRequestOptions())

            .do(() => {
                this.isLoading.next(false);
            })
            .map((response: Response) => {
                this.schedules = response.json().obj
                    .map((item) => {
                        return this.createModel(item)
                    });
                this.schedulesChanged.next(this.schedules.slice());

                return this.schedules;
            })
            .catch((error: Response) => {
                this.isLoading.next(false);
                // this.alertConfirmService.alert(
                //     {
                //         title: '無資料',
                //         message: '不存在的編號!'
                //     }
                // );
                return Observable.throw(error.json());
            });
    }

    private createModel(item): Schedule {
        return new Schedule(
            item.scheduleDate,
            item.production,
            item.device,
            item.creator,
            item.createData,
            item._id,
            item.actionDate,
            item.finishDate);
    }

}