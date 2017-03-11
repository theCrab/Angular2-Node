import { SigninComponent } from './auth/authentication/signin/signin.component';
import { Routes, RouterModule } from "@angular/router";

import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { HomeComponent } from "./home/home.component";

import { AppCanActivateService } from './app-canActivate.service';

const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full'
    },
    {
        path: 'index',
        canActivate: [AppCanActivateService],
        component: HomeComponent,
        loadChildren: './home/home.module#HomeModule'
    },
    {
        path: 'auth',
        component: AuthenticationComponent,
        loadChildren: './auth/auth.module#AuthModule'
    }
];


export const routing = RouterModule.forRoot(APP_ROUTES);