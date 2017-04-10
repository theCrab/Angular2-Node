import { Routes, RouterModule } from '@angular/router';
import { RunscheduleComponent } from "./runschedule.component";

const routes: Routes = [
  {
    path: '',
    component: RunscheduleComponent,
  }
];

export const RunscheduleRoutes = RouterModule.forChild(routes);
