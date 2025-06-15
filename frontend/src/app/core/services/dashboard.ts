import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface DistribuicaoStatus {
  status: string;
  quantidade: number;
}

export interface EvolucaoMensal {
  mes: string;
  faturasEmitidas: number;
  faturasPagas: number;
  valorTotal: number;
}

export interface Totais {
  totalFaturas: number;
  totalContratos: number;
  totalOperadoras: number;
  faturasPendentes: number;
  valorTotalPendente: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) {}

  getDistribuicaoStatus(): Observable<DistribuicaoStatus[]> {
    return this.http.get<DistribuicaoStatus[]>(`${this.apiUrl}/distribuicao-status`);
  }

  getEvolucaoMensal(meses: number = 12): Observable<EvolucaoMensal[]> {
    return this.http.get<EvolucaoMensal[]>(`${this.apiUrl}/evolucao-mensal?meses=${meses}`);
  }

  getTotais(): Observable<Totais> {
    return this.http.get<Totais>(`${this.apiUrl}/totais`);
  }
}
