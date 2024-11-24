using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;
using Chapato.Domain.Entities.Products;

namespace Chapato.Application.Services.Products.Commands.MoveOrCopyChartCategory
{
    public class MoveOrCopyChartCategoryService : IMoveOrCopyChartCategoryService
    {
        private readonly IDataBaseContext _context;
        public MoveOrCopyChartCategoryService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto Execute(RequestMoveOrCopyChartCategoryDto request)
        {
            if (request.IsCut)
            {
                var category = _context.Categories.Find(request.Id);

                if (category != null)
                {
                    category.Id = request.Id;
                    category.ParentCategoryId = request.ParentId;
                    category.Name = request.Name;

                    _context.Categories.Update(category);
                    _context.SaveChanges();

                    return new ResultDto
                    {
                        IsSuccess = true,
                        Message = "دسته بندی بازنشانی شد"
                    };
                }

                return new ResultDto
                {
                    IsSuccess = false,
                    Message = "دسته بندی در پایگاه داده وجود ندارد"
                };
            }

            Category newcategory = new Category()
            {
                ParentCategoryId = request.ParentId,
                Name=request.Name
            };

            _context.Categories.Add(newcategory);
            _context.SaveChanges();

            return new ResultDto
            {
                IsSuccess = true,
                Message = "دسته بندی بازنشانی شد"
            };
        }
    }
}
