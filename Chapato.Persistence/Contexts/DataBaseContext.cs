using Microsoft.EntityFrameworkCore;
using Chapato.Application.Interfaces.Contexts;
using Chapato.Common.Roles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Chapato.Domain.Entities.Users;
using Chapato.Domain.Entities.Products;
using Chapato.Domain.Entities.Uploads;
using Microsoft.Extensions.Logging;
using Chapato.Domain.Entities.Customers_Club;

namespace Chapato.Persistence.Contexts
{
    public class DataBaseContext : DbContext, IDataBaseContext
    {
        public DataBaseContext(DbContextOptions options) : base(options)
        {

        }

        /////////////////////////////////////////////////////////////////////////User

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserInRole> UserInRoles { get; set; }

        /////////////////////////////////////////////////////////////////////////Products

        public DbSet<Brand> Brands { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<ProductImages> ProductImages { get; set; }
        public DbSet<ProductDocuments> ProductDocuments { get; set; }
        public DbSet<ColorRepository> Colors { get; set; }
        public DbSet<ProductColorOption> ProductColorOptions { get; set; }
        public DbSet<ProductFeatures> ProductFeatures { get; set; }
        public DbSet<ProductFeatureItems> ProductFeatureItems { get; set; }
        public DbSet<ProductPreviewDescription> PreviewDescriptions { get; set; }
        public DbSet<ProductQualityPoints> ProductQualityPoints { get; set; }
        public DbSet<ProductDeliveryPeriod> ProductDeliveryPeriods { get; set; }
        public DbSet<ProductUserOptions> ProductUserOptions { get; set; }
        public DbSet<ProductUserOptionParents> ProductUserOptionParents { get; set; }
        public DbSet<ProductUserOptionImages> ProductUserOptionImages { get; set; }
        public DbSet<ProductUserOptionItems> ProductUserOptionItems { get; set; }
        public DbSet<ProductUserOptionToolTips> ProductUserOptionToolTips { get; set; }
        public DbSet<ProductUserOptionTitles> ProductUserOptionTitles { get; set; }
        public DbSet<OptionFileExtensions> OptionFileExtensions { get; set; }
        public DbSet<ProductPriceList> ProductPriceList { get; set; }
        public DbSet<ProductPriceListItems> ProductPriceListItems { get; set; }

        /////////////////////////////////////////////////////////////////////////Uploads
        public DbSet<UploadedFile> UploadedFiles { get; set; }

        /////////////////////////////////////////////////////////////////////////Customers_Club

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<CustomerInvoice> CustomerInvoices { get; set; }
        public DbSet<ProductTemp> ProductTemps { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            SeedData(modelBuilder);
            //عدم تکراری بودن ایمیل
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
            modelBuilder.Entity<Customer>().HasIndex(u => u.Email).IsUnique();
            //عدم تکراری بودن شماره تلفن
            modelBuilder.Entity<User>().HasIndex(u => u.Phone_Number).IsUnique();
            modelBuilder.Entity<Customer>().HasIndex(u => u.PhoneNumber).IsUnique();

            ApplyQueryFilter(modelBuilder);

            //////////////////////////////////////////////////////////////////////////////////////////////////

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>()
               .HasKey(p => p.Id);

            //product_feature
            modelBuilder.Entity<ProductFeatures>()
                .HasOne(pf => pf.Category)
                .WithMany(c => c.ProductFeatures)
                .HasForeignKey(pf => pf.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            //product_featureitem
            modelBuilder.Entity<ProductFeatureItems>()
                .HasOne(pfi => pfi.ProductFeature)
                .WithMany(pf => pf.ProductFeatureItems)
                .HasForeignKey(pfi => pfi.ProductFeatureId)
                .OnDelete(DeleteBehavior.Restrict);

            //parent_category
            modelBuilder.Entity<Category>()
                .HasOne(c => c.ParentCategory)
                .WithMany()
                .HasForeignKey(c => c.ParentCategoryId)
                .OnDelete(DeleteBehavior.Restrict);


            //product_and_category_manytomany
            modelBuilder.Entity<ProductCategory>()
                .HasKey(pc => pc.Id);

            modelBuilder.Entity<ProductCategory>()
                .HasOne(pc => pc.Product)
                .WithMany(p => p.ProductCategories)
                .HasForeignKey(pc => pc.ProductId);

            modelBuilder.Entity<ProductCategory>()
                .HasOne(pc => pc.Category)
                .WithMany(c => c.ProductCategories)
                .HasForeignKey(pc => pc.CategoryId);

            //ProductUserOptions
            modelBuilder.Entity<ProductUserOptions>()
               .HasOne(pf => pf.Category)
               .WithMany(c => c.ProductUserOptions)
               .HasForeignKey(pf => pf.CategoryId)
               .OnDelete(DeleteBehavior.Restrict);

            //UserOptionParents
            modelBuilder.Entity<ProductUserOptionParents>()
              .HasOne(pf => pf.Option)
              .WithMany(c => c.Parents)
              .HasForeignKey(pf => pf.OptionId)
              .OnDelete(DeleteBehavior.Restrict);

            //UserOptionImages
            modelBuilder.Entity<ProductUserOptionImages>()
               .HasOne(pf => pf.Option)
               .WithMany(c => c.Images)
               .HasForeignKey(pf => pf.OptionId)
               .OnDelete(DeleteBehavior.Restrict);

            //UserOptionItems
            modelBuilder.Entity<ProductUserOptionItems>()
               .HasOne(pf => pf.Option)
               .WithMany(c => c.Items)
               .HasForeignKey(pf => pf.OptionId)
               .OnDelete(DeleteBehavior.Restrict);

            //UserOptionToolTips
            modelBuilder.Entity<ProductUserOptionToolTips>()
               .HasOne(pf => pf.Option)
               .WithMany(c => c.ToolTips)
               .HasForeignKey(pf => pf.OptionId)
               .OnDelete(DeleteBehavior.Restrict);

            //UserOptionTitles
            modelBuilder.Entity<ProductUserOptionTitles>()
               .HasOne(pf => pf.Option)
               .WithMany(c => c.Titles)
               .HasForeignKey(pf => pf.OptionId)
               .OnDelete(DeleteBehavior.Restrict);

            //ProductPriceListItems
            modelBuilder.Entity<ProductPriceListItems>()
               .HasOne(pf => pf.ProductPriceList)
               .WithMany(c => c.Items)
               .HasForeignKey(pf => pf.ProductPriceListId)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Product>()
                .Property(p => p.ProductUserOptions)
                .HasConversion(
                    v => v != null ? JsonConvert.SerializeObject(v) : "[]",
                    v => JsonConvert.DeserializeObject<List<string>>(v) ?? new List<string>());

            //////////////////////////////////////////////////////////////////////////////////////////////////Customers_Club

            modelBuilder.Entity<Order>()
           .HasOne(o => o.Customer)
           .WithMany(c => c.Orders)
           .HasForeignKey(o => o.CustomerId)
           .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.Invoice)
                .WithOne(i => i.Order)
                .HasForeignKey<CustomerInvoice>(ci => ci.OrderId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Order>()
                .HasMany(o => o.Products)
                .WithMany(p => p.Orders)
                .UsingEntity(j => j.ToTable("OrderProducts"));

        }
        private void SeedData(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasData(new Role { Id = 1, Name = UserRoles.Admin });
            modelBuilder.Entity<Role>().HasData(new Role { Id = 2, Name = UserRoles.Operator });
        }
        private void ApplyQueryFilter(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<Role>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<UserInRole>().HasQueryFilter(p => !p.IsRemoved);

            ///////////////////////////////////////////////////////////////////////////////////////
            
            modelBuilder.Entity<Category>().HasQueryFilter(p => !p.IsRemoved);

            ///////////////////////////////////////////////////////////////////////////////////////
            
            modelBuilder.Entity<Brand>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<Product>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<ProductImages>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<ProductFeatures>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<ProductFeatureItems>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<ProductPreviewDescription>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<ProductQualityPoints>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<ProductDeliveryPeriod>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<ProductUserOptions>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<ProductUserOptionParents>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<ProductUserOptionImages>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<ProductUserOptionItems>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<ProductUserOptionToolTips>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<ProductUserOptionTitles>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<OptionFileExtensions>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<ProductPriceList>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<ProductPriceListItems>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<ProductDocuments>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<ColorRepository>().HasQueryFilter(p => !p.IsRemoved);

            ///////////////////////////////////////////////////////////////////////////////////////

            modelBuilder.Entity<UploadedFile>().HasQueryFilter(p => !p.IsRemoved);

            ///////////////////////////////////////////////////////////////////////////////////////

            modelBuilder.Entity<Customer>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<CustomerInvoice>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<Order>().HasQueryFilter(p => !p.IsRemoved);
            modelBuilder.Entity<ProductTemp>().HasQueryFilter(p => !p.IsRemoved);
        }

    }

}
