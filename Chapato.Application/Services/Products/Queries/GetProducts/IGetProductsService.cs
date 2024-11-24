using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Products.Queries.GetProducts
{
    public interface IGetProductsService
    {
        ResultGetProductDto Execute(RequestGetProductDto request);
    }
}
