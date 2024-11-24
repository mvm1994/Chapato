using Chapato.Application.Services.Users.Commands.EditUser;
using Chapato.Application.Services.Users.Commands.RegisterUser;
using Chapato.Application.Services.Users.Commands.RemoveUser;
using Chapato.Application.Services.Users.Commands.UserChangeStatus;
using Chapato.Application.Services.Users.Commands.UserLogin;
using Chapato.Application.Services.Users.Commands.UserSignup;
using Chapato.Application.Services.Users.Queries.GetEditUserInfo;
using Chapato.Application.Services.Users.Queries.GetRoles;
using Chapato.Application.Services.Users.Queries.GetUsers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Interfaces.FacadPatterns
{
    public interface IUserFacad
    {
        //commands
        EditUserService EditUserService { get; }
        RegisterUserService RegisterUserService { get; }
        RemoveUserService RemoveUserService { get; }
        UserChangeStatusService UserChangeStatusService { get; }
        UserLoginService UserLoginService { get; }
        UserSignupService UserSignupService { get; }

        //queries
        IGetEditUserInfoService GetEditUserInfoService { get; }
        IGetRolesService GetRolesService { get; }
        IGetUsersService GetUsersService { get; }
    }
}
