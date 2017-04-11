import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { User } from "app/model/user.model";

import { environment } from "environments/environment";
import { AlertConfirmService } from "app/shared/component/alert-confirm/alert-confirm.service";

@Injectable()
export class AuthService {

    constructor(
        private http: Http,
        private alertConfirmService: AlertConfirmService
    ) { }

    public LoginState: Boolean = false;
    //Alan:登入成功後要去的頁面
    public redirectUrl = environment.mainPageUrl;

    signup(user: User) {
        const body = JSON.stringify(user);
        return this.http.post(environment.serverUrl + '/user', body, environment.getRequestOptions())
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
                return Observable.throw(error.json())
            });
    }

    signin(user: User) {
        const body = JSON.stringify(user);

        return this.http.post(environment.serverUrl + '/user/signin', body, environment.getRequestOptions())
            .map((response: Response) => {
                this.LoginState = true;
                return response.json();
            })
            .catch((error: Response) => {
                this.alertConfirmService.alert(error.json());
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

        return this.http.post(environment.serverUrl + '/user/isLoggedIn', '', environment.getRequestOptions())
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