using Chapato.Domain.Entities.Commons;

namespace Chapato.Domain.Entities.Products
{
    public class ProductDocuments : BaseEntity
    {
        public virtual Product Product { get; set; }
        public long ProductId { get; set; }
        public int? Order { get; set; } = 0;
        public string Src { get; set; }
    }
}
