namespace Chapato.Application.Services.Products.Queries.GetProductsForSite
{
    public class RequestProductForSiteDto
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int MaxPrice { get; set; }
        public string SortTabId { get; set; }
        public List<FilteredCategoriesDto>? Categories { get; set; }
        public List<FilteredBrandsDto>? Brands { get; set; }
        public FilteredPricesDto? Prices { get; set; }
    }
}
