using System;
using System.Collections.Generic;
using Chapato.Domain.Entities.Commons;

namespace Chapato.Domain.Entities.Customers_Club
{
    public class Customer : BaseEntity
    {
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string MembershipCode { get; set; }
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }

}
