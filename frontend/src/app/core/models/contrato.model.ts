import { Operadora } from './operadora.model';

export interface Contrato {
  id?: number;
  numero: string;
  nomeFilial: string;
  operadora: Operadora;
  operadoraId: number;
  planoContratado: string;
  dataInicio: string;
  dataVencimento: string;
  valorMensal: number;
  status: number; // 0 = Ativo, 1 = Inativo
}
