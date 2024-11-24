using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;

namespace Chapato.Application.Services.Products.Commands.Update_ProductDisplayMode
{
    public class Update_ProductDisplayMode_Service : IUpdate_ProductDisplayMode_Service
    {
        private readonly IDataBaseContext _context;
        public Update_ProductDisplayMode_Service(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto Execute(Request_Update_ProductDisplayMode_Dto request)
        {
            var product = _context.Products.Find(request.Id);

            if (product == null)
            {
                return new ResultDto
                {
                    IsSuccess = false,
                    Message = "محصول یافت نشد"
                };
            }
            else
            {
                product.Displayed = request.Displayed;
                product.UpdateTime = DateTime.Now;

                _context.Products.Update(product);
                _context.SaveChanges();

                return new ResultDto
                {
                    IsSuccess = true,
                    Message = "تغییر وضعیت نمایش اعمال شد"
                };
            }
        }
    }
}
