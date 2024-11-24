using Chapato.Domain.Entities.Commons;
using Chapato.Domain.Entities.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Domain.Entities.Products
{
    public class ProductPriceList : BaseEntity
    {
        public virtual Product Product { get; set; }
        public long ProductId { get; set; }
        public string Title { get; set; }
        public ICollection<ProductPriceListItems> Items { get; set; }
    }
}
