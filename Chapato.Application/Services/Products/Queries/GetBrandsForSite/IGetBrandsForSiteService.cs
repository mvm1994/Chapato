using Chapato.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Products.Queries.GetBrandsForSite
{
    public interface IGetBrandsForSiteService
    {
        ResultDto<List<BrandsForSiteDto>> Execute();
    }
}
