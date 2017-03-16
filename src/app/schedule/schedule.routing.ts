import { Routes, RouterModule } from '@angular/router';
import { ScheduleComponent } from "./schedule.component";

const routes: Routes = [ {
        path: '',
        component: ScheduleComponent,
    }
];

export const ScheduleRoutes = RouterModule.forChild(routes);
