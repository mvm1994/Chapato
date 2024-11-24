namespace Chapato.Application.Services.Products.Queries.GetProductById
{
    public class GetProductById_FeaturesDto
    {
        public long Id { get; set; }
        public long CategoryId { get; set; }
        public int DisplayType { get; set; }
        public string DisplayedName { get; set; }
    }
}
