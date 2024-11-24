using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;

namespace Chapato.Application.Services.Products.Commands.RenameChartCategoy
{
    public class RenameChartCategoyService : IRenameChartCategoyService
    {
        private readonly IDataBaseContext _context;
        public RenameChartCategoyService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto Execute(string Name, long Id)
        {
            var category = _context.Categories.Find(Id);

            if (category !=null)
            {
                if (string.IsNullOrWhiteSpace(Name))
                {
                    return new ResultDto
                    {
                        IsSuccess = false,
                        Message = "نام دسته بندی را وارد نمایید"
                    };
                }

                category.Id = Id;
                category.Name = Name;
                category.UpdateTime = DateTime.Now;

                _context.Categories.Update(category);
                _context.SaveChanges();

                return new ResultDto
                {
                    IsSuccess = true,
                    Message = "تغییر نام دسته بندی انجام شد"
                };
            }

            return new ResultDto
            {
                IsSuccess = false,
                Message = "این دسته بندی در پایگاه داده وجود ندارد"
            };
        }
    }
}
