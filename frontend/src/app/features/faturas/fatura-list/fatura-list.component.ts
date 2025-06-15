import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { FaturaService } from '../../../core/services/fatura.service';
import { Fatura } from '../../../core/models/fatura.model';
import { StatusFatura, StatusFaturaLabels } from '../../../core/constants/status.constants';
import { ConfirmarBaixaDialogComponent } from './confirmar-baixa-dialog.component';
import { ConfirmarExclusaoDialogComponent } from '../../operadoras/confirmar-exclusao-dialog.component';

@Component({
  selector: 'app-fatura-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule
  ],
  templateUrl: './fatura-list.component.html',
  styleUrls: ['./fatura-list.component.scss']
})
export class FaturaListComponent implements OnInit {
  faturas: Fatura[] = [];
  displayedColumns: string[] = ['contrato', 'dataVencimento', 'valor', 'status', 'acoes'];
  StatusFatura = StatusFatura;
  StatusFaturaLabels = StatusFaturaLabels;

  // Filtros
  filtroStatus: StatusFatura | null = null;
  faturasFiltradas: Fatura[] = [];
  totalFaturado: number | null = null;

  constructor(
    private faturaService: FaturaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarFaturas();
    this.carregarTotalFaturado();
  }

  carregarFaturas(): void {
    this.faturaService.listar().subscribe({
      next: (data: Fatura[]) => {
        this.faturas = data;
        this.faturasFiltradas = [...data];
      },
      error: (error: Error) => {
        console.error('Erro ao carregar faturas:', error);
        this.snackBar.open('Erro ao carregar faturas', 'Fechar', { duration: 3000 });
      }
    });
  }

  carregarTotalFaturado(): void {
    this.calcularTotalFaturado();
  }

  private calcularTotalFaturado(): void {
    this.totalFaturado = this.faturas
      .filter(fatura => fatura.status === StatusFatura.PAGA)
      .reduce((acc, curr) => acc + curr.valorCobrado, 0);
  }

  getStatusLabel(status: StatusFatura): string {
    return StatusFaturaLabels[status] || 'Desconhecido';
  }

  excluirFatura(fatura: Fatura): void {
    const dialogRef = this.dialog.open(ConfirmarExclusaoDialogComponent, {
      data: { nome: `Fatura ${this.formatarValor(fatura.valorCobrado)} (Vencimento: ${this.formatarData(fatura.dataVencimento)})` },
      width: '400px',
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        if (fatura.id !== undefined) {
          this.faturaService.excluir(fatura.id).subscribe({
            next: () => {
              this.snackBar.open('Fatura excluída com sucesso', 'Fechar', { duration: 3000 });
              this.carregarFaturas();
            },
            error: (error) => {
              let mensagemParaExibir = 'Erro ao excluir fatura';
              let backendResponseError: any = error.error;

              if (error instanceof SyntaxError) {
                mensagemParaExibir = "Não é possível excluir a fatura.";
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

              this.snackBar.open(mensagemParaExibir, 'Fechar', { duration: 5000 });
              console.error('Erro ao excluir fatura:', error);
            }
          });
        } else {
          this.snackBar.open('Erro: ID da fatura não encontrado para exclusão.', 'Fechar', { duration: 3000 });
          console.error('Erro: Tentativa de excluir fatura com ID undefined.', fatura);
        }
      }
    });
  }

  aplicarFiltros(): void {
    this.faturasFiltradas = this.faturas.filter(fatura => {
      // Se não houver filtro de status, mostra todas as faturas
      if (this.filtroStatus === null) {
        return true;
      }

      // Converte o status da fatura para número e compara com o filtro
      const statusFatura = Number(fatura.status);
      const statusFiltro = Number(this.filtroStatus);
      return statusFatura === statusFiltro;
    });
  }

  limparFiltros(): void {
    this.filtroStatus = null;
    this.faturasFiltradas = [...this.faturas];
  }

  temFiltrosAtivos(): boolean {
    return this.filtroStatus !== null;
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  darBaixaPagamento(fatura: Fatura): void {
    const dialogRef = this.dialog.open(ConfirmarBaixaDialogComponent, {
      data: fatura,
      width: '400px',
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const faturaAtualizada = {
          ...fatura,
          status: StatusFatura.PAGA,
          dataPagamento: new Date().toISOString()
        };

        this.faturaService.atualizar(fatura.id, faturaAtualizada).subscribe({
          next: () => {
            this.snackBar.open('Baixa no pagamento realizada com sucesso', 'Fechar', {
              duration: 3000
            });
            this.carregarFaturas();
          },
          error: (error: Error) => {
            this.snackBar.open('Erro ao dar baixa no pagamento', 'Fechar', {
              duration: 3000
            });
            console.error('Erro ao dar baixa no pagamento:', error);
          }
        });
      }
    });
  }
}
