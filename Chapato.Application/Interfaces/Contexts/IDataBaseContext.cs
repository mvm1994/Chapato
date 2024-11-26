using Microsoft.EntityFrameworkCore;
using Chapato.Domain.Entities.Products;
using Chapato.Domain.Entities.Uploads;
using Chapato.Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Chapato.Domain.Entities.Customers_Club;

namespace Chapato.Application.Interfaces.Contexts
{
    public interface IDataBaseContext
    {
        /////////////////////////////////////////////////////////////////////////User

        DbSet<User> Users { get; set; }
        DbSet<Role> Roles { get; set; }
        DbSet<UserInRole> UserInRoles { get; set; }

        /////////////////////////////////////////////////////////////////////////Products

        DbSet<Brand> Brands { get; set; }
        DbSet<Category> Categories { get; set; }
        DbSet<Product> Products { get; set; }
        DbSet<ProductCategory> ProductCategories { get; set; }
        DbSet<ProductImages> ProductImages { get; set; }
        DbSet<ProductDocuments> ProductDocuments { get; set; }
        DbSet<ColorRepository> Colors { get; set; }
        DbSet<ProductColorOption> ProductColorOptions { get; set; }
        DbSet<ProductFeatures> ProductFeatures { get; set; }
        DbSet<ProductFeatureItems> ProductFeatureItems { get; set; }
        DbSet<ProductPreviewDescription> PreviewDescriptions { get; set; }
        DbSet<ProductQualityPoints> ProductQualityPoints { get; set; }
        DbSet<ProductDeliveryPeriod> ProductDeliveryPeriods { get; set; }
        DbSet<ProductUserOptions> ProductUserOptions { get; set; }
        DbSet<ProductUserOptionParents> ProductUserOptionParents { get; set; }
        DbSet<ProductUserOptionImages> ProductUserOptionImages { get; set; }
        DbSet<ProductUserOptionItems> ProductUserOptionItems { get; set; }
        DbSet<ProductUserOptionToolTips> ProductUserOptionToolTips { get; set; }
        DbSet<ProductUserOptionTitles> ProductUserOptionTitles { get; set; }
        DbSet<OptionFileExtensions> OptionFileExtensions { get; set; }
        DbSet<ProductPriceList> ProductPriceList { get; set; }
        DbSet<ProductPriceListItems> ProductPriceListItems { get; set; }

        /////////////////////////////////////////////////////////////////////////Uploads
        DbSet<UploadedFile> UploadedFiles { get; set; }

        /////////////////////////////////////////////////////////////////////////Customers_Club
        DbSet<Customer> Customers { get; set; }
        DbSet<Order> Orders { get; set; }
        DbSet<CustomerInvoice> CustomerInvoices { get; set; }
        DbSet<ProductTemp> ProductTemps { get; set; }

        int SaveChanges(bool acceptAllChangesOnSuccess);
        int SaveChanges();
        Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = new CancellationToken());
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken());
    }
}
