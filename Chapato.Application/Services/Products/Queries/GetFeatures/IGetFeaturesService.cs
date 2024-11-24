using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Products.Queries.GetFeatures
{
    public interface IGetFeaturesService
    {
        ResultGetFeaturesDto Execute(RequestGetFeaturesDto request);
    }
}
