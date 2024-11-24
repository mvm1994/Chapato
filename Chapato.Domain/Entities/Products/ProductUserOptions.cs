using Chapato.Domain.Entities.Commons;
using Chapato.Domain.Entities.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Domain.Entities.Products
{
    public class ProductUserOptions : BaseEntity
    {
        public virtual Category Category { get; set; }
        public long CategoryId { get; set; }
        public string Name { get; set; }

        //public string Title { get; set; }
        public string Option_Type { get; set; }
        public int Price { get; set; }
        public int? Order { get; set; } = 0;
        public bool SetAsDefault { get; set; }
        public int Option_Maxlength { get; set; } = 0;
        public List<string> Option_ExtensionList { get; set; } = new List<string>();
        public int Option_FileSize { get; set; } = 0;
        public ICollection<ProductUserOptionParents> Parents { get; set; }
        public ICollection<ProductUserOptionImages> Images { get; set; }
        public ICollection<ProductUserOptionItems> Items { get; set; }
        public ICollection<ProductUserOptionToolTips> ToolTips { get; set; }
        public ICollection<ProductUserOptionTitles> Titles { get; set; }
    }
}
