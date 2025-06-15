using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Mobbit.Core.Entities;
using Mobbit.Core.Interfaces;
using System.Net.Mail;
using System.Net;

namespace Mobbit.Infrastructure.Services
{
    public class NotificacaoService : INotificacaoService
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly IConfiguration _configuration;
        private readonly string _smtpServer;
        private readonly int _smtpPort;
        private readonly string _smtpUsername;
        private readonly string _smtpPassword;
        private readonly string _smtpFrom;

        public NotificacaoService(
            IServiceScopeFactory scopeFactory,
            IConfiguration configuration)
        {
            _scopeFactory = scopeFactory;
            _configuration = configuration;

            _smtpServer = _configuration["Email:SmtpServer"];
            _smtpPort = int.Parse(_configuration["Email:SmtpPort"]);
            _smtpUsername = _configuration["Email:Username"];
            _smtpPassword = _configuration["Email:Password"];
            _smtpFrom = _configuration["Email:From"];
        }

        public async Task VerificarVencimentosAsync()
        {
            using var scope = _scopeFactory.CreateScope();
            var contratoRepository = scope.ServiceProvider.GetRequiredService<IContratoRepository>();

            var contratos = await contratoRepository.GetAllWithOperadoraAsync();
            var dataLimite = DateTime.Now.AddDays(5);

            var contratosVencendo = contratos.Where(c =>
                c.Status == StatusContrato.Ativo &&
                c.DataVencimento <= dataLimite &&
                c.DataVencimento > DateTime.Now);

            foreach (var contrato in contratosVencendo)
            {
                var diasParaVencimento = (contrato.DataVencimento - DateTime.Now).Days;
                var mensagem = $"O contrato da filial {contrato.NomeFilial} com a operadora {contrato.Operadora.Nome} " +
                             $"vencerá em {diasParaVencimento} dias. Data de vencimento: {contrato.DataVencimento:dd/MM/yyyy}";

                await EnviarEmailAsync(
                    contrato.Operadora.ContatoSuporte,
                    "Alerta de Vencimento de Contrato",
                    mensagem);
            }
        }

        public async Task EnviarEmailAsync(string destinatario, string assunto, string mensagem)
        {
            using var client = new SmtpClient(_smtpServer, _smtpPort)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(_smtpUsername, _smtpPassword)
            };

            using var mailMessage = new MailMessage
            {
                From = new MailAddress(_smtpFrom),
                Subject = assunto,
                Body = mensagem,
                IsBodyHtml = false
            };

            mailMessage.To.Add(destinatario);

            await client.SendMailAsync(mailMessage);
        }
    }
}
