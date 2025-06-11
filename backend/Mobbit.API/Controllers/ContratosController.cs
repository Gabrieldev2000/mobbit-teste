using Microsoft.AspNetCore.Mvc;
using Mobbit.Core.Entities;
using Mobbit.Core.Interfaces;
using System;
using System.Collections.Generic;
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
        public async Task<ActionResult<IEnumerable<Contrato>>> GetContratos()
        {
            var contratos = await _contratoRepository.GetAllAsync();
            return Ok(contratos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Contrato>> GetContrato(int id)
        {
            var contrato = await _contratoRepository.GetByIdAsync(id);
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
        public async Task<ActionResult<Contrato>> CreateContrato(Contrato contrato)
        {
            contrato.DataCadastro = DateTime.Now;
            contrato.Status = StatusContrato.Ativo;
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

            await _contratoRepository.UpdateAsync(contrato);
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