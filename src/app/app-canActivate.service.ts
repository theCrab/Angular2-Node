import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth/auth.service';

@Injectable()
export class AppCanActivateService implements CanActivate {


    constructor(
        private authService: AuthService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        let url: string = state.url;

        return this.checkLogin(url);
    }

    checkLogin(url?: string): Observable<boolean> | boolean {

        if (this.authService.LoginState) { return true; }

        this.authService.redirectUrl = url;

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