import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "app/auth-guard.service";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
    },
    {
        path: 'index',
        loadChildren: './component/home/home.module#HomeModule',
        canLoad: [AuthGuard]
    },
    {
        path: 'manage',
        loadChildren: './component/manage/manage.module#ManageModule',
        canLoad: [AuthGuard]
    },
    {
        path: 'auth',
        loadChildren: './component/auth/auth.module#AuthModule'
    },
    //if this url is not exist, redirect to index
    {
        path: '**',
        redirectTo: 'index'
    }
];

//  { useHash: true }
@NgModule({
    imports: [
        RouterModule.forRoot(
            routes
        ),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }