using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;

namespace Chapato.Application.Services.Products.Commands.DeleteColor
{
    public class DeleteColorService : IDeleteColorService
    {
        private readonly IDataBaseContext _context;
        public DeleteColorService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto Execute(RequestDeleteColorDto request)
        {
            var color = _context.Colors.Find(request.Id);

            if (color == null)
            {
                return new ResultDto
                {
                    IsSuccess = false,
                    Message = "این رنگ در دیتابیس موجود نیست"
                };
            }

            color.IsRemoved = true;
            color.RemoveTime = DateTime.Now;

            _context.Colors.Update(color);
            _context.SaveChanges();

            return new ResultDto
            {
                IsSuccess = true,
                Message = "رنگ حذف شد"
            };
        }
    }
}
