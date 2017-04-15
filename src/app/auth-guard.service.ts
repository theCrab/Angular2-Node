import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
} from '@angular/router';
import { Observable } from "rxjs/Observable";

import { AuthService } from "app/services/auth.service";

import { environment } from 'environments/environment';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private _authService: AuthService,
    private _router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // if (this._authService.LoginState) { return true; }
    let url: string = state.url;

    console.log('canActivate');
    return this.checkLogin(url)
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log('canActivateChild');
    return this.canActivate(route, state);
  }

  canLoad(route: Route): Observable<boolean> | boolean {
    console.log('canLoad');
    
    let url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): Observable<boolean> | boolean {

    this._authService.redirectUrl = url;

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
