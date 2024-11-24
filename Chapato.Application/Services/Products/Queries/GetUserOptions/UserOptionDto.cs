using Chapato.Domain.Entities.Products;

namespace Chapato.Application.Services.Products.Queries.GetUserOptions
{
    public class UserOptionDto
    {
        public long Id { get; set; }
        public long CategoryId { get; set; }
        public long? ParentUserOptionId { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Option_Type { get; set; }
        public string ToolTip_Desc { get; set; }
        public int Price { get; set; }
        public int? Order { get; set; } = 0;
        public bool SetAsDefault { get; set; }
        public int Option_Maxlength { get; set; }
        public List<string> Option_ExtensionList { get; set; }
        public int Option_FileSize { get; set; }
    }
}
