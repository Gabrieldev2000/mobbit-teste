using Microsoft.AspNetCore.Mvc;
using Mobbit.Core.DTOs;
using Mobbit.Core.Entities;
using Mobbit.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mobbit.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContratosController : ControllerBase
    {
        private readonly IContratoRepository _contratoRepository;

        public ContratosController(IContratoRepository contratoRepository)
        {
            _contratoRepository = contratoRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contrato>>> GetContratos([FromQuery] int? operadoraId, [FromQuery] StatusContrato? status)
        {
            var contratos = await _contratoRepository.GetAllWithOperadoraAsync();

            if (operadoraId.HasValue)
            {
                contratos = contratos.Where(c => c.OperadoraId == operadoraId.Value).ToList();
            }

            if (status.HasValue)
            {
                contratos = contratos.Where(c => c.Status == status.Value).ToList();
            }

            return Ok(contratos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Contrato>> GetContrato(int id)
        {
            var contrato = await _contratoRepository.GetByIdWithOperadoraAsync(id);
            if (contrato == null)
            {
                return NotFound();
            }
            return Ok(contrato);
        }

        [HttpGet("operadora/{operadoraId}")]
        public async Task<ActionResult<IEnumerable<Contrato>>> GetContratosPorOperadora(int operadoraId)
        {
            var contratos = await _contratoRepository.GetByOperadoraAsync(operadoraId);
            return Ok(contratos);
        }

        [HttpGet("status/{status}")]
        public async Task<ActionResult<IEnumerable<Contrato>>> GetContratosPorStatus(StatusContrato status)
        {
            var contratos = await _contratoRepository.GetByStatusAsync(status);
            return Ok(contratos);
        }

        [HttpGet("vencendo-em/{dias}")]
        public async Task<ActionResult<IEnumerable<Contrato>>> GetContratosVencendoEm(int dias)
        {
            var contratos = await _contratoRepository.GetVencendoEmAsync(dias);
            return Ok(contratos);
        }

        [HttpGet("total-mensal")]
        public async Task<ActionResult<decimal>> GetTotalMensal([FromQuery] DateTime mes)
        {
            var total = await _contratoRepository.GetTotalMensalAsync(mes);
            return Ok(total);
        }

        [HttpPost]
        public async Task<ActionResult<Contrato>> CreateContrato(ContratoDTO contratoDTO)
        {
            var contrato = new Contrato
            {
                NomeFilial = contratoDTO.NomeFilial,
                OperadoraId = contratoDTO.OperadoraId,
                PlanoContratado = contratoDTO.PlanoContratado,
                DataInicio = contratoDTO.DataInicio,
                DataVencimento = contratoDTO.DataVencimento,
                ValorMensal = contratoDTO.ValorMensal,
                DataCadastro = DateTime.Now,
                Status = StatusContrato.Ativo
            };

            await _contratoRepository.AddAsync(contrato);
            return CreatedAtAction(nameof(GetContrato), new { id = contrato.Id }, contrato);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContrato(int id, Contrato contrato)
        {
            if (id != contrato.Id)
            {
                return BadRequest();
            }

            var contratoExistente = await _contratoRepository.GetByIdAsync(id);
            if (contratoExistente == null)
            {
                return NotFound();
            }

            contratoExistente.NomeFilial = contrato.NomeFilial;
            contratoExistente.OperadoraId = contrato.OperadoraId;
            contratoExistente.PlanoContratado = contrato.PlanoContratado;
            contratoExistente.DataInicio = contrato.DataInicio;
            contratoExistente.DataVencimento = contrato.DataVencimento;
            contratoExistente.ValorMensal = contrato.ValorMensal;
            contratoExistente.Status = contrato.Status;

            await _contratoRepository.UpdateAsync(contratoExistente);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContrato(int id)
        {
            var contrato = await _contratoRepository.GetByIdAsync(id);
            if (contrato == null)
            {
                return NotFound();
            }

            await _contratoRepository.DeleteAsync(contrato);
            return NoContent();
        }
    }
}
