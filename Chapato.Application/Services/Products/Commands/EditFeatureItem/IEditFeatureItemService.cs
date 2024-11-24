using Chapato.Application.Services.Products.Commands.EditFeature;
using Chapato.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Products.Commands.EditFeatureItem
{
    public interface IEditFeatureItemService
    {
        ResultDto Execute(RequestEditFeatureItemDto request);
    }
}
