using Microsoft.AspNetCore.Mvc;
using Mobbit.Core.Interfaces;
using System;
using System.Threading.Tasks;

namespace Mobbit.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("distribuicao-faturas")]
        public async Task<IActionResult> GetDistribuicaoFaturas()
        {
            var distribuicao = await _dashboardService.GetDistribuicaoFaturasAsync();
            return Ok(distribuicao);
        }

        [HttpGet("evolucao-mensal")]
        public async Task<IActionResult> GetEvolucaoMensal([FromQuery] int meses = 12)
        {
            var evolucao = await _dashboardService.GetEvolucaoMensalAsync(meses);
            return Ok(evolucao);
        }

        [HttpGet("total-faturado")]
        public async Task<IActionResult> GetTotalFaturado([FromQuery] DateTime mes)
        {
            var total = await _dashboardService.GetTotalFaturadoAsync(mes);
            return Ok(total);
        }

        [HttpGet("total-faturas")]
        public async Task<IActionResult> GetTotalFaturas([FromQuery] DateTime mes)
        {
            var total = await _dashboardService.GetTotalFaturasAsync(mes);
            return Ok(total);
        }
    }
} 