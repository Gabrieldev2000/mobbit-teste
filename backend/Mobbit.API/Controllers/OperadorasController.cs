using Microsoft.AspNetCore.Mvc;
using Mobbit.Core.Entities;
using Mobbit.Core.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mobbit.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OperadorasController : ControllerBase
    {
        private readonly IOperadoraRepository _operadoraRepository;

        public OperadorasController(IOperadoraRepository operadoraRepository)
        {
            _operadoraRepository = operadoraRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Operadora>>> GetOperadoras()
        {
            var operadoras = await _operadoraRepository.GetAllAsync();
            return Ok(operadoras);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Operadora>> GetOperadora(int id)
        {
            var operadora = await _operadoraRepository.GetByIdAsync(id);
            if (operadora == null)
            {
                return NotFound();
            }
            return Ok(operadora);
        }

        [HttpGet("tipo/{tipoServico}")]
        public async Task<ActionResult<IEnumerable<Operadora>>> GetOperadorasPorTipo(TipoServico tipoServico)
        {
            var operadoras = await _operadoraRepository.GetByTipoServicoAsync(tipoServico);
            return Ok(operadoras);
        }

        [HttpGet("ativas")]
        public async Task<ActionResult<IEnumerable<Operadora>>> GetOperadorasAtivas()
        {
            var operadoras = await _operadoraRepository.GetAtivasAsync();
            return Ok(operadoras);
        }

        [HttpPost]
        public async Task<ActionResult<Operadora>> CreateOperadora(Operadora operadora)
        {
            operadora.DataCadastro = System.DateTime.Now;
            operadora.Ativo = true;
            await _operadoraRepository.AddAsync(operadora);
            return CreatedAtAction(nameof(GetOperadora), new { id = operadora.Id }, operadora);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOperadora(int id, Operadora operadora)
        {
            if (id != operadora.Id)
            {
                return BadRequest();
            }

            var operadoraExistente = await _operadoraRepository.GetByIdAsync(id);
            if (operadoraExistente == null)
            {
                return NotFound();
            }

            await _operadoraRepository.UpdateAsync(operadora);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOperadora(int id)
        {
            var operadora = await _operadoraRepository.GetByIdAsync(id);
            if (operadora == null)
            {
                return NotFound();
            }

            await _operadoraRepository.DeleteAsync(operadora);
            return NoContent();
        }
    }
} 