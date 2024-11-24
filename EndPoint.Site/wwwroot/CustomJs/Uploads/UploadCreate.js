function AddFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        Swal.fire({
            icon: 'warning',
            title: 'هشدار!',
            text: 'لطفاً یک فایل انتخاب کنید.',
            showConfirmButton: true,
            confirmButtonText: 'باشه'
        });
        return;
    }

    const fileType = file.type;
    console.log("Selected File Type:", fileType);
    const fileSize = file.size;
    console.log("Selected File Size:", fileSize);

    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const validAudioTypes = ['audio/mpeg'];
    const validVideoTypes = ['video/mp4'];

    const maxSize = {
        image: 5 * 1024 * 1024, // 5 MB
        audio: 20 * 1024 * 1024, // 20 MB
        video: 30 * 1024 * 1024 // 30 MB
    };

    console.log("File Type Check:", {
        isValidImage: validImageTypes.includes(fileType),
        isValidAudio: validAudioTypes.includes(fileType),
        isValidVideo: validVideoTypes.includes(fileType),
    });

    console.log("File Size Check:", {
        isImageTooLarge: validImageTypes.includes(fileType) && fileSize > maxSize.image,
        isAudioTooLarge: validAudioTypes.includes(fileType) && fileSize > maxSize.audio,
        isVideoTooLarge: validVideoTypes.includes(fileType) && fileSize > maxSize.video,
    });

    if (validImageTypes.includes(fileType) && fileSize > maxSize.image) {
        Swal.fire({
            icon: 'error',
            title: 'خطا',
            text: 'حجم تصویر باید کمتر از ۵ مگابایت باشد.',
            showConfirmButton: true,
            confirmButtonText: 'باشه'
        });
        return;
    } else if (validAudioTypes.includes(fileType) && fileSize > maxSize.audio) {
        Swal.fire({
            icon: 'error',
            title: 'خطا',
            text: 'حجم فایل صوتی باید کمتر از ۲۰ مگابایت باشد.',
            showConfirmButton: true,
            confirmButtonText: 'باشه'
        });
        return;
    } else if (validVideoTypes.includes(fileType) && fileSize > maxSize.video) {
        Swal.fire({
            icon: 'error',
            title: 'خطا',
            text: 'حجم ویدئو باید کمتر از 30 مگابایت باشد.',
            showConfirmButton: true,
            confirmButtonText: 'باشه'
        });
        return;
    } else if (![...validImageTypes, ...validAudioTypes, ...validVideoTypes].includes(fileType)) {
        Swal.fire({
            icon: 'error',
            title: 'خطا',
            text: 'نوع فایل نامعتبر است.',
            showConfirmButton: true,
            confirmButtonText: 'باشه'
        });
        return;
    }

    const formData = new FormData();
    formData.append('File', file);
    console.log("FormData prepared for upload.");

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            const progressBar = document.getElementById('progressBar');
            progressBar.style.width = percentComplete + '%';
            progressBar.setAttribute('aria-valuenow', percentComplete);
            console.log(`Upload progress: ${percentComplete}%`);
        }
    };

    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.isSuccess) {
                Swal.fire({
                    icon: 'success',
                    title: 'موفق!',
                    text: response.message,
                    showConfirmButton: true,
                    confirmButtonText: 'باشه'
                }).then(function () {
                    document.getElementById('fileInput').value = "";
                    const progressBar = document.getElementById('progressBar');
                    progressBar.style.width = '0%';
                    progressBar.setAttribute('aria-valuenow', '0');
                });
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'هشدار!',
                    text: response.message,
                    showConfirmButton: true,
                    confirmButtonText: 'باشه'
                }).then(function () {
                    document.getElementById('fileInput').value = "";
                    const progressBar = document.getElementById('progressBar');
                    progressBar.style.width = '0%';
                    progressBar.setAttribute('aria-valuenow', '0');
                });
            }
        } else {
            let errorMessage = `آپلود فایل با مشکل مواجه شد. وضعیت: ${xhr.status} - ${xhr.statusText}`;

            if (xhr.status === 413) {
                errorMessage = 'فایل بسیار بزرگ است. لطفاً فایلی با اندازه کمتر انتخاب کنید.';
            }
            Swal.fire({
                icon: 'error',
                title: 'خطا!',
                text: errorMessage,
                showConfirmButton: true,
                confirmButtonText: 'باشه'
            }).then(function () {
                document.getElementById('fileInput').value = "";
                const progressBar = document.getElementById('progressBar');
                progressBar.style.width = '0%';
                progressBar.setAttribute('aria-valuenow', '0');
            });
        }
    };

    xhr.onerror = function () {
        Swal.fire({
            icon: 'error',
            title: 'خطا!',
            text: `آپلود فایل با مشکل مواجه شد. خطا: ${xhr.statusText}`,
            showConfirmButton: true,
            confirmButtonText: 'باشه'
        }).then(function () {
            document.getElementById('fileInput').value = "";
            const progressBar = document.getElementById('progressBar');
            progressBar.style.width = '0%';
            progressBar.setAttribute('aria-valuenow', '0');
        });
    };

    xhr.open('POST', '/admin/Uploads/AddNewFile', true);
    xhr.send(formData);
    console.log("XHR request sent.");
}
