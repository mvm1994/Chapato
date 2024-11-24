using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;

namespace Chapato.Application.Services.Products.Commands.DeleteBrand
{
    public class DeleteBrandService : IDeleteBrandService
    {
        private readonly IDataBaseContext _context;
        public DeleteBrandService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto Execute(RequestDeleteBrandDto request)
        {
            var brand = _context.Brands.Find(request.Id);

            if (brand == null)
            {
                return new ResultDto
                {
                    IsSuccess = false,
                    Message = "این برند در دیتابیس وجود ندارد"
                };
            }

            brand.IsRemoved = true;
            brand.RemoveTime = DateTime.Now;

            _context.Brands.Update(brand);
            _context.SaveChanges();

            return new ResultDto
            {
                IsSuccess = true,
                Message = "برند حذف شد"
            };
        }
    }
}
