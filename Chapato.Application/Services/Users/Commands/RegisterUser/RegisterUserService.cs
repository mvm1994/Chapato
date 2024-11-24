using Chapato.Application.Interfaces.Contexts;
using Chapato.Common;
using Chapato.Common.Dto;
using Chapato.Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

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
                    return new ResultDto<ResultRegisterUserDto>()
                    {
                        Data = new ResultRegisterUserDto()
                        {
                            UserId = 0
                        },
                        IsSuccess = false,
                        Message = "نام را وارد نمایید"
                    };
                }

                if (string.IsNullOrWhiteSpace(request.Email))
                {
                    return new ResultDto<ResultRegisterUserDto>()
                    {
                        Data = new ResultRegisterUserDto()
                        {
                            UserId = 0
                        },
                        IsSuccess = false,
                        Message = "پست الکترونیک را وارد نمایید"
                    };
                }

                var EmailCheck = _context.Users.Where(u => u.Email == request.Email && u.IsActive == true).ToList();

                if (EmailCheck.Count > 0)
                {
                    return new ResultDto<ResultRegisterUserDto>()
                    {
                        Data = new ResultRegisterUserDto()
                        {
                            UserId = 0
                        },
                        IsSuccess = false,
                        Message = "آدرس پست الکترونیک در پایگاه داده وجود دارد"
                    };
                }


                if (string.IsNullOrWhiteSpace(request.Password))
                {
                    return new ResultDto<ResultRegisterUserDto>()
                    {
                        Data = new ResultRegisterUserDto()
                        {
                            UserId = 0
                        },
                        IsSuccess = false,
                        Message = "رمز عبور را وارد نمایید"
                    };
                }

                if (request.Password != request.RePassword)
                {
                    return new ResultDto<ResultRegisterUserDto>()
                    {
                        Data = new ResultRegisterUserDto()
                        {
                            UserId = 0
                        },
                        IsSuccess = false,
                        Message = "رمز عبور و تکرار آن یکسان نیست"
                    };
                }

                string EmailRegex = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
                var match = Regex.Match(request.Email, EmailRegex, RegexOptions.IgnoreCase);

                if (!match.Success)
                {
                    return new ResultDto<ResultRegisterUserDto>()
                    {
                        Data = new ResultRegisterUserDto()
                        {
                            UserId = 0
                        },
                        IsSuccess = false,
                        Message = "پست الکترونیک را با فرمت صحیح وارد نمایید"
                    };
                }

                var passwordHasher = new PasswordHasher();
                var hashedPassword = passwordHasher.HashPassword(request.Password);

                User user = new User()
                {
                    FullName = request.FullName,
                    Email = request.Email,
                    Password = hashedPassword
                };

                List<UserInRole> userInRoles = new List<UserInRole>();

                foreach (var item in request.Roles)
                {
                    var role = _context.Roles.Find(item.Id);

                    if (role != null)
                    {
                        userInRoles.Add(new UserInRole()
                        {
                            User = user,
                            UserId = user.Id,
                            Role = role,
                            RoleId = role.Id
                        });
                    }
                }

                user.UserInRoles = userInRoles;

                _context.Users.Add(user);
                _context.SaveChanges();

                return new ResultDto<ResultRegisterUserDto>()
                {
                    Data = new ResultRegisterUserDto()
                    {
                        UserId = user.Id
                    },
                    IsSuccess = true,
                    Message = "ثبت نام کاربر انجام شد"
                };
            }
            catch (Exception)
            {
                return new ResultDto<ResultRegisterUserDto>()
                {
                    Data = new ResultRegisterUserDto()
                    {
                        UserId = 0
                    },
                    IsSuccess = false,
                    Message = "ثبت نام انجام نشد"
                };
            }
        }
    }
}
