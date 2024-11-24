using Chapato.Domain.Entities.Commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Domain.Entities.Products
{
    public class ProductPriceListItems : BaseEntity
    {
        public virtual ProductPriceList ProductPriceList { get; set; }
        public long ProductPriceListId { get; set; }
        public string ItemHeader { get; set; }
        public string ItemBody { get; set; }
    }
}
