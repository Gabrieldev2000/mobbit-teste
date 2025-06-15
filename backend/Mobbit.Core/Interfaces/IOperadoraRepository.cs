using Mobbit.Core.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Mobbit.Core.Interfaces
{
    public interface IOperadoraRepository : IRepository<Operadora>
    {
        Task<IEnumerable<Operadora>> GetByTipoServicoAsync(TipoServico tipoServico);
        Task<IEnumerable<Operadora>> GetAtivasAsync();
        new Task UpdateAsync(Operadora operadora);
        new Task DeleteAsync(Operadora operadora);
        Task<bool> ExistsByCnpjAsync(string cnpj, int? id = null);
        Task<bool> HasActiveContratosAsync(int operadoraId);
    }
}
