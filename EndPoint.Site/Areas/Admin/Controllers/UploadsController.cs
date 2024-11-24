using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Chapato.Application.Interfaces.FacadPatterns;
using Chapato.Application.Services.Products.Commands.AddNewProduct;
using Chapato.Application.Services.Products.FacadPattern;
using Chapato.Application.Services.Uploads.Commands.AddNewFile;
using Chapato.Application.Services.Uploads.Commands.RemoveFile;
using Chapato.Application.Services.Uploads.Queries.GetAllUploadedFiles;
using Chapato.Application.Services.Users.FacadPattern;
using Chapato.Common;
using Chapato.Common.Dto;

namespace EndPoint.Site.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class UploadsController : Controller
    {
        private readonly IUploadFacad _uploadFacad;
        private readonly ModeCookie _modeCookie;
        public UploadsController(IUploadFacad uploadFacad, ModeCookie modeCookie)
        {
            _uploadFacad = uploadFacad;
            _modeCookie = modeCookie;
        }

        [HttpGet]
        public IActionResult Index(string searchkey, int page = 1, int PageSize = 10)
        {
            if (string.IsNullOrWhiteSpace(searchkey))
            {
                searchkey = "";
            }

            ViewBag.Mode = _modeCookie.GetCookieValue("ckmode");

            return View(_uploadFacad.GetAll_UploadedFiles_Service.Execute(new Request_GetAll_UploadedFiles_Dto
            {
                Page = page,
                PageSize = PageSize,
                SearchKey = searchkey
            }));
        }

        [HttpGet]
        public IActionResult Create()
        {
            ViewBag.Mode = _modeCookie.GetCookieValue("ckmode");
            return View();

        }

        [HttpPost]
        [RequestSizeLimit(100 * 1024 * 1024)]
        [RequestFormLimits(MultipartBodyLengthLimit = 100 * 1024 * 1024)]
        public IActionResult AddNewFile([FromForm] RequestAddNewFileDto request)
        {
            IFormFile file = Request.Form.Files.FirstOrDefault();

            if (file == null)
            {
                return Json(new ResultDto
                {
                    IsSuccess = false,
                    Message = "لطفاً یک فایل انتخاب کنید."
                });
            }

            request.File = file;

            var result = _uploadFacad.AddNewFileService.Execute(request);
            return Json(result);
        }

        [HttpPost]
        public IActionResult Delete(RequestRemoveFileDto request)
        {
            return Json(_uploadFacad.RemoveFileService.Execute(new RequestRemoveFileDto
            {
                FileId = request.FileId
            }));
        }
    }
}
