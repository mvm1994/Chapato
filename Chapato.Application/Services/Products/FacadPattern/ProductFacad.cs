using Chapato.Application.Interfaces.Contexts;
using Chapato.Application.Interfaces.FacadPatterns;
using Chapato.Application.Services.Products.Commands.AddNewColor;
using Chapato.Application.Services.Products.Commands.AddNewFeature;
using Chapato.Application.Services.Products.Commands.AddNewProduct;
using Microsoft.AspNetCore.Hosting;
using Chapato.Application.Services.Products.Commands.AddNewBrand;
using Chapato.Application.Services.Products.Commands.AddNewCategory;
using Chapato.Application.Services.Products.Commands.AddNewFeatureItem;
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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chapato.Application.Services.Products.FacadPattern
{
    public class ProductFacad : IProductFacad
    {
        private readonly IDataBaseContext _context;
        private readonly IWebHostEnvironment _environment;
        public ProductFacad(IDataBaseContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        /////////////////////////////////////////////////////////////////////////////////////Queries
        /////////////////////////////////////////////////////////////////////////////ForAdmin
        /////////////////////////////////////////////////////////////////Categories

        private IGetChartCategoriesService _getChartCategoriesService;
        public IGetChartCategoriesService GetChartCategoriesService
        {
            get
            {
                return _getChartCategoriesService ??= new GetChartCategoriesService(_context);
            }
        }

        private IGetCategoriesService _getCategoriesService;
        public IGetCategoriesService GetCategoriesService
        {
            get
            {
                return _getCategoriesService ??= new GetCategoriesService(_context);
            }
        }

        //////////////////////////////////////////////////////////////Products

        private IGetProductsService _getProductsService;
        public IGetProductsService GetProductsService
        {
            get
            {
                return _getProductsService ??= new GetProductsService(_context);
            }
        }

        private IGetProductByIdService _getProductByIdService;
        public IGetProductByIdService GetProductByIdService
        {
            get
            {
                return _getProductByIdService ??= new GetProductByIdService(_context);
            }
        }

        //////////////////////////////////////////////////////////////RelatedProducts

        private IGetRelatedProductsService _getRelatedProductsService;
        public IGetRelatedProductsService GetRelatedProductsService
        {
            get
            {
                return _getRelatedProductsService ??= new GetRelatedProductsService(_context);
            }
        }

        //////////////////////////////////////////////////////////////Features

        private IGetFeaturesService _getFeaturesService;
        public IGetFeaturesService GetFeaturesService
        {
            get
            {
                return _getFeaturesService ??= new GetFeaturesService(_context);
            }
        }

        //////////////////////////////////////////////////////////////Brands

        private IGetBrandsService _getBrandsService;
        public IGetBrandsService GetBrandsService
        {
            get
            {
                return _getBrandsService ??= new GetBrandsService(_context);
            }
        }

        //////////////////////////////////////////////////////////////Colors

        private IGetColorsService _getColorsService;
        public IGetColorsService GetColorsService
        {
            get
            {
                return _getColorsService ??= new GetColorsService(_context);
            }
        }

        /////////////////////////////////////////////////////////////////UserOprtions

        private IGetUserOptionsService _getUserOptionsService;
        public IGetUserOptionsService GetUserOptionsService
        {
            get
            {
                return _getUserOptionsService ??= new GetUserOptionsService(_context);
            }
        }

        /////////////////////////////////////////////////////////////////UserOption_Items

        private IGetUserOption_ItemsService _getUserOption_ItemsService;
        public IGetUserOption_ItemsService GetUserOption_ItemsService
        {
            get
            {
                return _getUserOption_ItemsService ??= new GetUserOption_ItemsService(_context);
            }
        }

        /////////////////////////////////////////////////////////////////UserOption_ToolTips

        private IGetUserOption_ToolTipsService _getUserOption_ToolTipsService;
        public IGetUserOption_ToolTipsService GetUserOption_ToolTipsService
        {
            get
            {
                return _getUserOption_ToolTipsService ??= new GetUserOption_ToolTipsService(_context);
            }
        }

        /////////////////////////////////////////////////////////////////UserSubOprtions

        private IGetUserSubOptionsService _getUserSubOptionsService;
        public IGetUserSubOptionsService GetUserSubOptionsService
        {
            get
            {
                return _getUserSubOptionsService ??= new GetUserSubOptionsService(_context);
            }
        }


        /////////////////////////////////////////////////////////////////////////////ForSite
        /////////////////////////////////////////////////////////////////Products

        private IGetProductsForSiteService _getProductsForSiteService;
        public IGetProductsForSiteService GetProductsForSiteService
        {
            get
            {
                return _getProductsForSiteService ??= new GetProductsForSiteService(_context);
            }
        }

        /////////////////////////////////////////////////////////////////Categories

        private IGetCategoriesForSiteService _getCategoriesForSiteService;
        public IGetCategoriesForSiteService GetCategoriesForSiteService
        {
            get
            {
                return _getCategoriesForSiteService ??= new GetCategoriesForSiteService(_context);
            }
        }

        /////////////////////////////////////////////////////////////////Brands

        private IGetBrandsForSiteService _getBrandsForSiteService;
        public IGetBrandsForSiteService GetBrandsForSiteService
        {
            get
            {
                return _getBrandsForSiteService ??= new GetBrandsForSiteService(_context);
            }
        }

        /////////////////////////////////////////////////////////////////////////////////////Commands
        //////////////////////////////////////////////////////////////Categories

        private RenameChartCategoyService _renameChartCategoyService;
        public RenameChartCategoyService RenameChartCategoyService
        {
            get
            {
                return _renameChartCategoyService ??=new RenameChartCategoyService(_context);
            }
        }

        private MoveOrCopyChartCategoryService _moveOrCopyChartCategoryService;
        public MoveOrCopyChartCategoryService MoveOrCopyChartCategoryService
        {
            get
            {
                return _moveOrCopyChartCategoryService ??= new MoveOrCopyChartCategoryService(_context);
            }
        }

        private DeleteChartCategoryService _deleteChartCategoryService;
        public DeleteChartCategoryService DeleteChartCategoryService
        {
            get
            {
                return _deleteChartCategoryService ??= new DeleteChartCategoryService(_context);
            }
        }

        private AddNewCategoryService _addNewCategory;
        public AddNewCategoryService AddNewCategoryService
        {
            get
            {
                return _addNewCategory ??= new AddNewCategoryService(_context);
            }
        }

        //////////////////////////////////////////////////////////////Products

        private AddNewProductService _addNewProductService;
        public AddNewProductService AddNewProductService
        {
            get
            {
                return _addNewProductService ??= new AddNewProductService(_context,_environment);
            }
        }

        private UpdateProductService _updateProductService;
        public UpdateProductService UpdateProductService
        {
            get
            {
                return _updateProductService ??= new UpdateProductService(_context, _environment);
            }
        }

        private RemoveProductService _removeProductService;
        public RemoveProductService RemoveProductService
        {
            get
            {
                return _removeProductService ??= new RemoveProductService(_context);
            }
        }

        private Update_ProductDisplayMode_Service _update_ProductDisplayMode_Service;
        public Update_ProductDisplayMode_Service Update_ProductDisplayMode_Service
        {
            get
            {
                return _update_ProductDisplayMode_Service ??= new Update_ProductDisplayMode_Service(_context);
            }
        }

        //////////////////////////////////////////////////////////////Features

        private AddNewFeatureService _addNewProductFeatureService;
        public AddNewFeatureService AddNewProductFeatureService
        {
            get
            {
                return _addNewProductFeatureService ??= new AddNewFeatureService(_context);
            }
        }

        private EditFeatureService _editFeatureService;
        public EditFeatureService EditFeatureService
        {
            get
            {
                return _editFeatureService ??= new EditFeatureService(_context);
            }
        }

        private DeleteFeatureService _deleteFeatureService;
        public DeleteFeatureService DeleteFeatureService
        {
            get
            {
                return _deleteFeatureService ??= new DeleteFeatureService(_context);
            }
        }

        //////////////////////////////////////////////////////////////FeatureItems

        private AddNewFeatureItemService _addNewFeatureItemService;
        public AddNewFeatureItemService AddNewFeatureItemService
        {
            get
            {
                return _addNewFeatureItemService ??= new AddNewFeatureItemService(_context);
            }
        }

        private EditFeatureItemService _editFeatureItemService;
        public EditFeatureItemService EditFeatureItemService
        {
            get
            {
                return _editFeatureItemService ??= new EditFeatureItemService(_context);
            }
        }

        private DeleteFeatureItemService _deleteFeatureItemService;
        public DeleteFeatureItemService DeleteFeatureItemService
        {
            get
            {
                return _deleteFeatureItemService ??= new DeleteFeatureItemService(_context);
            }
        }

        //////////////////////////////////////////////////////////////Brands

        private AddNewBrandService _addNewBrandService;
        public AddNewBrandService AddNewBrandService
        {
            get
            {
                return _addNewBrandService ??= new AddNewBrandService(_context);
            }
        }

        private EditBrandService _editBrandService;
        public EditBrandService EditBrandService
        {
            get
            {
                return _editBrandService ??= new EditBrandService(_context);
            }
        }
        
        private DeleteBrandService _deleteBrandService;
        public DeleteBrandService DeleteBrandService
        {
            get
            {
                return _deleteBrandService ??= new DeleteBrandService(_context);
            }
        }

        //////////////////////////////////////////////////////////////Colors

        private AddNewColorService _addNewColorService;
        public AddNewColorService AddNewColorService
        {
            get
            {
                return _addNewColorService ??= new AddNewColorService(_context);
            }
        }

        private EditColorService _editColorService;
        public EditColorService EditColorService
        {
            get
            {
                return _editColorService ??= new EditColorService(_context);
            }
        }

        private DeleteColorService _deleteColorService;
        public DeleteColorService DeleteColorService
        {
            get
            {
                return _deleteColorService ??= new DeleteColorService(_context);
            }
        }
    }
}
