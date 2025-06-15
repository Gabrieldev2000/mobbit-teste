using Mobbit.Core.Entities;

namespace Mobbit.Core.DTOs
{
    public class OperadoraDTO
    {
        public string Nome { get; set; }
        public string Cnpj { get; set; }
        public TipoServico TipoServico { get; set; }
        public string ContatoSuporte { get; set; }
    }
}
