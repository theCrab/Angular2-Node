import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth/auth.service';
import { environment } from './../environments/environment';

@Injectable()
export class AppCanActivateService implements CanActivate {


    constructor(
        private authService: AuthService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this.authService.LoginState) { return true; }

        this.authService.redirectUrl = state.url;

        return this.authService.isLoggedIn()
            .map(data => {
                console.log('login Success!');
                return true;
            })
            .catch(error => {
                this.router.navigateByUrl(environment.nonAuthenticationUrl);
                console.error('nonLogin!')
                return Observable.throw(error);
            });
    }

}