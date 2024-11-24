using Chapato.Application.Interfaces.Contexts;
using Microsoft.AspNetCore.Http;
using Chapato.Application.Interfaces.FacadPatterns;
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

namespace Chapato.Application.Services.Users.FacadPattern
{
    public class UserFacad : IUserFacad
    {
        private readonly IDataBaseContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IRegisterUserService _registeruserService;
        public UserFacad(IDataBaseContext context, IHttpContextAccessor httpContextAccessor, IRegisterUserService registeruserService)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _registeruserService = registeruserService;
        }

        private EditUserService _editUserService;
        public EditUserService EditUserService
        {
            get
            {
                return _editUserService ??= new EditUserService(_context, _httpContextAccessor);
            }
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////

        private RegisterUserService _registerUserService;
        public RegisterUserService RegisterUserService
        {
            get
            {
                return _registerUserService??=new RegisterUserService(_context);
            }
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////

        private RemoveUserService _removeUserService;
        public RemoveUserService RemoveUserService
        {
            get
            {
                return _removeUserService ??= new RemoveUserService(_context);
            }
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////

        private UserChangeStatusService _userChangeStatusService;
        public UserChangeStatusService UserChangeStatusService
        {
            get
            {
                return _userChangeStatusService??= new UserChangeStatusService(_context);
            }
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////

        private UserLoginService _userLoginService;
        public UserLoginService UserLoginService
        {
            get
            {
                return _userLoginService ??= new UserLoginService(_context);
            }
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////
        
        private UserSignupService _userSignupService;
        public UserSignupService UserSignupService
        {
            get
            {
                return _userSignupService ??=new UserSignupService(_context,_registeruserService,_httpContextAccessor);
            }
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////

        private IGetEditUserInfoService _getEditUserInfoService;
        public IGetEditUserInfoService GetEditUserInfoService
        {
            get
            {
                return _getEditUserInfoService ??= new GetEditUserInfoService(_context);
            }
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////

        private IGetRolesService _getRolesService;
        public IGetRolesService GetRolesService
        {
            get
            {
                return _getRolesService ??= new GetRolesService(_context);
            }
        }

        ///////////////////////////////////////////////////////////////////////////////////////////////////////

        private IGetUsersService _getUsersService;
        public IGetUsersService GetUsersService
        {
            get
            {
                return _getUsersService ??= new GetUsersService(_context);
            }
        }
    }
}
