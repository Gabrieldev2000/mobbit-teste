using System;

namespace Mobbit.Core.Entities
{
    public class Contrato
    {
        public int Id { get; set; }
        public string NomeFilial { get; set; }
        public int OperadoraId { get; set; }
        public Operadora Operadora { get; set; }
        public string PlanoContratado { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataVencimento { get; set; }
        public decimal ValorMensal { get; set; }
        public StatusContrato Status { get; set; }
        public DateTime DataCadastro { get; set; }
    }

    public enum StatusContrato
    {
        Ativo,
        Inativo
    }
} 