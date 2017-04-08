import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth/auth.service';
import { environment } from './../environments/environment';

@Injectable()
export class AppCanActivateService implements CanActivate {


    constructor(
        private _authService: AuthService,
        private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this._authService.LoginState) { return true; }

        this._authService.redirectUrl = state.url;

        return this._authService.isLoggedIn()
            .map(data => {
                if (data) {
                    console.log('login Success!');
                    return true;
                }
                this._router.navigateByUrl(environment.nonAuthenticationUrl);
                console.error('nonLogin!')
                return false;
            })
            .catch(error => {
                this._router.navigateByUrl(environment.nonAuthenticationUrl);
                console.error('nonLogin!')
                return Observable.throw(error);
            });
    }

}