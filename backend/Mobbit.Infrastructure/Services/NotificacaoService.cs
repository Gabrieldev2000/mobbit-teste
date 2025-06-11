using Mobbit.Core.Interfaces;
using System.Threading.Tasks;

namespace Mobbit.Infrastructure.Services
{
    public class NotificacaoService : INotificacaoService
    {
        private readonly IContratoRepository _contratoRepository;
        private readonly IFaturaRepository _faturaRepository;

        public NotificacaoService(
            IContratoRepository contratoRepository,
            IFaturaRepository faturaRepository)
        {
            _contratoRepository = contratoRepository;
            _faturaRepository = faturaRepository;
        }

        public async Task EnviarNotificacaoVencimentoAsync(int diasAntecedencia)
        {
            var contratosVencendo = await _contratoRepository.GetVencendoEmAsync(diasAntecedencia);

            foreach (var contrato in contratosVencendo)
            {
                // TODO: Implementar lógica de envio de e-mail
                // Por enquanto, apenas logamos a informação
                System.Diagnostics.Debug.WriteLine(
                    $"Notificação: Contrato {contrato.Id} da filial {contrato.NomeFilial} vence em {diasAntecedencia} dias.");
            }
        }

        public async Task EnviarNotificacaoFaturaAtrasadaAsync()
        {
            var faturasAtrasadas = await _faturaRepository.GetByStatusAsync(Core.Entities.StatusFatura.Atrasada);

            foreach (var fatura in faturasAtrasadas)
            {
                // TODO: Implementar lógica de envio de e-mail
                // Por enquanto, apenas logamos a informação
                System.Diagnostics.Debug.WriteLine(
                    $"Notificação: Fatura {fatura.Id} do contrato {fatura.ContratoId} está atrasada.");
            }
        }
    }
} 