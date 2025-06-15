using Microsoft.AspNetCore.Mvc;
using Mobbit.Core.DTOs;
using Mobbit.Core.Interfaces;
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

        [HttpGet("distribuicao-status")]
        public async Task<ActionResult<IEnumerable<DashboardDTO.DistribuicaoStatus>>> GetDistribuicaoStatus()
        {
            var distribuicao = await _dashboardService.GetDistribuicaoStatusAsync();
            return Ok(distribuicao);
        }

        [HttpGet("evolucao-mensal")]
        public async Task<ActionResult<IEnumerable<DashboardDTO.EvolucaoMensal>>> GetEvolucaoMensal([FromQuery] int meses = 12)
        {
            var evolucao = await _dashboardService.GetEvolucaoMensalAsync(meses);
            return Ok(evolucao);
        }

        [HttpGet("totais")]
        public async Task<ActionResult<DashboardDTO.Totais>> GetTotais()
        {
            var totais = await _dashboardService.GetTotaisAsync();
            return Ok(totais);
        }
    }
}
