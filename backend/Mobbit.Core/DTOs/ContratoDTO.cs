using System;

namespace Mobbit.Core.DTOs
{
    public class ContratoDTO
    {
        public string NomeFilial { get; set; }
        public int OperadoraId { get; set; }
        public string PlanoContratado { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataVencimento { get; set; }
        public decimal ValorMensal { get; set; }
    }
}
