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

    //Alan:登入成功後要去的頁面
    public redirectUrl = "runschedule";

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(environment.serverUrl +'/user', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(environment.serverUrl +'/user/signin', body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    logout() {
        this.redirectUrl = "/auth/signin";
        localStorage.clear();
    }

    isLoggedIn(url?: string) {
        if (url)
            this.redirectUrl = url;
        return localStorage.getItem('token') !== null;
    }
}