using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Mobbit.Core.Interfaces;
using Mobbit.Infrastructure.Data;
using Mobbit.Infrastructure.Repositories;
using Mobbit.Infrastructure.Services;

namespace Mobbit.API.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Configuração do banco de dados
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

            // Registro dos repositórios
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<IOperadoraRepository, OperadoraRepository>();
            services.AddScoped<IContratoRepository, ContratoRepository>();
            services.AddScoped<IFaturaRepository, FaturaRepository>();

            // Registro dos serviços
            services.AddScoped<INotificacaoService, NotificacaoService>();
            services.AddScoped<IDashboardService, DashboardService>();

            return services;
        }
    }
} 