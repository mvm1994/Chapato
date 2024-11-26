using Chapato.Application.Services.Users.Queries.GetRoles;
using Chapato.Domain.Entities.Users;

namespace Chapato.Application.Services.Users.Commands.EditUser
{
    public class RequestEditUserDto
    {
        public long UserId { get; set; }
        public string FullName { get; set; }
        public string Phone_Number { get; set; }
        public string Email { get; set; }
        public ICollection<UserRolesDto> Roles { get; set; }
    }
}
