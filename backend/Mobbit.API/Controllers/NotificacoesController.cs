using Microsoft.AspNetCore.Mvc;
using Mobbit.Core.Interfaces;
using System.Threading.Tasks;

namespace Mobbit.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificacoesController : ControllerBase
    {
        private readonly INotificacaoService _notificacaoService;

        public NotificacoesController(INotificacaoService notificacaoService)
        {
            _notificacaoService = notificacaoService;
        }

        [HttpPost("verificar-vencimentos")]
        public async Task<IActionResult> VerificarVencimentos()
        {
            await _notificacaoService.VerificarVencimentosAsync();
            return Ok("Verificação de vencimentos iniciada.");
        }

        [HttpPost("enviar-email")]
        public async Task<IActionResult> EnviarEmail([FromBody] EmailRequest request)
        {
            await _notificacaoService.EnviarEmailAsync(
                request.Destinatario,
                request.Assunto,
                request.Mensagem);
            return Ok("E-mail enviado com sucesso.");
        }
    }

    public class EmailRequest
    {
        public string Destinatario { get; set; }
        public string Assunto { get; set; }
        public string Mensagem { get; set; }
    }
}
