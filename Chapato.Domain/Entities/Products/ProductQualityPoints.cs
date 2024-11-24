using Chapato.Domain.Entities.Commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Domain.Entities.Products
{
    public class ProductQualityPoints : BaseEntity
    {
        public virtual Product Product { get; set; }
        public long ProductId { get; set; }
        public string QualityPointName { get; set; }
        public string QualityPointType { get; set; }
    }
}
