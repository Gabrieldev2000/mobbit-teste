using Microsoft.EntityFrameworkCore;
using Mobbit.Core.Entities;

namespace Mobbit.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Operadora> Operadoras { get; set; }
        public DbSet<Contrato> Contratos { get; set; }
        public DbSet<Fatura> Faturas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Operadora>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Nome).IsRequired().HasMaxLength(100);
                entity.Property(e => e.ContatoSuporte).HasMaxLength(100);
            });

            modelBuilder.Entity<Contrato>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.NomeFilial).IsRequired().HasMaxLength(100);
                entity.Property(e => e.PlanoContratado).IsRequired().HasMaxLength(100);
                entity.Property(e => e.ValorMensal).HasPrecision(18, 2);
                entity.HasOne(e => e.Operadora)
                    .WithMany()
                    .HasForeignKey(e => e.OperadoraId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Fatura>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.ValorCobrado).HasPrecision(18, 2);
                entity.HasOne(e => e.Contrato)
                    .WithMany()
                    .HasForeignKey(e => e.ContratoId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
} 