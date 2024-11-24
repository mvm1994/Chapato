using Chapato.Domain.Entities.Commons;
using Chapato.Domain.Entities.Products;

namespace Chapato.Domain.Entities.Products
{
    public class ProductFeatureItems : BaseEntity
    {
        public virtual ProductFeatures ProductFeature { get; set; }
        public long ProductFeatureId { get; set; }
        public long Id { get; set; }
        public string Name { get; set; }
    }
}
