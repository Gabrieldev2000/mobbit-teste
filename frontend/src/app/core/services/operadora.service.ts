import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Operadora } from '../models/operadora.model';
import { TipoServico } from '../constants/tipo-servico.constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OperadoraService {
  private apiUrl = `${environment.apiUrl}/operadoras`;

  constructor(private http: HttpClient) {}

  getOperadoras(tipoServico?: TipoServico | null, ativas?: boolean): Observable<Operadora[]> {
    let params = new HttpParams();
    if (tipoServico !== null && tipoServico !== undefined) {
      params = params.append('tipoServico', tipoServico.toString());
    }
    if (ativas !== null && ativas !== undefined) {
      params = params.append('ativas', ativas.toString());
    }
    return this.http.get<Operadora[]>(this.apiUrl, { params });
  }

  getOperadora(id: number): Observable<Operadora> {
    return this.http.get<Operadora>(`${this.apiUrl}/${id}`);
  }

  createOperadora(operadora: Operadora): Observable<Operadora> {
    return this.http.post<Operadora>(this.apiUrl, operadora);
  }

  updateOperadora(id: number, operadora: Operadora): Observable<Operadora> {
    const url = `${this.apiUrl}/${id}`;
    console.log('URL da requisição PUT:', url);
    console.log('Payload da requisição:', operadora);
    return this.http.put<Operadora>(url, operadora);
  }

  deleteOperadora(id: number): Observable<void> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }).pipe(
      map(() => {})
    );
  }
}
