import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AlertCallback } from "./alert-callback";
import { ConfirmCallback } from "./confirm-callback";
import { AlertConfirmModel } from "./alert-confirm.model";

@Injectable()
export class AlertConfirmService {

    constructor() { }
    private alertSource = new Subject<AlertConfirmModel>();
    alert$ = this.alertSource.asObservable();
    alertCallback: AlertCallback;

    private confirmSource = new Subject<AlertConfirmModel>();
    confirm$ = this.confirmSource.asObservable();
    confirmCallback: ConfirmCallback;


    confirm(message: AlertConfirmModel): ConfirmCallback {
        this.confirmSource.next(message);
        this.confirmCallback = new ConfirmCallback();
        return this.confirmCallback;
    }


    alert(message: AlertConfirmModel): AlertCallback {
        this.alertSource.next(message);
        this.alertCallback = new AlertCallback();
        return this.alertCallback;
    }

}