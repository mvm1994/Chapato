using Chapato.Application.Interfaces.Contexts;
using Chapato.Common;

namespace Chapato.Application.Services.Uploads.Queries.GetAllUploadedFiles
{
    public class GetAll_UploadedFiles_Service : IGetAll_UploadedFiles_Service
    {
        private readonly IDataBaseContext _context;
        public GetAll_UploadedFiles_Service(IDataBaseContext context)
        {
            _context = context;
        }

        public Result_GetAll_UploadedFiles_Dto Execute(Request_GetAll_UploadedFiles_Dto request)
        {
            var files = _context.UploadedFiles.AsQueryable();
            int rowscount = 0;

            if (!string.IsNullOrWhiteSpace(request.SearchKey))
            {
                files = files.Where(p => p.FileName.Contains(request.SearchKey));
            }

            var filelist = files.ToPaged(request.Page, request.PageSize, out rowscount).Select(p => new Get_UploadedFiles_Dto
            {
                Id = p.Id,
                FileName = p.FileName,
                FilePath = p.FilePath, 
                FileType = p.FileType

            }).OrderByDescending(f => f.Id).ToList();

            return new Result_GetAll_UploadedFiles_Dto
            {
                Files = filelist,
                Rows = rowscount,
                CurrentPage = request.Page,
                PageSize = request.PageSize
            };
        }
    }
}
