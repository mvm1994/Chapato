namespace Chapato.Application.Services.Products.Queries.GetProductsForSite
{
    public class ResultProductForSiteDto
    {
        public List<ProductForSiteDto> Filtered_Products { get; set; }
        public int TotalRows { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public string SortTabId { get; set; }
        public int MaxPrice { get; set; }
    }
}
