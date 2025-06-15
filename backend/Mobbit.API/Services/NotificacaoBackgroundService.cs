using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Mobbit.Core.Interfaces;

namespace Mobbit.API.Services
{
    public class NotificacaoBackgroundService : BackgroundService
    {
        private readonly ILogger<NotificacaoBackgroundService> _logger;
        private readonly INotificacaoService _notificacaoService;
        private readonly TimeSpan _intervalo = TimeSpan.FromSeconds(5);

        public NotificacaoBackgroundService(
            ILogger<NotificacaoBackgroundService> logger,
            INotificacaoService notificacaoService)
        {
            _logger = logger;
            _notificacaoService = notificacaoService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    _logger.LogInformation("Iniciando verificação de vencimentos...");
                    await _notificacaoService.VerificarVencimentosAsync();
                    _logger.LogInformation("Verificação de vencimentos concluída.");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Erro ao verificar vencimentos.");
                }

                await Task.Delay(_intervalo, stoppingToken);
            }
        }
    }
}
