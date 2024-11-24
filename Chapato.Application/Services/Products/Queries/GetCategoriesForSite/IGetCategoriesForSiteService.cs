using Chapato.Application.Services.Products.Queries.GetCategories;
using Chapato.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Products.Queries.GetCategoriesForSite
{
    public interface IGetCategoriesForSiteService
    {
        ResultDto<List<CategoriesFoSiteDto>> Execute();
    }
}
