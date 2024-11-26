using Chapato.Domain.Entities.Commons;

namespace Chapato.Domain.Entities.Customers_Club
{
    public class CustomerInvoice : BaseEntity
    {
        public virtual Order Order { get; set; }
        public long OrderId { get; set; }
        public int TotalAmount { get; set; }
        public int DiscountAmount { get; set; }
        public int OrderCount { get; set; }
        public int OrderWeight { get; set; }
        public string OrderDate { get; set; }
        public string SettlementDate { get; set; }
    }

}
