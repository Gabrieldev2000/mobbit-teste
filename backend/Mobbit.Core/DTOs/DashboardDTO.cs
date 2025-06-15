using System;
using System.Collections.Generic;

namespace Mobbit.Core.DTOs
{
    public class DashboardDTO
    {
        public class DistribuicaoStatus
        {
            public string Status { get; set; }
            public int Quantidade { get; set; }
            public decimal ValorTotal { get; set; }
        }

        public class EvolucaoMensal
        {
            public string Mes { get; set; }
            public int FaturasEmitidas { get; set; }
            public int FaturasPagas { get; set; }
            public decimal ValorTotal { get; set; }
        }

        public class Totais
        {
            public int TotalFaturasEmitidas { get; set; }
            public decimal ValorTotalFaturado { get; set; }
            public int FaturasPendentes { get; set; }
            public int FaturasAtrasadas { get; set; }
        }
    }
}
