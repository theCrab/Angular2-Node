import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { ErrorService } from './../shared/errors/error.service';

import { Production } from './production.model';

@Injectable()
export class ProductionService {

    constructor(private http: Http, private errorService: ErrorService) { }

    productions: Production[] = [];
    
    //Alan:修改時使用
    production = new EventEmitter<Production>();

    get() {
        return this.http.get('http://localhost:3000/production')
            .map((response: Response) => {
                const productions = response.json().obj;
                let transformedList: Production[] = [];
                for (let production of productions) {
                    transformedList.push(new Production(
                        production.name,
                        production.count,
                        production.requireDate,
                        production._id,
                        production.creator._id,
                        production.creator.firstName + production.creator.lastName,
                        production.createData)
                    );
                }
                this.productions = transformedList;

                return transformedList;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    add(production: Production) {
        const body = JSON.stringify(production);
        const headers = new Headers({ 'Content-Type': 'application/json' });

        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.post('http://localhost:3000/production' + token, body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                const production = new Production(
                    result.obj.name,
                    result.obj.count,
                    result.obj.requireDate,
                    result.obj._id,
                    result.obj.creator._id,
                    result.obj.creator.firstName + result.obj.creator.lastName,
                    result.obj.createData);
                this.productions.push(production);
                return production;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }


    delete(production: Production) {
        this.productions.splice(this.productions.indexOf(production), 1);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete('http://localhost:3000/production/' + production._id + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }


    switchEdit(production: Production) {
        this.production.emit(production);
    }

    clearEdit(){
        this.production.emit(null);
    }

    update(production: Production) {
        const body = JSON.stringify(production);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch('http://localhost:3000/production/' + production._id + token, body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                return this.productions[this.productions.indexOf(production)] = new Production(
                    result.obj.name,
                    result.obj.count,
                    result.obj.requireDate,
                    result.obj._id,
                    result.obj.creator._id,
                    result.obj.creator.firstName + result.obj.creator.lastName,
                    result.obj.createData);
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}