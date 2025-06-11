using Mobbit.Core.Entities;
using System;
using System.Threading.Tasks;

namespace Mobbit.Core.Interfaces
{
    public interface IContratoRepository : IRepository<Contrato>
    {
        Task<IEnumerable<Contrato>> GetByOperadoraAsync(int operadoraId);
        Task<IEnumerable<Contrato>> GetByStatusAsync(StatusContrato status);
        Task<IEnumerable<Contrato>> GetVencendoEmAsync(int dias);
        Task<decimal> GetTotalMensalAsync(DateTime mes);
    }
} 