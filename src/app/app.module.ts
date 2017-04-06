import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

//Alan:主要Component
import { AppComponent } from './app.component';
//Component
import { ToastComponent } from './shared/toast/toast.component';
import { AlertConfirmComponent } from "./shared/alert-confirm/alert-confirm.component";
//routing
import { routing } from './app.routing';
//Service

import { AlertConfirmService } from './shared/alert-confirm/alert-confirm.service';

import { AuthService } from './auth/auth.service';
import { AppCanActivateService } from './app-canActivate.service';

import { ModalModule, AlertModule } from 'ng2-bootstrap';
import { CustomFormsModule } from 'ng2-validation'
import { RouteLoadingComponent } from "./shared/route-loading/route-loading.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,

    ModalModule.forRoot(),
    AlertModule.forRoot(),
    CustomFormsModule
  ],
  declarations: [
    AppComponent,

    AlertConfirmComponent,
    ToastComponent,
    RouteLoadingComponent
  ],
  providers: [
    AuthService,
    AlertConfirmService,
    ToastComponent,
    AppCanActivateService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
