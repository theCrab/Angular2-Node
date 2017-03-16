import { HomeComponent } from './home.component';
import { Routes, RouterModule } from "@angular/router";
import { RunscheduleComponent } from "../runschedule/runschedule.component";
import { AppCanActivateService } from "../app-canActivate.service";
import { ScheduleComponent } from "../schedule/schedule.component";
import { ProductionComponent } from "../production/production.component";
import { MachineComponent } from "../machine/machine.component";


const HOME_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'run',
        pathMatch: 'full',
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [AppCanActivateService],
        children: [
            {
                path: 'run',
                loadChildren: '../runschedule/runschedule.module#RunscheduleModule'
            },
            {
                path: 'sched',
                loadChildren: '../schedule/schedule.module#ScheduleModule'
            },
            {
                path: 'prod',
                loadChildren: '../production/production.module#ProductionModule'
            },
            {
                path: 'machine',
                loadChildren: '../machine/machine.module#MachineModule'
            },
        ]
    }
];

export const homeRouting = RouterModule.forChild(HOME_ROUTES);