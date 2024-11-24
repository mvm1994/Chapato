using Chapato.Application.Interfaces.Contexts;
using Microsoft.EntityFrameworkCore;
using Chapato.Common;
using Chapato.Common.Dto;
using Chapato.Domain.Entities.Products;
using System.Collections.Generic;
using System.Linq;

namespace Chapato.Application.Services.Products.Queries.GetProductsForSite
{
    public class GetProductsForSiteService : IGetProductsForSiteService
    {
        private readonly IDataBaseContext _context;

        public GetProductsForSiteService(IDataBaseContext context)
        {
            _context = context;
        }

        public ResultProductForSiteDto Execute(RequestProductForSiteDto request)
        {
            int totalRows = 0;

            int MaxPrice = _context.Products.ToList()
                .OrderByDescending(p => p.Price)
                .FirstOrDefault()?.Price ?? 0;

            IQueryable<Product> productsQuery = _context.Products
                .Include(p => p.ProductImages);

            if (request.Categories != null && request.Categories.Any())
            {
                var categoryIds = request.Categories.Select(c => c.Id).ToList();
                productsQuery = productsQuery.Where(p => p.ProductCategories.Any(pc => categoryIds.Contains(pc.CategoryId)));
            }

            if (request.Brands != null && request.Brands.Any())
            {
                var brandIds = request.Brands.Select(b => b.Id).ToList();
                productsQuery = productsQuery.Where(p => brandIds.Contains(p.BrandId));
            }

            if (request.Prices != null)
            {
                productsQuery = productsQuery.Select(p => new Product
                {
                    Id = p.Id,
                    Name = p.Name,
                    ProductImages = p.ProductImages,
                    Price = (p.SpecialSale || p.AmazingSale) ? p.Price_With_DisCount : p.Price,
                    Price_With_DisCount = p.Price_With_DisCount,
                    StarCount = p.StarCount,
                    SpecialSale = p.SpecialSale,
                    SpecialSale_Discount = p.SpecialSale_Discount,
                    AmazingSale = p.AmazingSale,
                    AmazingSale_Discount = p.AmazingSale_Discount,
                    VisitCount = p.VisitCount,
                    SellCount = p.SellCount
                });

                productsQuery = productsQuery.Where(p => (p.Price >= request.Prices.MinVal && p.Price <= request.Prices.MaxVal));
                    
            }

            var filteredProducts = productsQuery.ToList();

            IEnumerable<Product> products;

            switch (request.SortTabId)
            {
                case "Most-visited":
                    products = filteredProducts.OrderByDescending(p => p.VisitCount).ToPaged(request.Page, request.PageSize, out totalRows);
                    break;
                case "Bestselling":
                    products = filteredProducts.OrderByDescending(p => p.SellCount).ToPaged(request.Page, request.PageSize, out totalRows);
                    break;
                case "Most-Popular":
                    products = filteredProducts.OrderByDescending(p => p.StarCount).ToPaged(request.Page, request.PageSize, out totalRows);
                    break;
                case "newest":
                    products = filteredProducts.OrderByDescending(p => p.Id).ToPaged(request.Page, request.PageSize, out totalRows);
                    break;
                case "cheapest":
                    products = filteredProducts.OrderBy(p => p.Price).ToPaged(request.Page, request.PageSize, out totalRows);
                    break;
                default:
                    products = filteredProducts.OrderByDescending(p => p.Price).ToPaged(request.Page, request.PageSize, out totalRows);
                    break;
            }

            return new ResultProductForSiteDto
            {
                Filtered_Products = products.Select(p => new ProductForSiteDto
                {
                    Id = p.Id,
                    Title = p.Name,
                    ImageSrc = p.ProductImages.FirstOrDefault()?.Src,
                    Price = p.Price,
                    Price_With_DisCount = p.Price_With_DisCount,
                    Star = p.StarCount,
                    SpecialSale = p.SpecialSale,
                    SpecialSale_Discount = p.SpecialSale_Discount,
                    AmazingSale = p.AmazingSale,
                    AmazingSale_Discount = p.AmazingSale_Discount
                }).ToList(),
                TotalRows = totalRows,
                CurrentPage = request.Page,
                PageSize = request.PageSize,
                SortTabId = request.SortTabId,
                MaxPrice = MaxPrice
            };
        }
    }
}
