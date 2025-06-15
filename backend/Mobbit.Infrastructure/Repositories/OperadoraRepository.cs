using Microsoft.EntityFrameworkCore;
using Mobbit.Core.Entities;
using Mobbit.Core.Interfaces;
using Mobbit.Infrastructure.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mobbit.Infrastructure.Repositories
{
    public class OperadoraRepository : Repository<Operadora>, IOperadoraRepository
    {
        public OperadoraRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Operadora>> GetByTipoServicoAsync(TipoServico tipoServico)
        {
            return await _dbSet
                .Where(o => o.TipoServico == tipoServico)
                .ToListAsync();
        }

        public async Task<IEnumerable<Operadora>> GetAtivasAsync()
        {
            return await _dbSet
                .Where(o => o.Ativo)
                .ToListAsync();
        }

        public async Task DeleteAsync(Operadora operadora)
        {
            _context.Operadoras.Remove(operadora);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ExistsByCnpjAsync(string cnpj, int? id = null)
        {
            if (id.HasValue)
            {
                return await _context.Operadoras.AnyAsync(o => o.Cnpj == cnpj && o.Id != id.Value);
            }
            return await _context.Operadoras.AnyAsync(o => o.Cnpj == cnpj);
        }

        public async Task<bool> HasActiveContratosAsync(int operadoraId)
        {
            return await _context.Contratos.AnyAsync(c => c.OperadoraId == operadoraId && c.Status == StatusContrato.Ativo);
        }
    }
}
