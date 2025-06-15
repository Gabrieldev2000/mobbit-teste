using System.Threading.Tasks;

namespace Mobbit.Core.Interfaces
{
    public interface INotificacaoService
    {
        Task VerificarVencimentosAsync();
        Task EnviarEmailAsync(string destinatario, string assunto, string mensagem);
    }
}
