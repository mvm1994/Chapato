'use strict';

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

$(function () {
    var theme = $('html').hasClass('light-style') ? 'default' : 'default-dark',
        basicTree = $('#jstree-basic'),
        customIconsTree = $('#jstree-custom-icons'),
        contextMenu = $('#jstree-context-menu'),
        dragDrop = $('#jstree-drag-drop'),
        checkboxTree = $('#jstree-checkbox'),
        ajaxTree = $('#jstree-ajax');

    // Basic
    // --------------------------------------------------------------------
    if (basicTree.length) {
        basicTree.jstree({
            core: {
                themes: {
                    name: theme
                }
            }
        });
    }

    // Custom Icons
    // --------------------------------------------------------------------
    if (customIconsTree.length) {
        customIconsTree.jstree({
            core: {
                themes: {
                    name: theme
                },
                data: [
                    {
                        text: 'css',
                        children: [
                            {
                                text: 'app.css',
                                type: 'css'
                            },
                            {
                                text: 'style.css',
                                type: 'css'
                            }
                        ]
                    },
                    {
                        text: 'img',
                        state: {
                            opened: true
                        },
                        children: [
                            {
                                text: 'bg.jpg',
                                type: 'img'
                            },
                            {
                                text: 'logo.png',
                                type: 'img'
                            },
                            {
                                text: 'avatar.png',
                                type: 'img'
                            }
                        ]
                    },
                    {
                        text: 'js',
                        state: {
                            opened: true
                        },
                        children: [
                            {
                                text: 'jquery.js',
                                type: 'js'
                            },
                            {
                                text: 'app.js',
                                type: 'js'
                            }
                        ]
                    },
                    {
                        text: 'index.html',
                        type: 'html'
                    },
                    {
                        text: 'page-one.html',
                        type: 'html'
                    },
                    {
                        text: 'page-two.html',
                        type: 'html'
                    }
                ]
            },
            plugins: ['types'],
            types: {
                default: {
                    icon: 'bx bx-folder'
                },
                html: {
                    icon: 'bx bxl-html5 text-danger'
                },
                css: {
                    icon: 'bx bxl-css3 text-info'
                },
                img: {
                    icon: 'bx bx-image text-success'
                },
                js: {
                    icon: 'bx bxl-nodejs text-warning'
                }
            }
        });
    }

    // Context Menu
    // --------------------------------------------------------------------
    if (contextMenu.length) {
        contextMenu.jstree({
            core: {
                themes: {
                    name: theme
                },
                check_callback: true,
                data: function (node, cb) {
                    $.ajax({
                        url: '/AdminTemplate/assets/json/jstree-data.json',
                        dataType: 'json',
                        success: function (data) {
                            console.log('Received data:', data);
                            cb(data);
                        },
                        error: function () {
                            cb([]);
                        }
                    });
                }
            },
            plugins: ['types', 'contextmenu'],
            types: {
                default: {
                    icon: 'bx bxs-category'
                },
                subcategory: {
                    icon: 'bx bxs-category-alt text-info'
                },
                subcategory_lv2: {
                    icon: 'bx bxs-category-alt text-warning'
                },
                subcategory_lv3: {
                    icon: 'bx bxs-category-alt text-success'
                }
            },
            contextmenu: {
                items: function (n) {
                    var items = $.jstree.defaults.contextmenu.items();
                    items.create.label = 'ایجاد';
                    items.rename.label = 'تغییر نام';
                    items.remove.label = 'حذف';
                    items.ccp.label = 'ویرایش';
                    items.ccp.submenu.cut.label = 'برش';
                    items.ccp.submenu.copy.label = 'کپی';
                    items.ccp.submenu.paste.label = 'بازنشانی';
                    return items;
                }
            }
        });

        var selectedNode = null;
        let cutNode = null;
        let copyNode = null;

        //select_node
        contextMenu.on('select_node.jstree', function (e, data) {

            selectedNode = data.node;
            var nodeId = selectedNode.id;
            var nodeText = selectedNode.text;

            var dataParentId = selectedNode.a_attr['data_parent_id'];

            document.cookie = "parentId=" + nodeId + "; path=/";

        });

        //create_node
        contextMenu.on('create_node.jstree', function (e, data) {

            var newNode = data.node;
            var newNodeId = newNode.id;
            var parentNodeId = getCookie('parentId');

            contextMenu.one('rename_node.jstree', function (e, renameData) {
                if (renameData.node.id === newNodeId) {
                    var newNodeName = renameData.text;

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
                        if (result.value) {
                            var postData = {
                                'Name': newNodeName,
                                'ParentId': parentNodeId
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
                                        }).then(function () {
                                            $('#contextMenu').jstree(true).refresh();
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
            });
        });

        //rename_node
        contextMenu.on('rename_node.jstree', function (e, renameData) {
            var NodeId = renameData.node.id;
            var NodeNewName = renameData.text;

            swal.fire({
                title: 'ویرایش دسته بندی',
                text: "آیا می خواهید دسته بندی ویرایش شود؟",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: 'بله دسته بندی ویرایش شود',
                cancelButtonText: 'خیر'
            }).then((result) => {
                if (result.value) {
                    var postData = {
                        'Name': NodeNewName,
                        'Id': NodeId
                    };

                    $.ajax({
                        contentType: 'application/x-www-form-urlencoded',
                        dataType: 'json',
                        type: "POST",
                        url: "/Admin/Categories/RenameCategory",
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
                                }).then(function () {
                                    $('#contextMenu').jstree(true).refresh();
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
                } else {
                    // User canceled, restore the original name
                    $('#contextMenu').jstree(true).set_text(renameData.node, renameData.old);
                }
            });
        });

        //cut_node
        contextMenu.on('cut.jstree', function (e, data) {

            if (selectedNode) {

                cutNode = {
                    id: selectedNode.id,
                    text: selectedNode.text
                };

                selectedNode = null;
            }

            copyNode = null;
        });

        //copy_node
        contextMenu.on('copy.jstree', function (e, data) {

            if (selectedNode) {
                copyNode = {
                    id: selectedNode.id,
                    text: selectedNode.text
                };

                selectedNode = null;
            }
            cutNode = null;
        });

        //paste_node
        contextMenu.on('paste.jstree', function (e, data) {

            var pasteNode = data.node;
            var parentNodeId = selectedNode.id //id of parent node that paste cutted or copied node in it

            var nodeId = 0;
            var isCut = !!cutNode;
            var pasteNodeText = "";

            if (isCut && cutNode) {
                pasteNodeText = cutNode.text;
                nodeId = cutNode.id;
            } else if (copyNode) {
                pasteNodeText = copyNode.text;
                nodeId = copyNode.id;
            }

            swal.fire({
                title: 'بازنشانی دسته بندی',
                text: "آیا می خواهید دسته بندی بازنشانی شود؟",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: 'بله دسته بندی بازنشانی شود',
                cancelButtonText: 'خیر'
            }).then((result) => {
                if (result.value) {

                    var postData = {
                        'Id': nodeId,
                        'ParentId': parentNodeId,
                        'Name': pasteNodeText,
                        'IsCut': isCut
                    };

                    $.ajax({
                        contentType: 'application/x-www-form-urlencoded',
                        dataType: 'json',
                        type: "POST",
                        url: "/Admin/Categories/MoveOrCopyCategory",
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
                                }).then(function () {
                                    $('#contextMenu').jstree(true).refresh();
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
        });

        //delete_node
        contextMenu.on('delete_node.jstree', function (e, data) {

            var nodeId = selectedNode.id;

            swal.fire({
                title: 'حذف دسته بندی',
                text: "آیا می خواهید دسته بندی حذف شود؟",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: 'بله دسته بندی حذف شود',
                cancelButtonText: 'خیر'
            }).then((result) => {
                if (result.value) {

                    var postData = {
                        'Id': nodeId
                    };

                    $.ajax({
                        contentType: 'application/x-www-form-urlencoded',
                        dataType: 'json',
                        type: "POST",
                        url: "/Admin/Categories/DeleteCategory",
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
                                }).then(function () {
                                    $('#contextMenu').jstree(true).refresh();
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
        });

        //after paste
        contextMenu.on('paste.jstree', function () {
            cutNode = null;
            copyNode = null;
            selectedNode = null;
        });
        contextMenu.on('delete_node.jstree', function () {
            cutNode = null;
            copyNode = null;
            selectedNode = null;
        });

    }

    // Drag Drop
    // --------------------------------------------------------------------
    if (dragDrop.length) {
        dragDrop.jstree({
            core: {
                themes: {
                    name: theme
                },
                check_callback: true,
                data: [
                    {
                        text: 'css',
                        children: [
                            {
                                text: 'app.css',
                                type: 'css'
                            },
                            {
                                text: 'style.css',
                                type: 'css'
                            }
                        ]
                    },
                    {
                        text: 'img',
                        state: {
                            opened: true
                        },
                        children: [
                            {
                                text: 'bg.jpg',
                                type: 'img'
                            },
                            {
                                text: 'logo.png',
                                type: 'img'
                            },
                            {
                                text: 'avatar.png',
                                type: 'img'
                            }
                        ]
                    },
                    {
                        text: 'js',
                        state: {
                            opened: true
                        },
                        children: [
                            {
                                text: 'jquery.js',
                                type: 'js'
                            },
                            {
                                text: 'app.js',
                                type: 'js'
                            }
                        ]
                    },
                    {
                        text: 'index.html',
                        type: 'html'
                    },
                    {
                        text: 'page-one.html',
                        type: 'html'
                    },
                    {
                        text: 'page-two.html',
                        type: 'html'
                    }
                ]
            },
            plugins: ['types', 'dnd'],
            types: {
                default: {
                    icon: 'bx bx-folder'
                },
                html: {
                    icon: 'bx bxl-html5 text-danger'
                },
                css: {
                    icon: 'bx bxl-css3 text-info'
                },
                img: {
                    icon: 'bx bx-image text-success'
                },
                js: {
                    icon: 'bx bxl-nodejs text-warning'
                }
            }
        });
    }

    // Checkbox
    // --------------------------------------------------------------------
    if (checkboxTree.length) {
        checkboxTree.jstree({
            core: {
                themes: {
                    name: theme
                },
                data: [
                    {
                        text: 'css',
                        children: [
                            {
                                text: 'app.css',
                                type: 'css'
                            },
                            {
                                text: 'style.css',
                                type: 'css'
                            }
                        ]
                    },
                    {
                        text: 'img',
                        state: {
                            opened: true
                        },
                        children: [
                            {
                                text: 'bg.jpg',
                                type: 'img'
                            },
                            {
                                text: 'logo.png',
                                type: 'img'
                            },
                            {
                                text: 'avatar.png',
                                type: 'img'
                            }
                        ]
                    },
                    {
                        text: 'js',
                        state: {
                            opened: true
                        },
                        children: [
                            {
                                text: 'jquery.js',
                                type: 'js'
                            },
                            {
                                text: 'app.js',
                                type: 'js'
                            }
                        ]
                    },
                    {
                        text: 'index.html',
                        type: 'html'
                    },
                    {
                        text: 'page-one.html',
                        type: 'html'
                    },
                    {
                        text: 'page-two.html',
                        type: 'html'
                    }
                ]
            },
            plugins: ['types', 'checkbox', 'wholerow'],
            types: {
                default: {
                    icon: 'bx bx-folder'
                },
                html: {
                    icon: 'bx bxl-html5 text-danger'
                },
                css: {
                    icon: 'bx bxl-css3 text-info'
                },
                img: {
                    icon: 'bx bx-image text-success'
                },
                js: {
                    icon: 'bx bxl-nodejs text-warning'
                }
            }
        });
    }

    // Ajax Example
    // --------------------------------------------------------------------
    if (ajaxTree.length) {
        ajaxTree.jstree({
            core: {
                themes: {
                    name: theme
                },
                data: {
                    url: assetsPath + 'json/jstree-data.json',
                    dataType: 'json',
                    data: function (node) {
                        return {
                            id: node.id
                        };
                    }
                }
            },
            plugins: ['types', 'state'],
            types: {
                default: {
                    icon: 'bx bx-folder'
                },
                html: {
                    icon: 'bx bxl-html5 text-danger'
                },
                css: {
                    icon: 'bx bxl-css3 text-info'
                },
                img: {
                    icon: 'bx bx-image text-success'
                },
                js: {
                    icon: 'bx bxl-nodejs text-warning'
                }
            }
        });
    }
});
