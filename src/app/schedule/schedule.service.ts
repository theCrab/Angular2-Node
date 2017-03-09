import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { ErrorService } from './../shared/errors/error.service';

import { Schedule } from './schedule.model';
import { environment } from "../../environments/environment";

@Injectable()
export class ScheduleService {

    constructor(private http: Http, private errorService: ErrorService) { }

    schedules: Schedule[] = [];

    //Alan:修改時使用
    schedule = new EventEmitter<Schedule>();

    //Alan:宣告一個發射器，把東西發射出去
    @Output() schedulesChange: EventEmitter<any> = new EventEmitter<any>();


    get() {
        return this.http.get(environment.serverUrl +'/schedule')
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
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    add(schedule: Schedule) {
        const body = JSON.stringify(schedule);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.post(environment.serverUrl +'/schedule' + token, body, { headers: headers })
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
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }


    delete(schedule: Schedule) {
        this.schedules.splice(this.schedules.indexOf(schedule), 1);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete(environment.serverUrl + '/schedule/' + schedule._id + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }


    switchEdit(schedule: Schedule) {
        this.schedule.emit(schedule);
    }

    clearEdit(){
        this.schedule.emit(null);
    }

    update(schedule: Schedule) {
        const body = JSON.stringify(schedule);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch(environment.serverUrl + '/schedule/' + schedule._id + token, body, { headers: headers })
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
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    search(schedule?: Schedule) {

        const body = JSON.stringify(schedule);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post(environment.serverUrl + '/schedule/s' + token, body, { headers: headers })
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
                this.schedulesChange.emit(this.schedules);

                return transformedList;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }


}