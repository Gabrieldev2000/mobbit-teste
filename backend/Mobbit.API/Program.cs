using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Mobbit.API.Extensions;
using Mobbit.API.Services;
using Mobbit.Core.Interfaces;
using Mobbit.Infrastructure.Data;
using Mobbit.Infrastructure.Repositories;
using Mobbit.Infrastructure.Services;
using System.Reflection;

// Configuração para lidar com datas no PostgreSQL
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Configuração do Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Mobbit API",
        Version = "v1",
        Description = "API para gestão de telecomunicações",
        Contact = new OpenApiContact
        {
            Name = "Mobbit",
            Email = "contato@mobbit.com"
        }
    });

    // Configuração para incluir comentários XML
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});

// Configuração do PostgreSQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configuração dos serviços da aplicação
builder.Services.AddApplicationServices(builder.Configuration);

// Configuração do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

// Registro dos Repositories
builder.Services.AddScoped<IOperadoraRepository, OperadoraRepository>();
builder.Services.AddScoped<IContratoRepository, ContratoRepository>();
builder.Services.AddScoped<IFaturaRepository, FaturaRepository>();

// Registro dos Services
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddSingleton<INotificacaoService, NotificacaoService>();

// Configuração do serviço de background
builder.Services.AddHostedService<NotificacaoBackgroundService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Mobbit API v1");
        c.RoutePrefix = string.Empty; // Para servir o Swagger na raiz
    });
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

// Aplicar migrações do banco de dados
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        context.Database.Migrate();
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Ocorreu um erro ao migrar o banco de dados.");
    }
}

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
