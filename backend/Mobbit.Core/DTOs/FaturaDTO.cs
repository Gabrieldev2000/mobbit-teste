using System;

namespace Mobbit.Core.DTOs
{
    public class FaturaDTO
    {
        public int ContratoId { get; set; }
        public DateTime DataEmissao { get; set; }
        public DateTime DataVencimento { get; set; }
        public decimal ValorCobrado { get; set; }
    }
}
