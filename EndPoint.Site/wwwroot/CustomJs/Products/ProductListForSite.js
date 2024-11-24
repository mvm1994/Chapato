
function initializeSlider(minPrice, maxPrice) {

    var nonLinearStepSlider = document.getElementById('slider-non-linear-step');

    if ($('#slider-non-linear-step').length && !nonLinearStepSlider.noUiSlider) {

        noUiSlider.create(nonLinearStepSlider, {
            start: [minPrice, maxPrice],
            connect: true,
            direction: 'rtl',
            format: wNumb({
                decimals: 0,
                thousand: ','
            }),
            range: {
                'min': minPrice,
                'max': maxPrice
            }
        });

        var nonLinearStepSliderValueElement = document.getElementById('slider-non-linear-step-value');

        nonLinearStepSlider.noUiSlider.on('update', function (values) {
            nonLinearStepSliderValueElement.innerHTML = values.join(' - ');
        });

    }
}

//////////////////////////////////////////////////////////Fetch_Categories
function fetchCategories() {

    $.ajax({
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        type: 'POST',
        url: '/Products/GetCategories',
        success: function (response) {
            if (response.isSuccess) {
                var categories = response.data;
                var categoryListContainer = $('.product-filter .category-list');
                categoryListContainer.empty();
                var categoryList = generateCategoryList(categories);
                categoryListContainer.append(categoryList);
            }
            else {
                swal.fire({
                    title: 'هشدار!',
                    text: response.message,
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: 'متوجه شدم',
                });
            }
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function generateCategoryList(categories) {

    var ul = $('<ul>');

    categories.forEach(function (category) {

        var li = $('<li>');
        var div = $('<div>').addClass('form-auth-row');

        var checkboxLabel = $('<label>').addClass('ui-checkbox').attr('for', `category-${category.id}`);
        var checkboxInput = $('<input>').attr({
            type: 'checkbox',
            value: category.id,
            name: `category-${category.id}`,
            id: `category-${category.id}`
        }).on('click', function () {

            DoFilter('Most-visited');
        });

        var checkboxSpan = $('<span>').addClass('ui-checkbox-check');

        checkboxLabel.append(checkboxInput).append(checkboxSpan);

        var categoryLabel = $('<label>').addClass('remember-me').attr('for', `category-${category.id}`).text(category.name);

        var toggleButton = $('<i>').addClass('mdi mdi-chevron-down toggle-button').css({
            'float': 'left',
            'position': 'relative',
            'top': '2px',
            'cursor': 'pointer',
            'transition': 'transform 0.15s ease-in-out'
        });

        div.append(checkboxLabel).append(categoryLabel).append(toggleButton);
        li.append(div);


        if (category.children && category.children.length > 0) {

            var subCategoryList = generateCategoryList(category.children);
            subCategoryList.addClass('sub-category-list');
            li.append(subCategoryList);

            div.on('click', function () {
                subCategoryList.toggleClass('show');
                toggleButton.toggleClass('mdi-chevron-down mdi-chevron-up');
            });

            toggleButton.on('click', function (event) {
                event.stopPropagation();
                subCategoryList.toggleClass('show');
                $(this).toggleClass('mdi-chevron-down mdi-chevron-up');
            });

            checkboxInput.on('change', function () {
                var isChecked = $(this).prop('checked');
                subCategoryList.toggleClass('show', isChecked);
                toggleButton.toggleClass('mdi-chevron-down', !isChecked).toggleClass('mdi-chevron-up', isChecked);
            });
        } else {
            toggleButton.hide();
        }

        ul.append(li);
    });

    return ul;
}

//////////////////////////////////////////////////////////Fetch_Brands

function fetchBrands() {

    $.ajax({
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        type: 'POST',
        url: '/Products/GetBrands',
        success: function (response) {
            if (response.isSuccess) {
                var brands = response.data;
                var brandListContainer = $('.product-filter .brand-list');
                brandListContainer.empty();
                var brandList = generateBrandList(brands);
                brandListContainer.append(brandList);
            }
            else {
                swal.fire({
                    title: 'هشدار!',
                    text: response.message,
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: 'متوجه شدم',
                });
            }
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function generateBrandList(brands) {

    var ul = $('<ul>');

    brands.forEach(function (brand) {

        var li = $('<li>');
        var div = $('<div>').addClass('form-auth-row');

        var checkboxLabel = $('<label>').addClass('ui-checkbox').attr('for', `brand-${brand.id}`);
        var checkboxInput = $('<input>').attr({
            type: 'checkbox',
            value: brand.id,
            name: `brand-${brand.id}`,
            id: `brand-${brand.id}`
        }).on('click', function () {

            DoFilter('Most-visited');
        });

        var checkboxSpan = $('<span>').addClass('ui-checkbox-check');

        checkboxLabel.append(checkboxInput).append(checkboxSpan);

        var brandLabel = $('<label>').addClass('remember-me').attr('for', `brand-${brand.id}`).text(brand.name);

        div.append(checkboxLabel).append(brandLabel);
        li.append(div);

        ul.append(li);
    });

    return ul;
}

//////////////////////////////////////////////////////////Filter_Products

function getActiveTabPaneId() {
    const activeTabPane = document.querySelector('.tab-pane.show.active');
    return activeTabPane ? activeTabPane.id : null;
}
function DoFilter(SortTabId, e) {

    if (e) {
        e.preventDefault();
    }
    applyFilters(SortTabId);
}
function getCheckedItems() {

    const formdata = new FormData();

    const checkedCategories = document.querySelectorAll('.category-list input[type="checkbox"]:checked');
    const addedCategoriesList = Array.from(checkedCategories).map(input => ({ Id: input.value }));

    addedCategoriesList.forEach((category, index) => {
        formdata.append('Added_Categories_List[' + index + '].Id', category.Id);
    });

    const checkedBrands = document.querySelectorAll('.brand-list input[type="checkbox"]:checked');
    const addedBrandsList = Array.from(checkedBrands).map(input => ({ Id: input.value }));

    addedBrandsList.forEach((brand, index) => {
        formdata.append('Added_Brands_List[' + index + '].Id', brand.Id);
    });

    const nonLinearStepSlider = document.getElementById('slider-non-linear-step');
    const values = nonLinearStepSlider.noUiSlider.get();

    const minValue = parseInt(values[0].replace(/,/g, ''));
    const maxValue = parseInt(values[1].replace(/,/g, ''));

    console.log("minValue:", minValue, "maxValue:", maxValue);

    formdata.append('FilteredPricesDto.MinVal', minValue);
    formdata.append('FilteredPricesDto.MaxVal', maxValue);

    return formdata;
}
function sendFormData(formdata, url, updateClass) {

    $.ajax({
        type: "POST",
        url: url,
        contentType: false,
        processData: false,
        data: formdata,
        success: function (data) {

            $(".shop-archive-content").html(data);

            if (updateClass) {
                $("#Paging_Parent").addClass("js_afterfilter");
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}
$(document).on("click", ".page-link", function (e) {

    e.preventDefault();

    var page = $(this).data("page");
    var pagesize = $("#Paging_Parent").data("pagesize");
    var isFilter = $("#Paging_Parent").hasClass("js_afterfilter");
    var url = "/Products/FilterProduct";

    const activeTabPaneId = getActiveTabPaneId();

    var formdata = getCheckedItems();
    formdata.append("Page", page);
    formdata.append("PageSize", pagesize);
    formdata.append("SortTabId", activeTabPaneId);

    sendFormData(formdata, url, isFilter);
});
function applyFilters(SortTabId) {

    var formdata = getCheckedItems();
    formdata.append("SortTabId", SortTabId);
    sendFormData(formdata, "/Products/FilterProduct", true);
}


