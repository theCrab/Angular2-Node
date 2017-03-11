import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { ErrorService } from './../shared/errors/error.service';

import { User } from './user.model';
import { environment } from "../../environments/environment";

@Injectable()
export class AuthService {

    constructor(private http: Http, private errorService: ErrorService) { }

    public LoginState: Boolean = false;
    //Alan:登入成功後要去的頁面
    public redirectUrl = environment.mainPageUrl;

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(environment.serverUrl + '/user', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(environment.serverUrl + '/user/signin', body, { headers: headers })
            .map((response: Response) => {
                this.LoginState = true;
                return response.json();
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    logout() {
        this.redirectUrl = "/auth/signin";
        this.LoginState = false;
        localStorage.clear();
    }


    //ALan:加上Observable的型態，就會變成同步的，等他跑完才會執行下去
    isLoggedIn(): Observable<boolean> {

        const headers = new Headers({ 'Content-Type': 'application/json' });

        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.post(environment.serverUrl + '/user/isLoggedIn' + token, '', { headers: headers })
            .map((response: Response) => {
                this.LoginState = true
            })
            .catch((error: Response) => {
                // this.errorService.handleError(error.json());
                localStorage.clear();
                this.LoginState = false;
                return Observable.throw(error.json())
            });
    }
}