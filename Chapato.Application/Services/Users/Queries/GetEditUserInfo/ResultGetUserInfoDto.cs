using Chapato.Application.Services.Users.Queries.GetRoles;

namespace Chapato.Application.Services.Users.Queries.GetEditUserInfo
{
    public class ResultGetUserInfoDto
    {
        public long UserId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public ICollection<UserRolesDto> Roles { get; set; }
    }
}
