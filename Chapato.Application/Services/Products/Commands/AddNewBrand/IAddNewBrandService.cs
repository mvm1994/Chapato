using Chapato.Application.Services.Products.Commands.AddNewBrand;
using Chapato.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Products.Commands.AddNewBrand
{
    public interface IAddNewBrandService
    {
        ResultDto<ResultAddNewBrandDto> Execute(RequestAddNewBrandDto request);
    }
}
