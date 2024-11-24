using Chapato.Application.Interfaces.Contexts;
using Chapato.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            var users = _context.Users.AsQueryable();
            int rowscount = 0;

            if (!string.IsNullOrWhiteSpace(request.SearchKey))
            {
                users = users.Where(p => p.FullName.Contains(request.SearchKey) || p.Email.Contains(request.SearchKey));
            }

            var userlist = users.ToPaged(request.Page, request.PageSize, out rowscount).Select(p => new GetUsersDto
            {
                Email = p.Email,
                FullName = p.FullName,
                Id = p.Id,
                IsActive = p.IsActive

            }).OrderByDescending(u => u.Id).ToList();

            return new ResultGetUserDto
            {
                Users = userlist,
                Rows = rowscount,
                CurrentPage = request.Page,
                PageSize = request.PageSize
            };
        }
    }
}
