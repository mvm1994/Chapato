using Chapato.Common.Dto;
using Chapato.Domain.Entities.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Products.Commands.AddNewFeature
{
    public interface IAddNewFeatureService
    {
        ResultDto Execute(RequestAddNewFeatureDto request);
    }
}
