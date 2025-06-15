import { Pipe, PipeTransform } from '@angular/core';
import { TipoServico, TipoServicoLabels } from '../constants/tipo-servico.constants';

@Pipe({
  name: 'tipoServico',
  standalone: true
})
export class TipoServicoPipe implements PipeTransform {
  transform(value: number | undefined | null): string {
    if (value === undefined || value === null || value === TipoServico.None) {
      return 'Nenhum';
    }

    const tiposSelecionados: string[] = [];

    // Itera sobre todos os valores possíveis do enum (Movel, Fixo, Internet)
    // Usamos Object.values e filtramos por números para obter os valores numéricos dos enums
    // excluindo o 'None' se quisermos listá-lo apenas como uma opção explícita.
    const allTipoServicoValues = Object.values(TipoServico)
      .filter(v => typeof v === 'number' && v !== TipoServico.None) as TipoServico[];

    for (const tipo of allTipoServicoValues) {
      // Verifica se o bit correspondente está setado no valor de entrada
      if ((value & tipo) === tipo) {
        tiposSelecionados.push(TipoServicoLabels[tipo]);
      }
    }

    return tiposSelecionados.length > 0 ? tiposSelecionados.join(', ') : 'Desconhecido';
  }
}
