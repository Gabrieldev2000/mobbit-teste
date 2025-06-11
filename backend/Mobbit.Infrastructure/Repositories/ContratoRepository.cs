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
    public class ContratoRepository : Repository<Contrato>, IContratoRepository
    {
        public ContratoRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Contrato>> GetByOperadoraAsync(int operadoraId)
        {
            return await _dbSet
                .Include(c => c.Operadora)
                .Where(c => c.OperadoraId == operadoraId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Contrato>> GetByStatusAsync(StatusContrato status)
        {
            return await _dbSet
                .Include(c => c.Operadora)
                .Where(c => c.Status == status)
                .ToListAsync();
        }

        public async Task<IEnumerable<Contrato>> GetVencendoEmAsync(int dias)
        {
            var dataLimite = DateTime.Now.AddDays(dias);
            return await _dbSet
                .Include(c => c.Operadora)
                .Where(c => c.DataVencimento <= dataLimite && c.Status == StatusContrato.Ativo)
                .ToListAsync();
        }

        public async Task<decimal> GetTotalMensalAsync(DateTime mes)
        {
            var inicioMes = new DateTime(mes.Year, mes.Month, 1);
            var fimMes = inicioMes.AddMonths(1).AddDays(-1);

            return await _dbSet
                .Where(c => c.DataInicio <= fimMes && 
                           (c.DataVencimento >= inicioMes || c.Status == StatusContrato.Ativo))
                .SumAsync(c => c.ValorMensal);
        }
    }
} 