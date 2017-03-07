import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

//Alan:主要Component
import { AppComponent } from './app.component';
//Service
import { DataService } from './services/data.service';
import { ErrorService } from './shared/errors/error.service';
import { DeviceService } from './machine/device.service';
import { AuthService } from './auth/auth.service';
import { ProductionService } from './production/production.service';
import { ScheduleService } from './schedule/schedule.service';
import { AppCanActivateService } from './app-canActivate.service';
//Component
import { ErrorComponent } from './shared/errors/error.component';

import { TopHeaderComponent } from './TopHeader/TopHeader.component';
import { AuthenticationComponent } from './auth/authentication/authentication.component';

import { ToastComponent } from './shared/toast/toast.component';
import { ScheduleListComponent } from './schedule/schedule-list/schedule-list.component';

// import { MenuComponent } from './menu/menu.component';

import { TimepickerModule } from 'ng2-bootstrap/timepicker';
import { DatepickerModule } from 'ng2-bootstrap/datepicker';
import { DropdownModule, DropdownConfig } from 'ng2-bootstrap/dropdown';
export function getDropdownConfig(): DropdownConfig {
  return Object.assign
    (new DropdownConfig(), { autoClose: 'auto', keyboardNav: true });
}


//Custom Module
import { MachineModule } from './machine/machine.module';
import { ProductionModule } from './production/production.module';
import { RunscheduleModule } from './runschedule/runschedule.module';
import { ScheduleModule } from './schedule/schedule.module';

import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    ToastComponent,
    TopHeaderComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DropdownModule.forRoot(),
    TimepickerModule.forRoot(),
    DatepickerModule.forRoot(),

    MachineModule,
    ProductionModule,
    RunscheduleModule,
    ScheduleModule,
    routing
  ],
  providers: [
    AuthService,
    DataService,
    DeviceService,
    ProductionService,
    ScheduleService,

    ErrorService,
    ToastComponent,
    { provide: DropdownConfig, useFactory: getDropdownConfig },

    AppCanActivateService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
