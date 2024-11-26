using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Chapato.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class remove_customer_from_roles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L);

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                column: "InsertTime",
                value: new DateTime(2024, 11, 26, 15, 36, 16, 926, DateTimeKind.Local).AddTicks(1599));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                column: "InsertTime",
                value: new DateTime(2024, 11, 26, 15, 36, 16, 926, DateTimeKind.Local).AddTicks(1645));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                column: "InsertTime",
                value: new DateTime(2024, 11, 26, 14, 38, 42, 586, DateTimeKind.Local).AddTicks(1126));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                column: "InsertTime",
                value: new DateTime(2024, 11, 26, 14, 38, 42, 586, DateTimeKind.Local).AddTicks(1176));

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "InsertTime", "IsRemoved", "Name", "RemoveTime", "UpdateTime" },
                values: new object[] { 3L, new DateTime(2024, 11, 26, 14, 38, 42, 586, DateTimeKind.Local).AddTicks(1188), false, "مشتری", null, null });
        }
    }
}
