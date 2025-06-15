using Microsoft.AspNetCore.Mvc;
using Mobbit.Core.DTOs;
using Mobbit.Core.Entities;
using Mobbit.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mobbit.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FaturasController : ControllerBase
    {
        private readonly IFaturaRepository _faturaRepository;

        public FaturasController(IFaturaRepository faturaRepository)
        {
            _faturaRepository = faturaRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Fatura>>> GetFaturas()
        {
            var faturas = await _faturaRepository.GetAllWithContratoAsync();
            return Ok(faturas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Fatura>> GetFatura(int id)
        {
            var fatura = await _faturaRepository.GetByIdWithContratoAsync(id);
            if (fatura == null)
            {
                return NotFound();
            }
            return Ok(fatura);
        }

        [HttpGet("contrato/{contratoId}")]
        public async Task<ActionResult<IEnumerable<Fatura>>> GetFaturasPorContrato(int contratoId)
        {
            var faturas = await _faturaRepository.GetByContratoAsync(contratoId);
            return Ok(faturas);
        }

        [HttpGet("status/{status}")]
        public async Task<ActionResult<IEnumerable<Fatura>>> GetFaturasPorStatus(StatusFatura status)
        {
            var faturas = await _faturaRepository.GetByStatusAsync(status);
            return Ok(faturas);
        }

        [HttpGet("periodo")]
        public async Task<ActionResult<IEnumerable<Fatura>>> GetFaturasPorPeriodo(
            [FromQuery] DateTime inicio,
            [FromQuery] DateTime fim)
        {
            var faturas = await _faturaRepository.GetByPeriodoAsync(inicio, fim);
            return Ok(faturas);
        }

        [HttpGet("total-faturado")]
        public async Task<ActionResult<decimal>> GetTotalFaturado([FromQuery] DateTime mes)
        {
            var total = await _faturaRepository.GetTotalFaturadoAsync(mes);
            return Ok(total);
        }

        [HttpGet("distribuicao-status")]
        public async Task<ActionResult<IDictionary<StatusFatura, int>>> GetDistribuicaoStatus()
        {
            var distribuicao = await _faturaRepository.GetDistribuicaoStatusAsync();
            return Ok(distribuicao);
        }

        [HttpPost]
        public async Task<ActionResult<Fatura>> CreateFatura(FaturaDTO faturaDTO)
        {
            var fatura = new Fatura
            {
                ContratoId = faturaDTO.ContratoId,
                DataEmissao = faturaDTO.DataEmissao,
                DataVencimento = faturaDTO.DataVencimento,
                ValorCobrado = faturaDTO.ValorCobrado,
                Status = StatusFatura.PENDENTE
            };

            await _faturaRepository.AddAsync(fatura);
            return CreatedAtAction(nameof(GetFatura), new { id = fatura.Id }, fatura);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFatura(int id, FaturaUpdateDTO faturaDTO)
        {
            if (id != faturaDTO.Id)
            {
                return BadRequest();
            }

            var faturaExistente = await _faturaRepository.GetByIdAsync(id);
            if (faturaExistente == null)
            {
                return NotFound();
            }

            faturaExistente.ContratoId = faturaDTO.ContratoId;
            faturaExistente.DataEmissao = faturaDTO.DataEmissao;
            faturaExistente.DataVencimento = faturaDTO.DataVencimento;
            faturaExistente.ValorCobrado = faturaDTO.ValorCobrado;

            if (faturaDTO.Status == StatusFatura.PAGA && faturaExistente.Status != StatusFatura.PAGA)
            {
                faturaExistente.Status = faturaDTO.Status;
                faturaExistente.DataPagamento = DateTime.Now;
            }
            else
            {
                faturaExistente.Status = faturaDTO.Status;
            }

            await _faturaRepository.UpdateAsync(faturaExistente);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFatura(int id)
        {
            var fatura = await _faturaRepository.GetByIdAsync(id);
            if (fatura == null)
            {
                return NotFound();
            }

            await _faturaRepository.DeleteAsync(fatura);
            return NoContent();
        }
    }
}
