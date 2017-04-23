import { ManageComponent } from './manage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuResolve } from "app/resolve/menu.resolve";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: '',
        component: ManageComponent,
        //Alan: resolve
        // resolve: {
        //     /*
        //     直接使用resolve
        //      */
        //     menuList: MenuResolve
        // },
        // children: [
        //     {
        //         path: 'home',                
        //     },
        // ]
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
export class ManageRoutingModule { }
