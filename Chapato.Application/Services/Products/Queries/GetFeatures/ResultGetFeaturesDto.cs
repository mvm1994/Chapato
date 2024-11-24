using Chapato.Application.Services.Products.Commands.AddNewFeature;
using Chapato.Domain.Entities.Products;

namespace Chapato.Application.Services.Products.Queries.GetFeatures
{
    public class ResultGetFeaturesDto
    {
        public List<FeatureDtoWithItems> Features { get; set; }
        public string ErrorMessage { get; set; }
    }

    public class FeatureDtoWithItems : FeatureDto
    {
        public long Id { get; set; }
        public List<FeatureItemDto> FeatureItems { get; set; }
    }

}
