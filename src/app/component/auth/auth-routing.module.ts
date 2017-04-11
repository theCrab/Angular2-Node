import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { AuthComponent } from "./auth.component";

import { LogoutComponent } from "./logout/logout.component";
import { SignupComponent } from "./signup/signup.component";
import { SigninComponent } from "./signin/signin.component";


const routes: Routes = [
    {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full',
    },
    {
        path: '',
        component: AuthComponent,
        children: [
            { path: 'signin', component: SigninComponent },
            { path: 'logout', component: LogoutComponent },
            { path: 'signup', component: SignupComponent },
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }