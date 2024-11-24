
namespace Chapato.Application.Services.Products.Commands.AddNewFeature
{
    public class FeatureItemDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
    }

    public class FeatureDto
    {
        public long Id { get; set; }
        public string DisplayedName { get; set; }
        public int DisplayType { get; set; }
        public List<FeatureItemDto> FeatureItems { get; set; }
    }

    public class RequestAddNewFeatureDto
    {
        public long CategoryId { get; set; }
        public List<FeatureDto> Features { get; set; }
    }
}
