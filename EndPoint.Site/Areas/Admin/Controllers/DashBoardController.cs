using Microsoft.AspNetCore.Mvc;
using Chapato.Common;

namespace EndPoint.Site.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class DashBoardController : Controller
    {
        private readonly ModeCookie _modeCookie;
        public DashBoardController(ModeCookie modeCookie)
        {
           _modeCookie = modeCookie;
        }
        public IActionResult Index()
        {
            ViewBag.Mode = _modeCookie.GetCookieValue("ckmode");
            return View();
        }
    }
}
