namespace Chapato.Application.Services.Products.Commands.UpdateProduct
{
    public class UpdatedColorOptionsDto
    {
        public long Id { get; set; }
        public long ColorId { get; set; }
        public string Name { get; set; }
        public string HexCode { get; set; }
        public int Price { get; set; }
        public int Inventory { get; set; }
    }
}
