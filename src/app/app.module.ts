import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

//Alan:主要Component
import { AppComponent } from './app.component';
//Service
import { ErrorService } from './shared/errors/error.service';
import { DeviceService } from './machine/device.service';
import { AuthService } from './auth/auth.service';
import { ProductionService } from './production/production.service';
import { ScheduleService } from './schedule/schedule.service';
import { AppCanActivateService } from './app-canActivate.service';
//Component
import { ErrorComponent } from './shared/errors/error.component';


import { ToastComponent } from './shared/toast/toast.component';
import { ScheduleListComponent } from './schedule/schedule-list/schedule-list.component';


import { routing } from './app.routing';


import { AuthenticationComponent } from './auth/authentication/authentication.component';

import { HomeComponent } from "./home/home.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    ErrorComponent,
    ToastComponent,
    AuthenticationComponent,
    HomeComponent
  ],
  providers: [
    AuthService,
    ErrorService,
    ToastComponent,
    AppCanActivateService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
