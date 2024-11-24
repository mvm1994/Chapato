using Chapato.Application.Interfaces.Contexts;
using Chapato.Common;
using Chapato.Domain.Entities.Products;
using System.Collections.Generic;
using System.Linq;

namespace Chapato.Application.Services.Products.Queries.GetProductById
{
    public class GetProductByIdService : IGetProductByIdService
    {
        private readonly IDataBaseContext _context;

        public GetProductByIdService(IDataBaseContext context)
        {
            _context = context;
        }

        private List<string> GetAllParentCategoryNames(Category category)
        {
            var parentNames = new List<string>();
            var currentCategory = _context.Categories.FirstOrDefault(c => c.Id == category.ParentCategoryId);

            while (currentCategory != null)
            {
                parentNames.Add(currentCategory.Name);
                currentCategory = _context.Categories.FirstOrDefault(c => c.Id == currentCategory.ParentCategoryId);
            }

            parentNames.Reverse();
            return parentNames;
        }

        public ResultGetProductByIdDto Execute(RequestGetProductByIdDto request)
        {

            long productId = request.ProductId;
            var product = _context.Products.Find(productId);

            if (product == null)
            {
                return new ResultGetProductByIdDto { };
            }

            // Product Images
            var ImageList = _context.ProductImages
                .Where(pi => pi.ProductId == request.ProductId)
                .Select(image => new GetProductById_ImagesDto
                {
                    Id = image.Id,
                    FilePath = image.Src
                })
                .ToList();

            // Product Documents
            var DocumentList = _context.ProductDocuments
                .Where(pd => pd.ProductId == request.ProductId)
                .Select(document => new GetProductById_DocumentsDto
                {
                    Id = document.Id,
                    FilePath = document.Src
                })
                .ToList();

            // Product ColorOptions
            var ColorOptions = _context.ProductColorOptions
                .Where(cpo => cpo.ProductId == request.ProductId)
                .ToList()
                .Select(option =>
                {
                    var color = _context.Colors.FirstOrDefault(c => c.Id == option.ColorId);
                    return new GetProductById_ColorOptionsDto
                    {
                        Id = option.Id,
                        Name = color?.Name ?? string.Empty,
                        HexCode = color?.HexCode ?? string.Empty,
                        Price = option.OptionPrice,
                        Inventory = option.OptionInventory,
                        ColorId = option.ColorId
                    };
                })
                .ToList();

            // Product Related Products
            var RelatedProductList = new List<GetProductById_RelatedProductsDto>();

            foreach (var id in product.RelatedProduct)
            {
                if (long.TryParse(id, out long parsedId))
                {
                    var relProduct = _context.Products.FirstOrDefault(p => p.Id == parsedId);
                    var relProductImg = _context.ProductImages.FirstOrDefault(img => img.ProductId == parsedId);

                    if (relProduct != null)
                    {
                        RelatedProductList.Add(new GetProductById_RelatedProductsDto
                        {
                            Id = relProduct.Id,
                            Name = relProduct.Name,
                            FilePath = relProductImg?.Src ?? string.Empty
                        });
                    }
                }
            }

            // Product Features
            var CategoryList = new List<GetProductById_CategoriesDto>();
            var FeatureList = new List<GetProductById_FeaturesDto>();
            var FeatureitemList = new List<GetProductById_FeatureItemsDto>();

            var productFeatureItems = string.Join(",", product.ProductFeatureItems);

            var featureItemIds = productFeatureItems
                .Split(new[] { ',' }, System.StringSplitOptions.RemoveEmptyEntries)
                .Select(id =>
                {
                    if (long.TryParse(id, out long parsedId))
                    {
                        return (long?)parsedId;
                    }
                    else
                    {
                        return null;
                    }
                })
                .Where(parsedId => parsedId.HasValue)
                .Select(parsedId => parsedId.Value)
                .ToList();

            foreach (var parsedId in featureItemIds)
            {
                var featureItem = _context.ProductFeatureItems.FirstOrDefault(f => f.Id == parsedId);

                if (featureItem != null)
                {
                    var feature = _context.ProductFeatures.FirstOrDefault(f => f.Id == featureItem.ProductFeatureId);

                    if (feature != null)
                    {
                        var category = _context.Categories.FirstOrDefault(c => c.Id == feature.CategoryId);

                        FeatureitemList.Add(new GetProductById_FeatureItemsDto
                        {
                            Id = featureItem.Id,
                            Name = featureItem.Name,
                            ParentId = feature.Id
                        });

                        if (category != null)
                        {
                            if (!FeatureList.Any(f => f.Id == feature.Id))
                            {
                                FeatureList.Add(new GetProductById_FeaturesDto
                                {
                                    Id = feature.Id,
                                    CategoryId = category.Id,
                                    DisplayedName = feature.DisplayedName,
                                    DisplayType = feature.DisplayType
                                });
                            }
                        }
                    }
                }
            }

            var Productcategories = _context.ProductCategories.Where(pc => pc.ProductId == request.ProductId).ToList();

            if (Productcategories != null)
            {
                foreach (var item in Productcategories)
                {
                    var category = _context.Categories.FirstOrDefault(c => c.Id == item.CategoryId);

                    if (category != null)
                    {
                        var parentNames = GetAllParentCategoryNames(category);
                        var parentNamesString = parentNames.Any() ? string.Join(" > ", parentNames) + " > " : "";
                        var name = $"{parentNamesString}{category.Name}";

                        CategoryList.Add(new GetProductById_CategoriesDto
                        {
                            Id = category.Id,
                            Name = name
                        });
                    }
                }
            }

            var product_delivery = _context.ProductDeliveryPeriods.FirstOrDefault(pd => pd.ProductId == request.ProductId);
            int MinTime = 0;
            int MaxTime = 0;

            if (product_delivery != null)
            {
                MinTime = product_delivery.MinTime;
                MaxTime = product_delivery.MaxTime;
            }

            return new ResultGetProductByIdDto
            {
                Id = product.Id,
                Name = product.Name,
                BrandId = product.BrandId,
                DeliveryDescription = product.DeliveryDescription,
                Description = product.Description,
                Existence = product.Existence,
                Inventory = product.Inventory,
                MetaDescription = product.MetaDescription,
                MetaKeywords = product.MetaKeywords,
                PageTitle = product.PageTitle,
                PageUrl = product.PageUrl,
                Price = product.Price,
                UniqueCode = product.UniqueCode,
                VideoLink = product.VideoLink,
                Images = ImageList,
                Documents = DocumentList,
                CategoryIds = CategoryList,
                Features = FeatureList,
                ColorOptions = ColorOptions,
                ProductFeatureItems = FeatureitemList,
                RelatedProduct = RelatedProductList,
                MinTime = MinTime,
                MaxTime = MaxTime
            };
        }
    }
}
