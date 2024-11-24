using Chapato.Domain.Entities.Commons;
using System.Collections.Generic;

namespace Chapato.Domain.Entities.Products
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public virtual Category ParentCategory { get; set; }
        public long? ParentCategoryId { get; set; }
        public int? Order { get; set; } = 0;
        public virtual ICollection<ProductCategory> ProductCategories { get; set; }
        public virtual ICollection<ProductFeatures> ProductFeatures { get; set; }
        public virtual ICollection<ProductUserOptions> ProductUserOptions { get; set; }
    }
}
