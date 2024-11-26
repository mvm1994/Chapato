function ChangeTextType(id) {

    var input_id = id.replace("_toggle", "");

    if (document.getElementById(input_id.toString()).type == "text") {
        document.getElementById(input_id.toString()).type = "password";
        document.getElementById(id.toString()).classList.remove("bx-show");
        document.getElementById(id.toString()).classList.add("bx-hide");
    }
    else {
        document.getElementById(input_id.toString()).type = "text";
        document.getElementById(id.toString()).classList.add("bx-show");
        document.getElementById(id.toString()).classList.remove("bx-hide");
    }
}
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

            var roles = $("#RoleId").val();
            var email = $("#email").val();
            var phone_number = $("#phone_number").val();
            var fullname = $("#fullname").val();
            var newPassword = $("#newPassword").val();
            var confirmPassword = $("#confirmPassword").val();

            // Ensure roles is always an array
            var rolesArray = Array.isArray(roles) ? roles : [roles];

            var rolesData = rolesArray.map(function (role) {
                return { Id: role };
            });

            var postData = {
                'Roles': rolesData,
                'Email': email,
                'FullName': fullname,
                'Phone_Number': phone_number,  
                'Password': newPassword,
                'RePassword': confirmPassword
            };

            $.ajax({
                contentType: 'application/x-www-form-urlencoded',
                dataType: 'json',
                type: "POST",
                url: "Create",
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
                            $("#RoleId").val('');
                            $("#email").val('');
                            $("#fullname").val('');
                            $("#phone_number").val('');
                            $("#newPassword").val('');
                            $("#confirmPassword").val('');
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
function Validate_PhoneNumber(input_field,phone_number)
{
    const absolute_phone_number = phone_number.trim();

    if (absolute_phone_number.length !== 11)
    {
        Swal.fire({
            icon: 'error',
            title: 'خطا',
            text: 'شماره تلفن باید 11 رقم باشد.',
            confirmButtonText: 'بسیار خب'
        }).then(() => {
            input_field.focus();
        });
    }
}

