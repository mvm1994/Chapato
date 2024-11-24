using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Users.Queries.GetUsers
{
    public interface IGetUsersService
    {
        ResultGetUserDto Execute(RequestGetUserDto request);
    }
}
