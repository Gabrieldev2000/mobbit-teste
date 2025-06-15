import { TipoServico } from '../constants/tipo-servico.constants';

export interface Operadora {
  id: number;
  nome: string;
  cnpj: string;
  tipoServico: TipoServico;
  contatoSuporte: string;
  dataCadastro: string;
  ativo: boolean;
}
