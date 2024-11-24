using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;
using Chapato.Domain.Entities.Products;

namespace Chapato.Application.Services.Products.Queries.GetCategories
{
    public class GetCategoriesService : IGetCategoriesService
    {
        private readonly IDataBaseContext _context;

        public GetCategoriesService(IDataBaseContext context)
        {
            _context = context;
        }

        private List<string> GetAllParentCategoryNames(Category category)
        {
            var parentNames = new List<string>();
            var currentCategory = category.ParentCategory;

            while (currentCategory != null)
            {
                parentNames.Add(currentCategory.Name);
                currentCategory = currentCategory.ParentCategory;
            }

            parentNames.Reverse();
            return parentNames;
        }

        public ResultDto<List<CategoriesDto>> Execute()
        {
            var categories = _context.Categories.ToList();

            var categoryDtos = categories.Select(c =>
            {
                var parentNames = GetAllParentCategoryNames(c);
                var parentNamesString = parentNames.Any() ? string.Join(" > ", parentNames) + " > " : "";
                var name = $"{parentNamesString}{c.Name}";

                return new CategoriesDto
                {
                    Id = c.Id,
                    Name = name
                };

            }).ToList();

            return new ResultDto<List<CategoriesDto>>
            {
                Data = categoryDtos,
                IsSuccess = true,
                Message = ""
            };
        }
    }
}
