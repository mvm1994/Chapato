using Chapato.Domain.Entities.Commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Domain.Entities.Customers_Club
{
    public class InvoiceImages:BaseEntity
    {
        public string Name { get; set; }
        public string Src { get; set; }
    }
}
