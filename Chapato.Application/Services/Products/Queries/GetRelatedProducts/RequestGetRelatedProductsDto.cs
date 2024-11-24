namespace Chapato.Application.Services.Products.Queries.GetRelatedProducts
{
    public class RequestGetRelatedProductsDto
    {
        public string? SearchKey { get; set; }
        public List<long> CategoryIds { get; set; }
        public List<long> RelProductIds { get; set; }
    }
}
