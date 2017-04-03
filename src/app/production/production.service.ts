import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { Production } from './production.model';
import { environment } from './../../environments/environment';
import { AlertConfirmService } from "../shared/alert-confirm/alert-confirm.service";
import { FileItem } from "ng2-file-upload";


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

    add(production: Production, img: FileItem) {

        if (img) {
            return this.upload(img._file)
                .concatMap(
                (response: Response) => {
                    let file = response.json();

                    production.imageUrl = file.obj[0].path;
                    return this.postAdd(production);
                });
        } else {
            return this.postAdd(production);
        }
    }


    update(production: Production, img: FileItem) {
        let body = JSON.stringify(production);

        if (img) {
            return this.upload(img._file)
                .concatMap(
                (response: Response) => {
                    let file = response.json();

                    production.imageUrl = file.obj[0].path;
                    return this.postUpdate(production);
                });
        } else {
            return this.postUpdate(production);
        }
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

    postAdd(production: Production): Observable<any> {
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


    postUpdate(production: Production): Observable<any> {
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

    upload(file: File): Observable<any> {
        let formData: FormData = new FormData();
        formData.append('MMSUploadFile', file, file.name);
        formData.append('toUrl', 'production');

        return this.http.post(environment.serverUrl + "/file/upload", formData, new RequestOptions({
            headers: new Headers({
                'authorization': localStorage.getItem('token')
            })
        }))
            .map(res => res)
            .catch(error => Observable.throw(error))
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
            item.schedule,
            item.imageUrl);
    }

}