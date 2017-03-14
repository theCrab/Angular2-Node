import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

//Alan:主要Component
import { AppComponent } from './app.component';
//Component
import { ToastComponent } from './shared/toast/toast.component';
//routing
import { routing } from './app.routing';
//Service

import { AlertConfirmComponent } from "./shared/alert-confirm/alert-confirm.component";
import { AlertConfirmService } from './shared/alert-confirm/alert-confirm.service';

import { DeviceService } from './machine/device.service';
import { AuthService } from './auth/auth.service';
import { ProductionService } from './production/production.service';
import { ScheduleService } from './schedule/schedule.service';
import { AppCanActivateService } from './app-canActivate.service';

import { ModalModule, AlertModule } from 'ng2-bootstrap';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ],
  declarations: [
    AppComponent,

    AlertConfirmComponent,
    ToastComponent,
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
