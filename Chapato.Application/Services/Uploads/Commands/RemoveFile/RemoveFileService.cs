using System;
using System.IO;
using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;

namespace Chapato.Application.Services.Uploads.Commands.RemoveFile
{
    public class RemoveFileService : IRemoveFileService
    {
        private readonly IDataBaseContext _context;

        public RemoveFileService(IDataBaseContext context)
        {
            _context = context;
        }

        public ResultDto Execute(RequestRemoveFileDto request)
        {
            var file = _context.UploadedFiles.Find(request.FileId);

            if (file == null)
            {
                return new ResultDto
                {
                    IsSuccess = false,
                    Message = "این فایل در دیتابیس موجود نیست"
                };
            }

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", file.FilePath.Replace("/", "\\").Replace("~\\",""));

            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
            else
            {
                return new ResultDto
                {
                    IsSuccess = false,
                    Message = "خطا در حذف تصویر" + filePath,
                };
            }

            _context.UploadedFiles.Remove(file);
            _context.SaveChanges();

            return new ResultDto
            {
                IsSuccess = true,
                Message = "فایل حذف شد"
            };
        }
    }
}
