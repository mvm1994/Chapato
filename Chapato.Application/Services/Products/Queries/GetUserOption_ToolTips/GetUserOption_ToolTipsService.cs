using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;

namespace Chapato.Application.Services.Products.Queries.GetUserOption_ToolTips
{
    public class GetUserOption_ToolTipsService : IGetUserOption_ToolTipsService
    {
        private readonly IDataBaseContext _context;
        public GetUserOption_ToolTipsService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto<ResultGetUserOption_ToolTipsDto> Execute(RequestGetUserOption_ToolTipsDto request)
        {
            var ToolTips_List = _context.ProductUserOptionToolTips.Where(tooltip => tooltip.OptionId == request.OptionId).ToList();

            var UserOption_ToolTips = ToolTips_List.Select(ui => new UserOptionToolTip
            {
                Id = ui.Id,
                OptionId = ui.OptionId,
                ParentOptionId = ui.ParentOptionId,
                ParentItemId = ui.ParentItemId,
                Title = _context.ProductUserOptionTitles
                                .Where(tit => tit.OptionId == request.OptionId)
                                .Select(tit => tit.Text)
                                .FirstOrDefault() ?? "عنوانی ارائه نشده است",
                Text = ui.Text

            }).ToList();

            return new ResultDto<ResultGetUserOption_ToolTipsDto>
            {
                Data = new ResultGetUserOption_ToolTipsDto { ToolTips = UserOption_ToolTips },
                IsSuccess = true,
                Message = string.Empty
            };
        }
    }
}
