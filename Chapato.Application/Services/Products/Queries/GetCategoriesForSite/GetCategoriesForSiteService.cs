using Chapato.Application.Interfaces.Contexts;
using Microsoft.EntityFrameworkCore;
using Chapato.Common.Dto;
using Chapato.Domain.Entities.Products;

namespace Chapato.Application.Services.Products.Queries.GetCategoriesForSite
{
    public class GetCategoriesForSiteService : IGetCategoriesForSiteService
    {
        private readonly IDataBaseContext _context;
        public GetCategoriesForSiteService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto<List<CategoriesFoSiteDto>> Execute()
        {
            var categories = _context.Categories
                .ToList();

            if (categories == null)
            {
                return new ResultDto<List<CategoriesFoSiteDto>>
                {
                    IsSuccess = false,
                    Message = "هیچ دسته بندی ای در دیتا بیس موجود نیست"
                };
            }

            var topLevelCategories = categories
                .Where(c => c.ParentCategoryId == null)
                .Select(c => new CategoriesFoSiteDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Children = new List<CategoriesFoSiteDto>()
                }).ToList();

            foreach (var category in topLevelCategories)
            {
                PopulateChildren(category, categories);
            }

            return new ResultDto<List<CategoriesFoSiteDto>>
            {
                Data = topLevelCategories,
                IsSuccess = true,
                Message = ""
            };
        }

        private void PopulateChildren(CategoriesFoSiteDto parentCategory, List<Category> allCategories)
        {
            var childCategories = allCategories
                .Where(c => c.ParentCategoryId == parentCategory.Id)
                .Select(c => new CategoriesFoSiteDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Children = new List<CategoriesFoSiteDto>()
                }).ToList();

            foreach (var childCategory in childCategories)
            {
                PopulateChildren(childCategory, allCategories);
            }

            parentCategory.Children.AddRange(childCategories);
        }
    }
}

