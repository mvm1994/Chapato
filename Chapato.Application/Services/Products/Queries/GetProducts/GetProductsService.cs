using Chapato.Application.Interfaces.Contexts;
using Chapato.Common;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Chapato.Application.Services.Products.Queries.GetProducts
{
    public class GetProductsService : IGetProductsService
    {
        private readonly IDataBaseContext _context;

        public GetProductsService(IDataBaseContext context)
        {
            _context = context;
        }

        public ResultGetProductDto Execute(RequestGetProductDto request)
        {
            #region

            var products = _context.Products.AsQueryable();
            int rowsCount;

            if (!string.IsNullOrWhiteSpace(request.SearchKey))
            {
                products = products.Where(p => p.Name.Contains(request.SearchKey) || p.UniqueCode.Contains(request.SearchKey));
            }

            var productList = products.ToPaged(request.Page, request.PageSize, out rowsCount);

            #endregion

            var productDtos = productList.Select(p => new GetProductsDto
            {
                Id = p.Id,
                Name = p.Name,
                UniqueCode = p.UniqueCode,
                Price = p.Price,
                Inventory = p.Inventory,
                Displayed = p.Displayed

            }).OrderByDescending(p => p.Id).ToList();

            return new ResultGetProductDto
            {
                Products = productDtos,
                Rows = rowsCount,
                CurrentPage = request.Page,
                PageSize = request.PageSize
            };
        }

    }
}


