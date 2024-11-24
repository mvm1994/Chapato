using Chapato.Common.Dto;
using System.Linq;
using System.Collections.Generic;
using Chapato.Application.Services.Products.Queries.GetUserOptions;
using Chapato.Application.Interfaces.Contexts;

namespace Chapato.Application.Services.Products.Queries.GetUserSubOptions
{
    public class GetUserSubOptionsService : IGetUserSubOptionsService
    {
        private readonly IDataBaseContext _context;

        public GetUserSubOptionsService(IDataBaseContext context)
        {
            _context = context;
        }

        public ResultDto<ResultGetUserSubOptionsDto> Execute(RequestGetUserSubOptionsDto request)
        {
            var userOptions = _context.ProductUserOptionParents
                .Where(p => p.ParentOptionId == request.ParentId)
                .Select(p => new
                {
                    Option = _context.ProductUserOptions.FirstOrDefault(up => up.Id == p.OptionId),
                    ToolTip = _context.ProductUserOptionToolTips.FirstOrDefault(up => up.OptionId == p.OptionId && up.ParentOptionId == request.ParentId),
                    Title = _context.ProductUserOptionTitles.FirstOrDefault(up => up.OptionId == p.OptionId && up.ParentOptionId == request.ParentId)
                })
                .ToList();

            var userOptionList = userOptions.Select(x => new UserOptionDto
            {
                Id = x.Option.Id,
                CategoryId = request.CategoryId,
                ParentUserOptionId = request.ParentId,
                Name = x.Option.Name,
                Title = x.Title?.Text ?? "عنوانی ارائه نشده است",
                Option_Type = x.Option.Option_Type,
                ToolTip_Desc = x.ToolTip?.Text ?? "توضیحاتی ارائه نشده است",
                Price = x.Option.Price,
                Order = 0,
                SetAsDefault = x.Option.SetAsDefault,
                Option_ExtensionList = x.Option.Option_ExtensionList,
                Option_FileSize = x.Option.Option_FileSize,
                Option_Maxlength = x.Option.Option_Maxlength
            }).ToList();

            return new ResultDto<ResultGetUserSubOptionsDto>
            {
                Data = new ResultGetUserSubOptionsDto
                {
                    UserSubOptions = userOptionList
                },
                IsSuccess = true,
                Message = string.Empty
            };
        }
    }
}
