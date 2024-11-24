using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;

namespace Chapato.Application.Services.Products.Commands.EditBrand
{
    public class EditBrandService : IEditBrandService
    {
        private readonly IDataBaseContext _context;
        public EditBrandService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto Execute(RequestEditBrandDto request)
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

            brand.Name = request.Name;
            brand.UpdateTime = DateTime.Now;

            _context.Brands.Update(brand);
            _context.SaveChanges();

            return new ResultDto
            {
                IsSuccess = true,
                Message = "برند بروزرسانی شد"
            };
        }
    }
}
