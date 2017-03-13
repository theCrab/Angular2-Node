import { Routes, RouterModule } from "@angular/router";

import { AppCanActivateService } from './app-canActivate.service';

const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
    },
    {
        path: 'index',
        loadChildren: './home/home.module#HomeModule'
    },
    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
    }
];


export const routing = RouterModule.forRoot(APP_ROUTES);