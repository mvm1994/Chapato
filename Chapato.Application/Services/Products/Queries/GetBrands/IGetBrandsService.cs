﻿using Chapato.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Products.Queries.GetBrands
{
    public interface IGetBrandsService
    {
        ResultDto<List<BrandsDto>> Execute();
    }
}