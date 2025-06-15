import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FaturaService } from '../../../core/services/fatura.service';
import { ContratoService } from '../../../core/services/contrato.service';
import { Fatura } from '../../../core/models/fatura.model';
import { Contrato } from '../../../core/models/contrato.model';
import { StatusFatura, StatusFaturaLabels } from '../../../core/constants/status.constants';

@Component({
  selector: 'app-fatura-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './fatura-form.component.html',
  styleUrls: ['./fatura-form.component.scss']
})
export class FaturaFormComponent implements OnInit {
  faturaForm: FormGroup;
  editMode = false;
  contratos: Contrato[] = [];
  StatusFatura = StatusFatura;
  StatusFaturaLabels = StatusFaturaLabels;
  minDate: Date;

  constructor(
    private fb: FormBuilder,
    private faturaService: FaturaService,
    private contratoService: ContratoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.minDate = new Date();
    this.minDate.setHours(0, 0, 0, 0);

    this.faturaForm = this.fb.group({
      contratoId: ['', Validators.required],
      dataVencimento: ['', Validators.required],
      valorCobrado: ['', [Validators.required, Validators.min(0)]],
      status: ['', Validators.required]
    });

    // Inscrever para mudanças na data de vencimento
    this.faturaForm.get('dataVencimento')?.valueChanges.subscribe(data => {
      if (data) {
        const dataVencimento = new Date(data);
        dataVencimento.setHours(0, 0, 0, 0);
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        if (dataVencimento < hoje) {
          this.faturaForm.patchValue({ status: StatusFatura.ATRASADA }, { emitEvent: false });
        }
      }
    });
  }

  ngOnInit(): void {
    this.carregarContratos();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.carregarFatura(Number(id));
    }
  }

  carregarContratos(): void {
    this.contratoService.getContratos(null, 0).subscribe({
      next: (contratos: Contrato[]) => {
        this.contratos = contratos;
      },
      error: (error: Error) => {
        this.snackBar.open('Erro ao carregar contratos', 'Fechar', {
          duration: 3000
        });
        console.error('Erro ao carregar contratos:', error);
      }
    });
  }

  carregarFatura(id: number): void {
    this.faturaService.obterPorId(id).subscribe({
      next: (fatura: Fatura) => {
        this.faturaForm.patchValue({
          contratoId: fatura.contrato?.id,
          dataVencimento: new Date(fatura.dataVencimento),
          valorCobrado: fatura.valorCobrado,
          status: fatura.status
        });
      },
      error: (error: Error) => {
        this.snackBar.open('Erro ao carregar fatura', 'Fechar', {
          duration: 3000
        });
        console.error('Erro ao carregar fatura:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.faturaForm.valid) {
      if (this.editMode) {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.faturaService.obterPorId(id).subscribe({
          next: (faturaExistente: Fatura) => {
            const faturaAtualizada: Fatura = {
              ...faturaExistente,
              ...this.faturaForm.value,
              dataVencimento: this.faturaForm.value.dataVencimento.toISOString()
            };

            this.faturaService.atualizar(id, faturaAtualizada).subscribe({
          next: () => {
            this.snackBar.open('Fatura atualizada com sucesso', 'Fechar', {
              duration: 3000
            });
            this.router.navigate(['/faturas']);
          },
              error: (error: Error) => {
            this.snackBar.open('Erro ao atualizar fatura', 'Fechar', {
              duration: 3000
            });
            console.error('Erro ao atualizar fatura:', error);
              }
            });
          },
          error: (error: Error) => {
            this.snackBar.open('Erro ao carregar fatura', 'Fechar', {
              duration: 3000
            });
            console.error('Erro ao carregar fatura:', error);
          }
        });
      } else {
        const novaFatura: Fatura = {
          ...this.faturaForm.value,
          dataVencimento: this.faturaForm.value.dataVencimento.toISOString(),
          dataEmissao: new Date().toISOString()
        };

        this.faturaService.criar(novaFatura).subscribe({
          next: () => {
            this.snackBar.open('Fatura criada com sucesso', 'Fechar', {
              duration: 3000
            });
            this.router.navigate(['/faturas']);
          },
          error: (error: Error) => {
            this.snackBar.open('Erro ao criar fatura', 'Fechar', {
              duration: 3000
            });
            console.error('Erro ao criar fatura:', error);
          }
        });
      }
    }
  }
}
