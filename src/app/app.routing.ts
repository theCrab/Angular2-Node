import { Routes, RouterModule } from "@angular/router";

import { AuthenticationComponent } from './auth/authentication/authentication.component';

import { MachineComponent } from './machine/machine.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ProductionComponent } from './production/production.component';
import { RunscheduleComponent } from './runschedule/runschedule.component';

import { AppCanActivateService } from './app-canActivate.service';


const APP_ROUTES: Routes = [
    {
        path: 'sched',
        canActivate: [AppCanActivateService],
        component: ScheduleComponent
    },
    {
        path: 'prod',
        canActivate: [AppCanActivateService],
        component: ProductionComponent
    },
    {
        path: 'machine',
        canActivate: [AppCanActivateService],
        component: MachineComponent
    },
    {
        path: 'runschedule',
        canActivate: [AppCanActivateService],
        component: RunscheduleComponent,
    },
    {
        path: 'auth',
        component: AuthenticationComponent,
        loadChildren: './auth/auth.module#AuthModule'
    }
];


export const routing = RouterModule.forRoot(APP_ROUTES);