using Chapato.Domain.Entities.Commons;

namespace Chapato.Domain.Entities.Customers_Club
{
    public class ProductTemp : BaseEntity
    {
        public string Name { get; set; }
        public int Price { get; set; }
        public string UniqueCode { get; set; }
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
