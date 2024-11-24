using Chapato.Application.Interfaces.Contexts;
using Chapato.Domain.Entities.Products;
using Chapato.Application.Services.Products.Queries.GetFeatures;
using Chapato.Application.Services.Products.Commands.AddNewFeature;

namespace Chapato.Application.Services.Products.Queries.GetFeatures
{
    public class GetFeaturesService : IGetFeaturesService
    {
        private readonly IDataBaseContext _context;

        public GetFeaturesService(IDataBaseContext context)
        {
            _context = context;
        }

        public ResultGetFeaturesDto Execute(RequestGetFeaturesDto request)
        {
            var category = _context.Categories.Find(request.CategoryId);

            if (category == null)
            {
                return new ResultGetFeaturesDto
                {
                    ErrorMessage = "دسته بندی موجود نیست"
                };
            }

            var features = _context.ProductFeatures
                .Where(f => f.CategoryId == request.CategoryId)
                .Select(f => new FeatureDtoWithItems
                {
                    Id=f.Id,
                    DisplayedName = f.DisplayedName,
                    DisplayType = f.DisplayType,
                    FeatureItems = f.ProductFeatureItems.Select(fi => new FeatureItemDto
                    {
                        Id = fi.Id,
                        Name = fi.Name
                    }).ToList()
                }).ToList();

            return new ResultGetFeaturesDto
            {
                Features = features
            };
        }
    }

}
