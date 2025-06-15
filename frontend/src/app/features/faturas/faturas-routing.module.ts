import { Routes } from '@angular/router';
import { FaturaListComponent } from './fatura-list/fatura-list.component';
import { FaturaFormComponent } from './fatura-form/fatura-form.component';

export const FATURAS_ROUTES: Routes = [
  {
    path: '',
    component: FaturaListComponent
  },
  {
    path: 'novo',
    component: FaturaFormComponent
  },
  {
    path: 'editar/:id',
    component: FaturaFormComponent
  }
];
