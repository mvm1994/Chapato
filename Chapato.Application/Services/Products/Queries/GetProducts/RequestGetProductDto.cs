namespace Chapato.Application.Services.Products.Queries.GetProducts
{
    public class RequestGetProductDto
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public string SearchKey { get; set; }
    }
}
