import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from "@angular/router";

import { AppCanActivateService } from "app/app-canActivate.service";

const routes: Routes = [
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
                loadChildren: './scheduleManage/runschedule/runschedule.module#RunscheduleModule'
            },
            {
                path: 'sched',
                loadChildren: './scheduleManage/schedule/schedule.module#ScheduleModule'
            },
            {
                path: 'prod',
                loadChildren: './scheduleManage/production/production.module#ProductionModule'
            },
            {
                path: 'machine',
                loadChildren: './scheduleManage/machine/machine.module#MachineModule'
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }