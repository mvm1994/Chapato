using Chapato.Application.Interfaces.Contexts;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Chapato.Application.Services.Users.Commands.RegisterUser;
using Chapato.Application.Services.Users.Queries.GetRoles;
using Chapato.Common.Dto;
using Chapato.Domain.Entities.Users;
using System.Security.Claims;

namespace Chapato.Application.Services.Users.Commands.EditUser
{
    public class EditUserService : IEditUserService
    {
        private readonly IDataBaseContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public EditUserService(IDataBaseContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;

        }
        public ResultDto Execute(RequestEditUserDto request, HttpContext httpContext)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(request.FullName))
                {
                    return new ResultDto()
                    {
                        IsSuccess = false,
                        Message = "نام را وارد نمایید"
                    };
                }

                if (string.IsNullOrWhiteSpace(request.Email))
                {
                    return new ResultDto()
                    {
                        IsSuccess = false,
                        Message = "پست الکترونیک را وارد نمایید"
                    };
                }

                var UserCheck = _context.Users.Find(request.UserId);

                IQueryable<User> EmailCheck = null;

                if (UserCheck != null && request.Email != UserCheck.Email)
                {
                    EmailCheck = _context.Users.Where(u => u.Email == request.Email);
                }

                if (EmailCheck != null && EmailCheck.Any())
                {
                    return new ResultDto()
                    {
                        IsSuccess = false,
                        Message = "آدرس پست الکترونیک در پایگاه داده وجود دارد"
                    };
                }

                var user = _context.Users.Find(request.UserId);

                var olduserinroles = _context.UserInRoles.Where(u => u.UserId == request.UserId);

                _context.UserInRoles.RemoveRange(olduserinroles);

                List<UserInRole> userInRoles = new List<UserInRole>();
                List<string> rolename = new List<string>();

                foreach (var item in request.Roles)
                {
                    var role = _context.Roles.Find(item.Id);

                    if (role != null)
                    {
                        rolename.Add(role.Name);

                        userInRoles.Add(new UserInRole()
                        {
                            User = user,
                            UserId = user.Id,
                            Role = role,
                            RoleId = role.Id
                        });
                    }
                }

                user.Email = request.Email;
                user.FullName = request.FullName;
                user.UserInRoles = userInRoles;
                user.UpdateTime = DateTime.Now;

                _context.Users.Update(user);
                _context.SaveChanges();

                if (_httpContextAccessor.HttpContext.User.Identity.IsAuthenticated && _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value == request.UserId.ToString())
                {
                    httpContext.SignOutAsync();

                    var claims = new List<Claim>()
                    {
                        new Claim(ClaimTypes.NameIdentifier,request.UserId.ToString()),
                        new Claim(ClaimTypes.Email,request.Email),
                        new Claim(ClaimTypes.Name,request.FullName),
                        new Claim(ClaimTypes.Role,rolename[0])
                    };

                    var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                    var principal = new ClaimsPrincipal(identity);
                    var properties = new AuthenticationProperties()
                    {
                        IsPersistent = true,
                    };

                    httpContext.SignInAsync(principal, properties);
                }

                return new ResultDto()
                {
                    IsSuccess = true,
                    Message = "ویرایش اطلاعات کاربر انجام شد"
                };
            }
            catch (Exception)
            {
                return new ResultDto()
                {
                    IsSuccess = false,
                    Message = "ویرایش اطلاعات کاربرانجام نشد"
                };
            }
        }
    }
}
