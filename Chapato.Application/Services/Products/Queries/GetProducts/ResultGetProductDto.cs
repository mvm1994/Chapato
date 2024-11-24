namespace Chapato.Application.Services.Products.Queries.GetProducts
{
    public class ResultGetProductDto
    {
        public List<GetProductsDto> Products { get; set; }
        public int Rows { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
    }
}
