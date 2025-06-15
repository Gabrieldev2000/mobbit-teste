export enum StatusFatura {
  PENDENTE = 0,
  PAGA = 1,
  ATRASADA = 2
}

export const StatusFaturaLabels: Record<StatusFatura, string> = {
  [StatusFatura.PENDENTE]: 'Pendente',
  [StatusFatura.PAGA]: 'Paga',
  [StatusFatura.ATRASADA]: 'Atrasada'
};
