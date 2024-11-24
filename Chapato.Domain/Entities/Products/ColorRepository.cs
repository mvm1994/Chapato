using Chapato.Domain.Entities.Commons;
using Chapato.Domain.Entities.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Domain.Entities.Products
{
    public class ColorRepository : BaseEntity
    {
        public string Name { get; set; }
        public string HexCode { get; set; }
        public virtual ICollection<ProductColorOption> ProductColorOptions { get; set; }
    }
}
