namespace Chapato.Application.Services.Products.Queries.GetProductById
{
    public class ResultGetProductByIdDto
    {
        public long Id { get; set; }
        public long BrandId { get; set; }
        public string Existence { get; set; }
        public string Name { get; set; }
        public string UniqueCode { get; set; }
        public int Price { get; set; }
        public int Inventory { get; set; }
        public string DeliveryDescription { get; set; }
        public int MinTime { get; set; }
        public int MaxTime { get; set; }
        public string Description { get; set; }
        public string VideoLink { get; set; }
        public string PageTitle { get; set; }
        public string PageUrl { get; set; }
        public string MetaKeywords { get; set; }
        public string MetaDescription { get; set; }
        public List<GetProductById_CategoriesDto> CategoryIds { get; set; }
        public List<GetProductById_ImagesDto> Images { get; set; }
        public List<GetProductById_DocumentsDto> Documents { get; set; }
        public List<GetProductById_ColorOptionsDto> ColorOptions { get; set; }
        public List<GetProductById_RelatedProductsDto> RelatedProduct { get; set; }
        public List<GetProductById_FeatureItemsDto> ProductFeatureItems { get; set; }
        public List<GetProductById_FeaturesDto> Features { get; set; }
    }
}
