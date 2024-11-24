using Chapato.Application.Interfaces.Contexts;
using Chapato.Application.Services.Products.Commands.AddNewBrand;
using Chapato.Common.Dto;
using Chapato.Domain.Entities.Products;

namespace Chapato.Application.Services.Products.Commands.AddNewBrand
{
    public class AddNewBrandService : IAddNewBrandService
    {
        private readonly IDataBaseContext _context;
        public AddNewBrandService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto<ResultAddNewBrandDto> Execute(RequestAddNewBrandDto request)
        {
            var brand = new Brand()
            {
                Name = request.Name,
            };

            _context.Brands.Add(brand);
            _context.SaveChanges();

            return new ResultDto<ResultAddNewBrandDto>
            {
                Data = new ResultAddNewBrandDto
                {
                    Id = brand.Id,
                    Name = brand.Name
                },
                IsSuccess = true,
                Message = "برند اضافه شد"
            };
        }
    }
}
