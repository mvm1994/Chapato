using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;
using Chapato.Domain.Entities.Products;

namespace Chapato.Application.Services.Products.Commands.DeleteFeature
{
    public class DeleteFeatureService : IDeleteFeatureService
    {
        private readonly IDataBaseContext _context;
        public DeleteFeatureService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto Execute(long Id)
        {
            var feature = _context.ProductFeatures.Find(Id);
            var feature_items = _context.ProductFeatureItems.Where(fi => fi.ProductFeatureId == Id).ToList();

            if (feature_items != null)
            {
                List<ProductFeatureItems> FeatureItems = new List<ProductFeatureItems>();

                foreach (var item in feature_items)
                {
                    var feature_item = _context.ProductFeatureItems.Find(item.Id);

                    if (feature_item != null)
                    {
                        FeatureItems.Add(feature_item);
                    }
                }

                _context.ProductFeatureItems.RemoveRange(FeatureItems);
            }

            if (feature != null)
            {
                _context.ProductFeatures.Remove(feature);
                _context.SaveChanges();
            }

            return new ResultDto
            {
                IsSuccess = true,
                Message = "ویژگی حذف شد"
            };
        }
    }
}
