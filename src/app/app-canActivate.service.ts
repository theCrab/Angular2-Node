import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth/auth.service';

@Injectable()
export class AppCanActivateService implements CanActivate {


    constructor(private authService: AuthService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, location: RouterStateSnapshot): boolean {

        // console.log(route);
        //Alan:如果不可進入，導入登入頁
        if (!this.authService.isLoggedIn(location.url)) {
            this.router.navigateByUrl('/auth/signin');
        }

        return true;
    }

}