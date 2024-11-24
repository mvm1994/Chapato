namespace Chapato.Application.Services.Products.Queries.GetProductById
{
    public class GetProductById_ColorOptionsDto
    {
        public long Id { get; set; }
        public long ColorId { get; set; }
        public string Name { get; set; }
        public string HexCode { get; set; }
        public int Price { get; set; }
        public int Inventory { get; set; }
    }
}
