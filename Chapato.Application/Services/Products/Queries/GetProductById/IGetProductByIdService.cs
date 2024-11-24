using Microsoft.AspNetCore.Http;
using Chapato.Application.Services.Products.Commands.AddNewProduct;
using Chapato.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Products.Queries.GetProductById
{
    public interface IGetProductByIdService
    {
        ResultGetProductByIdDto Execute(RequestGetProductByIdDto request);
    }
}
