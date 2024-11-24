using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Chapato.Application.Services.Products.Commands.AddNewProduct;
using Chapato.Common.Dto;
using Chapato.Domain.Entities.Products;
using Chapato.Application.Interfaces.Contexts;

namespace Chapato.Application.Services.Products.Commands.UpdateProduct
{
    public class UpdateProductService : IUpdateProductService
    {
        private readonly IDataBaseContext _context;
        private readonly IWebHostEnvironment _environment;
        public UpdateProductService(IDataBaseContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }
        public ResultDto Execute(RequestUpdateProductDto request)
        {
            try
            {
                var product = _context.Products.Find(request.Id);

                if (product == null)
                {
                    return new ResultDto
                    {
                        IsSuccess = false,
                        Message = "این محصول در دیتابیس موجود نیست"
                    };
                }

                var brand = _context.Brands.Find(request.BrandId);

                if (brand == null)
                {
                    return new ResultDto
                    {
                        IsSuccess = false,
                        Message = "این برند در دیتابیس موجود نیست"
                    };
                }

                if (request.Added_Categories.Count > 0)
                {
                    List<ProductCategory> ProductCategories = new List<ProductCategory>();

                    foreach (var item in request.Added_Categories)
                    {
                        var category = _context.Categories.Find(item.Id);

                        if (category != null)
                        {
                            ProductCategories.Add(new ProductCategory
                            {
                                Category = category,
                                CategoryId = category.Id,
                                Product = product,
                                ProductId = product.Id
                            });
                        }
                    }

                    _context.ProductCategories.AddRange(ProductCategories);
                }

                if (request.Removed_Categories.Count > 0)
                {
                    List<ProductCategory> ProductCategories = new List<ProductCategory>();

                    foreach (var item in request.Removed_Categories)
                    {
                        var productcategory = _context.ProductCategories.FirstOrDefault(p => p.CategoryId == item.Id && p.ProductId == product.Id);

                        if (productcategory != null)
                        {
                            ProductCategories.Add(productcategory);
                        }
                    }

                    _context.ProductCategories.RemoveRange(ProductCategories);
                }

                if (request.Removed_Images.Count > 0)
                {
                    foreach (var item in request.Removed_Images)
                    {
                        var img = _context.ProductImages.Find(item.ImageId);

                        if (img != null)
                        {
                            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", img.Src.Replace("/", "\\"));

                            if (System.IO.File.Exists(imagePath))
                            {
                                System.IO.File.Delete(imagePath);
                                _context.ProductImages.Remove(img);
                            }
                            else
                            {
                                return new ResultDto
                                {
                                    IsSuccess = false,
                                    Message = "خطا در حذف تصویر"
                                };
                            }
                        }
                    }

                }

                if (request.Removed_Documents.Count > 0)
                {
                    foreach (var item in request.Removed_Documents)
                    {
                        var doc = _context.ProductDocuments.Find(item.DocumentId);

                        if (doc != null)
                        {
                            var docPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", doc.Src.Replace("/", "\\"));

                            if (System.IO.File.Exists(docPath))
                            {
                                System.IO.File.Delete(docPath);
                                _context.ProductDocuments.Remove(doc);
                            }
                            else
                            {
                                return new ResultDto
                                {
                                    IsSuccess = false,
                                    Message = "خطا در حذف فایل pdf"
                                };
                            }
                        }
                    }
                }

                if (request.Removed_ColorOptions.Count > 0)
                {
                    List<ProductColorOption> ColorOptions = new List<ProductColorOption>();

                    foreach (var item in request.Removed_ColorOptions)
                    {
                        var coloroption = _context.ProductColorOptions.Find(item.Id);

                        if (coloroption != null)
                        {
                            ColorOptions.Add(coloroption);
                        }
                    }

                    _context.ProductColorOptions.RemoveRange(ColorOptions);
                }

                if (request.Updated_ColorOptions.Count > 0)
                {
                    List<ProductColorOption> ColorOptions = new List<ProductColorOption>();

                    foreach (var item in request.Updated_ColorOptions)
                    {
                        var coloroption = _context.ProductColorOptions.Find(item.Id);
                        var coloroption_color = _context.Colors.Find(item.ColorId);

                        if (coloroption != null && coloroption_color != null)
                        {
                            coloroption.Id = item.Id;
                            coloroption.Color = coloroption_color;
                            coloroption.ColorId = item.ColorId;
                            coloroption.Product = product;
                            coloroption.ProductId = product.Id;
                            coloroption.OptionPrice = item.Price;
                            coloroption.OptionInventory = item.Inventory;

                            ColorOptions.Add(coloroption);
                        }
                    }

                    _context.ProductColorOptions.UpdateRange(ColorOptions);
                }

                product.Brand = brand;
                product.Name = request.Name ?? string.Empty;
                product.Price = request.Price ?? 0;
                product.Price_With_DisCount = request.Price ?? 0;
                product.Inventory = request.Inventory ?? 0;
                product.Description = request.Description ?? string.Empty;
                product.Existence = request.Existence;
                product.MetaDescription = request.MetaDescription ?? string.Empty;
                product.MetaKeywords = request.MetaKeywords ?? string.Empty;
                product.PageTitle = request.PageTitle ?? string.Empty;
                product.PageUrl = request.PageUrl ?? string.Empty;
                product.RelatedProduct = request.RelatedProduct;
                product.UniqueCode = request.UniqueCode ?? string.Empty;
                product.DeliveryDescription = request.DeliveryDescription ?? string.Empty;
                product.ProductFeatureItems = request.ProductFeatureItems;
                product.VideoLink = request.VideoLink ?? string.Empty;

                product.UpdateTime = DateTime.Now;

                _context.Products.Update(product);

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

                var colorOptions = new List<ProductColorOption>();

                if (request.ColorOptions != null && request.ColorOptions.Any())
                {
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
                }

                _context.ProductColorOptions.AddRange(colorOptions);

                var product_delivery = _context.ProductDeliveryPeriods.FirstOrDefault(pd => pd.ProductId == product.Id);

                if (product_delivery != null)
                {
                    product_delivery.MinTime = Convert.ToInt32(request.MinTime);
                    product_delivery.MaxTime = Convert.ToInt32(request.MaxTime);

                    _context.ProductDeliveryPeriods.Update(product_delivery);
                }
                
                _context.SaveChanges();

                return new ResultDto
                {
                    IsSuccess = true,
                    Message = "محصول ویرایش شد"
                };
            }
            catch (Exception ex)
            {
                return new ResultDto
                {
                    IsSuccess = false,
                    Message = "ویرایش محصول با خطا مواجه شد"
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
