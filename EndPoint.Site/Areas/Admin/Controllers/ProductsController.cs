using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Chapato.Application.Interfaces.FacadPatterns;
using Chapato.Application.Services.Products.Commands.AddNewBrand;
using Chapato.Application.Services.Products.Commands.AddNewColor;
using Chapato.Application.Services.Products.Commands.AddNewFeatureItem;
using Chapato.Application.Services.Products.Commands.AddNewProduct;
using Chapato.Application.Services.Products.Commands.DeleteBrand;
using Chapato.Application.Services.Products.Commands.DeleteColor;
using Chapato.Application.Services.Products.Commands.EditBrand;
using Chapato.Application.Services.Products.Commands.EditColor;
using Chapato.Application.Services.Products.Commands.EditFeature;
using Chapato.Application.Services.Products.Commands.EditFeatureItem;
using Chapato.Application.Services.Products.Commands.RemoveProduct;
using Chapato.Application.Services.Products.Commands.Update_ProductDisplayMode;
using Chapato.Application.Services.Products.Commands.UpdateProduct;
using Chapato.Application.Services.Products.Queries.GetFeatures;
using Chapato.Application.Services.Products.Queries.GetProductById;
using Chapato.Application.Services.Products.Queries.GetProducts;
using Chapato.Application.Services.Products.Queries.GetRelatedProducts;
using Chapato.Application.Services.Products.FacadPattern;
using Chapato.Common;
using Chapato.Domain.Entities.Products;
using System.Drawing;
using Chapato.Application.Services.Products.Queries.GetUserOptions;
using Chapato.Application.Services.Products.Queries.GetUserSubOptions;
using Chapato.Application.Services.Products.Queries.GetUserOption_Items;
using Chapato.Application.Services.Products.Queries.GetUserOption_ToolTips;
using Chapato.Application.Services.Products.Commands.AddNewFeature;

