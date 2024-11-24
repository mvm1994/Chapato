using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Dto;
using Chapato.Domain.Entities.Products;

namespace Chapato.Application.Services.Products.Commands.EditFeatureItem
{
    public class EditFeatureItemService : IEditFeatureItemService
    {
        private readonly IDataBaseContext _context;
        public EditFeatureItemService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto Execute(RequestEditFeatureItemDto request)
        {
            var featureitems_ToUpdate = new List<ProductFeatureItems>();

            foreach (var item in request.FeatureItems_ToUPdate)
            {
                var featureitem = _context.ProductFeatureItems.Find(item.Id);

                if (featureitem == null)
                {
                    return new ResultDto
                    {
                        IsSuccess = false,
                        Message = ""
                    };
                }

                featureitem.ProductFeatureId = item.FeatureId;
                featureitem.Name = item.Name;
                featureitem.UpdateTime = DateTime.Now;

                featureitems_ToUpdate.Add(featureitem);
            }

            _context.ProductFeatureItems.UpdateRange(featureitems_ToUpdate);
            _context.SaveChanges();

            return new ResultDto
            {
                IsSuccess = true,
                Message = ""
            };
        }
    }
}
