import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OperadoraService } from '../../../core/services/operadora.service';
import { TipoServico, TipoServicoLabels } from '../../../core/constants/tipo-servico.constants';

@Component({
  selector: 'app-operadora-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './operadora-form.component.html',
  styleUrls: ['./operadora-form.component.scss']
})
export class OperadoraFormComponent implements OnInit {
  operadoraForm: FormGroup;
  editMode = false;
  TipoServico = TipoServico;
  TipoServicoLabels = TipoServicoLabels;

  constructor(
    private fb: FormBuilder,
    private operadoraService: OperadoraService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.operadoraForm = this.fb.group({
      nome: ['', Validators.required],
      cnpj: ['', Validators.required],
      tipoServico: [[], Validators.required],
      contatoSuporte: [''],
      ativo: [true]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.carregarOperadora(Number(id));
    }
  }

  carregarOperadora(id: number): void {
    this.operadoraService.getOperadora(id).subscribe({
      next: (operadora) => {
        const selectedTypes: TipoServico[] = [];
        const allTipoServicoValues = this.getTipoServicoValues();
        for (const tipo of allTipoServicoValues) {
          if ((operadora.tipoServico & tipo) === tipo) {
            selectedTypes.push(tipo);
          }
        }
        this.operadoraForm.patchValue({
          ...operadora,
          tipoServico: selectedTypes
        });
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar operadora', 'Fechar', {
          duration: 3000
        });
        console.error('Erro ao carregar operadora:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.operadoraForm.valid) {
      let operadora = this.operadoraForm.value;
      operadora.cnpj = operadora.cnpj.replace(/\D/g, '');

      const combinedTipoServico = (operadora.tipoServico as TipoServico[]).reduce((acc, curr) => acc | curr, 0);
      operadora = { ...operadora, tipoServico: combinedTipoServico };

      if (this.editMode) {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        operadora.id = id;
        this.operadoraService.updateOperadora(id, operadora).subscribe({
          next: () => {
            this.snackBar.open('Operadora atualizada com sucesso', 'Fechar', {
              duration: 3000
            });
            this.router.navigate(['/operadoras']);
          },
          error: (error) => {
            let mensagem = 'Erro ao atualizar operadora';
            if (error.error?.message?.includes('Já existe uma operadora com este CNPJ')) {
              mensagem = 'Já existe uma operadora com este CNPJ';
            } else if (error.error?.message?.includes('Não é possível inativar a operadora pois existem contratos ATIVOS vinculados a ela.')) {
              mensagem = 'Não é possível inativar a operadora pois existem contratos ATIVOS vinculados a ela.';
            }
            this.snackBar.open(mensagem, 'Fechar', {
              duration: 5000
            });
            console.error('Erro ao atualizar operadora:', error);
          }
        });
      } else {
        this.operadoraService.createOperadora(operadora).subscribe({
          next: () => {
            this.snackBar.open('Operadora criada com sucesso', 'Fechar', {
              duration: 3000
            });
            this.router.navigate(['/operadoras']);
          },
          error: (error) => {
            let mensagem = 'Erro ao criar operadora';
            if (error.error?.message?.includes('Já existe')) {
              mensagem = 'Já existe uma operadora com este CNPJ';
            }
            this.snackBar.open(mensagem, 'Fechar', {
              duration: 5000
            });
            console.error('Erro ao criar operadora:', error);
          }
        });
      }
    }
  }

  getTipoServicoValues(): TipoServico[] {
    return Object.values(TipoServico)
      .filter(value => typeof value === 'number' && value !== TipoServico.None) as TipoServico[];
  }
}
