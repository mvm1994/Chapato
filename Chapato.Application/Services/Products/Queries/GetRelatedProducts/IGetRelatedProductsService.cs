﻿using Chapato.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Products.Queries.GetRelatedProducts
{
    public interface IGetRelatedProductsService
    {
        ResultDto<ResultGetRelatedProductsDto> Execute(RequestGetRelatedProductsDto request);
    }
}