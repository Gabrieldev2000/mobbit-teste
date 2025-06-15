import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Contrato } from '../models/contrato.model';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private apiUrl = `${environment.apiUrl}/contratos`;

  constructor(private http: HttpClient) {}

  getContratos(operadoraId?: number | null, status?: number | null): Observable<Contrato[]> {
    let params = new HttpParams();
    if (operadoraId !== null && operadoraId !== undefined) {
      params = params.append('operadoraId', operadoraId.toString());
    }
    if (status !== null && status !== undefined) {
      params = params.append('status', status.toString());
    }
    return this.http.get<Contrato[]>(this.apiUrl, { params });
  }

  getContrato(id: number): Observable<Contrato> {
    return this.http.get<Contrato>(`${this.apiUrl}/${id}`);
  }

  createContrato(contrato: Contrato): Observable<Contrato> {
    return this.http.post<Contrato>(this.apiUrl, contrato);
  }

  updateContrato(id: number, contrato: Contrato): Observable<Contrato> {
    return this.http.put<Contrato>(`${this.apiUrl}/${id}`, contrato);
  }

  deleteContrato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
