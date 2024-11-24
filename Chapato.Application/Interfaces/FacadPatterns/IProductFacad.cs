using Chapato.Application.Services.Products.Commands.AddNewBrand;
using Chapato.Application.Services.Products.Commands.AddNewCategory;
using Chapato.Application.Services.Products.Commands.AddNewColor;
using Chapato.Application.Services.Products.Commands.AddNewFeature;
using Chapato.Application.Services.Products.Commands.AddNewFeatureItem;
using Chapato.Application.Services.Products.Commands.AddNewProduct;
using Chapato.Application.Services.Products.Commands.DeleteBrand;
using Chapato.Application.Services.Products.Commands.DeleteChartCategory;
using Chapato.Application.Services.Products.Commands.DeleteColor;
using Chapato.Application.Services.Products.Commands.DeleteFeature;
using Chapato.Application.Services.Products.Commands.DeleteFeatureItem;
using Chapato.Application.Services.Products.Commands.EditBrand;
using Chapato.Application.Services.Products.Commands.EditColor;
using Chapato.Application.Services.Products.Commands.EditFeature;
using Chapato.Application.Services.Products.Commands.EditFeatureItem;
using Chapato.Application.Services.Products.Commands.MoveOrCopyChartCategory;
using Chapato.Application.Services.Products.Commands.RemoveProduct;
using Chapato.Application.Services.Products.Commands.RenameChartCategoy;
using Chapato.Application.Services.Products.Commands.Update_ProductDisplayMode;
using Chapato.Application.Services.Products.Commands.UpdateProduct;
using Chapato.Application.Services.Products.Queries.GetBrands;
using Chapato.Application.Services.Products.Queries.GetBrandsForSite;
using Chapato.Application.Services.Products.Queries.GetCategories;
using Chapato.Application.Services.Products.Queries.GetCategoriesForSite;
using Chapato.Application.Services.Products.Queries.GetChartCategories;
using Chapato.Application.Services.Products.Queries.GetColors;
using Chapato.Application.Services.Products.Queries.GetFeatures;
using Chapato.Application.Services.Products.Queries.GetProductById;
using Chapato.Application.Services.Products.Queries.GetProducts;
using Chapato.Application.Services.Products.Queries.GetProductsForSite;
using Chapato.Application.Services.Products.Queries.GetRelatedProducts;
using Chapato.Application.Services.Products.Queries.GetUserOption_Items;
using Chapato.Application.Services.Products.Queries.GetUserOption_ToolTips;
using Chapato.Application.Services.Products.Queries.GetUserOptions;
using Chapato.Application.Services.Products.Queries.GetUserSubOptions;
using Chapato.Application.Services.Products.Commands.AddNewCategory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Interfaces.FacadPatterns
{
    public interface IProductFacad
    {
        //////////////////////////////////////////////////////////////////////////////Commands
        //////////////////////////////////////////////////////////Categories

        AddNewCategoryService AddNewCategoryService { get; }
        RenameChartCategoyService RenameChartCategoyService { get; }
        MoveOrCopyChartCategoryService MoveOrCopyChartCategoryService { get; }
        DeleteChartCategoryService DeleteChartCategoryService { get; }

        //////////////////////////////////////////////////////////Products

        AddNewProductService AddNewProductService { get; }
        UpdateProductService UpdateProductService { get; }
        RemoveProductService RemoveProductService { get; }
        Update_ProductDisplayMode_Service Update_ProductDisplayMode_Service { get; }

        //////////////////////////////////////////////////////////Features

        AddNewFeatureService AddNewProductFeatureService { get; }
        EditFeatureService EditFeatureService { get; }
        DeleteFeatureService DeleteFeatureService { get; }

        //////////////////////////////////////////////////////////FeatureItems

        AddNewFeatureItemService AddNewFeatureItemService { get; }
        EditFeatureItemService EditFeatureItemService { get; }
        DeleteFeatureItemService DeleteFeatureItemService { get; }

        //////////////////////////////////////////////////////////Brands

        AddNewBrandService AddNewBrandService { get; }
        EditBrandService EditBrandService { get; }
        DeleteBrandService DeleteBrandService { get; }

        //////////////////////////////////////////////////////////Colors

        AddNewColorService AddNewColorService { get; }
        EditColorService EditColorService { get; }
        DeleteColorService DeleteColorService { get; }

        //////////////////////////////////////////////////////////////////////////////Queries
        //////////////////////////////////////////////////////////////////////ForAdmin
        //////////////////////////////////////////////////////////Categories

        IGetChartCategoriesService GetChartCategoriesService { get; }
        IGetCategoriesService GetCategoriesService { get; }

        //////////////////////////////////////////////////////////Products

        IGetProductsService GetProductsService { get; }
        IGetProductByIdService GetProductByIdService { get; }

        //////////////////////////////////////////////////////////Features

        IGetFeaturesService GetFeaturesService { get; }

        //////////////////////////////////////////////////////////RelatedProducts

        IGetRelatedProductsService GetRelatedProductsService { get; }

        //////////////////////////////////////////////////////////Brands

        IGetBrandsService GetBrandsService { get; }

        //////////////////////////////////////////////////////////Colors

        IGetColorsService GetColorsService { get; }

        //////////////////////////////////////////////////////////UserOptions
        IGetUserOptionsService GetUserOptionsService { get; }

        //////////////////////////////////////////////////////////UserOption_Items
        IGetUserOption_ItemsService GetUserOption_ItemsService { get; }

        //////////////////////////////////////////////////////////UserOption_ToolTips
        IGetUserOption_ToolTipsService GetUserOption_ToolTipsService { get; }

        //////////////////////////////////////////////////////////UserSubOptions
        IGetUserSubOptionsService GetUserSubOptionsService { get; }

        //////////////////////////////////////////////////////////////////////ForSite
        /////////////////////////////////////////////////////////////Products

        IGetProductsForSiteService GetProductsForSiteService { get; }

        /////////////////////////////////////////////////////////////Categories

        IGetCategoriesForSiteService GetCategoriesForSiteService { get; }

        /////////////////////////////////////////////////////////////Brands

        IGetBrandsForSiteService GetBrandsForSiteService { get; }
    }
}
