using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mobbit.Core.DTOs;
using Mobbit.Core.Entities;
using Mobbit.Core.Interfaces;

namespace Mobbit.Infrastructure.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IFaturaRepository _faturaRepository;

        public DashboardService(IFaturaRepository faturaRepository)
        {
            _faturaRepository = faturaRepository;
        }

        public async Task<IEnumerable<DashboardDTO.DistribuicaoStatus>> GetDistribuicaoStatusAsync()
        {
            var faturas = await _faturaRepository.GetAllAsync();

            return faturas
                .GroupBy(f => f.Status)
                .Select(g => new DashboardDTO.DistribuicaoStatus
                {
                    Status = g.Key.ToString(),
                    Quantidade = g.Count(),
                    ValorTotal = g.Sum(f => f.ValorCobrado)
                });
        }

        public async Task<IEnumerable<DashboardDTO.EvolucaoMensal>> GetEvolucaoMensalAsync(int meses = 12)
        {
            var faturas = await _faturaRepository.GetAllAsync();
            var dataInicio = DateTime.Now.AddMonths(-meses);

            return faturas
                .Where(f => f.DataEmissao >= dataInicio)
                .GroupBy(f => new { f.DataEmissao.Year, f.DataEmissao.Month })
                .Select(g => new DashboardDTO.EvolucaoMensal
                {
                    Mes = $"{g.Key.Year}/{g.Key.Month:D2}",
                    FaturasEmitidas = g.Count(),
                    FaturasPagas = g.Count(f => (int)f.Status == 0),
                    ValorTotal = g.Sum(f => f.ValorCobrado)
                })
                .OrderBy(x => x.Mes);
        }

        public async Task<DashboardDTO.Totais> GetTotaisAsync()
        {
            var faturas = await _faturaRepository.GetAllAsync();

            return new DashboardDTO.Totais
            {
                TotalFaturasEmitidas = faturas.Count(),
                ValorTotalFaturado = faturas.Sum(f => f.ValorCobrado),
                FaturasPendentes = faturas.Count(f => f.Status == StatusFatura.PENDENTE),
                FaturasAtrasadas = faturas.Count(f => f.Status == StatusFatura.ATRASADA)
            };
        }
    }
}
