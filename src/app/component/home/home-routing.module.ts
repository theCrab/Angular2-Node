import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from './home.component';
import { AuthGuard } from 'app/auth-guard.service';
import { MenuResolve } from "app/resolve/menu.resolve";
const routes: Routes = [
    {
        path: '',
        redirectTo: 'run',
        pathMatch: 'full',
    },
    {
        path: '',
        component: HomeComponent,
        //Alan: resolve
        resolve: {
            /*
            直接使用resolve
             */
            menuList: MenuResolve
        },
        children: [
            {
                path: 'run',
                loadChildren: './scheduleManage/runschedule/runschedule.module#RunscheduleModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'sched',
                loadChildren: './scheduleManage/schedule/schedule.module#ScheduleModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'prod',
                loadChildren: './scheduleManage/production/production.module#ProductionModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'machine',
                loadChildren: './scheduleManage/machine/machine.module#MachineModule',
                canActivate: [AuthGuard]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [
        MenuResolve
        // {
        //     provide: 'menu',
        //     useValue: () => {
        //         return 'sdfsdfsdf';
        //     }
        // }
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule { }