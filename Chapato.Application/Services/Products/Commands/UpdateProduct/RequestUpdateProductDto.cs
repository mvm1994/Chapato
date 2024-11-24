using Microsoft.AspNetCore.Http;

namespace Chapato.Application.Services.Products.Commands.UpdateProduct
{
    public class RequestUpdateProductDto
    {
        public long Id { get; set; }
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
        public string? ToolTopicDesc { get; set; }
        public string? VideoLink { get; set; }
        public string? PageTitle { get; set; }
        public string? PageUrl { get; set; }
        public string? MetaKeywords { get; set; }
        public string? MetaDescription { get; set; }
        public List<IFormFile> Images { get; set; }
        public List<IFormFile> Documents { get; set; }
        public List<ColorOptionsDto> ColorOptions { get; set; }
        public List<string> RelatedProduct { get; set; }
        public List<string> ProductFeatureItems { get; set; }
        public List<string> Features { get; set; }
        public List<RemovedImagesDto> Removed_Images { get; set; }
        public List<RemovedDocumentsDto> Removed_Documents { get; set; }
        public List<RemovedColorOptionsDto> Removed_ColorOptions { get; set; }
        public List<UpdatedColorOptionsDto> Updated_ColorOptions { get; set; }
        public List<AddedCategoriesDto> Added_Categories { get; set; }
        public List<RemovedCategoriesDto> Removed_Categories { get; set; }
    }
}
