import { Routes, RouterModule } from '@angular/router';
import { MachineComponent } from "./machine.component";

const routes: Routes = [
  {
    path: '',
    component: MachineComponent,
  }
];

export const MachineRoutes = RouterModule.forChild(routes);
