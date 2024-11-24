namespace Chapato.Application.Services.Products.Queries.GetProductsForSite
{
    public class ProductForSiteDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string ImageSrc { get; set; }
        public int Price { get; set; }
        public int Price_With_DisCount { get; set; }
        public int Star { get; set; }
        public bool SpecialSale { get; set; }
        public int SpecialSale_Discount { get; set; }
        public bool AmazingSale { get; set; }
        public int AmazingSale_Discount { get; set; }
    }
}
