using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;
using Chapato.Domain.Entities.Products;
using Chapato.Application.Services.Products.Commands.AddNewColor;

namespace Chapato.Application.Services.Products.Commands.AddNewColor
{
    public class AddNewColorService : IAddNewColorService
    {
        private readonly IDataBaseContext _context;
        public AddNewColorService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto<ResultAddNewColorDto> Execute(RequsetAddNewColorDto requset)
        {
            var color = new ColorRepository()
            {
                Name = requset.Name,
                HexCode = requset.HexCode
            };

            _context.Colors.Add(color);
            _context.SaveChanges();

            return new ResultDto<ResultAddNewColorDto>
            {
                Data = new ResultAddNewColorDto
                {
                    Id = color.Id,
                    Name = color.Name
                },
                IsSuccess = true,
                Message = "رنگ اضافه شد"
            };
        }
    }
}
