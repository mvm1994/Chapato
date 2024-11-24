using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;
using Chapato.Domain.Entities.Products;

namespace Chapato.Application.Services.Products.Commands.AddNewFeatureItem
{
    public class AddNewFeatureItemService : IAddNewFeatureItemService
    {
        private readonly IDataBaseContext _context;
        public AddNewFeatureItemService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto Execute(RequestAddNewFeatureItemDto request)
        {
            List<ProductFeatureItems> FeatureItems = new List<ProductFeatureItems>();

            foreach (var item in request.FeatureItems)
            {
                var feature = _context.ProductFeatures.Find(item.FeatureId);

                if (feature == null)
                {
                    return new ResultDto
                    {
                        IsSuccess = false,
                        Message = "ویژگی والد در دیتابیس موجود نیست"
                    };
                }
                else
                {
                    FeatureItems.Add(new ProductFeatureItems
                    {
                        ProductFeature = feature,
                        ProductFeatureId = item.FeatureId,
                        Name = item.Name
                    });
                }
            }

            _context.ProductFeatureItems.AddRange(FeatureItems);
            _context.SaveChanges();

            return new ResultDto
            {
                IsSuccess = true,
                Message = "لیست فرزندها با موفقیت ثبت شد"
            };

        }
    }
}
