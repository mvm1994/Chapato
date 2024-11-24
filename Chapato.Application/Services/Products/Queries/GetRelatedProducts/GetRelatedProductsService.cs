using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;
using Chapato.Domain.Entities.Products;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Chapato.Application.Services.Products.Queries.GetRelatedProducts
{
    public class GetRelatedProductsService : IGetRelatedProductsService
    {
        private readonly IDataBaseContext _context;
        public GetRelatedProductsService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto<ResultGetRelatedProductsDto> Execute(RequestGetRelatedProductsDto request)
        {
            if (string.IsNullOrWhiteSpace(request.SearchKey) && request.CategoryIds.Count == 0)
            {
                return new ResultDto<ResultGetRelatedProductsDto>
                {
                    Data = new ResultGetRelatedProductsDto
                    {
                        RelProducts = new List<RelatedProductDto>()
                    },
                    IsSuccess = true,
                    Message = ""
                };
            }

            var products = _context.Products.AsQueryable();

            if (request.CategoryIds.Count > 0)
            {
                //محصولاتی را انتخاب می کند که همه ی category id ها را داشته باشد
                products = products.Where(p => request.CategoryIds.All(id => p.ProductCategories.Any(pc => pc.CategoryId == id)));

                //محصولاتی را انتخاب می کند که هر یک از category id ها را داشته باشد
                //products = products.Where(p => p.ProductCategories.Any(pc => request.CategoryIds.Contains(pc.CategoryId)));
            }

            if (request.RelProductIds.Count > 0)
            {
                products = products.Where(p => !request.RelProductIds.Contains(p.Id));
            }

            if (!string.IsNullOrWhiteSpace(request.SearchKey))
            {
                products = products.Where(p => p.Name.Contains(request.SearchKey) ||
                                         p.UniqueCode.Contains(request.SearchKey) ||
                                         p.Description.Contains(request.SearchKey));
            }

            var productsWithImages = products
                .Select(p => new
                {
                    Product = p,
                    ProductImageSrc = p.ProductImages.Select(pi => pi.Src).FirstOrDefault()
                })
                .ToList();

            var relatedProductList = productsWithImages.Select(p => new RelatedProductDto
            {
                ProductId = p.Product.Id,
                Name = p.Product.Name,
                ImgSrc = p.ProductImageSrc ?? string.Empty

            }).ToList();

            return new ResultDto<ResultGetRelatedProductsDto>
            {
                Data = new ResultGetRelatedProductsDto
                {
                    RelProducts = relatedProductList
                },
                IsSuccess = true,
                Message = ""
            };
        }

    }
}
