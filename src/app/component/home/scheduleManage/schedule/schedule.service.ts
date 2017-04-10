import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from "rxjs/Observable";
import { Subject } from 'rxjs/Subject';

import { Schedule } from './schedule.model';

import { AlertConfirmService } from "app/shared/component/alert-confirm/alert-confirm.service";
import { environment } from "environments/environment";

@Injectable()
export class ScheduleService {

    constructor(
        private http: Http,
        private alertConfirmService: AlertConfirmService
    ) { }

    private schedules: Schedule[] = [];
    private editIndex: number;

    public schedule = new Subject<Schedule>();
    public schedulesChanged = new Subject<Schedule[]>();

    get() {
        return this.http.get(environment.serverUrl + '/schedule')
            .map((response: Response) => {
                this.schedules = response.json().obj
                    .map((item) => {
                        return this.createModel(item)
                    });
                this.schedulesChanged.next(this.schedules.slice());
                return this.schedules;
            })
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
                return Observable.throw(error.json());
            });
    }

    add(schedule: Schedule) {
        const body = JSON.stringify(schedule);

        return this.http.post(environment.serverUrl + '/schedule', body, environment.getRequestOptions())
            .map((response: Response) => {
                let schedule = this.createModel(response.json().obj);
                this.schedules.push(schedule);

                this.schedulesChanged.next(this.schedules.slice());
                return schedule;
            })
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
                return Observable.throw(error.json())
            });
    }

    update(schedule: Schedule) {
        const body = JSON.stringify(schedule);

        return this.http.patch(environment.serverUrl + '/schedule/' + schedule._id, body, environment.getRequestOptions())
            .map((response: Response) => {
                this.schedules[this.editIndex]
                    = this.createModel(response.json().obj);

                this.schedulesChanged.next(this.schedules.slice());
                return schedule;
            })
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
                return Observable.throw(error.json());
            });
    }

    delete(index: number, schedule: Schedule) {
        return this.http.delete(environment.serverUrl + '/schedule/' + schedule._id, environment.getRequestOptions())
            .map((response: Response) => {
                this.schedules.splice(index, 1);

                this.schedulesChanged.next(this.schedules.slice());
                return this.schedule;
            })
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
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

        const body = JSON.stringify(schedule);

        return this.http.post(environment.serverUrl + '/schedule/s', body, environment.getRequestOptions())
            .map((response: Response) => {
                const result: Schedule[] = response.json().obj;
                let transformedList: Schedule[] = [];
                for (let schedule of result) {
                    transformedList.push(new Schedule(
                        schedule.scheduleDate,
                        schedule.production,
                        schedule.device,
                        schedule.creator,
                        schedule.createData,
                        schedule._id,
                        schedule.actionDate,
                        schedule.finishDate)
                    );
                }
                this.schedules = transformedList;
                this.schedulesChanged.next(this.schedules);

                return transformedList;
            })
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
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