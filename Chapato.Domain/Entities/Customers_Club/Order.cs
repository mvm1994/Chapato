using Chapato.Domain.Entities.Commons;

namespace Chapato.Domain.Entities.Customers_Club
{
    public class Order : BaseEntity
    {
        public virtual Customer Customer { get; set; }
        public long CustomerId { get; set; }
        public virtual CustomerInvoice Invoice { get; set; }
        public long? InvoiceId { get; set; }
        public string OrderDate { get; set; }
        public string SettlementDate { get; set; }
        public int DepositAmount { get; set; }
        public int TotalAmount { get; set; }
        public int DiscountPercent { get; set; }
        public int DiscountAmount { get; set; }
        public int OrderCount { get; set; }
        public int OrderWeight { get; set; }
        public ICollection<ProductTemp> Products { get; set; } = new List<ProductTemp>();
    }


}
