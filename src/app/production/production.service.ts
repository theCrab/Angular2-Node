import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { Production } from './production.model';
import { environment } from './../../environments/environment';
import { AlertConfirmService } from "../shared/alert-confirm/alert-confirm.service";


@Injectable()
export class ProductionService {

    constructor(
        private http: Http,
        private alertConfirmService: AlertConfirmService
    ) { }

    productions: Production[] = [];

    //Alan:修改時使用
    production = new EventEmitter<Production>();

    get() {
        return this.http.get(environment.serverUrl + '/production')
            .map((response: Response) => {
                const productions = response.json().obj;
                let transformedList: Production[] = [];
                for (let production of productions) {
                    transformedList.push(new Production(
                        production.name,
                        production.count,
                        production.requireDate,
                        production.createData,
                        production._id,
                        production.creator._id,
                        production.creator.firstName + production.creator.lastName)
                    );
                }
                this.productions = transformedList;

                return transformedList;
            })
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
                return Observable.throw(error.json());
            });
    }

    add(production: Production) {
        const body = JSON.stringify(production);

        return this.http.post(environment.serverUrl + '/production', body, environment.getRequestOptions())
            .map((response: Response) => {
                const result = response.json();
                const production = new Production(
                    result.obj.name,
                    result.obj.count,
                    result.obj.requireDate,
                    result.obj.createData,
                    result.obj._id,
                    result.obj.creator._id,
                    result.obj.creator.firstName + result.obj.creator.lastName);
                this.productions.push(production);
                return production;
            })
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
                return Observable.throw(error.json())
            });
    }


    delete(production: Production) {
        return this.http.delete(environment.serverUrl + '/production/' + production._id, environment.getRequestOptions())
            .map((response: Response) => {
                this.productions.splice(this.productions.indexOf(production), 1);
                return response.json();
            })
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
                return Observable.throw(error.json());
            });
    }


    switchEdit(production: Production) {
        this.production.emit(production);
    }

    clearEdit() {
        this.production.emit(null);
    }

    update(production: Production) {
        const body = JSON.stringify(production);
        return this.http.patch(environment.serverUrl + '/production/' + production._id, body, environment.getRequestOptions())
            .map((response: Response) => {
                const result = response.json();
                return this.productions[this.productions.indexOf(production)] = new Production(
                    result.obj.name,
                    result.obj.count,
                    result.obj.requireDate,
                    result.obj.createData,
                    result.obj._id,
                    result.obj.creator._id,
                    result.obj.creator.firstName + result.obj.creator.lastName);
            })
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
                return Observable.throw(error.json());
            });
    }

}