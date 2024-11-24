using Chapato.Domain.Entities.Commons;

namespace Chapato.Domain.Entities.Products
{
    public class ProductFeatures : BaseEntity
    {
        /////////////////////////////////////////////////////Category
        public virtual Category Category { get; set; }
        public long CategoryId { get; set; }

        /////////////////////////////////////////////////////////////
        public int DisplayType { get; set; }
        public string DisplayedName { get; set; }
        public virtual ICollection<ProductFeatureItems> ProductFeatureItems { get; set; }
    }
}
