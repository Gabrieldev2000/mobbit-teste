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
        public async Task<IActionResult> VerificarVencimentos([FromQuery] int diasAntecedencia = 5)
        {
            await _notificacaoService.EnviarNotificacaoVencimentoAsync(diasAntecedencia);
            return Ok(new { message = "Verificação de vencimentos iniciada com sucesso." });
        }

        [HttpPost("verificar-faturas-atrasadas")]
        public async Task<IActionResult> VerificarFaturasAtrasadas()
        {
            await _notificacaoService.EnviarNotificacaoFaturaAtrasadaAsync();
            return Ok(new { message = "Verificação de faturas atrasadas iniciada com sucesso." });
        }
    }
} 