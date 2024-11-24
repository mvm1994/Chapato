using Chapato.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Products.Commands.Update_ProductDisplayMode
{
    public interface IUpdate_ProductDisplayMode_Service
    {
        ResultDto Execute(Request_Update_ProductDisplayMode_Dto request);
    }
}
