import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

//Alan:主要Component
import { AppComponent } from './app.component';
//Component

import { BlockViewModule } from "app/shared/component/block-view/block-view.module";
import { AlertConfirmComponent } from "app/shared/component/alert-confirm/alert-confirm.component";
import { ToastComponent } from "app/shared/component/toast/toast.component";
import { RouteLoadingComponent } from "app/shared/component/route-loading/route-loading.component";
//routing
import { AppRoutingModule } from './app-routing.module';
//Service
import { AuthGuard } from './auth-guard.service';
import { AuthService } from "app/services/auth.service";

import { AlertConfirmService } from "app/shared/component/alert-confirm/alert-confirm.service";
import { MenuService } from './services/menu.service';

//3rd
import { ModalModule, AlertModule } from 'ng2-bootstrap';
import { CustomFormsModule } from 'ng2-validation'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeUntil';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/fromEvent';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,

    ModalModule.forRoot(),
    AlertModule.forRoot(),
    CustomFormsModule,

    BlockViewModule
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
    AuthGuard,
    MenuService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
