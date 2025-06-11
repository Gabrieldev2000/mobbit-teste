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
    }
} 