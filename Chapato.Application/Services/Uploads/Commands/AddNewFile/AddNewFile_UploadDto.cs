namespace Chapato.Application.Services.Uploads.Commands.AddNewFile
{
    public class AddNewFile_UploadDto
    {
        public long Id { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public string FileType { get; set; }
    }
}
