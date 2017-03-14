
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { authRouting } from './auth.routing';

import { FocusChangeDirective } from "../directive/focus-change.directive";

import { AuthComponent } from "./auth.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { LogoutComponent } from "./logout/logout.component";

import { CustomFormsModule } from 'ng2-validation'
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        authRouting,
        CustomFormsModule
    ],
    declarations: [
        AuthComponent,
        SigninComponent,
        SignupComponent,
        LogoutComponent,
        FocusChangeDirective
    ]
})
export class AuthModule {

}