import { Routes, RouterModule } from '@angular/router';
import { ProductionComponent } from "./production.component";

const routes: Routes = [
  {
    path: '',
    component: ProductionComponent,
  }
];

export const ProductionRoutes = RouterModule.forChild(routes);
