
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthRoutingModule } from "app/component/auth/auth-routing.module";

import { AuthComponent } from "./auth.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { LogoutComponent } from "./logout/logout.component";

import { CustomFormsModule } from 'ng2-validation'

import { FocusChangeDirective } from "app/shared/directive/focus-change.directive";
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        
        AuthRoutingModule,
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