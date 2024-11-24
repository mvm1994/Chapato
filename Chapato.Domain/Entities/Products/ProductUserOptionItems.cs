using Chapato.Domain.Entities.Commons;
using Chapato.Domain.Entities.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Domain.Entities.Products
{
    public class ProductUserOptionItems : BaseEntity
    {
        public virtual ProductUserOptions Option { get; set; }
        public long OptionId { get; set; }
        public long? ParentOptionId { get; set; } = 0;
        public long? ParentOptionItemId { get; set; } = 0;
        public string Name { get; set; }
        public int Price { get; set; }
        public string Option_Type { get; set; }
        public string Item_Group { get; set; }

    }
}
