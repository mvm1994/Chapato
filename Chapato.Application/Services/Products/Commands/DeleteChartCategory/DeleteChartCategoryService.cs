using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;

namespace Chapato.Application.Services.Products.Commands.DeleteChartCategory
{
    public class DeleteChartCategoryService : IDeleteChartCategoryService
    {
        private readonly IDataBaseContext _context;
        public DeleteChartCategoryService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto Execute(long Id)
        {
            var category = _context.Categories.Find(Id);

            if (category != null)
            {
                category.Id = Id;
                category.RemoveTime = DateTime.Now;
                category.IsRemoved = true;

                _context.Categories.Update(category);
                _context.SaveChanges();

                return new ResultDto
                {
                    IsSuccess = true,
                    Message = "حذف دسته بندی انجام شد"
                };
            }

            return new ResultDto
            {
                IsSuccess = false,
                Message = "حذف دسته بندی انجام نشد"
            };
        }
    }
}
