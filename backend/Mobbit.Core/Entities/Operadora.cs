using System;

namespace Mobbit.Core.Entities
{
    public class Operadora
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public TipoServico TipoServico { get; set; }
        public string ContatoSuporte { get; set; }
        public DateTime DataCadastro { get; set; }
        public bool Ativo { get; set; }
    }

    public enum TipoServico
    {
        Movel,
        Fixo,
        Internet
    }
} 