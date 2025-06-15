import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Contrato } from '../../../core/models/contrato.model';
import { ContratoService } from '../../../core/services/contrato.service';
import { OperadoraService } from '../../../core/services/operadora.service';
import { Operadora } from '../../../core/models/operadora.model';
import { StatusContrato, StatusContratoLabels } from '../../../core/constants/status-contrato.constants';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ConfirmarExclusaoDialogComponent } from '../../operadoras/confirmar-exclusao-dialog.component';

@Component({
  selector: 'app-contrato-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './contrato-list.component.html',
  styleUrls: ['./contrato-list.component.scss']
})
export class ContratoListComponent implements OnInit {
  contratos: Contrato[] = [];
  operadoras: Operadora[] = [];
  filtroOperadoraId: number | null = null;
  filtroStatus: StatusContrato | null = null;
  displayedColumns: string[] = ['nomeFilial', 'operadora', 'planoContratado', 'dataInicio', 'dataVencimento', 'valorMensal', 'status', 'acoes'];

  // Expor as constantes para o template
  StatusContrato = StatusContrato;
  StatusContratoLabels = StatusContratoLabels;

  constructor(
    private contratoService: ContratoService,
    private operadoraService: OperadoraService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.carregarOperadoras();
    this.carregarContratos();
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

  carregarContratos(operadoraId?: number | null, status?: StatusContrato | null): void {
    this.contratoService.getContratos(operadoraId, status).subscribe({
      next: (data) => {
        this.contratos = data;
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar contratos', 'Fechar', {
          duration: 3000
        });
        console.error('Erro ao carregar contratos:', error);
      }
    });
  }

  aplicarFiltros(): void {
    this.carregarContratos(this.filtroOperadoraId, this.filtroStatus);
  }

  limparFiltros(): void {
    this.filtroOperadoraId = null;
    this.filtroStatus = null;
    this.aplicarFiltros();
  }

  temFiltrosAtivos(): boolean {
    return this.filtroOperadoraId !== null || this.filtroStatus !== null;
  }

  excluirContrato(contrato: Contrato): void {
    const dialogRef = this.dialog.open(ConfirmarExclusaoDialogComponent, {
      data: { nome: `${contrato.planoContratado} (${contrato.nomeFilial})` },
      width: '400px',
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        if (contrato.id !== undefined) {
          this.contratoService.deleteContrato(contrato.id).subscribe({
            next: () => {
              this.snackBar.open('Contrato excluído com sucesso', 'Fechar', {
                duration: 3000
              });
              this.carregarContratos();
            },
            error: (error) => {
              let mensagemParaExibir = 'Erro ao excluir contrato';
              let backendResponseError: any = error.error;

              if (error instanceof SyntaxError) {
                mensagemParaExibir = "Não é possível excluir o contrato.";
              } else if (backendResponseError) {
                if (typeof backendResponseError === 'string') {
                  try {
                    const parsed = JSON.parse(backendResponseError);
                    if (parsed && parsed.message) {
                      mensagemParaExibir = parsed.message;
                    }
                  } catch (e) {
                    mensagemParaExibir = backendResponseError;
                  }
                } else if (backendResponseError.message) {
                  mensagemParaExibir = backendResponseError.message;
                } else {
                  mensagemParaExibir = JSON.stringify(backendResponseError);
                }
              } else if (error.message) {
                mensagemParaExibir = error.message;
              }

              this.snackBar.open(mensagemParaExibir, 'Fechar', {
                duration: 5000
              });
              console.error('Erro ao excluir contrato:', error);
            }
          });
        } else {
          this.snackBar.open('Erro: ID do contrato não encontrado para exclusão.', 'Fechar', { duration: 3000 });
          console.error('Erro: Tentativa de excluir contrato com ID undefined.', contrato);
        }
      }
    });
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  getStatusLabel(status: number): string {
    return StatusContratoLabels[status as StatusContrato] || 'Desconhecido';
  }
}
