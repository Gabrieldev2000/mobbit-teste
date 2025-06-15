import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Fatura } from '../../../core/models/fatura.model';

@Component({
  selector: 'app-confirmar-baixa-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule
  ],
  template: `
    <div class="dialog-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Confirmar Baixa no Pagamento</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <div class="confirmacao-texto">
            Deseja confirmar a baixa no pagamento da fatura?
          </div>

          <div class="detalhes-container">
            <div class="detalhe-item">
              <span class="label">Plano:</span>
              <span class="valor">{{data.contrato.planoContratado}}</span>
            </div>

            <div class="detalhe-item">
              <span class="label">Valor:</span>
              <span class="valor">{{data.valorCobrado | currency:'BRL'}}</span>
            </div>

            <div class="detalhe-item">
              <span class="label">Vencimento:</span>
              <span class="valor">{{data.dataVencimento | date:'dd/MM/yyyy'}}</span>
            </div>
          </div>
        </mat-card-content>

        <mat-card-actions>
          <div class="acoes-container">
            <button mat-stroked-button (click)="onCancel()">Cancelar</button>
            <button mat-stroked-button color="primary" (click)="onConfirm()">Confirmar</button>
          </div>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 24px;
    }

    mat-card {
      max-width: 400px;
      margin: 0 auto;
    }

    mat-card-header {
      margin-bottom: 16px;
    }

    mat-card-content {
      padding: 0 16px;
    }

    .confirmacao-texto {
      font-size: 16px;
      margin-bottom: 24px;
      color: #333;
    }

    .detalhes-container {
      background-color: #f5f5f5;
      padding: 16px;
      border-radius: 4px;
      margin-bottom: 24px;
    }

    .detalhe-item {
      display: flex;
      margin-bottom: 12px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .label {
      font-weight: 500;
      width: 100px;
      color: #666;
    }

    .valor {
      color: #333;
    }

    .acoes-container {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      padding: 16px;
    }
  `]
})
export class ConfirmarBaixaDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmarBaixaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Fatura
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
