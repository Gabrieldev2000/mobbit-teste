using Microsoft.AspNetCore.Mvc;
using Mobbit.Core.Entities;
using Mobbit.Core.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

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
        public async Task<ActionResult<IEnumerable<Operadora>>> GetOperadoras([FromQuery] TipoServico? tipoServico, [FromQuery] bool? ativas)
        {
            var operadoras = await _operadoraRepository.GetAllAsync();

            if (tipoServico.HasValue && tipoServico.Value != TipoServico.None)
            {
                operadoras = operadoras.Where(o => (o.TipoServico & tipoServico.Value) == tipoServico.Value).ToList();
            }

            if (ativas.HasValue && ativas.Value)
            {
                operadoras = operadoras.Where(o => o.Ativo).ToList();
            }

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
            if (await _operadoraRepository.ExistsByCnpjAsync(operadora.Cnpj))
            {
                return BadRequest("Já existe uma operadora com este CNPJ.");
            }

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

            if (await _operadoraRepository.ExistsByCnpjAsync(operadora.Cnpj, operadora.Id))
            {
                return BadRequest("Já existe uma operadora com este CNPJ.");
            }

            var operadoraExistente = await _operadoraRepository.GetByIdAsync(id);
            if (operadoraExistente == null)
            {
                return NotFound();
            }

            if (operadoraExistente.Ativo && !operadora.Ativo)
            {
                var hasActiveContratos = await _operadoraRepository.HasActiveContratosAsync(id);
                if (hasActiveContratos)
                {
                    return BadRequest(new { message = "Não é possível inativar a operadora pois existem contratos ATIVOS vinculados a ela." });
                }
            }

            operadoraExistente.Nome = operadora.Nome;
            operadoraExistente.Cnpj = operadora.Cnpj;
            operadoraExistente.TipoServico = operadora.TipoServico;
            operadoraExistente.ContatoSuporte = operadora.ContatoSuporte;
            operadoraExistente.Ativo = operadora.Ativo;

            await _operadoraRepository.UpdateAsync(operadoraExistente);
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

            var hasActiveContratos = await _operadoraRepository.HasActiveContratosAsync(id);
            if (hasActiveContratos)
            {
                return BadRequest(new { message = "Não é possível excluir a operadora pois existem contratos ATIVOS vinculados a ela." });
            }

            await _operadoraRepository.DeleteAsync(operadora);
            return NoContent();
        }
    }
}
