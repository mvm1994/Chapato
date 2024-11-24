using Chapato.Application.Interfaces.Contexts;
using Chapato.Application.Services.Products.Commands.AddNewCategory;
using Microsoft.IdentityModel.Tokens;
using Chapato.Common.Dto;
using Chapato.Domain.Entities.Products;

namespace Chapato.Application.Services.Products.Commands.AddNewCategory
{
    public class AddNewCategoryService : IAddNewCategoryService
    {
        private readonly IDataBaseContext _context;
        public AddNewCategoryService(IDataBaseContext context)
        {
            _context = context;
        }
        public ResultDto Execute(long? ParentId, string Name, string CategoryType)
        {
            if (CategoryType == "2")
            {
                if (string.IsNullOrEmpty(ParentId.ToString()))
                {
                    return new ResultDto
                    {
                        IsSuccess = false,
                        Message = "فیلد مربوط به دسته بندی های موجود نمی تواند خالی باشد!"
                    };
                }
            }

            if (string.IsNullOrEmpty(Name))
            {
                return new ResultDto
                {
                    IsSuccess = false,
                    Message = "نام دسته بندی را وارد نمایید"
                };
            }

            Category category = new Category
            {
                Name = Name,
                ParentCategory = GetParent(ParentId)
            };

            _context.Categories.Add(category);
            _context.SaveChanges();

            return new ResultDto
            {
                IsSuccess = true,
                Message = "دسته بندی با موفقیت اضافه شد"
            };
        }

        public Category GetParent(long? ParentId)
        {
            return _context.Categories.Find(ParentId);
        }
    }
}
