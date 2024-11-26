using Chapato.Application.Interfaces.Contexts;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Chapato.Common.Dto;
using Chapato.Domain.Entities.Users;
using System.Security.Claims;
using System.Linq;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;

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

                var userCheck = _context.Users.Find(request.UserId);

                IQueryable<User> emailCheck = null;
                if (userCheck != null && request.Email != userCheck.Email)
                {
                    emailCheck = _context.Users.Where(u => u.Email == request.Email && u.IsActive && !u.IsRemoved);
                }

                if (emailCheck != null && emailCheck.Any())
                {
                    return new ResultDto()
                    {
                        IsSuccess = false,
                        Message = "آدرس پست الکترونیک در پایگاه داده وجود دارد"
                    };
                }

                IQueryable<User> phoneNumberCheck = null;
                if (userCheck != null && request.Phone_Number != userCheck.Phone_Number)
                {
                    phoneNumberCheck = _context.Users.Where(u => u.Phone_Number == request.Phone_Number && u.IsActive && !u.IsRemoved);
                }

                if (phoneNumberCheck != null && phoneNumberCheck.Any())
                {
                    return new ResultDto()
                    {
                        IsSuccess = false,
                        Message = "شماره تلفن در پایگاه داده وجود دارد"
                    };
                }

                var user = _context.Users.Find(request.UserId);
                if (user == null)
                {
                    return new ResultDto()
                    {
                        IsSuccess = false,
                        Message = "کاربر پیدا نشد"
                    };
                }

                if (request.Roles == null || request.Roles.Count == 0)
                {
                    return new ResultDto()
                    {
                        IsSuccess = false,
                        Message = "نقش را انتخاب کنید"
                    };
                }

                var oldUserInRoles = _context.UserInRoles.Where(u => u.UserId == request.UserId);
                _context.UserInRoles.RemoveRange(oldUserInRoles);

                List<UserInRole> userInRoles = new List<UserInRole>();
                List<string> roleNames = new List<string>();

                foreach (var item in request.Roles)
                {
                    var role = _context.Roles.Find(item.Id);

                    if (role != null)
                    {
                        roleNames.Add(role.Name);

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
                user.Phone_Number = request.Phone_Number;
                user.UserInRoles = userInRoles;
                user.UpdateTime = DateTime.Now;

                _context.Users.Update(user);
                _context.SaveChanges();

                if (_httpContextAccessor.HttpContext.User.Identity.IsAuthenticated &&
                    _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value == request.UserId.ToString())
                {
                    httpContext.SignOutAsync();

                    var claims = new List<Claim>()
                    {
                        new Claim(ClaimTypes.NameIdentifier, request.UserId.ToString()),
                        new Claim(ClaimTypes.Email, request.Email),
                        new Claim(ClaimTypes.Name, request.FullName),
                        new Claim(ClaimTypes.Role, string.Join(",", roleNames))
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
            catch (DbUpdateException ex) when (ex.InnerException is SqlException sqlEx && sqlEx.Number == 2601)
            {
                return new ResultDto()
                {
                    IsSuccess = false,
                    Message = "آدرس پست الکترونیک یا شماره تلفن در پایگاه داده وجود دارد"
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
