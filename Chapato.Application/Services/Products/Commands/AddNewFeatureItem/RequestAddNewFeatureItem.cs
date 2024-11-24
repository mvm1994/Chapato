namespace Chapato.Application.Services.Products.Commands.AddNewFeatureItem
{
    public class RequestAddNewFeatureItemDto
    {
        public List<FeatureItemDto> FeatureItems { get; set; }
    }

    public class FeatureItemDto
    {
        public long FeatureId { get; set; }
        public string Name { get; set; }
    }
}
