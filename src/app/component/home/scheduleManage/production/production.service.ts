import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { Production } from './production.model';
import { FileItem } from "ng2-file-upload";
import { Subject } from "rxjs/Subject";

import { AlertConfirmService } from "app/shared/component/alert-confirm/alert-confirm.service";
import { environment } from "environments/environment";

@Injectable()
export class ProductionService {

    constructor(
        private http: Http,
        private alertConfirmService: AlertConfirmService
    ) { }

    private productions: Production[] = [];
    private editIndex: number;

    public production = new Subject<Production>();
    public productionsChanged = new Subject<Production[]>();

    get() {
        return this.http.get(environment.serverUrl + '/production')
            .map((response: Response) => {
                this.productions = response.json().obj
                    .map((item) => {
                        return this.createModel(item)
                    });
                this.productionsChanged.next(this.productions.slice());
                return this.productions;
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

    delete(index: number, production: Production) {
        return this.http.delete(environment.serverUrl + '/production/' + production._id, environment.getRequestOptions())
            .map((response: Response) => {
                this.productions.splice(index, 1);

                this.productionsChanged.next(this.productions.slice());
                return this.production;
            })
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
                return Observable.throw(error.json());
            });
    }


    switchEdit(index: number, production: Production) {
        this.editIndex = index;
        this.production.next(Object.assign({}, production));
    }

    clearEdit() {
        this.editIndex = null;
        this.production.next(null);
    }

    postAdd(production: Production): Observable<any> {
        const body = JSON.stringify(production);

        return this.http.post(environment.serverUrl + '/production', body, environment.getRequestOptions())
            .map((response: Response) => {
                let production = this.createModel(response.json().obj);
                this.productions.push(production);

                this.productionsChanged.next(this.productions.slice());
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
                this.productions[this.editIndex]
                    = this.createModel(response.json().obj);

                this.productionsChanged.next(this.productions.slice());
                return production;
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
                'authorization': sessionStorage.getItem('token')
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