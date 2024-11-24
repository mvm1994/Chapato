using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;
using Chapato.Domain.Entities.Products;

namespace Chapato.Application.Services.Products.Commands.EditFeature
{
    public class EditFeatureService : IEditFeatureService
    {
        private readonly IDataBaseContext _context;
        public EditFeatureService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto Execute(RequestEditFeatureDto request)
        {
            var featuresToUpdate = new List<ProductFeatures>();

            foreach (var item in request.Feature_ToUPdate)
            {
                var feature = _context.ProductFeatures.Find(item.Id);

                if (feature == null)
                {
                    return new ResultDto
                    {
                        IsSuccess = false,
                        Message = ""
                    };
                }

                feature.DisplayedName = item.DisplayedName;
                feature.DisplayType = item.DisplayType;
                feature.UpdateTime = DateTime.Now;

                featuresToUpdate.Add(feature);
            }

            _context.ProductFeatures.UpdateRange(featuresToUpdate);
            _context.SaveChanges();

            return new ResultDto
            {
                IsSuccess = true,
                Message = ""
            };
        }

    }
}
