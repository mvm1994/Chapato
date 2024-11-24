using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;

namespace Chapato.Application.Services.Products.Commands.DeleteFeatureItem
{
    public class DeleteFeatureItemService : IDeleteFeatureItemService
    {
        private readonly IDataBaseContext _context;
        public DeleteFeatureItemService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto Execute(long Id)
        {
            var feature_item = _context.ProductFeatureItems.Find(Id);

            if (feature_item == null)
            {
                return new ResultDto
                {
                    IsSuccess = true,
                    Message = "این ویژگی در دیتابیس موجود نیست"
                };
            }

            _context.ProductFeatureItems.Remove(feature_item);
            _context.SaveChanges();

            return new ResultDto
            {
                IsSuccess = true,
                Message = "ویژگی حذف شد"
            };
        }
    }
}
