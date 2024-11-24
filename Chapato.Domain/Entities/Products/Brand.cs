using Chapato.Domain.Entities.Commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Domain.Entities.Products
{
    public class Brand : BaseEntity
    {
        public string Name { get; set; }
        public int? Order { get; set; } = 0;
        public virtual ICollection<Product> Products { get; set; }
    }
}
