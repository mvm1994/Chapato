function LoginUser() {

    var Email = $("#Email").val();
    var Password = $("#Password").val();
    var postData = {
        'Email': Email,
        'Password': Password,
    };
    $.ajax({
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        type: "POST",
        url: "Signin",
        data: postData,
        success: function (data) {
            if (data.isSuccess == true) {
                swal.fire(
                    'موفق!',
                    data.message,
                    'success'
                ).then(function (isConfirm) {
                    window.location.replace("/");
                });
            }
            else {

                swal.fire(
                    'هشدار!',
                    data.message,
                    'warning'
                );
            }
        },
        error: function (request, status, error) {
            swal.fire(
                'هشدار!',
                request.responseText,
                'warning'
            );
        }
    });
}