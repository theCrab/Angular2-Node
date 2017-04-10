import { Routes, RouterModule } from "@angular/router";

import { AuthComponent } from "./auth.component";

import { LogoutComponent } from "./logout/logout.component";
import { SignupComponent } from "./signup/signup.component";
import { SigninComponent } from "./signin/signin.component";


const AUTH_ROUTES: Routes = [
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

export const authRouting = RouterModule.forChild(AUTH_ROUTES);