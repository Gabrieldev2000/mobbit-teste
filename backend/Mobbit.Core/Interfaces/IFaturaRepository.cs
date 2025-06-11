using Mobbit.Core.Entities;
using System;
using System.Threading.Tasks;

namespace Mobbit.Core.Interfaces
{
    public interface IFaturaRepository : IRepository<Fatura>
    {
        Task<IEnumerable<Fatura>> GetByContratoAsync(int contratoId);
        Task<IEnumerable<Fatura>> GetByStatusAsync(StatusFatura status);
        Task<IEnumerable<Fatura>> GetByPeriodoAsync(DateTime inicio, DateTime fim);
        Task<decimal> GetTotalFaturadoAsync(DateTime mes);
        Task<IDictionary<StatusFatura, int>> GetDistribuicaoStatusAsync();
    }
} 