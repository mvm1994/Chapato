using Chapato.Domain.Entities.Commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Domain.Entities.Products
{
    public class ProductDeliveryPeriod : BaseEntity
    {
        public virtual Product Product { get; set; }
        public long ProductId { get; set; }
        public int MinTime { get; set; }
        public int MaxTime { get; set; }
    }
}
