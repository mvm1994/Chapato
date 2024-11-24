using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;

namespace Chapato.Application.Services.Users.Commands.UserChangeStatus
{
    public class UserChangeStatusService : IUserChangeStatusService
    {
        private readonly IDataBaseContext _context;

        public UserChangeStatusService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto Execute(long UserId)
        {
            var user = _context.Users.Find(UserId);

            if (user == null)
            {
                return new ResultDto
                {
                    IsSuccess = false,
                    Message = "کاربر یافت نشد"
                };
            }

            user.IsActive = !user.IsActive;
            _context.SaveChanges();

            string UserState = user.IsActive == true ? "فعال" : "غیرفعال";

            return new ResultDto
            {
                IsSuccess = true,
                Message = $"کاربر {UserState} شد"
            };
        }
    }
}
