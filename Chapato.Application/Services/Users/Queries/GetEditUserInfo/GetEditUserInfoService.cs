using Chapato.Application.Interfaces.Contexts;
using Chapato.Application.Services.Users.Queries.GetRoles;

namespace Chapato.Application.Services.Users.Queries.GetEditUserInfo
{
    public class GetEditUserInfoService : IGetEditUserInfoService
    {
        private readonly IDataBaseContext _context;
        public GetEditUserInfoService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultGetUserInfoDto Execute(RequestGetUserInfoDto request)
        {
            var user = _context.Users.Find(request.UserId);

            var userinroles = _context.UserInRoles.Where(u => u.UserId == request.UserId).ToList();

            List<UserRolesDto> roles = new List<UserRolesDto>();

            foreach (var item in userinroles)
            {
                roles.Add(new UserRolesDto
                {
                    Id = item.RoleId
                });
            }

            return new ResultGetUserInfoDto
            {
                Email = user.Email,
                FullName = user.FullName,
                Password = user.Password,
                Roles = roles,
                UserId = request.UserId
            };
        }
    }
}
