import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { AppCanActivateService } from './app-canActivate.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
    },
    {
        path: 'index',
        loadChildren: './component/home/home.module#HomeModule'
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }