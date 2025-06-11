using System.Threading.Tasks;

namespace Mobbit.Core.Interfaces
{
    public interface INotificacaoService
    {
        Task EnviarNotificacaoVencimentoAsync(int diasAntecedencia);
        Task EnviarNotificacaoFaturaAtrasadaAsync();
    }
} 