using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;

namespace Chapato.Application.Services.Products.Queries.GetBrandsForSite
{
    public class GetBrandsForSiteService : IGetBrandsForSiteService
    {
        private readonly IDataBaseContext _context;
        public GetBrandsForSiteService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto<List<BrandsForSiteDto>> Execute()
        {
            var brands = _context.Brands.ToList();

            if (brands == null)
            {
                return new ResultDto<List<BrandsForSiteDto>>
                {
                    IsSuccess = false,
                    Message = "هیچ برندی در دیتابیس موجود نیست"
                };
            }

            var brandlist = new List<BrandsForSiteDto>();

            foreach (var item in brands)
            {
                brandlist.Add(new BrandsForSiteDto
                {
                    Id = item.Id,
                    Name = item.Name
                });
            }

            return new ResultDto<List<BrandsForSiteDto>>
            {
                Data = brandlist,
                IsSuccess = true,
                Message = ""
            };
        }
    }
}
