using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Net.Http.Headers;
using Chapato.Application.Interfaces.FacadPatterns;
using Chapato.Application.Services.Users.FacadPattern;
using Chapato.Application.Services.Products.Commands.MoveOrCopyChartCategory;
using Chapato.Common;

namespace EndPoint.Site.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class CategoriesController : Controller
    {
        private readonly IProductFacad _productFacad;
        private readonly ModeCookie _modeCookie;
        public CategoriesController(IProductFacad productFacad, ModeCookie modeCookie)
        {
            _productFacad = productFacad;
            _modeCookie = modeCookie;
        }

        //////////////////////////////////////////////////////////////////////درخواست اجرای متد های زیر از فایل extended-ui-treeview.js می آید

        [HttpGet]
        public IActionResult AddNewCategory(long? parentId)
        {
            ViewBag.Mode = _modeCookie.GetCookieValue("ckmode");
            ViewBag.parentId = parentId;
            ViewBag.Categories = new SelectList(_productFacad.GetCategoriesService.Execute().Data, "Id", "Name");
            _productFacad.GetChartCategoriesService.Execute();
            return View();
        }

        [HttpPost]
        public IActionResult AddNewCategory(string Name, long? ParentId, string CategoryType)
        {
            var result = _productFacad.AddNewCategoryService.Execute(ParentId, Name, CategoryType);
            return Json(result);
        }

        [HttpPost]
        public IActionResult RenameCategory(string Name, long Id)
        {
            var result = _productFacad.RenameChartCategoyService.Execute(Name, Id);
            return Json(result);
        }

        [HttpPost]
        public IActionResult MoveOrCopyCategory(long Id, string Name, long ParentId, bool IsCut)
        {
            var result = _productFacad.MoveOrCopyChartCategoryService.Execute(new RequestMoveOrCopyChartCategoryDto
            {
                Id = Id,
                Name = Name,
                ParentId = ParentId,
                IsCut = IsCut
            });

            return Json(result);
        }

        [HttpPost]
        public IActionResult DeleteCategory(long Id)
        {
            var result = _productFacad.DeleteChartCategoryService.Execute(Id);
            return Json(result);
        }
    }
}