import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ContratoService } from '../../../core/services/contrato.service';
import { OperadoraService } from '../../../core/services/operadora.service';
import { Operadora } from '../../../core/models/operadora.model';
import { Contrato } from '../../../core/models/contrato.model';
import { StatusContrato, StatusContratoLabels } from '../../../core/constants/status-contrato.constants';

@Component({
  selector: 'app-contrato-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './contrato-form.component.html',
  styleUrls: ['./contrato-form.component.scss']
})
export class ContratoFormComponent implements OnInit {
  contratoForm: FormGroup;
  operadoras: Operadora[] = [];
  editMode = false;
  StatusContrato = StatusContrato;
  StatusContratoLabels = StatusContratoLabels;

  constructor(
    private fb: FormBuilder,
    private contratoService: ContratoService,
    private operadoraService: OperadoraService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.contratoForm = this.fb.group({
      nomeFilial: ['', Validators.required],
      operadoraId: [null, Validators.required],
      planoContratado: ['', Validators.required],
      dataInicio: [null, Validators.required],
      dataVencimento: [null, Validators.required],
      valorMensal: [null, [Validators.required, Validators.min(0)]],
      status: [StatusContrato.ATIVO, Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarOperadoras();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.carregarContrato(Number(id));
    }
  }

  carregarOperadoras(): void {
    this.operadoraService.getOperadoras().subscribe({
      next: (data) => {
        this.operadoras = data;
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar operadoras', 'Fechar', {
          duration: 3000
        });
        console.error('Erro ao carregar operadoras:', error);
      }
    });
  }

  carregarContrato(id: number): void {
    this.contratoService.getContrato(id).subscribe({
      next: (contrato) => {
        this.contratoForm.patchValue({
          ...contrato,
          operadoraId: contrato.operadora.id,
          dataInicio: new Date(contrato.dataInicio),
          dataVencimento: new Date(contrato.dataVencimento)
        });
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar contrato', 'Fechar', {
          duration: 3000
        });
        console.error('Erro ao carregar contrato:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.contratoForm.valid) {
      const formValue = this.contratoForm.value;

      const contrato: Contrato = {
        nomeFilial: formValue.nomeFilial,
        operadoraId: formValue.operadoraId,
        operadora: this.operadoras.find(op => op.id === formValue.operadoraId) || {} as Operadora,
        numero: '', // O número será gerado pelo backend
        planoContratado: formValue.planoContratado,
        dataInicio: formValue.dataInicio ? new Date(formValue.dataInicio).toISOString() : '',
        dataVencimento: formValue.dataVencimento ? new Date(formValue.dataVencimento).toISOString() : '',
        valorMensal: parseFloat(formValue.valorMensal.toString().replace(',', '.')),
        status: Number(formValue.status)
      };

      if (this.editMode) {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        const contratoComId = { ...contrato, id: id };
        this.contratoService.updateContrato(id, contratoComId).subscribe({
          next: () => {
            this.snackBar.open('Contrato atualizado com sucesso', 'Fechar', {
              duration: 3000
            });
            this.router.navigate(['/contratos']);
          },
          error: (error) => {
            this.snackBar.open('Erro ao atualizar contrato', 'Fechar', {
              duration: 3000
            });
            console.error('Erro ao atualizar contrato:', error);
          }
        });
      } else {
        const { id, ...contratoParaCriacao } = contrato;
        this.contratoService.createContrato(contratoParaCriacao).subscribe({
          next: () => {
            this.snackBar.open('Contrato criado com sucesso', 'Fechar', {
              duration: 3000
            });
            this.router.navigate(['/contratos']);
          },
          error: (error) => {
            console.error('Erro ao criar contrato:', error);
          }
        });
      }
    } else {
      this.contratoForm.markAllAsTouched();
      console.log('Formulário inválido!');
      console.log(this.contratoForm.errors);
      Object.keys(this.contratoForm.controls).forEach(key => {
        const controlErrors = this.contratoForm.get(key)?.errors;
        if (controlErrors) {
          console.log(`Campo ${key} com erros:`, controlErrors);
        }
      });
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }
}
