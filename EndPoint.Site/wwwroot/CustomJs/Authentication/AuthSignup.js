function RegisterUser() {

    swal.fire({
        title: 'ثبت نام کاربر',
        text: "آیا می خواهید ثبت نام کاربر را انجام دهید؟",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: 'بله ثبت نام کاربر انجام شود',
        cancelButtonText: 'خیر'
    }).then((result) => {
        if (result.value) {

            var FullName = $("#FullName").val();
            var Email = $("#Email").val();
            var Password = $("#Password").val();
            var RePassword = $("#RePassword").val();

            var postData = {

                'FullName': FullName,
                'Email': Email,
                'Password': Password,
                'RePassword': RePassword
            };

            $.ajax({
                contentType: 'application/x-www-form-urlencoded',
                dataType: 'json',
                type: "POST",
                url: "Signup",
                data: postData,
                success: function (data) {
                    console.log(data)
                    if (data.isSuccess == true) {
                        swal.fire({
                            title: 'موفق!',
                            text: data.message,
                            icon: 'success',
                            showCancelButton: false,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: 'بسیار خب',
                        }).then(function (isConfirm) {
                            window.location.replace("/");
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