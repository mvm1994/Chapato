using Chapato.Domain.Entities.Commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Domain.Entities.Products
{
    public class ProductPreviewDescription : BaseEntity
    {
        public virtual Product Product { get; set; }
        public long ProductId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
