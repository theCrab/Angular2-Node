import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from "rxjs/Observable";
import { Subject } from 'rxjs/Subject';

import { Schedule } from './schedule.model';
import { environment } from "../../environments/environment";
import { AlertConfirmService } from "../shared/alert-confirm/alert-confirm.service";

@Injectable()
export class ScheduleService {

    constructor(
        private http: Http,
        private alertConfirmService: AlertConfirmService
    ) { }

    schedules: Schedule[] = [];

    //Alan:修改時使用
    schedule = new Subject<Schedule>();

    //Alan:宣告一個發射器，把東西發射出去
    @Output() schedulesChange: EventEmitter<any> = new EventEmitter<any>();


    get() {
        return this.http.get(environment.serverUrl + '/schedule')
            .map((response: Response) => {
                const schedules = response.json().obj;
                let transformedList: Schedule[] = [];
                for (let schedule of schedules) {
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

                return transformedList;
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
                const result = response.json();
                const schedule = new Schedule(
                    result.obj.scheduleDate,
                    result.obj.production,
                    result.obj.device,
                    result.obj.creator,
                    result.obj.createData,
                    result.obj._id,
                    result.obj.actionDate,
                    result.obj.finishDate);
                this.schedules.push(schedule);
                return schedule;
            })
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
                return Observable.throw(error.json())
            });
    }


    delete(schedule: Schedule) {
        return this.http.delete(environment.serverUrl + '/schedule/' + schedule._id, environment.getRequestOptions())
            .map((response: Response) => {
                this.schedules.splice(this.schedules.indexOf(schedule), 1);
                return response.json()
            })
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
                return Observable.throw(error.json());
            });
    }


    switchEdit(schedule: Schedule) {
        this.schedule.next(schedule);
    }

    clearEdit() {
        this.schedule.next(null);
    }

    update(schedule: Schedule) {
        const body = JSON.stringify(schedule);

        return this.http.patch(environment.serverUrl + '/schedule/' + schedule._id, body, environment.getRequestOptions())
            .map((response: Response) => {
                const result = response.json();
                return this.schedules[this.schedules.indexOf(schedule)] = new Schedule(
                    result.obj.scheduleDate,
                    result.obj.production,
                    result.obj.device,
                    result.obj.creator,
                    result.obj.createData,
                    result.obj._id,
                    result.obj.actionDate,
                    result.obj.finishDate);
            })
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
                return Observable.throw(error.json());
            });
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
                this.schedulesChange.emit(this.schedules);

                return transformedList;
            })
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
                return Observable.throw(error.json());
            });
    }


}