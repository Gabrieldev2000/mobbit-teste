import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Fatura } from '../models/fatura.model';
import { StatusFatura } from '../constants/status.constants';

@Injectable({
  providedIn: 'root'
})
export class FaturaService {
  private apiUrl = `${environment.apiUrl}/faturas`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Fatura[]> {
    return this.http.get<Fatura[]>(this.apiUrl);
  }

  obterPorId(id: number): Observable<Fatura> {
    return this.http.get<Fatura>(`${this.apiUrl}/${id}`);
  }

  criar(fatura: Fatura): Observable<Fatura> {
    return this.http.post<Fatura>(this.apiUrl, fatura);
  }

  atualizar(id: number, fatura: Fatura): Observable<Fatura> {
    return this.http.put<Fatura>(`${this.apiUrl}/${id}`, fatura);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obterPorStatus(status: StatusFatura): Observable<Fatura[]> {
    return this.http.get<Fatura[]>(`${this.apiUrl}/status/${status}`);
  }

  obterPorPeriodo(inicio: Date, fim: Date): Observable<Fatura[]> {
    return this.http.get<Fatura[]>(`${this.apiUrl}/periodo`, {
      params: {
        inicio: inicio.toISOString(),
        fim: fim.toISOString()
      }
    });
  }
}
