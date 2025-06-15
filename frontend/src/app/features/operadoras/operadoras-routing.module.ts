import { Routes } from '@angular/router';
import { OperadoraListComponent } from './operadora-list/operadora-list.component';
import { OperadoraFormComponent } from './operadora-form/operadora-form.component';

export const OPERADORAS_ROUTES: Routes = [
  {
    path: '',
    component: OperadoraListComponent
  },
  {
    path: 'novo',
    component: OperadoraFormComponent
  },
  {
    path: 'editar/:id',
    component: OperadoraFormComponent
  }
];
