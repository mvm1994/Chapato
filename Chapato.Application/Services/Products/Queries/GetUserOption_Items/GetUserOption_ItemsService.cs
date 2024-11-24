using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;

namespace Chapato.Application.Services.Products.Queries.GetUserOption_Items
{
    public class GetUserOption_ItemsService : IGetUserOption_ItemsService
    {
        private readonly IDataBaseContext _context;

        public GetUserOption_ItemsService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto<ResultGetUserOption_ItemsDto> Execute(RequestGetUserOption_ItemsDto request)
        {
            var Items_List = _context.ProductUserOptionItems.Where(item => item.OptionId == request.OptionId).ToList();

            var UserOptionItems = Items_List.Select(ui => new UserOptionItem
            {
                Id = ui.Id,
                OptionId = ui.OptionId,
                ParentOptionId = ui.ParentOptionId,
                ParentOptionItemId = ui.ParentOptionItemId,
                Name = ui.Name,
                Price = ui.Price,
                Option_Type = ui.Option_Type,
                Item_Group = ui.Item_Group

            }).ToList();

            return new ResultDto<ResultGetUserOption_ItemsDto>
            {
                Data = new ResultGetUserOption_ItemsDto { Items = UserOptionItems },
                IsSuccess = true,
                Message = string.Empty
            };
        }
    }
}
