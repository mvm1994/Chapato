using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace Chapato.Application.Services.Products.Commands.AddNewProduct
{
    public class RequestAddNewProductDto
    {
        public long? BrandId { get; set; }
        public string Existence { get; set; }
        public string? Name { get; set; }
        public string? UniqueCode { get; set; }
        public int? Price { get; set; }
        public int? Price_With_DisCount { get; set; }
        public int? Inventory { get; set; }
        public string? DeliveryDescription { get; set; }
        public int MinTime { get; set; }
        public int MaxTime { get; set; }
        public string? Description { get; set; }
        public string? VideoLink { get; set; }
        public string? PageTitle { get; set; }
        public string? PageUrl { get; set; }
        public string? MetaKeywords { get; set; }
        public string? MetaDescription { get; set; }
        public List<long> CategoryIds { get; set; }
        public List<IFormFile> Images { get; set; }
        public List<IFormFile> Documents { get; set; }
        public List<AddNewProduct_ColorOptionsDto> ColorOptions { get; set; }
        public List<string> RelatedProduct { get; set; }
        public List<string> ProductFeatureItems { get; set; }
        public List<string> Features { get; set; }
    }
}
