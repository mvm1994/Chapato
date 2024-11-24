using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Chapato.Application.Services.Users.Commands.RegisterUser;
using Chapato.Common.Dto;
using Chapato.Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Users.Commands.UserSignup
{
    public interface IUserSignupService
    {
        ResultDto<ResultRegisterUserDto> Execute(RequestSingupUserDto request, HttpContext httpContext);
    }
}
