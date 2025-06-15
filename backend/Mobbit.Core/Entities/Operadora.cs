using System;
using System.Collections.Generic;

namespace Mobbit.Core.Entities
{
    public class Operadora
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Cnpj { get; set; }
        public TipoServico TipoServico { get; set; }
        public string ContatoSuporte { get; set; }
        public DateTime DataCadastro { get; set; }
        public bool Ativo { get; set; }
    }

    [Flags]
    public enum TipoServico
    {
        None = 0,
        Movel = 1 << 0,
        Fixo = 1 << 1,
        Internet = 1 << 2
    }
}
