using Chapato.Domain.Entities.Commons;
using Chapato.Domain.Entities.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Domain.Entities.Products
{
    public class ProductUserOptionImages : BaseEntity
    {
        public virtual ProductUserOptions Option { get; set; }
        public long OptionId { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Src { get; set; }
    }
}
