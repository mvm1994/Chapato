namespace Chapato.Application.Services.Uploads.Queries.GetAllUploadedFiles
{
    public class Result_GetAll_UploadedFiles_Dto
    {
        public List<Get_UploadedFiles_Dto> Files { get; set; }
        public int Rows { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
    }
}
