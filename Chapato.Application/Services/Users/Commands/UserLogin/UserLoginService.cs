using Chapato.Application.Interfaces.Contexts;
using Microsoft.EntityFrameworkCore;
using Chapato.Common;
using Chapato.Common.Dto;

namespace Chapato.Application.Services.Users.Commands.UserLogin
{
    public class UserLoginService : IUserLoginService
    {
        private readonly IDataBaseContext _context;
        public UserLoginService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto<ResultUserLoginDto> Execute(string Username, string Password)
        {

            if (string.IsNullOrWhiteSpace(Username))
            {
                return new ResultDto<ResultUserLoginDto>()
                {
                    Data = new ResultUserLoginDto()
                    {

                    },
                    IsSuccess = false,
                    Message = "نام کاربری را وارد نمایید",
                };
            }

            if (string.IsNullOrWhiteSpace(Password))
            {
                return new ResultDto<ResultUserLoginDto>()
                {
                    Data = new ResultUserLoginDto()
                    {

                    },
                    IsSuccess = false,
                    Message = "رمز عبور را وارد نمایید",
                };
            }

            var user = _context.Users.Include(p => p.UserInRoles).ThenInclude(p => p.Role)
                       .Where(p => p.Email.Equals(Username) && p.IsActive == true).FirstOrDefault();

            if (user == null)
            {
                return new ResultDto<ResultUserLoginDto>()
                {
                    Data = new ResultUserLoginDto()
                    {

                    },
                    IsSuccess = false,
                    Message = "کاربری با این ایمیل ثبت نام نکرده است",
                };
            }

            var passwordHasher = new PasswordHasher();
            bool resultVerifyPassword = passwordHasher.VerifyPassword(user.Password, Password);

            if (resultVerifyPassword == false)
            {
                return new ResultDto<ResultUserLoginDto>()
                {
                    Data = new ResultUserLoginDto()
                    {

                    },
                    IsSuccess = false,
                    Message = "رمز عبور وارد شده اشتباه است!",
                };
            }


            var roles = "";
            foreach (var item in user.UserInRoles)
            {
                roles += $"{item.Role.Name}";
            }


            return new ResultDto<ResultUserLoginDto>()
            {
                Data = new ResultUserLoginDto()
                {
                    Roles = roles,
                    UserId = user.Id,
                    Name = user.FullName
                },
                IsSuccess = true,
                Message = "ورود به سایت با موفقیت انجام شد",
            };
        }
    }
}
