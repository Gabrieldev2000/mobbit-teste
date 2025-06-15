import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OPERADORAS_ROUTES } from './operadoras-routing.module';
import { OperadoraListComponent } from './operadora-list/operadora-list.component';
import { OperadoraFormComponent } from './operadora-form/operadora-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(OPERADORAS_ROUTES),
    OperadoraListComponent,
    OperadoraFormComponent
  ]
})
export class OperadorasModule { }
