using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;

namespace Chapato.Application.Services.Products.Commands.RemoveProduct
{
    public class RemoveProductService : IRemoveProductService
    {
        private readonly IDataBaseContext _context;
        public RemoveProductService(IDataBaseContext context)
        {
            _context = context;
        }

        public ResultDto Execute(RequestRemoveProductDto request)
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
                product.IsRemoved = true;
                product.RemoveTime= DateTime.Now;

                _context.Products.Update(product);
                _context.SaveChanges();

                return new ResultDto
                {
                    IsSuccess = true,
                    Message = "محصول حذف شد"
                };
            }
        }
    }
}
