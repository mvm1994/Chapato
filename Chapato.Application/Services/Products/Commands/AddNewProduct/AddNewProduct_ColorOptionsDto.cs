namespace Chapato.Application.Services.Products.Commands.AddNewProduct
{
    public class AddNewProduct_ColorOptionsDto
    {
        public long ColorId { get; set; }
        public string Name { get; set; }
        public string HexCode { get; set; }
        public int Price { get; set; }
        public int Inventory { get; set; }
    }
}
