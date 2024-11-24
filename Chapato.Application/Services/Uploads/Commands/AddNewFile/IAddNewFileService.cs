using Chapato.Application.Services.Products.Commands.AddNewProduct;
using Chapato.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Uploads.Commands.AddNewFile
{
    public interface IAddNewFileService
    {
        ResultDto Execute(RequestAddNewFileDto request);
    }
}
