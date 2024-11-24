using Chapato.Domain.Entities.Products;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Collections.Generic;
using Chapato.Application.Interfaces.Contexts;

namespace Chapato.Application.Services.Products.Queries.GetChartCategories
{
    public class GetChartCategoriesService : IGetChartCategoriesService
    {
        private readonly IDataBaseContext _context;
        private readonly string _absoluteJsonFilePath = "wwwroot/AdminTemplate/assets/json/jstree-data.json";

        public GetChartCategoriesService(IDataBaseContext context)
        {
            _context = context;
        }

        public void Execute()
        {
            List<Category> categories = _context.Categories.ToList();

            foreach (var category in categories)
            {
                if (category.ParentCategoryId == null)
                {
                    category.ParentCategoryId = 0;
                }
            }

            var categoryDict = categories.ToDictionary(c => c.Id, c => c);

            var formattedData = new List<object>();

            var processedIds = new HashSet<long>();

            void AddCategoryWithChildren(Category category, List<object> parentList, int depth = 0)
            {
                if (processedIds.Contains(category.Id)) return;

                string type = depth switch
                {
                    1 => "subcategory",
                    2 => "subcategory_lv2",
                    3 => "subcategory_lv3",
                    _ => "default"
                };

                var formattedCategory = new
                {
                    id = category.Id,
                    text = category.Name,
                    a_attr = new { data_id = category.Id, data_parent_id = category.ParentCategoryId },
                    children = new List<object>(),
                    type
                };

                processedIds.Add(category.Id);

                var childCategories = categories.Where(c => c.ParentCategoryId == category.Id).ToList();

                foreach (var childCategory in childCategories)
                {
                    AddCategoryWithChildren(childCategory, formattedCategory.children, depth + 1);
                }

                parentList.Add(formattedCategory);
            }

            foreach (var category in categories)
            {
                if (category.ParentCategoryId == 0)
                {
                    AddCategoryWithChildren(category, formattedData);
                }
            }

            var options = new JsonSerializerOptions
            {
                Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
                WriteIndented = true
            };

            var json = JsonSerializer.Serialize(formattedData, options);
            File.WriteAllText(_absoluteJsonFilePath, json);
        }
    }
}
