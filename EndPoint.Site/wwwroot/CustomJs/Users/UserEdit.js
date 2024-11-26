
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
function EditUser(UserId) {

    var userid = UserId;
    var fullname = $('#Edit_FullName').val();
    var phone_number = $('#Edit_PhoneNumber').val();
    var email = $('#Edit_Email').val();
    var roles = $('#Edit_RoleId').val();

    var rolesArray = Array.isArray(roles) ? roles : [roles];

    var rolesData = rolesArray.map(function (role) {
        return { Id: role };
    });

    var postData = {
        'UserId': userid,
        'FullName': fullname,
        'Phone_Number': phone_number,
        'Roles': rolesData,
        'Email': email
    };

    $.ajax({
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        type: "POST",
        url: "Edit",
        data: postData,
        success: function (data) {
            console.log(data);
            if (data.isSuccess == true) {
                swal.fire({
                    title: 'موفق!',
                    text: data.message,
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: 'بسیار خب',
                }).then(function (isConfirm) {
                    window.location.href = "/admin/users/index"
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
function Validate_PhoneNumber(input_field, phone_number)
{
    const absolute_phone_number = phone_number.trim();

    if (absolute_phone_number.length !== 11) {
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