import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Chart, registerables } from 'chart.js';
import { FaturaService } from '../../../core/services/fatura.service';
import { ContratoService } from '../../../core/services/contrato.service';
import { OperadoraService } from '../../../core/services/operadora.service';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { StatusFatura, StatusFaturaLabels } from '../../../constants/status.constants';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  totalFaturas = 0;
  totalContratos = 0;
  totalOperadoras = 0;
  faturasPendentes = 0;
  valorTotalPendente = 0;
  carregando = true;

  private statusChart: Chart | null = null;
  private mensalChart: Chart | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private faturaService: FaturaService,
    private contratoService: ContratoService,
    private operadoraService: OperadoraService
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.inicializarGraficos();
    }, 0);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.statusChart) {
      this.statusChart.destroy();
    }
    if (this.mensalChart) {
      this.mensalChart.destroy();
    }
  }

  private inicializarGraficos(): void {
    // Gráfico de Status
    const statusCtx = document.getElementById('statusChart') as HTMLCanvasElement;
    if (statusCtx) {
      if (this.statusChart) {
        this.statusChart.destroy();
      }
      this.statusChart = new Chart(statusCtx, {
        type: 'pie',
        data: {
          labels: Object.values(StatusFaturaLabels),
          datasets: [{
            data: [0, 0, 0],
            backgroundColor: ['#FFA726', '#66BB6A', '#EF5350']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }

    // Gráfico Mensal
    const mensalCtx = document.getElementById('mensalChart') as HTMLCanvasElement;
    if (mensalCtx) {
      if (this.mensalChart) {
        this.mensalChart.destroy();
      }
      this.mensalChart = new Chart(mensalCtx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
          datasets: [{
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            label: 'Valor Total',
            backgroundColor: '#42A5F5'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(this: any, tickValue: string | number) {
                  const value = typeof tickValue === 'string' ? parseFloat(tickValue) : tickValue;
                  return `R$ ${value.toFixed(2)}`;
                }
              }
            }
          }
        }
      });
    }
  }

  carregarDados(): void {
    this.carregando = true;

    // Carregar total de faturas
    this.faturaService.listar()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.carregando = false)
      )
      .subscribe({
        next: (faturas) => {
          this.totalFaturas = faturas.length;
          this.faturasPendentes = faturas.filter(f => f.status === StatusFatura.PENDENTE).length;
          this.valorTotalPendente = faturas
            .filter(f => f.status === StatusFatura.PENDENTE)
            .reduce((acc, curr) => acc + curr.valorCobrado, 0);

          // Atualizar gráfico de status
          const statusCount: Record<StatusFatura, number> = {
            [StatusFatura.PENDENTE]: 0,
            [StatusFatura.PAGA]: 0,
            [StatusFatura.ATRASADA]: 0
          };
          faturas.forEach(f => {
            const status = f.status as StatusFatura;
            statusCount[status]++;
          });

          if (this.statusChart) {
            this.statusChart.data.labels = Object.values(StatusFaturaLabels);
            this.statusChart.data.datasets[0].data = Object.values(statusCount);
            this.statusChart.update('none');
          }

          // Atualizar gráfico mensal
          const mensalData = new Array(12).fill(0);
          faturas.forEach(f => {
            const mes = new Date(f.dataVencimento).getMonth();
            mensalData[mes] += f.valorCobrado;
          });

          if (this.mensalChart) {
            this.mensalChart.data.datasets[0].data = mensalData;
            this.mensalChart.update('none');
          }
        },
        error: (error) => {
          console.error('Erro ao carregar faturas:', error);
        }
      });

    // Carregar total de contratos
    this.contratoService.getContratos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (contratos) => {
          this.totalContratos = contratos.length;
        },
        error: (error) => {
          console.error('Erro ao carregar contratos:', error);
        }
      });

    // Carregar total de operadoras
    this.operadoraService.getOperadoras()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (operadoras) => {
          this.totalOperadoras = operadoras.length;
        },
        error: (error) => {
          console.error('Erro ao carregar operadoras:', error);
        }
      });
  }
}
