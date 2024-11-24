using Chapato.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Users.Commands.UserChangeStatus
{
    public interface IUserChangeStatusService
    {
        ResultDto Execute(long UserId);
    }
}
