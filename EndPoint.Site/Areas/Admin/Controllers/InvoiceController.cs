using Chapato.Application.Interfaces.FacadPatterns;
using Chapato.Common;
using Microsoft.AspNetCore.Mvc;

namespace EndPoint.Site.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class InvoiceController : Controller
    {
        //private readonly IProductFacad _productFacad;
        private readonly ModeCookie _modeCookie;
        public InvoiceController(ModeCookie modeCookie)
        {
            _modeCookie = modeCookie;
        }
        public IActionResult Index()
        {
            ViewBag.Mode = _modeCookie.GetCookieValue("ckmode");
            return View();
        }

        
        public IActionResult InvoicePreview()
        {
            ViewBag.Mode = _modeCookie.GetCookieValue("ckmode");
            return View();
        }

        public IActionResult InvoicePrint()
        {
            ViewBag.Mode = _modeCookie.GetCookieValue("ckmode");
            return View();
        }
    }
}
