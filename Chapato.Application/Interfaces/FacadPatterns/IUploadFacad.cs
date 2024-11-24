using Chapato.Application.Services.Products.Commands.AddNewCategory;
using Chapato.Application.Services.Uploads.Commands.AddNewFile;
using Chapato.Application.Services.Uploads.Commands.RemoveFile;
using Chapato.Application.Services.Uploads.Queries.GetAllUploadedFiles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Interfaces.FacadPatterns
{
    public interface IUploadFacad
    {
        /////////////////////////////////////////////////////////////////////////////////////////////Commands
        RemoveFileService RemoveFileService { get; }
        AddNewFileService AddNewFileService { get; }

        /////////////////////////////////////////////////////////////////////////////////////////////Queries
        IGetAll_UploadedFiles_Service GetAll_UploadedFiles_Service { get; }
    }
}
