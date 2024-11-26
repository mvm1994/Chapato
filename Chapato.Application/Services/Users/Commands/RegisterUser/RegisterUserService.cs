using Chapato.Application.Interfaces.Contexts;
using Chapato.Common;
using Chapato.Common.Dto;
using Chapato.Domain.Entities.Users;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Chapato.Application.Services.Users.Commands.RegisterUser
{
    public class RegisterUserService : IRegisterUserService
    {
        private readonly IDataBaseContext _context;

        public RegisterUserService(IDataBaseContext context)
        {
            _context = context;
        }

        public ResultDto<ResultRegisterUserDto> Execute(RequestRegisterUserDto request)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(request.FullName))
                {
                    return FailureResult("نام را وارد نمایید");
                }

                if (string.IsNullOrWhiteSpace(request.Email))
                {
                    return FailureResult("پست الکترونیک را وارد نمایید");
                }

                if (!IsValidEmail(request.Email))
                {
                    return FailureResult("پست الکترونیک را با فرمت صحیح وارد نمایید");
                }

                if (_context.Users.Any(u => u.Email == request.Email && u.IsActive == true && u.IsRemoved == false))
                {
                    return FailureResult("آدرس پست الکترونیک در پایگاه داده وجود دارد");
                }

                if (_context.Users.Any(u => u.Email == request.Email && u.IsActive == false))
                {
                    return FailureResult("آدرس پست الکترونیک مربوط به کاربر غیرفعال است که هنوز در پایگاه داده وجود دارد");
                }

                if (_context.Users.Any(u => u.Email == request.Email && u.IsRemoved == true))
                {
                    return FailureResult("آدرس پست الکترونیک مربوط به کاربر حذف شده است که هنوز در پایگاه داده وجود دارد");
                }

                if (_context.Users.Any(u => u.Phone_Number == request.Phone_Number && u.IsActive == true && u.IsRemoved == false))
                {
                    return FailureResult("شماره تلفن در پایگاه داده وجود دارد");
                }

                if (_context.Users.Any(u => u.Phone_Number == request.Phone_Number && u.IsActive == false))
                {
                    return FailureResult("شماره تلفن مربوط به کاربر غیرفعال است که هنوز در پایگاه داده وجود دارد");
                }

                if (_context.Users.Any(u => u.Phone_Number == request.Phone_Number && u.IsRemoved == true))
                {
                    return FailureResult("شماره تلفن مربوط به کاربر حذف شده است که هنوز در پایگاه داده وجود دارد");
                }

                if (string.IsNullOrWhiteSpace(request.Password))
                {
                    return FailureResult("رمز عبور را وارد نمایید");
                }

                if (request.Password != request.RePassword)
                {
                    return FailureResult("رمز عبور و تکرار آن یکسان نیست");
                }

                var passwordHasher = new PasswordHasher();
                var hashedPassword = passwordHasher.HashPassword(request.Password);

                var user = new User
                {
                    FullName = request.FullName,
                    Phone_Number = request.Phone_Number,
                    Email = request.Email,
                    Password = hashedPassword
                };

                var rolesResult = AssignRoles(request.Roles, user);
                if (!rolesResult.IsSuccess)
                {
                    return FailureResult(rolesResult.Message);
                }

                user.UserInRoles = rolesResult.Data;

                try
                {
                    _context.Users.Add(user);
                    _context.SaveChanges();
                }
                catch (DbUpdateException ex) when (ex.InnerException is SqlException sqlEx && sqlEx.Number == 2601)
                {
                    return FailureResult("آدرس پست الکترونیک یا شماره تلفن در پایگاه داده وجود دارد");
                }

                return new ResultDto<ResultRegisterUserDto>
                {
                    Data = new ResultRegisterUserDto { UserId = user.Id },
                    IsSuccess = true,
                    Message = "ثبت نام کاربر انجام شد"
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return FailureResult("ثبت نام انجام نشد");
            }
        }

        private ResultDto<List<UserInRole>> AssignRoles(List<RolesInRegisterUserDto> roles, User user)
        {
            if (roles == null || roles.Count == 0)
            {
                return new ResultDto<List<UserInRole>>
                {
                    Data = null,
                    IsSuccess = false,
                    Message = "نقش کاربر را انتخاب کنید"
                };
            }

            var userInRoles = new List<UserInRole>();
            foreach (var roleDto in roles)
            {
                var role = _context.Roles.Find(roleDto.Id);
                if (role == null)
                {
                    return new ResultDto<List<UserInRole>>
                    {
                        Data = null,
                        IsSuccess = false,
                        Message = "نقش کاربر را انتخاب کنید"
                    };
                }

                userInRoles.Add(new UserInRole
                {
                    User = user,
                    Role = role,
                    RoleId = role.Id,
                    UserId = user.Id
                });
            }

            return new ResultDto<List<UserInRole>>
            {
                Data = userInRoles,
                IsSuccess = true,
                Message = "نقش‌ها تخصیص داده شدند"
            };
        }

        private static bool IsValidEmail(string email)
        {
            const string emailRegex = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
            return Regex.IsMatch(email, emailRegex, RegexOptions.IgnoreCase);
        }

        private static ResultDto<ResultRegisterUserDto> FailureResult(string message)
        {
            return new ResultDto<ResultRegisterUserDto>
            {
                Data = new ResultRegisterUserDto { UserId = 0 },
                IsSuccess = false,
                Message = message
            };
        }
    }
}
