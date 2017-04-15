import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { User } from "app/model/user.model";

import { AlertConfirmService } from "app/shared/component/alert-confirm/alert-confirm.service";
import { BlockViewService } from "app/shared/component/block-view/block-view.service";

import { environment } from "environments/environment";

@Injectable()
export class AuthService {

    constructor(
        private _http: Http,
        private _alertConfirmService: AlertConfirmService,
        private _blockViewService: BlockViewService
    ) { }

    public LoginState: Boolean = false;
    //Alan:登入成功後要去的頁面
    public redirectUrl = environment.mainPageUrl;

    signup(user: User) {
        this._blockViewService.block('註冊中');
        const body = JSON.stringify(user);
        return this._http.post(environment.serverUrl + '/user', body, environment.getRequestOptions())
            .map((response: Response) => {
                response.json();
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

    signin(user: User) {
        this._blockViewService.block('登入中');

        const body = JSON.stringify(user);

        return this._http.post(environment.serverUrl + '/user/signin', body, environment.getRequestOptions())
            .map((response: Response) => {
                this.LoginState = true;
                return response.json();
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

    logout() {
        this.redirectUrl = environment.mainPageUrl;
        this.LoginState = false;
        sessionStorage.clear();
        localStorage.clear();
    }


    //ALan:加上Observable的型態，就會變成同步的，等他跑完才會執行下去
    isLoggedIn(): Observable<boolean> {

        return this._http.post(environment.serverUrl + '/user/isLoggedIn', '', environment.getRequestOptions())
            .map((response: Response) => {
                this.LoginState = true
                return true;
            })
            .catch((error: Response) => {
                // this.errorService.handleError(error.json());
                localStorage.clear();
                sessionStorage.clear();
                this.LoginState = false;
                return Observable.of<boolean>(false)
            });
    }
}