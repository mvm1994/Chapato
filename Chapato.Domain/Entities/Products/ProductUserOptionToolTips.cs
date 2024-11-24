using Chapato.Domain.Entities.Commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Domain.Entities.Products
{
    public class ProductUserOptionToolTips : BaseEntity
    {
        public virtual ProductUserOptions Option { get; set; }
        public long OptionId { get; set; }
        public long? ParentOptionId { get; set; } = 0;
        public long? ParentItemId { get; set; } = 0;
        public string Text { get; set; }
    }
}
