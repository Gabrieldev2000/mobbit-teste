using Mobbit.Core.Entities;
using System.Threading.Tasks;

namespace Mobbit.Core.Interfaces
{
    public interface IOperadoraRepository : IRepository<Operadora>
    {
        Task<IEnumerable<Operadora>> GetByTipoServicoAsync(TipoServico tipoServico);
        Task<IEnumerable<Operadora>> GetAtivasAsync();
    }
} 