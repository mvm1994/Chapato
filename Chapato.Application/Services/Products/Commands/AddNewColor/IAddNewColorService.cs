using Chapato.Application.Services.Products.Commands.AddNewColor;
using Chapato.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Products.Commands.AddNewColor
{
    public interface IAddNewColorService
    {
        ResultDto<ResultAddNewColorDto> Execute(RequsetAddNewColorDto requset);
    }
}
