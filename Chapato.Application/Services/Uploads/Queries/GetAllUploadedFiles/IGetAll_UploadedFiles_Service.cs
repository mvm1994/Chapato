using Azure.Core;
using Chapato.Application.Services.Users.Queries.GetUsers;
using Chapato.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Uploads.Queries.GetAllUploadedFiles
{
    public interface IGetAll_UploadedFiles_Service
    {
        Result_GetAll_UploadedFiles_Dto Execute(Request_GetAll_UploadedFiles_Dto request);
    }
}
