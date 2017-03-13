import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

//Alan:主要Component
import { AppComponent } from './app.component';
//Component
import { ErrorComponent } from './shared/errors/error.component';
import { ToastComponent } from './shared/toast/toast.component';
//routing
import { routing } from './app.routing';
//Service
import { ErrorService } from './shared/errors/error.service';
import { DeviceService } from './machine/device.service';
import { AuthService } from './auth/auth.service';
import { ProductionService } from './production/production.service';
import { ScheduleService } from './schedule/schedule.service';
import { AppCanActivateService } from './app-canActivate.service';

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
