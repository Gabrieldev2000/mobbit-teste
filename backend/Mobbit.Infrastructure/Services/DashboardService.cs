using Mobbit.Core.Entities;
using Mobbit.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mobbit.Infrastructure.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IFaturaRepository _faturaRepository;
        private readonly IContratoRepository _contratoRepository;

        public DashboardService(
            IFaturaRepository faturaRepository,
            IContratoRepository contratoRepository)
        {
            _faturaRepository = faturaRepository;
            _contratoRepository = contratoRepository;
        }

        public async Task<IDictionary<StatusFatura, int>> GetDistribuicaoFaturasAsync()
        {
            return await _faturaRepository.GetDistribuicaoStatusAsync();
        }

        public async Task<IDictionary<DateTime, decimal>> GetEvolucaoMensalAsync(int meses)
        {
            var resultado = new Dictionary<DateTime, decimal>();
            var dataAtual = DateTime.Now;

            for (int i = 0; i < meses; i++)
            {
                var mes = dataAtual.AddMonths(-i);
                var total = await _faturaRepository.GetTotalFaturadoAsync(mes);
                resultado.Add(mes, total);
            }

            return resultado;
        }

        public async Task<decimal> GetTotalFaturadoAsync(DateTime mes)
        {
            return await _faturaRepository.GetTotalFaturadoAsync(mes);
        }

        public async Task<int> GetTotalFaturasAsync(DateTime mes)
        {
            var inicioMes = new DateTime(mes.Year, mes.Month, 1);
            var fimMes = inicioMes.AddMonths(1).AddDays(-1);

            var faturas = await _faturaRepository.GetByPeriodoAsync(inicioMes, fimMes);
            return faturas.Count();
        }
    }
} 