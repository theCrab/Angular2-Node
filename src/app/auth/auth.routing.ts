import { Routes, RouterModule } from "@angular/router";

import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LogoutComponent } from './authentication/logout/logout.component';

const AUTH_ROUTES: Routes = [
    { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
    { path: 'logout', component: LogoutComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
];

export const authRouting = RouterModule.forChild(AUTH_ROUTES);