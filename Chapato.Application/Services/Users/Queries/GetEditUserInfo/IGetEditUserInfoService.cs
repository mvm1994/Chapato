using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Users.Queries.GetEditUserInfo
{
    public interface IGetEditUserInfoService
    {
        ResultGetUserInfoDto Execute(RequestGetUserInfoDto request);
    }
}
