using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Mobbit.Core.Interfaces;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Mobbit.API.Services
{
    public class NotificacaoBackgroundService : BackgroundService
    {
        private readonly ILogger<NotificacaoBackgroundService> _logger;
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly TimeSpan _intervalo = TimeSpan.FromHours(24);

        public NotificacaoBackgroundService(
            ILogger<NotificacaoBackgroundService> logger,
            IServiceScopeFactory scopeFactory)
        {
            _logger = logger;
            _scopeFactory = scopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    _logger.LogInformation("Iniciando verificação de notificações...");

                    using (var scope = _scopeFactory.CreateScope())
                    {
                        var notificacaoService = scope.ServiceProvider.GetRequiredService<INotificacaoService>();

                        // Verifica contratos vencendo em 5 dias
                        await notificacaoService.EnviarNotificacaoVencimentoAsync(5);

                        // Verifica faturas atrasadas
                        await notificacaoService.EnviarNotificacaoFaturaAtrasadaAsync();
                    }

                    _logger.LogInformation("Verificação de notificações concluída.");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Erro ao executar verificação de notificações.");
                }

                await Task.Delay(_intervalo, stoppingToken);
            }
        }
    }
} 