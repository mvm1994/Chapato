namespace Chapato.Application.Services.Uploads.Queries.GetAllUploadedFiles
{
    public class Get_UploadedFiles_Dto
    {
        public long Id { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public string FileType { get; set; }
    }
}
