using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Users.Queries.GetUsers
{
    public class ResultGetUserDto
    {
        public List<GetUsersDto> Users { get; set; }
        public int Rows { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
    }
}
