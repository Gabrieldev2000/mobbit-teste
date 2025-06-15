using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mobbit.Infrastructure.Migrations
{
    public partial class AllowCascadeDeleteForOperadoras : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contratos_Operadoras_OperadoraId",
                table: "Contratos");

            migrationBuilder.AddForeignKey(
                name: "FK_Contratos_Operadoras_OperadoraId",
                table: "Contratos",
                column: "OperadoraId",
                principalTable: "Operadoras",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contratos_Operadoras_OperadoraId",
                table: "Contratos");

            migrationBuilder.AddForeignKey(
                name: "FK_Contratos_Operadoras_OperadoraId",
                table: "Contratos",
                column: "OperadoraId",
                principalTable: "Operadoras",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
