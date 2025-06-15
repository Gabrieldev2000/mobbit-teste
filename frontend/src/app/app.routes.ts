import { Routes } from '@angular/router';
import { DashboardHomeComponent } from './features/dashboard/dashboard-home/dashboard-home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardHomeComponent
  },
  {
    path: 'faturas',
    loadChildren: () => import('./features/faturas/faturas.module').then(m => m.FaturasModule)
  },
  {
    path: 'contratos',
    loadChildren: () => import('./features/contratos/contratos.module').then(m => m.ContratosModule)
  },
  {
    path: 'operadoras',
    loadChildren: () => import('./features/operadoras/operadoras.module').then(m => m.OperadorasModule)
  }
];
