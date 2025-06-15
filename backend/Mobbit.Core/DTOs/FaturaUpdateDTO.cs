using System;
using Mobbit.Core.Entities;

namespace Mobbit.Core.DTOs
{
    public class FaturaUpdateDTO
    {
        public int Id { get; set; }
        public int ContratoId { get; set; }
        public DateTime DataEmissao { get; set; }
        public DateTime DataVencimento { get; set; }
        public decimal ValorCobrado { get; set; }
        public StatusFatura Status { get; set; }
    }
}
