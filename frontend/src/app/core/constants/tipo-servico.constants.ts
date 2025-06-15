export enum TipoServico {
  None = 0,
  Movel = 1 << 0, // 1
  Fixo = 1 << 1,    // 2
  Internet = 1 << 2 // 4
}

export const TipoServicoLabels: Record<TipoServico, string> = {
  [TipoServico.None]: 'Nenhum',
  [TipoServico.Movel]: 'Móvel',
  [TipoServico.Fixo]: 'Fixo',
  [TipoServico.Internet]: 'Internet',
};
