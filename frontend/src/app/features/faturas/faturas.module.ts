import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FATURAS_ROUTES } from './faturas-routing.module';
import { FaturaListComponent } from './fatura-list/fatura-list.component';
import { FaturaFormComponent } from './fatura-form/fatura-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FATURAS_ROUTES),
    FaturaListComponent,
    FaturaFormComponent
  ]
})
export class FaturasModule { }
