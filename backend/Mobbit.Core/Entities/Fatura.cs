using System;

namespace Mobbit.Core.Entities
{
    public class Fatura
    {
        public int Id { get; set; }
        public int ContratoId { get; set; }
        public Contrato Contrato { get; set; }
        public DateTime DataEmissao { get; set; }
        public DateTime DataVencimento { get; set; }
        public decimal ValorCobrado { get; set; }
        public StatusFatura Status { get; set; }
        public DateTime? DataPagamento { get; set; }
    }

    public enum StatusFatura
    {
        Paga,
        Pendente,
        Atrasada
    }
} 