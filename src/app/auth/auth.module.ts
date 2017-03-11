
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './authentication/signup/signup.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { LogoutComponent } from './authentication/logout/logout.component';

import { authRouting } from './auth.routing';

import { FocusChangeDirective } from "../directive/focus-change.directive";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        authRouting
    ],
    declarations: [
        SigninComponent,
        SignupComponent,
        LogoutComponent,
        FocusChangeDirective
    ]
})
export class AuthModule {

}