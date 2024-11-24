using Chapato.Application.Services.Users.Queries.GetRoles;
using Chapato.Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Users.Commands.EditUser
{
    public class ResultEditUserDto
    {
        public long UserId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public ICollection<UserRolesDto> Roles { get; set; }
    }
}
