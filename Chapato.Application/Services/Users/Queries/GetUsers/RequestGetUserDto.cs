using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Users.Queries.GetUsers
{
    public class RequestGetUserDto
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public string SearchKey { get; set; }
    }
}
