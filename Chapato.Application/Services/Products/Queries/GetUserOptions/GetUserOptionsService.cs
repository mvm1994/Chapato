using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;
using Chapato.Domain.Entities.Products;
using System.Collections.Generic;
using System.Linq;

namespace Chapato.Application.Services.Products.Queries.GetUserOptions
{
    public class GetUserOptionsService : IGetUserOptionsService
    {
        private readonly IDataBaseContext _context;

        public GetUserOptionsService(IDataBaseContext context)
        {
            _context = context;
        }

        public ResultDto<ResultGetUserOptionsDto> Execute(RequestGetUserOptionsDto request)
        {

            var Options_WithoutParent_List = _context.ProductUserOptionParents
                .Where(p => p.ParentOptionId == 0 || p.ParentOptionId == null)
                .Select(p => p.OptionId)
                .ToList();

            var userOptionList = _context.ProductUserOptions
                .Where(o => Options_WithoutParent_List.Contains(o.Id) && o.CategoryId == request.CategoryId)
                .ToList();

            var uoList = userOptionList.Select(uo => new UserOptionDto
            {
                Id = uo.Id,
                CategoryId = request.CategoryId,
                ParentUserOptionId = 0,
                Name = uo.Name ?? "نامی ارائه نشده است",
                Title = _context.ProductUserOptionTitles
                                .Where(tit => tit.OptionId == uo.Id && (tit.ParentOptionId == null || tit.ParentOptionId == 0))
                                .Select(tit => tit.Text)
                                .FirstOrDefault() ?? "عنوانی ارائه نشده است",
                Option_Type = uo.Option_Type ?? "نوعی ارائه نشده است",
                ToolTip_Desc = _context.ProductUserOptionToolTips
                                .Where(tip => tip.OptionId == uo.Id && (tip.ParentOptionId == null || tip.ParentOptionId == 0))
                                .Select(tip => tip.Text)
                                .FirstOrDefault() ?? "توضیحاتی ارائه نشده است",
                Price = uo.Price,
                Order = 0,
                SetAsDefault = uo.SetAsDefault,
                Option_ExtensionList = uo.Option_ExtensionList,
                Option_FileSize = uo.Option_FileSize,
                Option_Maxlength = uo.Option_Maxlength

            }).ToList();

            return new ResultDto<ResultGetUserOptionsDto>
            {
                Data = new ResultGetUserOptionsDto { UserOptions = uoList },
                IsSuccess = true,
                Message = string.Empty
            };

        }

    }
}
