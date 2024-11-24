namespace Chapato.Application.Services.Users.Commands.UserSignup
{
    public class RequestSingupUserDto
    {
        public string FullName { get; set; } = "";
        public string Email { get; set; }
        public string Password { get; set; }
        public string RePassword { get; set; }
    }
}
