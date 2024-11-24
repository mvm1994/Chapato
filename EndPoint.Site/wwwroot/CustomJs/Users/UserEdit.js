
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
    var email = $('#Edit_Email').val();
    var roles = $('#Edit_RoleId').val();

    // Ensure roles is always an array
    var rolesArray = Array.isArray(roles) ? roles : [roles];

    var rolesData = rolesArray.map(function (role) {
        return { Id: role };
    });

    var postData = {
        'UserId': userid,
        'FullName': fullname,
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