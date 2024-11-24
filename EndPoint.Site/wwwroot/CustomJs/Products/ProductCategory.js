
function CategoryTypeAction(id)
{
    if (document.getElementById(id.toString()).value == "1") {
        document.getElementById("Exist_Category").style.display = "none";
    }
    else {
        document.getElementById("Exist_Category").style.display = "block";
    }
}


function AddNewCategory() {

    var Name = document.getElementById("Category_Name").value;
    var Parentid = null;
    var CatType = null;

    if (document.getElementById("CategoryType_Select").value == "2")
    {
        CatType = "2";
        Parentid = document.getElementById("Parent_Categories").value;
    }
    else
    {
        CatType = "1";
    }

    swal.fire({
        title: 'افزودن دسته بندی',
        text: "آیا می خواهید دسته بندی اضافه شود؟",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: 'بله دسته بندی اضافه شود',
        cancelButtonText: 'خیر'

    }).then((result) => {
        if (result.value)
        {
            var postData = {
                'Name': Name,
                'ParentId': Parentid,
                'CategoryType': CatType
            };

            $.ajax({
                contentType: 'application/x-www-form-urlencoded',
                dataType: 'json',
                type: "POST",
                url: "/Admin/Categories/AddNewCategory",
                data: postData,
                success: function (response) {
                    if (response.isSuccess) {
                        swal.fire({
                            title: 'موفق!',
                            text: response.message,
                            icon: 'success',
                            showCancelButton: false,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: 'بسیار خب',
                        }).then(function ()
                        {
                            document.getElementById("Category_Name").value = "";
                            window.location.reload();
                        });
                    } else {
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
    });
}