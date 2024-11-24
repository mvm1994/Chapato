using Chapato.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Products.Queries.GetUserOption_Items
{
    public interface IGetUserOption_ItemsService
    {
        ResultDto<ResultGetUserOption_ItemsDto> Execute(RequestGetUserOption_ItemsDto request);
    }
}
