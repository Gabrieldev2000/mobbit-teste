using System;
using System.Threading.Tasks;
using Mobbit.Core.Entities;

namespace Mobbit.Core.Interfaces
{
    public interface IDashboardService
    {
        Task<IDictionary<StatusFatura, int>> GetDistribuicaoFaturasAsync();
        Task<IDictionary<DateTime, decimal>> GetEvolucaoMensalAsync(int meses);
        Task<decimal> GetTotalFaturadoAsync(DateTime mes);
        Task<int> GetTotalFaturasAsync(DateTime mes);
    }
} 