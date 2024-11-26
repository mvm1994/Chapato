using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Chapato.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class modify_invoice_table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DepositAmount",
                table: "CustomerInvoices");

            migrationBuilder.DropColumn(
                name: "DiscountPercent",
                table: "CustomerInvoices");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                column: "InsertTime",
                value: new DateTime(2024, 11, 26, 16, 57, 16, 671, DateTimeKind.Local).AddTicks(1362));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                column: "InsertTime",
                value: new DateTime(2024, 11, 26, 16, 57, 16, 671, DateTimeKind.Local).AddTicks(1405));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DepositAmount",
                table: "CustomerInvoices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DiscountPercent",
                table: "CustomerInvoices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                column: "InsertTime",
                value: new DateTime(2024, 11, 26, 16, 45, 48, 324, DateTimeKind.Local).AddTicks(5395));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                column: "InsertTime",
                value: new DateTime(2024, 11, 26, 16, 45, 48, 324, DateTimeKind.Local).AddTicks(5433));
        }
    }
}
