using Chapato.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Users.Commands.RemoveUser
{
    public interface IRemoveUserService
    {
        ResultDto Execute(long UserId);
    }
}
