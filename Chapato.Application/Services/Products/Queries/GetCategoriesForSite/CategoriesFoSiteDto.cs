namespace Chapato.Application.Services.Products.Queries.GetCategoriesForSite
{
    public class CategoriesFoSiteDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public List<CategoriesFoSiteDto> Children { get; set; }
    }
}
