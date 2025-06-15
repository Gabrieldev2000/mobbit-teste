export enum StatusContrato {
  ATIVO = 0,
  INATIVO = 1
}

export const StatusContratoLabels: Record<StatusContrato, string> = {
  [StatusContrato.ATIVO]: 'Ativo',
  [StatusContrato.INATIVO]: 'Inativo'
};
