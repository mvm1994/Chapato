using Microsoft.AspNetCore.Http;

namespace Chapato.Application.Services.Uploads.Commands.AddNewFile
{
    public class RequestAddNewFileDto
    {
        public IFormFile File { get; set; }
    }
}
