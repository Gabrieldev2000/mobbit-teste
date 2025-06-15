import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Operadora } from '../../../core/models/operadora.model';
import { OperadoraService } from '../../../core/services/operadora.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TipoServico, TipoServicoLabels } from '../../../core/constants/tipo-servico.constants';
import { TipoServicoPipe } from '../../../core/pipes/tipo-servico.pipe';
import { ConfirmarExclusaoDialogComponent } from '../confirmar-exclusao-dialog.component';

@Component({
  selector: 'app-operadora-list',
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
    MatCheckboxModule,
    TipoServicoPipe
  ],
  templateUrl: './operadora-list.component.html',
  styleUrls: ['./operadora-list.component.scss']
})
export class OperadoraListComponent implements OnInit {
  operadoras: Operadora[] = [];
  filtroTipoServico: number = TipoServico.None;
  filtroAtivas: boolean = false;
  displayedColumns: string[] = ['nome', 'cnpj', 'tipoServico', 'contatoSuporte', 'ativo', 'acoes'];

  TipoServico = TipoServico;
  TipoServicoLabels = TipoServicoLabels;

  constructor(
    private operadoraService: OperadoraService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.carregarOperadoras();
  }

  carregarOperadoras(tipoServico?: number | null, ativas?: boolean): void {
    this.operadoraService.getOperadoras(tipoServico, ativas).subscribe({
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

  aplicarFiltros(): void {
    this.carregarOperadoras(this.filtroTipoServico, this.filtroAtivas);
  }

  limparFiltros(): void {
    this.filtroTipoServico = TipoServico.None;
    this.filtroAtivas = false;
    this.aplicarFiltros();
  }

  temFiltrosAtivos(): boolean {
    return this.filtroTipoServico !== TipoServico.None || this.filtroAtivas !== false;
  }

  getTipoServicoValues(): TipoServico[] {
    return Object.values(this.TipoServico)
      .filter(value => typeof value === 'number' && value !== TipoServico.None) as TipoServico[];
  }

  excluirOperadora(operadora: Operadora): void {
    const dialogRef = this.dialog.open(ConfirmarExclusaoDialogComponent, {
      data: { nome: operadora.nome },
      width: '400px',
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.operadoraService.deleteOperadora(operadora.id).subscribe({
          next: () => {
            this.snackBar.open('Operadora excluída com sucesso', 'Fechar', {
              duration: 3000
            });
            this.carregarOperadoras();
          },
          error: (error) => {
            let mensagemParaExibir = 'Erro ao excluir operadora';
            let backendResponseError: any = error.error;

            if (error instanceof SyntaxError) {
              mensagemParaExibir = "Não é possível excluir a operadora pois existem contratos ATIVOS vinculados a ela.";
            } else if (backendResponseError) {
              if (typeof backendResponseError === 'string') {
                try {
                  const parsed = JSON.parse(backendResponseError);
                  if (parsed && parsed.message) {
                    mensagemParaExibir = parsed.message;
                  } else {
                    mensagemParaExibir = backendResponseError;
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
            console.error('Erro ao excluir operadora:', error);
          }
        });
      }
    });
  }
}
