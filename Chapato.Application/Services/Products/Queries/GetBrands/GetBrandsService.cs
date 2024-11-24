using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;

namespace Chapato.Application.Services.Products.Queries.GetBrands
{
    public class GetBrandsService : IGetBrandsService
    {
        private readonly IDataBaseContext _context;
        public GetBrandsService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto<List<BrandsDto>> Execute()
        {
            var brands = _context.Brands.ToList();

            List<BrandsDto> brandsDtos = new List<BrandsDto>();

            foreach (var item in brands)
            {
                var brand = _context.Brands.Find(item.Id);

                if (brand == null)
                {
                    return new ResultDto<List<BrandsDto>>
                    {
                        Data = new List<BrandsDto>(),
                        IsSuccess = false,
                        Message = "این برند در دیتابیس وجود ندارد"
                    };
                }

                brandsDtos.Add(new BrandsDto
                {
                    Id = item.Id,
                    Name = item.Name
                });
            }

            return new ResultDto<List<BrandsDto>>
            {
                Data = brandsDtos,
                IsSuccess = true,
                Message = ""
            };
        }
    }
}
