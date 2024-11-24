using Chapato.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Uploads.Commands.RemoveFile
{
    public interface IRemoveFileService
    {
        ResultDto Execute(RequestRemoveFileDto request);
    }
}
