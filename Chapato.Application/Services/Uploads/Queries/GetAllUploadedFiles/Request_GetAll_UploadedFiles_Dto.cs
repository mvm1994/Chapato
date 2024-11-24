namespace Chapato.Application.Services.Uploads.Queries.GetAllUploadedFiles
{
    public class Request_GetAll_UploadedFiles_Dto
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public string SearchKey { get; set; }
    }
}
