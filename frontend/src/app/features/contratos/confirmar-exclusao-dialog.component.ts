import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmar-exclusao-contrato-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>Confirmar Exclusão</h2>
    <mat-dialog-content>
      <p>Tem certeza que deseja excluir o contrato "{{data.nome}}"?</p>
      <p class="warning-text">Atenção: Esta ação não poderá ser desfeita.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="warn" (click)="onConfirm()">Excluir</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      margin: 20px 24px;
    }
    mat-dialog-actions {
      padding: 16px 24px;
    }
    .warning-text {
      color: #f44336;
      font-size: 14px;
      margin-top: 8px;
    }
  `]
})
export class ConfirmarExclusaoContratoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmarExclusaoContratoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nome: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
