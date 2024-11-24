using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Chapato.Application.Services.Users.Commands.RegisterUser;
using Chapato.Common;
using Chapato.Common.Dto;
using System.Security.Claims;
using Chapato.Application.Interfaces.Contexts;

namespace Chapato.Application.Services.Users.Commands.UserSignup
{
    public class UserSignupService : IUserSignupService
    {
        private readonly IDataBaseContext _context;
        private readonly IRegisterUserService _registerUserService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserSignupService(IDataBaseContext context, IRegisterUserService registerUserService, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _registerUserService = registerUserService;
            _httpContextAccessor = httpContextAccessor;
        }

        public ResultDto<ResultRegisterUserDto> Execute(RequestSingupUserDto request, HttpContext httpContext)
        {
            var passwordHasher = new PasswordHasher();
            var hashedPassword = passwordHasher.HashPassword(request.Password);

            var SignupResult = _registerUserService.Execute(new RequestRegisterUserDto
            {
                Email = request.Email,
                FullName = request.FullName,
                Password = hashedPassword,
                RePassword = hashedPassword,
                Roles = new List<RolesInRegisterUserDto>
                {
                    new RolesInRegisterUserDto
                    {
                        Id=3
                    }
                }
            });

            if (SignupResult.IsSuccess)
            {
                var claims = new List<Claim>()
                {
                    new Claim(ClaimTypes.NameIdentifier,SignupResult.Data.UserId.ToString()),
                    new Claim(ClaimTypes.Email,request.Email),
                    new Claim(ClaimTypes.Name,request.FullName),
                    new Claim(ClaimTypes.Role,"مشتری")
                };

                var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                var principal = new ClaimsPrincipal(identity);
                var properties = new AuthenticationProperties()
                {
                    IsPersistent = true,
                };

                httpContext.SignInAsync(principal, properties);
            }

            return SignupResult;
        }
    }
}
