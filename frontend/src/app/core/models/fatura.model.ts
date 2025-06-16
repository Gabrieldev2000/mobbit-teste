import { Contrato } from './contrato.model';
import { StatusFatura } from '../../constants/status.constants';

export interface Fatura {
  id: number;
  contrato: Contrato;
  contratoId: number;
  dataEmissao: string;
  dataVencimento: string;
  valorCobrado: number;
  status: StatusFatura;
  dataPagamento?: string;
}
