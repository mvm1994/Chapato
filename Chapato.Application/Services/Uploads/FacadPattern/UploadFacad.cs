using Chapato.Application.Interfaces.Contexts;
using Microsoft.AspNetCore.Hosting;
using Chapato.Application.Interfaces.FacadPatterns;
using Chapato.Application.Services.Products.Queries.GetChartCategories;
using Chapato.Application.Services.Uploads.Commands.AddNewFile;
using Chapato.Application.Services.Uploads.Commands.RemoveFile;
using Chapato.Application.Services.Uploads.Queries.GetAllUploadedFiles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Uploads.FacadPattern
{
    public class UploadFacad:IUploadFacad
    {
        private readonly IDataBaseContext _context;
        private readonly IWebHostEnvironment _environment;
        public UploadFacad(IDataBaseContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;

        }

        /////////////////////////////////////////////////////////////////////////////////////////////Commands

        private RemoveFileService _removeFileService;
        public RemoveFileService RemoveFileService
        {
            get
            {
                return _removeFileService ??= new RemoveFileService(_context);
            }
        }

        private AddNewFileService _addNewFileService;
        public AddNewFileService AddNewFileService
        {
            get
            {
                return _addNewFileService ??= new AddNewFileService(_context,_environment);
            }
        }

        /////////////////////////////////////////////////////////////////////////////////////////////Queries

        private IGetAll_UploadedFiles_Service _getAll_UploadedFiles_Service;
        public IGetAll_UploadedFiles_Service GetAll_UploadedFiles_Service
        {
            get
            {
                return _getAll_UploadedFiles_Service ??= new GetAll_UploadedFiles_Service(_context);
            }
        }

    }
}
