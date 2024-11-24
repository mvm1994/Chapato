using Chapato.Domain.Entities.Commons;
using Chapato.Domain.Entities.Products;
using System.Collections.Generic;

namespace Chapato.Domain.Entities.Products
{
    public class Product : BaseEntity
    {
        // 1st_Tab
        public virtual Brand Brand { get; set; }
        public long BrandId { get; set; }
        public bool Displayed { get; set; }
        public string Name { get; set; }
        public string UniqueCode { get; set; }
        public int Price { get; set; }
        public int Inventory { get; set; }
        public string DeliveryDescription { get; set; }
        public string Description { get; set; }
        public string VideoLink { get; set; } = string.Empty;
        public string Existence { get; set; }
        public virtual ICollection<ProductPreviewDescription> PreviewDescriptions { get; set; }
        public virtual ProductDeliveryPeriod ProductDeliveryPeriod { get; set; }

        // 2nd_Tab
        public string PageTitle { get; set; }
        public string PageUrl { get; set; }
        public string MetaKeywords { get; set; }
        public string MetaDescription { get; set; }

        // 3rd_Tab
        public virtual ICollection<ProductCategory> ProductCategories { get; set; }

        // 4th_Tab
        public virtual ICollection<ProductImages> ProductImages { get; set; }

        // 5th_Tab
        public virtual ICollection<ProductDocuments> ProductDocuments { get; set; }

        // 6th_Tab
        public virtual ICollection<ProductColorOption> ProductColorOptions { get; set; }
        public virtual ICollection<ProductQualityPoints> ProductQualityPoints { get; set; }

        public List<string> ProductUserOptions { get; set; } = new List<string>();
        public List<string> ProductUserOptions_Parents { get; set; } = new List<string>();
        public List<string> ProductUserOptions_ToolTips { get; set; } = new List<string>();
        public List<string> ProductUserOptions_Titles { get; set; } = new List<string>();
        public List<string> ProductUserOptions_Items { get; set; } = new List<string>();
        public List<string> ProductUserOptions_Images { get; set; } = new List<string>();
        public List<string> RelatedProduct { get; set; } = new List<string>();
        public List<string> ProductFeatureItems { get; set; } = new List<string>();

        public virtual ProductPriceList ProductPriceList { get; set; }

        // 7th_Tab
        public int VisitCount { get; set; } = 0;
        public int SellCount { get; set; } = 0;
        public int LikeCount { get; set; } = 0;
        public int DisLikeCount { get; set; } = 0;
        public int StarCount { get; set; } = 0;
        public bool SpecialSale { get; set; } = false;
        public int SpecialSale_Discount { get; set; } = 0;
        public bool AmazingSale { get; set; } = false;
        public int AmazingSale_Discount { get; set; } = 0;
        public int Price_With_DisCount { get; set; }
    }
}
