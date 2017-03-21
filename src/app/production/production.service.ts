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
                console.log(productions);
                let transformedList: Production[] = [];
                for (let production of productions) {
                    transformedList.push(this.createModel(production)
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
                const production = this.createModel(result.obj);
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
                return this.productions[this.productions.indexOf(production)]
                    = this.createModel(result.obj);
            })
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
                return Observable.throw(error.json());
            });
    }

    private createModel(item): Production {
        return new Production(
            item.name,
            item.count,
            item.requireDate,
            item.createData,
            item._id,
            item.creator._id,
            item.creator.firstName + item.creator.lastName,
            item.state,
            item.finishDate,
            item.schedule);
    }

}