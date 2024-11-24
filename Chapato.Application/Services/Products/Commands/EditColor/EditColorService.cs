using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;

namespace Chapato.Application.Services.Products.Commands.EditColor
{
    public class EditColorService : IEditColorService
    {
        private readonly IDataBaseContext _context;
        public EditColorService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto Execute(RequestEditColorDto request)
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

            color.Name = request.Name;
            color.HexCode = request.HexCode;
            color.UpdateTime = DateTime.Now;

            _context.Colors.Update(color);
            _context.SaveChanges();

            return new ResultDto
            {
                IsSuccess = true,
                Message = "مشخصات رنگ بروزرسانی شد"
            };
        }
    }
}
