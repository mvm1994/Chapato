using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Chapato.Application.Interfaces.FacadPatterns;
using Chapato.Application.Services.Users.Commands.EditUser;
using Chapato.Application.Services.Users.Commands.RegisterUser;
using Chapato.Application.Services.Users.Commands.RemoveUser;
using Chapato.Application.Services.Users.Commands.UserChangeStatus;
using Chapato.Application.Services.Users.Queries.GetEditUserInfo;
using Chapato.Application.Services.Users.Queries.GetRoles;
using Chapato.Application.Services.Users.Queries.GetUsers;
using Chapato.Common;

namespace EndPoint.Site.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class UsersController : Controller
    {
        private readonly IUserFacad _userFacad;
        private readonly ModeCookie _modeCookie;
        public UsersController(IUserFacad userFacad, ModeCookie modeCookie)
        {
            _userFacad = userFacad;
            _modeCookie = modeCookie;
        }
        public IActionResult Index(string searchkey, int page = 1, int PageSize = 10)
        {
            if (string.IsNullOrWhiteSpace(searchkey))
            {
                searchkey = "";
            }

            ViewBag.Mode = _modeCookie.GetCookieValue("ckmode");

            return View(_userFacad.GetUsersService.Execute(new RequestGetUserDto
            {
                Page = page,
                PageSize = PageSize,
                SearchKey = searchkey
            }));
        }

        [HttpGet]
        public IActionResult Create()
        {
            ViewBag.Mode = _modeCookie.GetCookieValue("ckmode");
            ViewBag.Roles = new SelectList(_userFacad.GetRolesService.Execute().Data, "Id", "Name");
            return View();

        }

        [HttpPost]
        public IActionResult Create(string Email, string FullName, string Phone_Number, List<RolesInRegisterUserDto> Roles, string Password, string RePassword)
        {
            var result = _userFacad.RegisterUserService.Execute(new RequestRegisterUserDto
            {
                Email = Email,
                FullName = FullName,
                Phone_Number= Phone_Number,
                Roles = Roles,
                Password = Password,
                RePassword = RePassword
            });

            return Json(result);
        }

        [HttpPost]
        public IActionResult Delete(long UserId)
        {
            return Json(_userFacad.RemoveUserService.Execute(UserId));
        }

        [HttpPost]
        public IActionResult UserChangeStatus(long UserId)
        {
            return Json(_userFacad.UserChangeStatusService.Execute(UserId));
        }

        public IActionResult Edit(long UserId)
        {
            ViewBag.Mode = _modeCookie.GetCookieValue("ckmode");

            var roles = new SelectList(_userFacad.GetRolesService.Execute().Data, "Id", "Name");

            var result = _userFacad.GetEditUserInfoService.Execute(new RequestGetUserInfoDto
            {
                UserId = UserId
            });
            var selectedRoleIds = result.Roles.Select(r => r.Id).ToList(); // Extract role IDs

            foreach (var item in roles)
            {
                if (selectedRoleIds.Contains(int.Parse(item.Value)))
                {
                    item.Selected = true;
                }
            }

            ViewBag.Roles = roles;

            return View(_userFacad.GetEditUserInfoService.Execute(new RequestGetUserInfoDto
            {
                UserId = UserId
            }));
        }

        [HttpPost]
        public IActionResult Edit(long UserId, string FullName,string Phone_Number, string Email, List<UserRolesDto> Roles)
        {
            var result = _userFacad.EditUserService.Execute(new RequestEditUserDto
            {
                Email = Email,
                FullName = FullName,
                Phone_Number = Phone_Number,
                Roles = Roles,
                UserId = UserId
            }, HttpContext);

            return Json(result);
        }
    }
}
