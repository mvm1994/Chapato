using Chapato.Domain.Entities.Commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Domain.Entities.Products
{
    public class ProductColorOption : BaseEntity
    {
        public virtual ColorRepository Color { get; set; }
        public long ColorId { get; set; }

        public virtual Product Product { get; set; }
        public long ProductId { get; set; }

        public int OptionPrice { get; set; }
        public int OptionInventory { get; set; }
    }
}
