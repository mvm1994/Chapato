using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;
using Chapato.Domain.Entities.Products;
using System.Collections.Generic;

namespace Chapato.Application.Services.Products.Commands.AddNewFeature
{
    public class AddNewFeatureService : IAddNewFeatureService
    {
        private readonly IDataBaseContext _context;

        public AddNewFeatureService(IDataBaseContext context)
        {
            _context = context;
        }

        public ResultDto Execute(RequestAddNewFeatureDto request)
        {
            var category = _context.Categories.Find(request.CategoryId);

            if (category == null)
            {
                return new ResultDto
                {
                    IsSuccess = false,
                    Message = "دسته بندی انتخاب شده در دیتابیس موجود نیست"
                };
            }

            foreach (var featureDto in request.Features)
            {
                var feature = new ProductFeatures()
                {
                    Id = featureDto.Id,
                    Category = category,
                    CategoryId = request.CategoryId,
                    DisplayedName = featureDto.DisplayedName,
                    DisplayType = Convert.ToInt32(featureDto.DisplayType)
                };

                _context.ProductFeatures.Add(feature);

                if (featureDto.FeatureItems != null)
                {
                    List<ProductFeatureItems> productFeatureItems = new List<ProductFeatureItems>();

                    foreach (var itemDto in featureDto.FeatureItems)
                    {
                        var productFeatureItem = new ProductFeatureItems
                        {
                            ProductFeature = feature,
                            Name = itemDto.Name
                        };

                        productFeatureItems.Add(productFeatureItem);
                    }

                    _context.ProductFeatureItems.AddRange(productFeatureItems);
                }
            }

            _context.SaveChanges();

            return new ResultDto
            {
                IsSuccess = true,
                Message = "ویژگی با موفقیت اضافه شد"
            };
        }
    }
}
