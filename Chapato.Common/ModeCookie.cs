using Microsoft.AspNetCore.Http;

namespace Chapato.Common
{
    public class ModeCookie
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ModeCookie(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetCookieValue(string cookiename)
        {
            var cookievalue = _httpContextAccessor.HttpContext?.Request.Cookies[cookiename];
            return !string.IsNullOrEmpty(cookievalue) ? cookievalue : "light";
        }

    }
}

