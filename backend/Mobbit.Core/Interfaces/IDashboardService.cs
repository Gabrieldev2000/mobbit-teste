using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mobbit.Core.DTOs;

namespace Mobbit.Core.Interfaces
{
    public interface IDashboardService
    {
        Task<IEnumerable<DashboardDTO.DistribuicaoStatus>> GetDistribuicaoStatusAsync();
        Task<IEnumerable<DashboardDTO.EvolucaoMensal>> GetEvolucaoMensalAsync(int meses = 12);
        Task<DashboardDTO.Totais> GetTotaisAsync();
    }
}
