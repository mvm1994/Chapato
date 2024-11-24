using Chapato.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Products.Commands.RenameChartCategoy
{
    public interface IRenameChartCategoyService
    {
        ResultDto Execute(string Name, long Id);
    }
}
