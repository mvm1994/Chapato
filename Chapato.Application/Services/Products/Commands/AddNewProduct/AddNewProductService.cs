using Chapato.Application.Interfaces.Contexts;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Chapato.Common.Dto;
using Chapato.Domain.Entities.Products;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Chapato.Application.Services.Products.Commands.AddNewProduct;

namespace Chapato.Application.Services.Products.Commands.AddNewProduct
{
    public class AddNewProductService : IAddNewProductService
    {
        private readonly IDataBaseContext _context;
        private readonly IWebHostEnvironment _environment;

        public AddNewProductService(IDataBaseContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        public ResultDto Execute(RequestAddNewProductDto request)
        {
            try
            {
                var brand = _context.Brands.Find(request.BrandId);

                if (brand == null)
                {
                    return new ResultDto
                    {
                        IsSuccess = false,
                        Message = "این برند در دیتابیس موجود نیست"
                    };
                }

                var categories = _context.Categories.Where(c => request.CategoryIds.Contains(c.Id)).ToList();

                if (!categories.Any())
                {
                    return new ResultDto
                    {
                        IsSuccess = false,
                        Message = "هیچکدام از دسته بندی ها در دیتابیس موجود نیست"
                    };
                }

                var product = new Product()
                {
                    Brand = brand,
                    Name = request.Name ?? string.Empty,
                    Price = request.Price ?? 0,
                    Price_With_DisCount = request.Price ?? 0,
                    Inventory = request.Inventory ?? 0,
                    Description = request.Description ?? string.Empty,
                    Existence = request.Existence,
                    MetaDescription = request.MetaDescription ?? string.Empty,
                    MetaKeywords = request.MetaKeywords ?? string.Empty,
                    PageTitle = request.PageTitle ?? string.Empty,
                    PageUrl = request.PageUrl ?? string.Empty,
                    RelatedProduct = request.RelatedProduct,
                    UniqueCode = request.UniqueCode ?? string.Empty,
                    DeliveryDescription = request.DeliveryDescription ?? string.Empty,
                    ProductCategories = categories.Select(c => new ProductCategory { Category = c }).ToList(),
                    ProductFeatureItems = request.ProductFeatureItems,
                    VideoLink = request.VideoLink ?? string.Empty,
                };

                _context.Products.Add(product);

                List<ProductImages> productImages = new List<ProductImages>();
                foreach (var item in request.Images)
                {
                    var uploadedResult = UploadFile(item, "image");
                    var fileNameAddress = uploadedResult.FileNameAddress.Replace("\\", "/");
                    productImages.Add(new ProductImages
                    {
                        Product = product,
                        Src = fileNameAddress,
                    });
                }

                _context.ProductImages.AddRange(productImages);

                List<ProductDocuments> productDocuments = new List<ProductDocuments>();
                foreach (var item in request.Documents)
                {
                    var uploadedResult = UploadFile(item, "docs");
                    var fileNameAddress = uploadedResult.FileNameAddress.Replace("\\", "/");
                    productDocuments.Add(new ProductDocuments
                    {
                        Product = product,
                        Src = fileNameAddress,
                    });
                }

                _context.ProductDocuments.AddRange(productDocuments);

                if (request.ColorOptions != null && request.ColorOptions.Any())
                {
                    var colorOptions = new List<ProductColorOption>();

                    foreach (var item in request.ColorOptions)
                    {
                        var color = _context.Colors.Find(item.ColorId);

                        if (color != null)
                        {
                            colorOptions.Add(new ProductColorOption
                            {
                                Product = product,
                                Color = color,
                                ColorId = item.ColorId,
                                OptionPrice = item.Price,
                                OptionInventory = item.Inventory
                            });
                        }

                    }

                    _context.ProductColorOptions.AddRange(colorOptions);
                }

                var delivery_period = new ProductDeliveryPeriod();

                delivery_period.Product = product;
                delivery_period.ProductId = product.Id;
                delivery_period.MinTime = Convert.ToInt32(request.MinTime);
                delivery_period.MaxTime = Convert.ToInt32(request.MaxTime);

                _context.ProductDeliveryPeriods.Add(delivery_period);

                _context.SaveChanges();

                return new ResultDto
                {
                    IsSuccess = true,
                    Message = "محصول اضافه شد"
                };
            }
            catch (Exception ex)
            {
                return new ResultDto
                {
                    IsSuccess = false,
                    Message = "ثبت محصول با خطا مواجه شد"
                };
            }
        }

        private UploadDto UploadFile(IFormFile file, string filetype)
        {
            string Folder = "";

            if (file != null)
            {
                if (filetype == "image")
                {
                    Folder = $@"Images\Product\";
                }
                else
                {
                    Folder = $@"Documents\Product\";
                }

                var RootFolder = Path.Combine(_environment.WebRootPath, Folder);

                if (!Directory.Exists(RootFolder))
                {
                    Directory.CreateDirectory(RootFolder);
                }


                if (file == null || file.Length == 0)
                {
                    return new UploadDto()
                    {
                        Status = false,
                        FileNameAddress = "",
                    };
                }

                string fileName = DateTime.Now.Ticks.ToString() + file.FileName;
                var filePath = Path.Combine(RootFolder, fileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }

                return new UploadDto()
                {
                    FileNameAddress = Folder + fileName,
                    Status = true,
                };
            }
            else
            {
                return new UploadDto()
                {
                    FileNameAddress = "",
                    Status = false,
                };
            }
        }
    }
}
