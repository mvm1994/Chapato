
function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return null; // Cookie not found
}

/////////////////////////////////////////////////////Paging Function
function SetPageSizeValue() {

    const pageSizeSelect = document.getElementById('PageSizeSelect');

    const urlParams = new URLSearchParams(window.location.search);

    const initialPageSize = urlParams.get('PageSize');

    const validPageSizes = ["1", "5", "10", "15", "25", "50"];

    if (initialPageSize && validPageSizes.includes(initialPageSize)) {

        pageSizeSelect.value = initialPageSize;

    } else {

        pageSizeSelect.value = "0";
    }
}
function RloadPage(OptionValue) {

    if (OptionValue != "0") {

        let currentUrl = window.location.href;

        if (currentUrl.includes('PageSize')) {

            currentUrl = currentUrl.replace(/PageSize=\d+/, `PageSize=${OptionValue}`);

            if (currentUrl.includes('Page')) {

                currentUrl = currentUrl.replace(/Page=\d+/, `Page=1`);

            } else {

                currentUrl = currentUrl.replace('PageSize=', `Page=1&PageSize=${OptionValue}`);
            }
        } else {

            if (currentUrl.includes('?')) {

                currentUrl += `&Page=1&PageSize=${OptionValue}`;

            } else {

                currentUrl += `?Page=1&PageSize=${OptionValue}`;
            }
        }

        window.location.href = currentUrl;
    }
}
function searchResult() {

    const searchInput = document.getElementById('searchInput');
    const searchValue = searchInput.value.trim(); // Trim whitespace from input
    const url = `/Admin/Products/GetAllProducts?searchkey=${encodeURIComponent(searchValue)}`;
    window.location.href = url;
}
function CheckEvent(event)
{
    if (event.key === 'Enter') {

        event.preventDefault();
        searchResult();
    }
}

/////////////////////////////////////////////////////RemoveProduct Function
function RemoveProduct(ProductId) {

    swal.fire({
        title: 'حذف محصول',
        text: "در مورد حذف محصول مطمئن هستید؟",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: 'بله محصول حذف شود',
        cancelButtonText: 'خیر'

    }).then((result) => {
        if (result.value) {

            var postData = {
                'Id': ProductId
            };

            $.ajax({
                contentType: 'application/x-www-form-urlencoded',
                dataType: 'json',
                type: "POST",
                url: "RemoveProduct",
                data: postData,
                success: function (data) {
                    if (data.isSuccess == true) {
                        swal.fire({
                            title: 'موفق!',
                            text: data.message,
                            icon: 'success',
                            showCancelButton: false,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: 'بسیار خب',
                        }).then(function (isConfirm) {
                            location.reload();
                        });

                    }
                    else {
                        swal.fire({
                            title: 'هشدار!',
                            text: data.message,
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
    });
}
/////////////////////////////////////////////////////ChangeDisplayMode Function
function Update_ProductDisplayMode(ProductId, DisplayMode) {

    var postData = {
        'Id': ProductId,
        'Displayed': DisplayMode
    };

    console.log("postData:", postData);

    $.ajax({
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        type: "POST",
        url: "Update_ProductDisplayMode",
        data: postData,
        success: function (data) {
            if (data.isSuccess == true) {
                swal.fire({
                    title: 'موفق!',
                    text: data.message,
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: 'بسیار خب',
                }).then(function (isConfirm) {
                    location.reload();
                });

            }
            else {
                swal.fire({
                    title: 'هشدار!',
                    text: data.message,
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
