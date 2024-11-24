using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;

namespace Chapato.Application.Services.Products.Queries.GetColors
{
    public class GetColorsService : IGetColorsService
    {
        private readonly IDataBaseContext _context;
        public GetColorsService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto<List<ColorsDto>> Execute()
        {
            var colors = _context.Colors.ToList();

            if (!colors.Any())
            {
                return new ResultDto<List<ColorsDto>>
                {
                    Data = null,
                    IsSuccess = false,
                    Message = "هیچ رنگی در دیتابیس موجود نیست"
                };
            }

            var colorlist = new List<ColorsDto>();

            foreach (var color in colors)
            {
                var color_hexcode = color.HexCode;
                var color_name = color.Name;
                var name = color_name + " - " + color_hexcode;

                colorlist.Add(new ColorsDto
                {
                    Id = color.Id,
                    Name = name,
                });
            }

            return new ResultDto<List<ColorsDto>>
            {
                Data = colorlist,
                IsSuccess = true,
                Message = ""
            };
        }
    }
}