namespace EndPoint.Site.Areas.Admin.Controllers
{
    [Area("Admin")]
    public partial class ProductsController : Controller
    {
        private readonly IProductFacad _productFacad;
        private readonly ModeCookie _modeCookie;
        private readonly string _absoluteJsonFilePath = "wwwroot/AdminTemplate/assets/json/dropzone_ck.json";
        public ProductsController(IProductFacad productFacad, ModeCookie modeCookie)
        {
            _productFacad = productFacad;
            _modeCookie = modeCookie;
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////Products

        public IActionResult GetAllProducts(string searchkey, int page = 1, int PageSize = 10)
        {
            if (string.IsNullOrWhiteSpace(searchkey))
            {
                searchkey = "";
            }

            ViewBag.Mode = _modeCookie.GetCookieValue("ckmode");
            return View(_productFacad.GetProductsService.Execute(new RequestGetProductDto
            {
                Page = page,
                PageSize = PageSize,
                SearchKey = searchkey
            }));
        }

        [HttpGet]
        public IActionResult GetProductById(RequestGetProductByIdDto request)
        {
            return Json(_productFacad.GetProductByIdService.Execute(request));
        }

        [HttpPost]
        public IActionResult SearchProducts(RequestGetRelatedProductsDto request, List<long> Categories, List<long> RelProducts)
        {
            request.CategoryIds = Categories;
            request.RelProductIds = RelProducts;

            var result = _productFacad.GetRelatedProductsService.Execute(request);
            return Json(result);
        }

        [HttpGet]
        public IActionResult AddNewProduct()
        {
            ViewBag.Mode = _modeCookie.GetCookieValue("ckmode");

            var BrandsData = _productFacad.GetBrandsService.Execute().Data;
            var ColorsData = _productFacad.GetColorsService.Execute().Data;

            ViewBag.Brands = BrandsData != null && BrandsData.Any()
                            ? new SelectList(BrandsData, "Id", "Name")
                            : new SelectList(new List<Brand>(), "Id", "Name");

            ViewBag.Colors = ColorsData != null && ColorsData.Any()
                           ? new SelectList(ColorsData, "Id", "Name")
                           : new SelectList(new List<Color>(), "Id", "Name");

            return View();
        }

        [HttpPost]
        public IActionResult AddNewProduct(RequestAddNewProductDto request, List<long> Categories,
            List<string> RelProducts, List<AddNewProduct_ColorOptionsDto> ColorOptions)
        {
            List<IFormFile> images = new List<IFormFile>();
            List<IFormFile> docs = new List<IFormFile>();

            foreach (var file in Request.Form.Files)
            {
                if (file.Length > 0)
                {
                    if (IsImage(file))
                    {
                        images.Add(file);
                    }
                    else
                    {
                        docs.Add(file);
                    }
                }
            }

            request.Images = images;
            request.Documents = docs;
            request.CategoryIds = Categories;
            request.RelatedProduct = RelProducts;
            request.ColorOptions = ColorOptions;

            var result = _productFacad.AddNewProductService.Execute(request);
            return Json(result);
        }

        [HttpGet]
        public IActionResult UpdateProduct(long ProductId)
        {

            ViewBag.Mode = _modeCookie.GetCookieValue("ckmode");

            var BrandsData = _productFacad.GetBrandsService.Execute().Data;
            var ColorsData = _productFacad.GetColorsService.Execute().Data;

            ViewBag.Brands = BrandsData != null && BrandsData.Any()
                            ? new SelectList(BrandsData, "Id", "Name")
                            : new SelectList(new List<Brand>(), "Id", "Name");

            ViewBag.Colors = ColorsData != null && ColorsData.Any()
                           ? new SelectList(ColorsData, "Id", "Name")
                           : new SelectList(new List<Color>(), "Id", "Name");

            var result = _productFacad.GetProductByIdService.Execute(new RequestGetProductByIdDto
            {
                ProductId = ProductId
            });

            return View(result);
        }


        [HttpPost]
        public IActionResult UpdateProduct(RequestUpdateProductDto request, List<string> RelProducts, List<RemovedImagesDto> Removed_Images_List,
            List<RemovedDocumentsDto> Removed_Documents_List, List<AddedCategoriesDto> Added_Categories_List,
            List<RemovedCategoriesDto> Removed_Categories_List, List<RemovedColorOptionsDto> Removed_ColorOptions_List,
            List<UpdatedColorOptionsDto> Updated_ColorOptions_List)
        {
            List<IFormFile> images = new List<IFormFile>();
            List<IFormFile> docs = new List<IFormFile>();

            foreach (var file in Request.Form.Files)
            {
                if (file.Length > 0)
                {
                    if (IsImage(file))
                    {
                        images.Add(file);
                    }
                    else
                    {
                        docs.Add(file);
                    }
                }
            }

            request.Images = images;
            request.Documents = docs;
            request.RelatedProduct = RelProducts;
            request.Removed_Images = Removed_Images_List;
            request.Removed_Documents = Removed_Documents_List;
            request.Added_Categories = Added_Categories_List;
            request.Removed_Categories = Removed_Categories_List;
            request.Removed_ColorOptions = Removed_ColorOptions_List;
            request.Updated_ColorOptions = Updated_ColorOptions_List;

            var result = _productFacad.UpdateProductService.Execute(request);
            return Json(result);
        }

        [HttpPost]
        public IActionResult RemoveProduct(long Id)
        {
            var result = _productFacad.RemoveProductService.Execute(new RequestRemoveProductDto
            {
                Id = Id
            });
            return Json(result);
        }

        [HttpPost]
        public IActionResult Update_ProductDisplayMode(long Id, bool Displayed)
        {
            var result = _productFacad.Update_ProductDisplayMode_Service.Execute(new Request_Update_ProductDisplayMode_Dto
            {
                Id = Id,
                Displayed = Displayed
            });
            return Json(result);
        }


        //////////////////////////////////////////////////////////////////////////////////////////////////Categories

        [HttpGet("/admin/Products/GetCategories")]
        public IActionResult GetCategories()
        {
            var categories = _productFacad.GetCategoriesService.Execute().Data;
            var categoryList = categories.Select(category => new { Id = category.Id, Name = category.Name }).ToList();
            return Ok(categoryList);
        }

        [HttpGet]
        public IActionResult GetJsonData()
        {
            if (!System.IO.File.Exists(_absoluteJsonFilePath))
            {
                return NotFound("فایل پیدا نشد");
            }

            var jsonData = System.IO.File.ReadAllText(_absoluteJsonFilePath);
            var data = JsonConvert.DeserializeObject<List<FileTypeData>>(jsonData);

            return Ok(data);
        }

        [HttpPost]
        public IActionResult SaveJsonData([FromBody] List<FileTypeData> data)
        {
            if (data == null)
            {
                return BadRequest("داده نامعتبر");
            }

            try
            {
                var jsonData = JsonConvert.SerializeObject(data, Formatting.Indented);
                System.IO.File.WriteAllText(_absoluteJsonFilePath, jsonData);

                return Ok(data);
            }
            catch (JsonReaderException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////Features

        [HttpGet]
        public IActionResult GetFeatures([FromQuery] RequestGetFeaturesDto request)
        {
            var result = _productFacad.GetFeaturesService.Execute(request);
            return Json(result);
        }

        [HttpGet]
        public IActionResult AddNewFeature()
        {
            ViewBag.Mode = _modeCookie.GetCookieValue("ckmode");
            ViewBag.Categories = new SelectList(_productFacad.GetCategoriesService.Execute().Data, "Id", "Name");
            return View();
        }

        [HttpPost]
        public IActionResult AddNewFeature([FromBody] RequestAddNewFeatureDto request)
        {
            var result = _productFacad.AddNewProductFeatureService.Execute(request);
            return Json(result);
        }

        [HttpPost]
        public IActionResult EditFeature([FromBody] RequestEditFeatureDto request)
        {
            var result = _productFacad.EditFeatureService.Execute(request);
            return Json(result);
        }

        [HttpPost]
        public IActionResult DeleteFeature(long Id)
        {
            return Json(_productFacad.DeleteFeatureService.Execute(Id));
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////FeatureItems

        [HttpPost]
        public IActionResult AddNewFeatureItem([FromBody] RequestAddNewFeatureItemDto request)
        {
            var result = _productFacad.AddNewFeatureItemService.Execute(request);
            return Json(result);
        }

        [HttpPost]
        public IActionResult EditFeatureItem([FromBody] RequestEditFeatureItemDto request)
        {
            var result = _productFacad.EditFeatureItemService.Execute(request);
            return Json(result);
        }

        [HttpPost]
        public IActionResult DeleteFeatureItem(long Id)
        {
            return Json(_productFacad.DeleteFeatureItemService.Execute(Id));
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////Brands

        [HttpPost]
        public IActionResult AddNewBrand([FromBody] RequestAddNewBrandDto request)
        {
            var result = _productFacad.AddNewBrandService.Execute(request);
            return Json(result);
        }

        [HttpPost]
        public IActionResult EditBrand([FromBody] RequestEditBrandDto request)
        {
            var result = _productFacad.EditBrandService.Execute(request);
            return Json(result);
        }

        [HttpPost]
        public IActionResult DeleteBrand([FromBody] RequestDeleteBrandDto request)
        {
            var result = _productFacad.DeleteBrandService.Execute(request);
            return Json(result);
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////Colors

        [HttpPost]
        public IActionResult AddNewColor([FromBody] RequsetAddNewColorDto request)
        {
            var result = _productFacad.AddNewColorService.Execute(request);
            return Json(result);
        }

        [HttpPost]
        public IActionResult EditColor([FromBody] RequestEditColorDto request)
        {
            var result = _productFacad.EditColorService.Execute(request);
            return Json(result);
        }

        [HttpPost]
        public IActionResult DeleteColor([FromBody] RequestDeleteColorDto request)
        {
            var result = _productFacad.DeleteColorService.Execute(request);
            return Json(result);
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////ProductUserOptions
        
        [HttpPost]
        public IActionResult GetUserOptions(RequestGetUserOptionsDto request)
        {
            var result = _productFacad.GetUserOptionsService.Execute(request);
            return Json(result);
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////ProductUserOption_Items

        [HttpPost]
        public IActionResult GetUserOption_Items(RequestGetUserOption_ItemsDto request)
        {
            var result = _productFacad.GetUserOption_ItemsService.Execute(request);
            return Json(result);
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////ProductUserOption_ToolTips

        [HttpPost]
        public IActionResult GetUserOption_ToolTips(RequestGetUserOption_ToolTipsDto request)
        {
            var result = _productFacad.GetUserOption_ToolTipsService.Execute(request);
            return Json(result);
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////ProductUserSubOptions

        [HttpPost]
        public IActionResult GetUserSubOptions(RequestGetUserSubOptionsDto request)
        {
            var result = _productFacad.GetUserSubOptionsService.Execute(request);
            return Json(result);
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////Functions
        private bool IsImage(IFormFile file)
        {
            var extensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            return extensions.Contains(extension);
        }

    }
}