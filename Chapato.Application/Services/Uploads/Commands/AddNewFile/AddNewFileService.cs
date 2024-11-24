using Chapato.Application.Interfaces.Contexts;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Chapato.Common.Dto;
using Chapato.Domain.Entities.Uploads;

namespace Chapato.Application.Services.Uploads.Commands.AddNewFile
{
    public class AddNewFileService : IAddNewFileService
    {
        private readonly IDataBaseContext _context;
        private readonly IWebHostEnvironment _environment;
        public AddNewFileService(IDataBaseContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }
        public ResultDto Execute(RequestAddNewFileDto request)
        {
            var uploadReult = UploadFile(request.File);

            if (uploadReult.Status == false)
            {
                return new ResultDto
                {
                    IsSuccess = false,
                    Message = uploadReult.Message
                };
            }

            var uploadedfile = new UploadedFile
            {
                FileName = uploadReult.FileName,
                FilePath = uploadReult.FilePath.Replace("wwwroot", "~").Replace("\\", "/"),
                FileType = uploadReult.FileType
            };

            _context.UploadedFiles.Add(uploadedfile);
            _context.SaveChanges();

            return new ResultDto
            {
                IsSuccess = true,
                Message = "فایل آپلود شد"
            };
        }

        private AddNewFile_UploadDto UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return new AddNewFile_UploadDto()
                {
                    Status = false,
                    Message = "لطفاً یک فایل انتخاب کنید.",
                    FileName = "",
                    FilePath = "",
                    FileType = ""
                };
            }

            var fileExtension = Path.GetExtension(file.FileName).ToLower();
            var validImageExtensions = new[] { ".jpg", ".jpeg", ".png" };
            var validAudioExtensions = new[] { ".mp3" };
            var validVideoExtensions = new[] { ".mp4" };

            var maxSize = new
            {
                image = 5 * 1024 * 1024, // 5 MB
                audio = 20 * 1024 * 1024, // 20 MB
                video = 30 * 1024 * 1024 // 30 MB
            };

            string subDirectory;
            string fileType;
            if (validImageExtensions.Contains(fileExtension))
            {
                if (file.Length > maxSize.image)
                {
                    return new AddNewFile_UploadDto()
                    {
                        Status = false,
                        Message = "حجم تصویر باید کمتر از ۵ مگابایت باشد.",
                        FileName = "",
                        FilePath = "",
                        FileType = ""
                    };
                }

                subDirectory = "wwwroot/AdminTemplate/Files/Images";
                fileType = "image";
            }
            else if (validAudioExtensions.Contains(fileExtension))
            {
                if (file.Length > maxSize.audio)
                {
                    return new AddNewFile_UploadDto()
                    {
                        Status = false,
                        Message = "حجم فایل صوتی باید کمتر از ۲۰ مگابایت باشد.",
                        FileName = "",
                        FilePath = "",
                        FileType = ""
                    };
                }
                subDirectory = "wwwroot/AdminTemplate/Files/Audios";
                fileType = "audio";
            }
            else if (validVideoExtensions.Contains(fileExtension))
            {
                if (file.Length > maxSize.video)
                {
                    return new AddNewFile_UploadDto()
                    {
                        Status = false,
                        Message = "حجم ویدئو باید کمتر از 30 مگابایت باشد.",
                        FileName = "",
                        FilePath = "",
                        FileType = ""
                    };
                } 
                subDirectory = "wwwroot/AdminTemplate/Files/Videos";
                fileType = "video";
            }
            else
            {
                return new AddNewFile_UploadDto()
                {
                    Status = false,
                    Message = "فرمت فایل نامعتبر است",
                    FileName = "",
                    FilePath = "",
                    FileType = ""
                };
            }

            if (!Directory.Exists(subDirectory))
            {
                Directory.CreateDirectory(subDirectory);
            }

            var timestamp = DateTime.Now.ToString("yyyyMMddHHmmss");
            var newFileName = $"{timestamp}_{file.FileName}";
            var filePath = Path.Combine(subDirectory, newFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return new AddNewFile_UploadDto
            {
                Status = true,
                Message = "",
                FileName = newFileName,
                FilePath = filePath,
                FileType = fileType
            };
        }
    }
}
