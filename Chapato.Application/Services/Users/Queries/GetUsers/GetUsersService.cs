using Chapato.Application.Interfaces.Contexts;
using Chapato.Common;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Chapato.Application.Services.Users.Queries.GetUsers
{
    public class GetUsersService : IGetUsersService
    {
        private readonly IDataBaseContext _context;

        public GetUsersService(IDataBaseContext context)
        {
            _context = context;
        }

        public ResultGetUserDto Execute(RequestGetUserDto request)
        {
            var usersQuery = _context.Users
                .Include(u => u.UserInRoles)
                .ThenInclude(uir => uir.Role)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(request.SearchKey))
            {
                usersQuery = usersQuery.Where(u =>
                    u.FullName.Contains(request.SearchKey) ||
                    u.Email.Contains(request.SearchKey) ||
                    u.Phone_Number.Contains(request.SearchKey) ||
                    u.UserInRoles.Any(uir => uir.Role.Name.Contains(request.SearchKey)));
            }

            int rowsCount = usersQuery.Count();

            var pagedUsers = usersQuery
                .OrderByDescending(u => u.Id)
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();

            var userList = pagedUsers.Select(user => new GetUsersDto
            {
                Id = user.Id,
                FullName = user.FullName,
                PhoneNumber = user.Phone_Number,
                Email = user.Email,
                IsActive = user.IsActive,
                UserRoles = user.UserInRoles
                             .Select(uir => uir.Role.Name)
                             .ToList()
            }).ToList();

            return new ResultGetUserDto
            {
                Users = userList,
                Rows = rowsCount,
                CurrentPage = request.Page,
                PageSize = request.PageSize
            };
        }
    }
}