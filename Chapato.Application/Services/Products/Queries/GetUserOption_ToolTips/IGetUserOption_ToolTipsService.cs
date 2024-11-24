using Chapato.Application.Services.Products.Queries.GetUserOption_Items;
using Chapato.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Products.Queries.GetUserOption_ToolTips
{
    public interface IGetUserOption_ToolTipsService
    {
        ResultDto<ResultGetUserOption_ToolTipsDto> Execute(RequestGetUserOption_ToolTipsDto request);
    }
}
