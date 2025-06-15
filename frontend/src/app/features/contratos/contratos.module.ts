import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CONTRATOS_ROUTES } from './contratos-routing.module';
import { ContratoListComponent } from './contrato-list/contrato-list.component';
import { ContratoFormComponent } from './contrato-form/contrato-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CONTRATOS_ROUTES),
    ContratoListComponent,
    ContratoFormComponent
  ]
})
export class ContratosModule { }
