namespace Chapato.Application.Services.Products.Queries.GetProducts
{
    public class GetProductsDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string UniqueCode { get; set; }
        public int Price { get; set; }
        public int Inventory { get; set; }
        public bool Displayed { get; set; } = true;
    }
}
