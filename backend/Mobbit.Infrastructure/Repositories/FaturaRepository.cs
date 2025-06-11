using Microsoft.EntityFrameworkCore;
using Mobbit.Core.Entities;
using Mobbit.Core.Interfaces;
using Mobbit.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mobbit.Infrastructure.Repositories
{
    public class FaturaRepository : Repository<Fatura>, IFaturaRepository
    {
        public FaturaRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Fatura>> GetByContratoAsync(int contratoId)
        {
            return await _dbSet
                .Include(f => f.Contrato)
                .ThenInclude(c => c.Operadora)
                .Where(f => f.ContratoId == contratoId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Fatura>> GetByStatusAsync(StatusFatura status)
        {
            return await _dbSet
                .Include(f => f.Contrato)
                .ThenInclude(c => c.Operadora)
                .Where(f => f.Status == status)
                .ToListAsync();
        }

        public async Task<IEnumerable<Fatura>> GetByPeriodoAsync(DateTime inicio, DateTime fim)
        {
            return await _dbSet
                .Include(f => f.Contrato)
                .ThenInclude(c => c.Operadora)
                .Where(f => f.DataEmissao >= inicio && f.DataEmissao <= fim)
                .ToListAsync();
        }

        public async Task<decimal> GetTotalFaturadoAsync(DateTime mes)
        {
            var inicioMes = new DateTime(mes.Year, mes.Month, 1);
            var fimMes = inicioMes.AddMonths(1).AddDays(-1);

            return await _dbSet
                .Where(f => f.DataEmissao >= inicioMes && f.DataEmissao <= fimMes)
                .SumAsync(f => f.ValorCobrado);
        }

        public async Task<IDictionary<StatusFatura, int>> GetDistribuicaoStatusAsync()
        {
            var distribuicao = await _dbSet
                .GroupBy(f => f.Status)
                .Select(g => new { Status = g.Key, Quantidade = g.Count() })
                .ToListAsync();

            return distribuicao.ToDictionary(x => x.Status, x => x.Quantidade);
        }
    }
} 