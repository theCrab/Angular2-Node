
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './authentication/signup/signup.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { LogoutComponent } from './authentication/logout/logout.component';

import { FocusChangeDirective } from './authentication/focus-change.directive';

import { authRouting } from './auth.routing';

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent,
        LogoutComponent,
        FocusChangeDirective
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        authRouting
    ]
})
export class AuthModule {

}