import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

//Alan:主要Component
import { AppComponent } from './app.component';
//Component

import { AlertConfirmComponent } from "app/shared/component/alert-confirm/alert-confirm.component";
import { ToastComponent } from "app/shared/component/toast/toast.component";
import { RouteLoadingComponent } from "app/shared/component/route-loading/route-loading.component";
//routing
import { routing } from './app.routing';
//Service
import { AppCanActivateService } from './app-canActivate.service';
import { AlertConfirmService } from "app/shared/component/alert-confirm/alert-confirm.service";
import { AuthService } from "app/component/auth/auth.service";

//3rd
import { ModalModule, AlertModule } from 'ng2-bootstrap';
import { CustomFormsModule } from 'ng2-validation'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

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
