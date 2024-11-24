//////////////////////////////////////////////////////////////Common_Functions
function SetFileType(data) {
    var jsonData = JSON.stringify([{ filetype: data }]);

    $.ajax({
        url: "/Admin/Products/SaveJsonData",
        type: 'POST',
        contentType: 'application/json',
        data: jsonData,
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status, error) {
            console.error(status, error);
        }
    });
}
function Comma(inputId) {

    var input = document.getElementById(inputId);

    if (input) {
        let value = input.value.replace(/,/g, '');
        let formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        input.value = formattedValue;
    } else {
        console.error("این کنترل پیدا نشد");
    }
}
function Comma_Plus(input) {

    let value = input.value.replace(/,/g, '');
    let formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    input.value = formattedValue;
}
function Set_Comma(inputvalue) {

    let value = inputvalue.replace(/,/g, '');
    let formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return formattedValue;
}
function Set_Comma_Plus(number) {

    var strNumber = number.toString();
    var formattedNumber = strNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return formattedNumber;
}
function GetQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

//////////////////////////////////////////////////////////////Product_Options
function AddTable(number) {

    document.getElementById("SubOptionBody_Parent").style.display = "none";

    const specificTableHead = document.getElementById('options_tbl_head');
    let parentElement = document.getElementById('options_tbl');


    if (!specificTableHead) {

        let thead = document.createElement('thead');
        thead.id = "options_tbl_head";
        thead.style.textAlign = 'center';
        thead.style.backgroundColor = 'gainsboro';
        thead.style.borderBottom = '1px solid #777';

        thead.innerHTML = `
            <tr>
                <th>نام</th>
                <th>قیمت</th>
                <th>معرفی</th>
                <th>زیر گروه</th>
                <th>حذف</th>
            </tr>
        `;

        parentElement.insertBefore(thead, parentElement.firstChild);
    }

    let tbody = document.getElementById('options_tbl_tbody');
    let tableRowCount = tbody.getElementsByTagName('tr').length;

    for (let i = 0; i < parseInt(number); i++) {

        tableRowCount++;

        let tableRow = document.createElement('tr');
        tableRow.id = "parent_row" + tableRowCount;
        tableRow.style.borderBottom = "1px solid #777";
        tableRow.className = "new_option";

        tableRow.innerHTML = `
            <td>
                <input type="text" class="form-control OpName" style="text-align:center" placeholder="سایز" />
            </td>
            <td>
                <input type="text" class="form-control OpPrice" style="text-align:center" placeholder="500,000" value="0" onkeyup="Comma_Plus(this)" />
            </td>
            <td>
                <div class="tooltip-custom">
                    <a class="btn btn-secondary" style="color:white;height: 38px !important;" data-toggle="modal" data-target="#tooltipModal" onclick="ShowToolTipModal_ForOption(this)">
                        <i class="fas fa-question"></i>
                    </a>
                    <span class="tooltip-text">توضیحاتی ارائه نشده است</span>
                </div>
            </td>
            <td>
                <a class="btn btn-success addsub" style="color:white;height: 38px !important;" data-parentid="${tableRowCount}" onclick="ShowSubOptions(${tableRowCount})"><i class="fas fa-eye"></i></a>
            </td>
            <td>
                <a class="btn btn-danger RemoveRow" style="color:white;height: 38px !important;" onclick="RemoveRow(this)"><i class="fas fa-trash"></i></a>
            </td>
        `;

        tbody.appendChild(tableRow);
    }
}
function AddSubTable(number, parentid) {

    let selector = `[data-parentid="${parentid}"].suboption`;
    const specificTable = document.querySelector(selector);

    if (specificTable) {

        let tbody = specificTable.querySelector('tbody');

        if (tbody.children.length === 0) {
            const thead = document.createElement('thead');
            thead.style.textAlign = 'center';
            thead.style.backgroundColor = 'gainsboro';
            thead.style.borderBottom = '1px solid #777';

            thead.innerHTML = `
                <tr>
                    <th>نام</th>
                    <th>قیمت</th>
                    <th>موجودی</th>
                    <th>معرفی</th>
                    <th>حذف</th>
                </tr>
            `;

            specificTable.insertBefore(thead, tbody);
        }

        for (let i = 0; i < parseInt(number); i++) {
            let tableRow = document.createElement('tr');
            tableRow.style.borderBottom = "1px solid #777";
            tableRow.className = "new_suboption";

            tableRow.innerHTML = `
                <td>
                    <input type="text" class="form-control Sub_OpName" style="text-align:center" placeholder="کوچک" />
                </td>
                <td>
                    <input type="text" class="form-control Sub_OpPrice" style="text-align:center" placeholder="500,000" value="0" onkeyup="Comma_Plus(this)" />
                </td>
                <td>
                    <input type="number" class="form-control Sub_OpInventory" style="text-align:center" placeholder="10" value="0" min="0" />
                </td>
                <td>
                    <div class="tooltip-custom">
                        <a class="btn btn-secondary" style="color:white;height: 38px !important;" data-toggle="modal" data-target="#tooltipModal" onclick="ShowToolTipModal_ForSubOption(this)">
                            <i class="fas fa-question"></i>
                        </a>
                        <span class="tooltip-text">توضیحاتی ارائه نشده است</span>
                    </div>
                </td>
                <td>
                    <a class="btn btn-danger Sub_RemoveRow" style="color:white;height: 38px !important;" onclick="Remove_SubRow(this)"><i class="fas fa-trash"></i></a>
                </td>
            `;

            tbody.appendChild(tableRow);
        }
    }
    else {

        let table = document.createElement('table');
        table.className = "suboption";
        table.dataset.parentid = parentid;

        table.innerHTML = `
            <thead style="text-align:center; background-color: gainsboro; border-bottom: 1px solid #777;">
                <tr>
                     <th>نام</th>
                    <th>قیمت</th>
                    <th>موجودی</th>
                    <th>معرفی</th>
                    <th>حذف</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        let tbody = table.querySelector('tbody');

        for (let i = 0; i < parseInt(number); i++) {
            let tableRow = document.createElement('tr');
            tableRow.style.borderBottom = "1px solid #777";
            tableRow.className = "new_suboption";

            tableRow.innerHTML = `
                <td>
                    <input type="text" class="form-control Sub_OpName" style="text-align:center" placeholder="کوچک" />
                </td>
                <td>
                    <input type="text" class="form-control Sub_OpPrice" style="text-align:center" placeholder="500,000" value="0" onkeyup="Comma_Plus(this)" />
                </td>
                <td>
                    <input type="number" class="form-control Sub_OpInventory" style="text-align:center" placeholder="10" value="0" min="0" />
                </td>
                <td>
                    <div class="tooltip-custom">
                        <a class="btn btn-secondary" style="color:white;height: 38px !important;" data-toggle="modal" data-target="#tooltipModal" onclick="ShowToolTipModal_ForSubOption(this)">
                            <i class="fas fa-question"></i>
                        </a>
                        <span class="tooltip-text">توضیحاتی ارائه نشده است</span>
                    </div>
                </td>
                <td>
                    <a class="btn btn-danger Sub_RemoveRow" style="color:white;height: 38px !important;" onclick="Remove_SubRow(this)"><i class="fas fa-trash"></i></a>
                </td>
            `;

            tbody.appendChild(tableRow);
        }

        document.getElementById('SubOptionBody').appendChild(table);
    }
}
function RemoveRow(button) {

    document.getElementById('SubOptionBody_Parent').style.display = "none";

    let table = button.closest('table');

    let thead = table.querySelector('thead');
    let tbody = table.querySelector('tbody');

    let parentRow = button.closest('tr');
    let parentRowIndex = parseInt(parentRow.id.replace("parent_row", ""));

    parentRow.parentNode.removeChild(parentRow);

    let tableRows = tbody.getElementsByTagName('tr');

    for (let i = 0; i < tableRows.length; i++) {

        tableRows[i].id = "parent_row" + (i + 1);

        let addButton = tableRows[i].querySelector('.addsub');

        if (addButton) {

            addButton.dataset.parentid = i + 1;
            addButton.setAttribute("onclick", "ShowSubOptions(" + (i + 1) + ")");
        }
    }

    let selector = `[data-parentid="${parentRowIndex}"].suboption`;
    const childTable = document.querySelector(selector);
    let siblings = document.getElementById("SubOptionBody").querySelectorAll("table");

    for (let k = 0; k < siblings.length; k++) {

        if (siblings[k] === childTable) {

            childTable.parentNode.removeChild(childTable);

            siblings = document.getElementById("SubOptionBody").querySelectorAll("table");

            for (let l = k; l < siblings.length; l++) {
                siblings[l].dataset.parentid = l + 1;
            }
            break;
        }
    }

    if (tbody.getElementsByTagName('tr').length === 0 && thead) {
        table.removeChild(thead);
    }
}
function Remove_SubRow(button) {

    let table = button.closest('table');
    let thead = table.querySelector('thead');
    let rows = table.querySelectorAll('tbody tr');

    const totalRows = rows.length;

    let parentRow = button.closest('tr');

    parentRow.parentNode.removeChild(parentRow);

    if (totalRows <= 1 && thead) {
        table.removeChild(thead);
    }
}
function ShowSubOptions(parentid) {

    const subOptionBodyParent = document.getElementById("SubOptionBody_Parent");
    subOptionBodyParent.style.display = "block";
    subOptionBodyParent.dataset.parentid = parentid;

    const tables = document.querySelectorAll('#SubOptionBody table');
    tables.forEach(table => {
        table.style.display = 'none';
    });

    let selector = `[data-parentid="${parentid}"].suboption`;
    const specificTable = document.querySelector(selector);

    if (specificTable) {

        if (!specificTable.querySelector('thead') && specificTable.querySelector('tbody tr')) {

            const thead = document.createElement('thead');
            thead.style.textAlign = 'center';
            thead.style.backgroundColor = 'gainsboro';
            thead.style.borderBottom = '1px solid #777';

            thead.innerHTML = `
                <tr>
                    <th>نام</th>
                    <th>قیمت</th>
                    <th>موجودی</th>
                    <th>حذف</th>
                </tr>
            `;
            specificTable.insertBefore(thead, specificTable.firstChild);
        }

        specificTable.style.display = 'block';
    }
}

////////////////////////////////////////Sub_Option_ToolTip

var currentButton;
var colId;
function ShowToolTipModal_ForSubOption(button) {

    currentButton = button;

    var tooltipText = $(button).next('.tooltip-text').text().trim();

    if (tooltipText !== 'توضیحاتی ارائه نشده است') {
        $('#Update_ToolTip_Desc').val(tooltipText);
    } else {
        $('#Update_ToolTip_Desc').val('');
    }

    $('#Update_SubOption_ToolTip_Modal').modal('show');
}
function ShowToolTipModal_For_UpdateProduct(button, id) {

    currentButton = button;
    colId = id;

    var tooltipText = $(button).next('.tooltip-text').text().trim();

    if (tooltipText !== 'توضیحاتی ارائه نشده است') {
        $('#Update_ToolTip_Desc').val(tooltipText);
    } else {
        $('#Update_ToolTip_Desc').val('');
    }

    $('#Update_SubOption_ToolTip_Modal').modal('show');
}
function Update_SubOption_ToolTip() {

    var newTitle = $('#Update_ToolTip_Desc').val();

    if (newTitle === '') {

        $(currentButton).removeClass('btn-info').addClass('btn-secondary');
        $(currentButton).next('.tooltip-text').text('توضیحاتی ارائه نشده است');

    } else {

        $(currentButton).removeClass('btn-secondary').addClass('btn-info');
        $(currentButton).next('.tooltip-text').text(newTitle);
    }

    $('#Update_SubOption_ToolTip_Modal').modal('hide');
}
function Update_SubOption_ToolTip_For_UpdateProduct() {
    var newTitle = $('#Update_ToolTip_Desc').val();

    if (newTitle === '') {

        $(currentButton).removeClass('btn-info').addClass('btn-secondary');
        $(currentButton).next('.tooltip-text').text('توضیحاتی ارائه نشده است');

    } else {

        $(currentButton).removeClass('btn-secondary').addClass('btn-info');
        $(currentButton).next('.tooltip-text').text(newTitle);
    }

    if (colId != null) {
        ModifySubOption(colId);
    }

    $('#Update_SubOption_ToolTip_Modal').modal('hide');
}
function Close_ColorList_Toggle_Menu() {
    const button_id = "Product_Color_List_ToggleBtn";
    const parent_id = "Product_Color_List";
    const header_id = "Product_Color_List_Header";

    if (document.getElementById(parent_id.toString()).classList.contains("active")) {

        document.getElementById(parent_id.toString()).classList.remove("active");
        document.getElementById(button_id.toString()).classList.remove("toggle_btn_padding_right");
        document.getElementById(header_id.toString()).classList.add("toggle_menu_header");
        document.getElementById(parent_id.toString()).classList.remove("active_color_list");
        document.getElementById(parent_id.toString()).classList.add("notactive_color_list");
        document.getElementById("Product_Color_List_Items").classList.remove("show");
        document.getElementById("Product_Color_List_ToggleBtn").classList.add("collapsed");
    }
}

////////////////////////////////////////Option_ToolTip

function ShowToolTipModal_ForOption(button) {

    currentButton = button;

    var tooltipText = $(button).next('.tooltip-text').text().trim();

    if (tooltipText !== 'توضیحاتی ارائه نشده است') {
        $('#Update_ToolTip_Desc_ForOption').val(tooltipText);
    }
    else {
        $('#Update_ToolTip_Desc_ForOption').val('');
    }

    $('#Update_Option_ToolTip_Modal').modal('show');
}
function ShowToolTipModal_For_UpdateProduct_ForOption(button, id) {

    currentButton = button;
    colId = id;

    var tooltipText = $(button).next('.tooltip-text').text().trim();

    if (tooltipText !== 'توضیحاتی ارائه نشده است') {
        $('#Update_ToolTip_Desc_ForOption').val(tooltipText);
    }
    else {
        $('#Update_ToolTip_Desc_ForOption').val('');
    }

    $('#Update_Option_ToolTip_Modal').modal('show');
}
function Update_Option_ToolTip() {

    var newTitle = $('#Update_ToolTip_Desc_ForOption').val();

    if (newTitle === '') {

        $(currentButton).removeClass('btn-info').addClass('btn-secondary');
        $(currentButton).next('.tooltip-text').text('توضیحاتی ارائه نشده است');

    } else {

        $(currentButton).removeClass('btn-secondary').addClass('btn-info');
        $(currentButton).next('.tooltip-text').text(newTitle);
    }

    $('#Update_Option_ToolTip_Modal').modal('hide');
}
function Update_Option_ToolTip_For_UpdateProduct() {
    var newTitle = $('#Update_ToolTip_Desc_ForOption').val();

    if (newTitle === '') {

        $(currentButton).removeClass('btn-info').addClass('btn-secondary');
        $(currentButton).next('.tooltip-text').text('توضیحاتی ارائه نشده است');

    } else {

        $(currentButton).removeClass('btn-secondary').addClass('btn-info');
        $(currentButton).next('.tooltip-text').text(newTitle);
    }

    if (colId != null) {
        ModifyOption(colId);
    }

    $('#Update_Option_ToolTip_Modal').modal('hide');
}
function Close_ColorList_Toggle_Menu() {

    const button_id = "Product_Color_List_ToggleBtn";
    const parent_id = "Product_Color_List";
    const header_id = "Product_Color_List_Header";

    if (document.getElementById(parent_id.toString()).classList.contains("active")) {

        document.getElementById(parent_id.toString()).classList.remove("active");
        document.getElementById(button_id.toString()).classList.remove("toggle_btn_padding_right");
        document.getElementById(header_id.toString()).classList.add("toggle_menu_header");
        document.getElementById(parent_id.toString()).classList.remove("active_color_list");
        document.getElementById(parent_id.toString()).classList.add("notactive_color_list");
        document.getElementById("Product_Color_List_Items").classList.remove("show");
        document.getElementById("Product_Color_List_ToggleBtn").classList.add("collapsed");
    }
}

//////////////////////////////////////////////////////////////Product_Features
function Add_FeatTable(number) {

    document.getElementById("SubOptionBody_Parent").style.display = "none";

    let parentElement = document.getElementById('options_tbl');

    if (!document.getElementById('options_tbl_head')) {

        let thead = document.createElement('thead');
        thead.id = "options_tbl_head";
        thead.style.textAlign = 'center';
        thead.style.backgroundColor = 'gainsboro';
        thead.style.borderBottom = '1px solid #777';

        thead.innerHTML = `
            <tr>
                <th>نام</th>
                <th>نوع نمایش</th>
                <th>زیر گروه</th>
                <th>حذف</th>
            </tr>
        `;

        parentElement.insertBefore(thead, parentElement.firstChild);
    }

    let tableRowCount = document.querySelectorAll('#options_tbl_tbody tr').length;

    for (let i = 0; i < parseInt(number); i++) {

        tableRowCount++;

        let tableRow = document.createElement('tr');
        tableRow.id = "parent_row" + tableRowCount;
        tableRow.style.borderBottom = "1px solid #777";
        tableRow.className = "new_feat";

        tableRow.innerHTML = `
            <td>
                <input id="Feat_Name" type="text" class="form-control tbl_name_col" style="text-align:center;" placeholder="رنگ" />
            </td>
            <td>
                <select id="Feat_Type" type="text" class="form-select tbl_select_col" style="text-align:right;">
                    <option value="1">رادیو باتن</option>
                    <option value="2">چک باکس</option>
                    <option value="3">منو آبشاری</option>
                </select>
            </td>
            <td>
                <a id="addsub" class="btn btn-success tbl_btn_col" style="color:white;" data-parentid="${tableRowCount}" onclick="ShowSubOptions(${tableRowCount})">نمایش</a>
            </td>
            <td>
                <a id="RemoveRow" class="btn btn-danger tbl_btn_col" style="color:white;" onclick="Remove_FeatRow(this)">حذف</a>
            </td>
        `;

        document.getElementById('options_tbl_tbody').appendChild(tableRow);
    }
}
function Add_SubFeatTable(number, parentid) {

    let selector = `[data-parentid="${parentid}"].suboption`;
    const specificTable = document.querySelector(selector);

    if (specificTable) {

        let tbody = specificTable.querySelector('tbody');

        if (!specificTable.querySelector('thead')) {

            let thead = document.createElement('thead');
            thead.style.textAlign = 'center';
            thead.style.backgroundColor = 'gainsboro';
            thead.style.borderBottom = '1px solid #777';

            thead.innerHTML = `
                <tr>
                    <th>نام</th>
                    <th>حذف</th>
                </tr>
            `;

            specificTable.insertBefore(thead, tbody);
        }

        for (let i = 0; i < parseInt(number); i++) {
            let tableRow = document.createElement('tr');
            tableRow.style.borderBottom = "1px solid #777";
            tableRow.className = "new_subfeat";

            tableRow.innerHTML = `
                <td style="width:100% !important">
                    <input id="Sub_Feat_Name" type="text" class="form-control" style="text-align:center" placeholder="قرمز" />
                </td>
                <td>
                    <a id="Sub_RemoveRow" class="btn btn-danger" style="color:white" onclick="Remove_SubRow(this)">حذف</a>
                </td>
            `;

            tbody.appendChild(tableRow);
        }
    }
    else {

        let table = document.createElement('table');
        table.className = "suboption";
        table.dataset.parentid = parentid;
        table.style.textAlign = 'center';
        table.style.width = '100% !important';

        let thead = document.createElement('thead');
        thead.style.textAlign = 'center';
        thead.style.backgroundColor = 'gainsboro';
        thead.style.borderBottom = '1px solid #777';

        thead.innerHTML = `
            <tr>
                <th>نام</th>
                <th>حذف</th>
            </tr>
        `;

        table.appendChild(thead);

        let tbody = document.createElement('tbody');

        for (let i = 0; i < parseInt(number); i++) {

            let tableRow = document.createElement('tr');
            tableRow.style.borderBottom = "1px solid #777";
            tableRow.className = "new_subfeat";

            tableRow.innerHTML = `
                <td style="width:100% !important">
                    <input id="Sub_Feat_Name" type="text" class="form-control" style="text-align:center" placeholder="قرمز" />
                </td>
                <td>
                    <a id="Sub_RemoveRow" class="btn btn-danger" style="color:white" onclick="Remove_SubRow(this)">حذف</a>
                </td>
            `;

            tbody.appendChild(tableRow);
        }

        table.appendChild(tbody);
        document.getElementById('SubOptionBody').appendChild(table);
    }
}
function CheckValue() {

    console.log(document.getElementById("Parent_Categories").value);
    document.getElementById('SubOptionBody_Parent').style.display = "none";

    if (document.getElementById("Parent_Categories").value == "") {

        document.getElementById("OptionBody_Parent").style.display = "none";
        document.getElementById("recordBtn").style.display = "none";
    }
    else {

        document.getElementById("OptionBody_Parent").style.display = "block";
        document.getElementById("recordBtn").style.display = "block";
        GetFeatures_ByCategoryId(document.getElementById("Parent_Categories").value);
    }
}
function AddFeature() {

    var categoryId = document.getElementById("Parent_Categories").value;

    var newFeatRows = Array.from(document.querySelectorAll("tr.new_feat"));
    var newSubFeatRows = Array.from(document.querySelectorAll("tr.new_subfeat"));
    var filteredSubFeatRows = newSubFeatRows.filter(function (row) {
        return row.closest('tbody') && row.closest('tbody').hasAttribute("data-featureid");
    });

    var ToUpdateFeatRows = Array.from(document.querySelectorAll("tr.update_feat"));
    var ToUpdateSubFeatRows = Array.from(document.querySelectorAll("tr.update_subfeat"));

    var featuresToAdd = [];
    var subFeaturesToAdd = [];
    var featuresToUpdate = [];
    var subFeaturesToUpdate = [];

    if (newFeatRows.length > 0 && newSubFeatRows.length === 0) {
        swal.fire({
            title: 'هشدار!',
            text: 'حداقل یک زیر گروه ایجاد کنید',
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'متوجه شدم',
        });
    }
    else {
        if (newFeatRows.length > 0 && filteredSubFeatRows.length > 0) {

            newFeatRows.forEach(function (row) {

                var featureNameTag = row.querySelector(".tbl_name_col");
                var feature_displayType_Tag = row.querySelector(".tbl_select_col");
                var parentButton = row.querySelector(".tbl_btn_col");

                if (featureNameTag && feature_displayType_Tag && parentButton) {

                    var featureName = featureNameTag.value;
                    var feature_displayType = parseInt(feature_displayType_Tag.value, 10);
                    var parentid = parentButton.getAttribute("data-parentid");

                    var featureValues = [];
                    var subRows = document.querySelectorAll(`[data-parentid="${parentid}"].suboption tbody tr.new_subfeat`);
                    subRows.forEach(function (subRow) {

                        var subFeatureNameInput = subRow.querySelector(".form-control");

                        if (subFeatureNameInput) {

                            var subFeatureName = subFeatureNameInput.value;
                            featureValues.push({ Name: subFeatureName });
                        }
                    });

                    featuresToAdd.push({
                        DisplayedName: featureName,
                        DisplayType: feature_displayType,
                        FeatureItems: featureValues
                    });
                }
            });

            filteredSubFeatRows.forEach(function (row) {

                var parentid = row.closest('tbody').getAttribute("data-featureid");
                var subFeatureNameInput = row.querySelector(".form-control");

                if (subFeatureNameInput) {

                    var subFeatureName = subFeatureNameInput.value;
                    subFeaturesToAdd.push({ FeatureId: parentid, Name: subFeatureName });
                }
            });
        }
        if (newFeatRows.length > 0 && filteredSubFeatRows.length === 0) {
            newFeatRows.forEach(function (row) {

                var featureNameTag = row.querySelector(".tbl_name_col");
                var feature_displayType_Tag = row.querySelector(".tbl_select_col");
                var parentButton = row.querySelector(".tbl_btn_col");

                if (featureNameTag && feature_displayType_Tag && parentButton) {

                    var featureName = featureNameTag.value;
                    var feature_displayType = parseInt(feature_displayType_Tag.value, 10);
                    var parentid = parentButton.getAttribute("data-parentid");

                    var featureValues = [];
                    var subRows = document.querySelectorAll(`[data-parentid="${parentid}"].suboption tbody tr.new_subfeat`);
                    subRows.forEach(function (subRow) {

                        var subFeatureNameInput = subRow.querySelector(".form-control");

                        if (subFeatureNameInput) {

                            var subFeatureName = subFeatureNameInput.value;
                            featureValues.push({ Name: subFeatureName });
                        }
                    });

                    featuresToAdd.push({
                        DisplayedName: featureName,
                        DisplayType: feature_displayType,
                        FeatureItems: featureValues
                    });
                }
            });
        }
        if (newFeatRows.length === 0 && filteredSubFeatRows.length > 0) {
            filteredSubFeatRows.forEach(function (row) {

                var parentid = row.closest('tbody').getAttribute("data-featureid");
                var subFeatureNameInput = row.querySelector(".form-control");

                if (subFeatureNameInput) {

                    var subFeatureName = subFeatureNameInput.value;
                    subFeaturesToAdd.push({ FeatureId: parentid, Name: subFeatureName });
                }
            });
        }

        ToUpdateFeatRows.forEach(function (row) {

            var featureid = row.dataset.featureid;
            var displayedNameInput = row.querySelector(".tbl_name_col");
            var displayTypeSelect = row.querySelector(".tbl_select_col");

            if (displayedNameInput && displayTypeSelect) {

                var displayedName = displayedNameInput.value;
                var displayType = parseInt(displayTypeSelect.value, 10);
                featuresToUpdate.push({ Id: featureid, DisplayedName: displayedName, DisplayType: displayType });

            } else {
                console.error("خطایی رخ داده است");
            }
        });

        ToUpdateSubFeatRows.forEach(function (row) {

            var parentid = row.closest('tbody').getAttribute("data-featureid");
            console.log(parentid);
            var subFeatureId = row.getAttribute("data-subfeatureid");
            console.log(subFeatureId);
            var subFeatureNameInput = row.querySelector(".form-control");

            if (subFeatureNameInput) {
                var subFeatureName = subFeatureNameInput.value;
                subFeaturesToUpdate.push({ Id: Number(subFeatureId), Name: subFeatureName, FeatureId: Number(parentid) });
            }
        });
        function ajaxRequest(url, data, successMessage, errorMessage) {
            return $.ajax({
                contentType: 'application/json',
                dataType: 'json',
                type: "POST",
                url: url,
                data: JSON.stringify(data),
                success: function (response) {
                    if (response.isSuccess) {
                        swal.fire({
                            title: 'موفق!',
                            text: successMessage,
                            icon: 'success',
                            showCancelButton: false,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: 'بسیار خب',
                        }).then(function () {
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
                    alert(errorMessage);
                }
            });
        }

        if (featuresToAdd.length > 0) {

            var postData = {
                CategoryId: categoryId,
                Features: featuresToAdd
            };
            ajaxRequest(
                "/Admin/Products/AddNewFeature",
                postData,
                'ویژگی جدید اضافه شد!',
                'خطا در افزودن ویژگی جدید'
            );
        }

        if (subFeaturesToAdd.length > 0) {

            var postData = {
                FeatureItems: subFeaturesToAdd
            };
            ajaxRequest(
                "/Admin/Products/AddNewFeatureItem",
                postData,
                'ویژگی فرعی جدید اضافه شد!',
                'خطا در افزودن ویژگی فرعی جدید'
            );
        }

        if (featuresToUpdate.length > 0) {
            var post_update_feats_Data = {
                Feature_ToUPdate: featuresToUpdate
            };
            ajaxRequest(
                "/Admin/Products/EditFeature",
                post_update_feats_Data,
                'ویژگی به روز شد!',
                'خطا در به روز رسانی ویژگی'
            );
        }

        if (subFeaturesToUpdate.length > 0) {

            console.log(subFeaturesToUpdate);

            var post_update_featitems_Data = {
                FeatureItems_ToUPdate: subFeaturesToUpdate
            };
            ajaxRequest(
                "/Admin/Products/EditFeatureItem",
                post_update_featitems_Data,
                'ویژگی فرعی به روز شد!',
                'خطا در به روز رسانی ویژگی فرعی'
            );
        }
    }
}
function GetFeatures_ByCategoryId(categoryId) {

    $.ajax({

        url: '/Admin/Products/GetFeatures',
        method: 'GET',
        data: { CategoryId: categoryId },
        dataType: 'json',
        success: function (response) {

            $('#options_tbl_head').remove();
            $('#options_tbl_tbody').empty();
            $('.suboption').remove();

            let parentElement = $('#options_tbl');

            if (response.features.length > 0) {

                let thead = $('<thead id="options_tbl_head"></thead>').css({
                    textAlign: 'center',
                    backgroundColor: 'gainsboro',
                    borderBottom: '1px solid #777'
                }).html(`
                    <tr>
                        <th>نام</th>
                        <th>نوع نمایش</th>
                        <th>زیر گروه</th>
                        <th>حذف</th>
                    </tr>
                `);

                parentElement.prepend(thead);
            }

            $.each(response.features, function (index, feature) {
                let tableRow = $(`<tr class="old_feat" data-featureid="${feature.id}"></tr>`).css('borderBottom', '1px solid #777').html(`
                        <td>
                            <input type="text" class="form-control tbl_name_col" style="text-align:center;" placeholder="${feature.displayedName}" value="${feature.displayedName}" data-featureid="${feature.id}" data-initvalue="${feature.displayedName}" onchange="Modify_FeatValue(this, this.dataset.initvalue)" />
                        </td>
                        <td>
                            <select class="form-select tbl_select_col" style="text-align:right;" data-featureid="${feature.id}" data-InitValue="${feature.displayType}" onchange="Modify_FeatValue(this,this.dataset.InitValue)">
                                <option value="1" ${feature.displayType === 1 ? 'selected' : ''}>رادیو باتن</option>
                                <option value="2" ${feature.displayType === 2 ? 'selected' : ''}>چک باکس</option>
                                <option value="3" ${feature.displayType === 3 ? 'selected' : ''}>منو آبشاری</option>
                            </select>
                        </td>
                        <td>
                            <a class="btn btn-success tbl_btn_col" style="color:white;" data-parentid="${index + 1}" onclick="Show_SubFeatTable(${feature.featureItems.length}, ${index + 1})">نمایش</a>
                        </td>
                        <td>
                            <a class="btn btn-danger tbl_btn_col" style="color:white;" onclick="Remove_FeatRow_ByFeatId(this,this.dataset.featureid)" data-featureid="${feature.id}">حذف</a>
                        </td>
                    `);

                parentElement.append(tableRow);

                if (feature.featureItems.length > 0) {

                    let subTable = $('<table style="display:none"></table>').addClass('suboption').attr('data-parentid', index + 1).css({
                        textAlign: 'center',
                        width: '100% !important'
                    }).html(`
                        <thead style="text-align:center;background-color: gainsboro;border-bottom: 1px solid #777;">
                            <tr>
                                <th>نام</th>
                                <th>حذف</th>
                            </tr>
                        </thead>
                        <tbody data-featureid="${feature.id}"></tbody>
                    `);

                    $.each(feature.featureItems, function (subIndex, subFeature) {
                        let subTableRow = $(`<tr class="old_subfeat" data-featureid="${feature.id}" data-subfeatureid="${subFeature.id}"></tr>`).css('borderBottom', '1px solid #777').html(`
                            <td style="width:100% !important">
                                <input type="text" class="form-control" style="text-align:center" placeholder="${subFeature.name}" value="${subFeature.name}" data-subfeatureid="${subFeature.id}" data-initvalue="${subFeature.name}" onchange="Modify_SubFeatValue(this,this.dataset.initvalue)" />
                            </td>
                            <td>
                                <a class="btn btn-danger" style="color:white;height: 38px !important;" onclick="Remove_FeatItemRow_ByFeatItemId(this,this.dataset.subfeatureid)" data-subfeatureid="${subFeature.id}">حذف</a>
                            </td>
                        `);

                        subTable.find('tbody').append(subTableRow);
                    });

                    $('#SubOptionBody').append(subTable);
                }
            });
        },
        error: function (request, status, error) {
            console.error(error);
        }
    });
}
function Show_SubFeatTable(number, parentid) {

    document.getElementById('SubOptionBody_Parent').style.display = "block";
    document.getElementById('SubOptionBody_Parent').dataset.parentid = parentid;

    const All_SubTables = document.querySelectorAll(".suboption");

    for (var i = 0; i < All_SubTables.length; i++) {
        All_SubTables[i].style.display = "none";
    }

    let selector = `[data-parentid="${parentid}"].suboption`;
    const specificTable = document.querySelector(selector);

    if (specificTable) {
        specificTable.style.display = "block";
    }
}
function Modify_FeatValue(element, InitValue) {

    if (element.value !== InitValue && !element.classList.contains("update_feat")) {
        element.classList.add("update_feat");
        element.parentNode.parentNode.classList.add("update_feat");
    }

    if (element.value === InitValue) {
        element.classList.remove("update_feat");
        element.parentNode.parentNode.classList.remove("update_feat");
    }
}
function Modify_SubFeatValue(element, InitValue) {

    if (element.value !== InitValue && !element.classList.contains("update_subfeat")) {
        element.classList.add("update_subfeat");
        element.parentNode.parentNode.classList.add("update_subfeat");
    }

    if (element.value === InitValue) {
        element.classList.remove("update_subfeat");
        element.parentNode.parentNode.classList.remove("update_subfeat");
    }
}
function Remove_FeatRow_ByFeatId(button, id) {

    swal.fire({
        title: 'حذف ویژگی',
        text: "در مورد حذف ویژگی مطمئن هستید؟",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: 'بله ویژگی حذف شود',
        cancelButtonText: 'خیر'
    }).then((result) => {
        if (result.value) {

            var postData = {
                'Id': Number(id)
            };

            $.ajax({
                contentType: 'application/x-www-form-urlencoded',
                dataType: 'json',
                type: "POST",
                url: "/Admin/Products/DeleteFeature",
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
function Remove_FeatItemRow_ByFeatItemId(button, id) {

    swal.fire({
        title: 'حذف ویژگی',
        text: "در مورد حذف ویژگی مطمئن هستید؟",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: 'بله ویژگی حذف شود',
        cancelButtonText: 'خیر'
    }).then((result) => {
        if (result.value) {

            var postData = {
                'Id': Number(id)
            };

            $.ajax({
                contentType: 'application/x-www-form-urlencoded',
                dataType: 'json',
                type: "POST",
                url: "/Admin/Products/DeleteFeatureItem",
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
function Remove_FeatRow(button) {

    document.getElementById('SubOptionBody_Parent').style.display = "none";

    let table = button.closest('table');

    let thead = table.querySelector('thead');
    let tbody = table.querySelector('tbody');

    let parentRow = button.closest('tr');
    let parentRowIndex = parseInt(parentRow.id.replace("parent_row", ""));

    parentRow.parentNode.removeChild(parentRow);

    let tableRows = tbody.getElementsByTagName('tr');

    for (let i = 0; i < tableRows.length; i++) {

        tableRows[i].id = "parent_row" + (i + 1);

        let addButton = tableRows[i].querySelector('#addsub');

        if (addButton) {

            addButton.dataset.parentid = i + 1;
            addButton.setAttribute("onclick", "ShowSubOptions(" + (i + 1) + ")");
        }
    }

    let selector = `[data-parentid="${parentRowIndex}"].suboption`;
    const childTable = document.querySelector(selector);
    let siblings = document.getElementById("SubOptionBody").querySelectorAll("table");

    for (let k = 0; k < siblings.length; k++) {

        if (siblings[k] === childTable) {

            childTable.parentNode.removeChild(childTable);

            siblings = document.getElementById("SubOptionBody").querySelectorAll("table");

            for (let l = k; l < siblings.length; l++) {
                siblings[l].dataset.parentid = l + 1;
            }
            break;
        }
    }

    if (tbody.getElementsByTagName('tr').length === 0 && thead) {
        table.removeChild(thead);
    }
}

/////////////////////////////////////////////////////////////Product_Brands
function Show_InsertBrand_Modal() {
    $('#Insert_Brand_Modal').modal('show');
}
function Show_UpdateBrand_Modal() {

    $('#Update_Brand_Modal').modal('show');

    var selectElement = document.getElementById("Brands");
    var selectedIndex = selectElement.selectedIndex;
    var selectedOption = selectElement.options[selectedIndex];
    var selectedOptionText = selectedOption.innerText;

    document.getElementById("Update_BrandName").value = selectedOptionText;
}
function HideModal(modal_id) {
    $('#' + modal_id.toString()).modal('hide');
}
function Check_Brand_Value(id) {

    var selected_value = document.getElementById(id.toString()).value;

    if (selected_value == "") {

        document.getElementById("update_brand").style.display = "none";
        document.getElementById("delete_brand").style.display = "none";
    }
    else {

        document.getElementById("update_brand").style.display = "block";
        document.getElementById("delete_brand").style.display = "block";
    }
}

function AddOrUpdateBrand(selectId, value, text) {
    var selectElement = document.getElementById(selectId);

    if (!BrandExists(selectElement, value)) {
        var option = new Option(text, value);
        selectElement.add(option);
    }
}
function RemoveBrandByValue(selectId, value) {
    var selectElement = document.getElementById(selectId);
    var options = selectElement.options;

    for (var i = 0; i < options.length; i++) {
        if (options[i].value == value) {
            selectElement.remove(i);
            break;
        }
    }
}
function FindSelectedBrand(selectId) {

    var selectElement = document.getElementById(selectId);
    var selectedIndex = selectElement.selectedIndex;

    return selectedIndex >= 0 ? selectElement.options[selectedIndex] : null;
}
function BrandExists(selectElement, value) {

    for (var i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].value === value) {
            return true;
        }
    }
    return false;
}

function AddBrand() {

    var name = document.getElementById("Add_BrandName").value;

    var postData = {
        'Name': name
    };

    $.ajax({
        contentType: 'application/json',
        dataType: 'json',
        type: "POST",
        url: '/Admin/Products/AddNewBrand',
        data: JSON.stringify(postData),
        success: function (data) {

            if (data.isSuccess == true) {

                document.getElementById("Add_BrandName").value = '';

                AddOrUpdateBrand("Brands", data.data.id.toString(), data.data.name);

                var selectElement = document.getElementById("Brands");

                if (selectElement && selectElement.options.length === 0) {

                    document.getElementById("update_brand").style.display = "none";
                    document.getElementById("delete_brand").style.display = "none";
                }
                else {

                    document.getElementById("update_brand").style.display = "block";
                    document.getElementById("delete_brand").style.display = "block";
                }

                HideModal("Insert_Brand_Modal");

                swal.fire({
                    title: 'موفق!',
                    text: data.message,
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: 'بسیار خب',
                }).then(function (isConfirm) {
                    /*location.reload();*/
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
function UpdateBrand() {

    var id = document.getElementById("Brands").value;
    var name = document.getElementById("Update_BrandName").value;

    var postData = {
        'Id': id,
        'Name': name
    };

    $.ajax({
        contentType: 'application/json',
        dataType: 'json',
        type: "POST",
        url: '/Admin/Products/EditBrand',
        data: JSON.stringify(postData),
        success: function (data) {
            if (data.isSuccess == true) {

                document.getElementById("Update_BrandName").value = '';

                RemoveBrandByValue("Brands", id);
                AddOrUpdateBrand("Brands", id, name);

                HideModal("Update_Brand_Modal");

                swal.fire({
                    title: 'موفق!',
                    text: data.message,
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: 'بسیار خب',
                }).then(function (isConfirm) {
                    /*location.reload();*/
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
function DeleteBrand() {

    var id = document.getElementById("Brands").value;

    swal.fire({
        title: 'حذف برند',
        text: "در مورد حذف برند مطمئن هستید؟",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: 'بله برند حذف شود',
        cancelButtonText: 'خیر'
    }).then((result) => {
        if (result.value) {

            var postData = {
                'Id': id
            };

            $.ajax({
                contentType: 'application/json',
                dataType: 'json',
                type: "POST",
                url: '/Admin/Products/DeleteBrand',
                data: JSON.stringify(postData),
                success: function (data) {
                    if (data.isSuccess == true) {

                        RemoveBrandByValue("Brands", id);

                        var selectElement = document.getElementById("Brands");

                        if (selectElement && selectElement.options.length === 0) {

                            document.getElementById("update_brand").style.display = "none";
                            document.getElementById("delete_brand").style.display = "none";
                        }
                        else {

                            document.getElementById("update_brand").style.display = "block";
                            document.getElementById("delete_brand").style.display = "block";
                        }

                        swal.fire({
                            title: 'موفق!',
                            text: data.message,
                            icon: 'success',
                            showCancelButton: false,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: 'بسیار خب',
                        }).then(function (isConfirm) {
                            /*location.reload();*/
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

/////////////////////////////////////////////////////////////AddNewProduct
function ToggleSarchResult() {

    if (document.getElementById("Search_Result").classList.contains("active")) {

        document.getElementById("Search_Result_Header").classList.remove("toggle_menu_header");
        document.getElementById("Operation_Tab").classList.remove("operation_tab");
        document.getElementById("Operation_Tab_Parent").classList.add("operation_tab_parent");
    }
    else {

        document.getElementById("Search_Result_Header").classList.add("toggle_menu_header");
        document.getElementById("Operation_Tab").classList.add("operation_tab");
        document.getElementById("Operation_Tab_Parent").classList.remove("operation_tab_parent");
    }
}
function SearchProducts() {

    var formdata = new FormData();

    var tagifyTags = document.querySelectorAll("#RelProduct_Categories_Parent span.tagify__tag-text");
    var categoryIds = Array.from(tagifyTags).map(tag => Number(tag.dataset.id.trim()));

    var RelatedProductList = document.querySelectorAll("#Related_Product_List_Items div.js_child");
    var ProructIds = Array.from(RelatedProductList).map(product => Number(product.dataset.productid.trim()));

    var ProductName = document.getElementById("Rel_Product_Name").value;

    formdata.append("SearchKey", ProductName);

    categoryIds.forEach((id, index) => {
        formdata.append('Categories[' + index + ']', id);
    });

    ProructIds.forEach((id, index) => {
        formdata.append('RelProducts[' + index + ']', id);
    });

    $.ajax({
        type: "POST",
        url: "SearchProducts",
        contentType: false,
        processData: false,
        data: formdata,
        success: function (data) {

            if (data.isSuccess) {

                console.log(data);

                var searchResultItems = document.getElementById("Search_Result_Items");
                searchResultItems.innerHTML = '';

                if (data.data.relProducts.length > 0) {

                    document.getElementById("Search_Result").style.display = "block";
                    Show_SearchResult();
                    Hide_RelProductList();

                    data.data.relProducts.forEach(function (product) {

                        var productItem = `
                        <div id="product_parent_${product.productId}" class="col-12 col-md-3 mb_class js_child" data-productid="${product.productId}">
                            <div class="card">
                                <img id="product_img_${product.productId}" src="../../${product.imgSrc}" class="related_poduct_img" alt="${product.name}" style="border-bottom: 1px solid #eee;">
                                <div class="card-info">
                                    <span id="product_title_${product.productId}">${product.name}</span>
                                </div>
                                <button class="btn btn-primary" onclick="AddProductToList(this,this.dataset.productid)" data-productid="${product.productId}">
                                    افزودن به لیست
                                </button>
                            </div>
                        </div>`;

                        searchResultItems.insertAdjacentHTML('beforeend', productItem);

                    });
                }
                else {

                    document.getElementById("Search_Result").style.display = "block";
                    Show_SearchResult();
                    Hide_RelProductList();

                    var SearchResult = `<div class="col-md-12">
                                        <div class="no-products">
                                            <div class="icon">
                                                <i class="fas fa-exclamation-triangle"></i>
                                            </div>
                                            <div>محصول جدیدی برای افزودن به لیست محصولات مرتبط وجود ندارد</div>
                                        </div>
                                    </div>`

                    searchResultItems.insertAdjacentHTML('beforeend', SearchResult);
                }

            } else {
                swal.fire('هشدار!', data.message, 'warning');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}
function AddNewProduct() {

    var formdata = new FormData();

    var brand = document.getElementById("Brands").value;
    var Existence_mode = document.getElementById("Existence").value;
    var Product_Name = document.getElementById("Product_Name").value;
    var Unique_Code = document.getElementById("Unique_Code").value;
    var Product_Price = document.getElementById("Product_Price").value;
    var Product_Inventory = document.getElementById("Product_Inventory").value;
    var Delivery_Desc = document.getElementById("Delivery_Desc").value;
    var Product_Desc = document.getElementById("Product_Desc").value;
    var Product_Video_Link = document.getElementById("Product_Video_Link").value;
    var Delivery_Period_MinTime = document.getElementById("Delivery_Period_MinTime").value;
    var Delivery_Period_MaxTime = document.getElementById("Delivery_Period_MaxTime").value;

    var Meta_Title = document.getElementById("Meta_Title").value;
    var Meta_Url = document.getElementById("Meta_Url").value;

    var tagifyMetaKeywords = document.querySelectorAll("#Meta_Keywords_Parent span.tagify__tag-text");
    var metaKeywords = Array.from(tagifyMetaKeywords).map(tag => tag.innerText.trim()).join(", ");

    var Meta_Desc = document.getElementById("Meta_Desc").value;

    var tagifyTags = document.querySelectorAll("#Categories_Parent span.tagify__tag-text");
    var categoryIds = Array.from(tagifyTags).map(tag => Number(tag.dataset.id.trim()));

    var RelatedProductList = document.querySelectorAll("#Related_Product_List_Items div.js_child");
    var ProructIds = Array.from(RelatedProductList).map(product => product.dataset.productid.trim());

    var featureitems_input = document.querySelectorAll("#FeatureList input.js_featureitem_radio_or_check:checked");
    var featureitems_select = document.querySelectorAll("#FeatureList select.js_featureitem_select option:checked");

    var featureitems_List_input = Array.from(featureitems_input).map(tag => Number(tag.dataset.featureitemid.trim()));
    var featureitems_List_select = Array.from(featureitems_select).map(tag => Number(tag.value.trim()));

    var featureitems = [...featureitems_List_input, ...featureitems_List_select].join(',');

    formdata.append("BrandId", Number(brand));
    formdata.append("Existence", Existence_mode);
    formdata.append("Name", Product_Name);
    formdata.append("UniqueCode", Unique_Code);
    formdata.append("Price", parseInt(Product_Price.replace(/,/g, ''), 10));
    formdata.append("Inventory", parseInt(Product_Inventory, 10));
    formdata.append("DeliveryDescription", Delivery_Desc);
    formdata.append("Description", Product_Desc);
    formdata.append("VideoLink", Product_Video_Link);
    formdata.append("PageTitle", Meta_Title);
    formdata.append("PageUrl", Meta_Url);
    formdata.append("MetaKeywords", metaKeywords);
    formdata.append("MetaDescription", Meta_Desc);
    formdata.append("ProductFeatureItems", featureitems);
    formdata.append("MinTime", Delivery_Period_MinTime);
    formdata.append("MaxTime", Delivery_Period_MaxTime);

    /////////////////////////////////////////////////////////////////////Images

    const imagefiles = dropzoneMulti1.getAcceptedFiles();

    if (imagefiles.length > 0) {

        for (var i = 0; i < imagefiles.length; i++) {

            formdata.append('Images-' + i, imagefiles[i]);

        }
    }

    /////////////////////////////////////////////////////////////////////Documents

    const docfiles = dropzoneMulti2.getAcceptedFiles();

    if (docfiles.length > 0) {

        for (var i = 0; i < docfiles.length; i++) {

            formdata.append('Docs-' + i, docfiles[i]);

        }
    }

    /////////////////////////////////////////////////////////////////////Categories

    categoryIds.forEach((id, index) => {
        formdata.append('Categories[' + index + ']', id);
    });

    /////////////////////////////////////////////////////////////////////Options&SubOptions

    //#region

    //var Options = [];

    //var rows = document.querySelectorAll("#options_tbl_tbody tr");

    //if (rows.length > 0) {
    //    rows.forEach(function (row) {

    //        var displayedNameInput = row.querySelector(".OpName");
    //        var displayedPriceInput = row.querySelector(".OpPrice");
    //        var OptionToolTipSpan = row.querySelector(".tooltip-text");
    //        var parentButton = row.querySelector(".addsub");

    //        if (displayedNameInput && displayedPriceInput && parentButton) {

    //            var Name = displayedNameInput.value;
    //            var Price = parseInt(displayedPriceInput.value.replaceAll(",", ""), 10);

    //            var OptionToolTip = "";

    //            if (OptionToolTipSpan.firstChild) {
    //                if (OptionToolTipSpan.firstChild.nodeType === Node.TEXT_NODE) {
    //                    OptionToolTip = OptionToolTipSpan.firstChild.nodeValue.trim();
    //                }
    //                else {
    //                    OptionToolTip = OptionToolTipSpan.firstChild.textContent.trim();
    //                }
    //            }

    //            var parentid = parentButton.getAttribute("data-parentid");

    //            var OptionValues = [];
    //            var subRows = document.querySelectorAll(`[data-parentid="${parentid}"].suboption tbody tr`);
    //            subRows.forEach(function (subRow) {

    //                var subOptionNameInput = subRow.querySelector(".Sub_OpName");
    //                var subOptionPriceInput = subRow.querySelector(".Sub_OpPrice");
    //                var subOptionInventoryInput = subRow.querySelector(".Sub_OpInventory");
    //                var subOptionToolTipSpan = subRow.querySelector(".tooltip-text");

    //                if (subOptionNameInput) {

    //                    var subOptionName = subOptionNameInput.value;
    //                    var subOptionPrice = parseInt(subOptionPriceInput.value.replaceAll(",", ""), 10);
    //                    var subOptionInventory = parseInt(subOptionInventoryInput.value, 10);

    //                    var subOptionToolTip = "";

    //                    if (subOptionToolTipSpan.firstChild) {
    //                        if (subOptionToolTipSpan.firstChild.nodeType === Node.TEXT_NODE) {
    //                            subOptionToolTip = subOptionToolTipSpan.firstChild.nodeValue.trim();
    //                        } else {
    //                            subOptionToolTip = subOptionToolTipSpan.firstChild.textContent.trim();
    //                        }
    //                    }

    //                    OptionValues.push({
    //                        Name: subOptionName,
    //                        Price: subOptionPrice,
    //                        SubOptionInventory: subOptionInventory,
    //                        ToolTip_Desc: subOptionToolTip
    //                    });
    //                }
    //            });

    //            Options.push({
    //                Name: Name,
    //                Price: Price,
    //                SubProductOptions: OptionValues,
    //                ToolTip_Desc: OptionToolTip
    //            });

    //        } else {
    //            console.error("خطایی رخ داده است");
    //        }
    //    });
    //}

    //Options.forEach((option, index) => {

    //    formdata.append(`Options[${index}].Name`, option.Name);
    //    formdata.append(`Options[${index}].Price`, option.Price);
    //    formdata.append(`Options[${index}].ToolTip_Desc`, option.ToolTip_Desc);

    //    if (!option.SubProductOptions) {
    //        option.SubProductOptions = [];
    //    }

    //    option.SubProductOptions.forEach((subOption, subIndex) => {
    //        formdata.append(`Options[${index}].SubProductOptions[${subIndex}].Name`, subOption.Name);
    //        formdata.append(`Options[${index}].SubProductOptions[${subIndex}].Price`, subOption.Price);
    //        formdata.append(`Options[${index}].SubProductOptions[${subIndex}].SubOptionInventory`, subOption.SubOptionInventory);
    //        formdata.append(`Options[${index}].SubProductOptions[${subIndex}].ToolTip_Desc`, subOption.ToolTip_Desc);
    //    });
    //});

    //#endregion

    /////////////////////////////////////////////////////////////////////Color_Options

    var ColorOptions = [];

    var rows = document.querySelectorAll("#Colors_Tbl_TBody tr");

    if (rows.length > 0) {
        rows.forEach(function (row) {

            var ColorId = Number(row.dataset.colorid);
            var NameInput = row.querySelector(".OpName");
            var HexCodeInput = row.querySelector(".OpHex");
            var PriceInput = row.querySelector(".OpPrice");
            var InventoryInput = row.querySelector(".OpInventory");

            if (NameInput && HexCodeInput && PriceInput && InventoryInput) {

                var Name = NameInput.value;
                var HexCode = HexCodeInput.value;
                var Price = parseInt(PriceInput.value.replaceAll(",", ""), 10);
                var Inventory = parseInt(InventoryInput.value, 10);

                ColorOptions.push({
                    ColorId: ColorId,
                    Name: Name,
                    HexCode: HexCode,
                    Price: Price,
                    Inventory: Inventory
                });

            }
            else {
                console.error("خطایی رخ داده است");
            }
        });
    }

    ColorOptions.forEach((option, index) => {

        formdata.append(`ColorOptions[${index}].ColorId`, option.ColorId);
        formdata.append(`ColorOptions[${index}].Name`, option.Name);
        formdata.append(`ColorOptions[${index}].HexCode`, option.HexCode);
        formdata.append(`ColorOptions[${index}].Price`, option.Price);
        formdata.append(`ColorOptions[${index}].Inventory`, option.Inventory);
    });

    /////////////////////////////////////////////////////////////////////RelatedProducts

    ProructIds.forEach((id, index) => {
        formdata.append('RelProducts[' + index + ']', id);
    });

    var ajaxRequest = $.ajax({

        type: "POST",
        url: "AddNewProduct",
        contentType: false,
        processData: false,
        data: formdata,
        success: function (data) {

            if (data.isSuccess == true) {
                swal.fire(
                    'موفق!',
                    data.message,
                    'success'
                ).then(function (isConfirm) {
                    window.location.href = "/Admin/Products/GetAllProducts";
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
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }

    });

    ajaxRequest.done(function (xhr, textStatus) {
    });
}

/////////////////////////////////////////////////////////////Public Functions

function GetCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function SetCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function FormatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/////////////////////////////////////////////////////Init Functions
function GetProductInfos(productModel) {

    SetCookie("Added_Categories", "", 1);
    SetCookie("Removed_Categories", "", 1);
    SetCookie("Removed_ColorOptions", "", 1);
    SetCookie("Updated_ColorOptions", "", 1);
    function appendFeatureList(categoryId) {

        $.ajax({
            url: '/Admin/Products/GetFeatures',
            method: 'GET',
            data: { CategoryId: categoryId },
            dataType: 'json',
            success: function (response) {

                console.log(response);

                const featureList = document.getElementById('FeatureList');
                const featureitemlist = productModel.productFeatureItems.map(featureitem => featureitem.id);

                response.features.forEach(function (feature) {
                    const li = document.createElement('li');
                    li.className = 'params-list-item';
                    li.setAttribute('data-category-id', categoryId);

                    let valueHTML = '';
                    switch (feature.displayType) {
                        case 1: // Radio button
                        case 2: // Checkbox
                            valueHTML += '<span class="flex-container block">';
                            feature.featureItems.forEach(function (item) {
                                const checked = featureitemlist.includes(item.id) ? 'checked' : '';
                                valueHTML += `
                                        <label class="flex-item">
                                            <input class="js_featureitem_radio_or_check" data-featureitemid="${item.id}" type="${feature.displayType == 1 ? 'radio' : 'checkbox'}" name="${feature.displayedName}" value="${item.id}" ${checked}> ${item.name}
                                        </label>`;
                            });
                            valueHTML += '</span>';
                            break;
                        case 3: // Select
                            valueHTML += '<span class="flex-container block">';
                            valueHTML += `
                                    <select name="${feature.displayedName}" class="form-select js_featureitem_select">`;
                            feature.featureItems.forEach(function (item) {
                                const selected = featureitemlist.includes(item.id) ? 'selected' : '';
                                valueHTML += `<option value="${item.id}" ${selected}>${item.name}</option>`;
                            });
                            valueHTML += `</select>`;
                            valueHTML += `</span>`;
                            break;
                        default:
                            valueHTML = `Value for ${feature.displayedName}`;
                            break;
                    }

                    li.innerHTML = `
                            <div class="params-list-key">
                                <span class="block">${feature.displayedName}</span>
                            </div>
                            <div class="params-list-value">
                                ${valueHTML}
                            </div>`;
                    featureList.appendChild(li);
                });
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    }
    function removeFeatures(categoryId) {
        const featureList = document.getElementById('FeatureList');
        const featureItems = featureList.querySelectorAll('.params-list-item');

        featureItems.forEach(function (featureItem) {
            const featureCategoryId = featureItem.getAttribute('data-category-id');

            // If the feature item is associated with the removed category, remove it
            if (featureCategoryId && parseInt(featureCategoryId) === parseInt(categoryId)) {
                featureList.removeChild(featureItem);
            }
        });
    }

    //////////////////////////////////////////////////////////////BrandId

    $('#Brands').select2();

    var BrandsSelect = document.getElementById('Brands');

    for (var i = 0; i < BrandsSelect.options.length; i++) {

        var option = BrandsSelect.options[i];

        if (option.value == productModel.brandId) {

            $('#Brands').val(option.value).trigger('change');

            break;
        }
    }

    //////////////////////////////////////////////////////////////Existence

    var ExistenceSelect = document.getElementById('Existence');

    for (var i = 0; i < ExistenceSelect.options.length; i++) {

        var option = ExistenceSelect.options[i];

        if (option.value == productModel.existence.toString()) {

            option.selected = true;
            break;
        }
    }


    //////////////////////////////////////////////////////////////Product_Name

    document.getElementById('Product_Name').value = productModel.name;

    //////////////////////////////////////////////////////////////Unique_Code

    document.getElementById('Unique_Code').value = productModel.uniqueCode;

    //////////////////////////////////////////////////////////////Product_Price

    document.getElementById('Product_Price').value = productModel.price;
    Comma('Product_Price');

    //////////////////////////////////////////////////////////////Product_Inventory

    document.getElementById('Product_Inventory').value = productModel.inventory;

    //////////////////////////////////////////////////////////////Delivery_Desc

    document.getElementById('Delivery_Desc').value = productModel.deliveryDescription;

    //////////////////////////////////////////////////////////////Product_Desc

    document.getElementById('Product_Desc').value = productModel.description;

    //////////////////////////////////////////////////////////////Product_Video_Link

    document.getElementById('Product_Video_Link').value = productModel.videoLink;

    //////////////////////////////////////////////////////////////Meta_Title

    document.getElementById('Meta_Title').value = productModel.pageTitle;

    //////////////////////////////////////////////////////////////Meta_Url

    document.getElementById('Meta_Url').value = productModel.pageUrl;

    //////////////////////////////////////////////////////////////TagifyBasic

    document.getElementById('TagifyBasic').value = productModel.metaKeywords;

    //////////////////////////////////////////////////////////////Meta_Desc

    document.getElementById('Meta_Desc').value = productModel.metaDescription;

    //////////////////////////////////////////////////////////////Delivery_Period_MinTime

    document.getElementById('Delivery_Period_MinTime').value = productModel.minTime;

    //////////////////////////////////////////////////////////////Delivery_Period_MaxTime

    document.getElementById('Delivery_Period_MaxTime').value = productModel.maxTime;

    //////////////////////////////////////////////////////////////TagifyUserList

    let concatenatedNames = productModel.categoryIds.map(category => category.name).join(', ');

    console.log("productModel_categoryIds:", productModel.categoryIds);
    console.log("concatenatedNames:", concatenatedNames);

    let CategoryIdsList = productModel.categoryIds.map(category => category.id);

    document.getElementById('TagifyUserList1').value = concatenatedNames;

    if (CategoryIdsList.length != 0) {
        CategoryIdsList.forEach(function (CategoryId) {
            appendFeatureList(CategoryId);
        });
    }

    //////////////////////////////////////////////////////////////Images

    var productimages = productModel.images;
    var myDropzone = Dropzone.forElement("#dropzone-multi-1");
    var Removed_Images = [];

    if (productimages.length != 0) {
        productimages.forEach(function (image) {

            var mockFile = {
                name: image.filePath.split('/').pop(),
                size: 0,
                dataURL: "../../" + image.filePath,
                ImageId: image.id
            };

            myDropzone.emit("addedfile", mockFile);
            myDropzone.emit("thumbnail", mockFile, mockFile.dataURL);
            myDropzone.emit("complete", mockFile);
            myDropzone.files.push(mockFile);

            var sizeElement = mockFile.previewElement.querySelector('.dz-size');

            if (sizeElement) {
                sizeElement.innerHTML = '<strong>کمتر از 2 مگابایت</strong>';
            }

            var previewelement = mockFile.previewElement;
            previewelement.classList.add("old_img");
            previewelement.classList.remove("new_img");

            var removeButton = mockFile.previewElement.querySelector('.dz-remove');

            if (removeButton) {

                removeButton.removeEventListener('click', myDropzone._removeFileEvent);
                removeButton.setAttribute('href', `javascript:RemoveImage(${image.id});`);
                removeButton.setAttribute('data-dz-remove', image.id);
                removeButton.addEventListener('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    RemoveImage(image.id);
                });
            }
        });
    }
    function RemoveImage(ImageId) {

        Removed_Images.push({ ImageId: Number(ImageId) });
        SetCookie("Removed_Images", JSON.stringify(Removed_Images), 1);
        console.log("Removed_Images", Removed_Images);
    }

    //////////////////////////////////////////////////////////////Documents

    var productdocuments = productModel.documents;
    var myDropzone = Dropzone.forElement("#dropzone-multi-2");
    var Removed_Documents = [];

    if (productdocuments.length != 0) {
        productdocuments.forEach(function (document) {

            var mockFile = {
                name: document.filePath.split('/').pop(),
                size: 0,
                dataURL: "../../" + document.filePath,
                DocumentId: document.id
            };

            myDropzone.emit("addedfile", mockFile);
            myDropzone.emit("thumbnail", mockFile, "../../AdminTemplate/assets/img/dropzonepreview/pdf/pdfpreview.png");
            myDropzone.emit("complete", mockFile);
            myDropzone.files.push(mockFile);

            var sizeElement = mockFile.previewElement.querySelector('.dz-size');
            if (sizeElement) {
                sizeElement.innerHTML = '<strong>کمتر از 3 مگابایت</strong>';
            }

            var previewelement = mockFile.previewElement;
            previewelement.classList.add("old_doc");
            previewelement.classList.remove("new_doc");

            var removeButton = mockFile.previewElement.querySelector('.dz-remove');

            if (removeButton) {

                removeButton.removeEventListener('click', myDropzone._removeFileEvent);
                removeButton.setAttribute('href', `javascript:RemoveDocument(${document.id});`);
                removeButton.setAttribute('data-dz-remove', document.id);
                removeButton.addEventListener('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    RemoveDocument(document.id);
                });
            }
        });
    }

    function RemoveDocument(DocumentId) {

        Removed_Documents.push({ DocumentId: Number(DocumentId) });
        SetCookie("Removed_Documents", JSON.stringify(Removed_Documents), 1);
        console.log("Removed_Documents", Removed_Documents);

    }

    //////////////////////////////////////////////////////////////Options

    //#region

    //let OptionsList = productModel.options;

    //if (OptionsList.length != 0) {
    //    OptionsList.forEach(function (option) {
    //        let ColId = option.id;
    //        let ColName = option.name;
    //        let ColPrice = FormatNumber(option.price);
    //        let ColParentId = option.parentOptionId;
    //        let ColSubInventory = option.subOptionInventory;
    //        let HasToolTip = option.toolTip_Desc != "" && option.toolTip_Desc != "توضیحاتی ارائه نشده است";
    //        let ColSubToolTip = HasToolTip ? option.toolTip_Desc : "توضیحاتی ارائه نشده است";

    //        console.log("ColSubToolTip:", ColSubToolTip);

    //        if (ColParentId == null) {
    //            document.getElementById("SubOptionBody_Parent").style.display = "none";

    //            const specificTableHead = document.getElementById('options_tbl_head');
    //            let parentElement = document.getElementById('options_tbl');

    //            if (!specificTableHead) {

    //                let thead = document.createElement('thead');
    //                thead.id = "options_tbl_head";
    //                thead.style.textAlign = 'center';
    //                thead.style.backgroundColor = 'gainsboro';
    //                thead.style.borderBottom = '1px solid #777';

    //                thead.innerHTML = `
    //                <tr>
    //                    <th>نام</th>
    //                    <th>قیمت</th>
    //                    <th>زیر گروه</th>
    //                    <th>معرفی</th>
    //                    <th>حذف</th>
    //                </tr>
    //            `;
    //                parentElement.insertBefore(thead, parentElement.firstChild);
    //            }

    //            let tableRow = createOptionRow(ColId, ColName, ColPrice, HasToolTip, ColSubToolTip);
    //            document.getElementById('options_tbl_tbody').appendChild(tableRow);
    //        }
    //        else {
    //            let selector = `[data-parentid="${ColParentId}"].suboption`;
    //            const specificTable = document.querySelector(selector);

    //            if (specificTable) {
    //                let tbody = specificTable.querySelector('tbody');
    //                let tableRow = createSubOptionRow(ColId, ColName, ColPrice, ColSubInventory, HasToolTip, ColSubToolTip);
    //                tbody.appendChild(tableRow);
    //            }
    //            else {
    //                let table = document.createElement('table');
    //                table.className = "suboption";
    //                table.dataset.parentid = ColParentId.toString();
    //                table.innerHTML = `
    //                <thead style="text-align:center;background-color: gainsboro;border-bottom: 1px solid #777;">
    //                    <tr>
    //                        <th>نام</th>
    //                        <th>قیمت</th>
    //                        <th>موجودی</th>
    //                        <th>معرفی</th>
    //                        <th>حذف</th>
    //                    </tr>
    //                </thead>
    //                <tbody></tbody>
    //            `;

    //                let tbody = table.querySelector('tbody');
    //                let tableRow = createSubOptionRow(ColId, ColName, ColPrice, ColSubInventory, HasToolTip, ColSubToolTip);
    //                tbody.appendChild(tableRow);

    //                document.getElementById('SubOptionBody').appendChild(table);
    //            }
    //        }
    //    });
    //}

    //function createSubOptionRow(ColId, ColName, ColPrice, ColSubInventory, HasToolTip, ColSubToolTip) {

    //    let tableRow = document.createElement('tr');
    //    tableRow.style.borderBottom = "1px solid #777";
    //    tableRow.className = "old_suboption";
    //    tableRow.dataset.id = ColId.toString();

    //    tableRow.innerHTML = `
    //    <td>
    //        <input type="text" class="form-control Sub_OpName" style="text-align:center" placeholder="قرمز" value="${ColName}" onchange="ModifySubOption(${ColId})" />
    //    </td>
    //    <td>
    //        <input type="text" class="form-control Sub_OpPrice" style="text-align:center" placeholder="500,000" value="${ColPrice}" onkeyup="Comma_Plus(this)" onchange="ModifySubOption(${ColId})" />
    //    </td>
    //    <td>
    //        <input type="number" class="form-control Sub_OpInventory" style="text-align:center" placeholder="10" value="${ColSubInventory}" min="0" onchange="ModifySubOption(${ColId})" />
    //    </td>
    //    <td>
    //        <div class="tooltip-custom">
    //            <a class="btn ${HasToolTip ? 'btn-info' : 'btn-secondary'}" style="color:white;height: 38px !important;" data-toggle="modal" data-target="#tooltipModal" onclick="ShowToolTipModal_For_UpdateProduct(this,this.dataset.id)" data-id="${ColId}">
    //                <i class="fas fa-question"></i>
    //            </a>
    //            <span class="tooltip-text"></span>
    //        </div>
    //    </td>
    //    <td>
    //        <a class="btn btn-danger Sub_RemoveRow" style="color:white;height: 38px !important;" onclick="Remove_SubOption(this,${ColId})"><i class="fas fa-trash"></i></a>
    //    </td>
    //`;

    //    let tooltipTextElement = tableRow.querySelector('.tooltip-text');

    //    if (tooltipTextElement) {
    //        let sampleTextNode = document.createTextNode(ColSubToolTip);
    //        tooltipTextElement.insertBefore(sampleTextNode, tooltipTextElement.firstChild);
    //    }

    //    return tableRow;
    //}

    //function createOptionRow(ColId, ColName, ColPrice, HasToolTip, ColSubToolTip) {

    //    let tableRow = document.createElement('tr');
    //    tableRow.id = "parent_row" + ColId.toString();
    //    tableRow.style.borderBottom = "1px solid #777";
    //    tableRow.className = "old_option";

    //    tableRow.innerHTML = `
    //    <td>
    //        <input type="text" class="form-control OpName" style="text-align:center" placeholder="رنگ" value="${ColName}" onchange="ModifyOption(${ColId})" />
    //    </td>
    //    <td>
    //        <input type="text" class="form-control OpPrice" style="text-align:center" placeholder="500,000" value="${ColPrice}" onkeyup="Comma_Plus(this)" onchange="ModifyOption(${ColId})" />
    //    </td>
    //    <td>
    //        <a class="btn btn-success addsub" style="color:white;height: 38px !important;" data-parentid="${ColId}" onclick="ShowSubOptions(${ColId})"><i class="fas fa-eye"></i></a>
    //    </td>
    //    <td>
    //        <div class="tooltip-custom">
    //            <a class="btn ${HasToolTip ? 'btn-info' : 'btn-secondary'}" style="color:white;height: 38px !important;" data-toggle="modal" data-target="#tooltipModal" onclick="ShowToolTipModal_For_UpdateProduct_ForOption(this,this.dataset.id)" data-id="${ColId}">
    //                <i class="fas fa-question"></i>
    //            </a>
    //            <span class="tooltip-text"></span>
    //        </div>
    //    </td>
    //    <td>
    //        <a class="btn btn-danger RemoveRow" style="color:white;height: 38px !important;" onclick="Remove_Option(this,${ColId})"><i class="fas fa-trash"></i></a>
    //    </td>
    //`;

    //    let tooltipTextElement = tableRow.querySelector('.tooltip-text');

    //    if (tooltipTextElement) {
    //        let sampleTextNode = document.createTextNode(ColSubToolTip);
    //        tooltipTextElement.insertBefore(sampleTextNode, tooltipTextElement.firstChild);
    //    }

    //    return tableRow;
    //}


    //////////////////////////////////////////////////////////////ColorOptions

    //#endregion

    let ColorOptionsList = productModel.colorOptions;

    if (ColorOptionsList.length != 0) {
        ColorOptionsList.forEach(function (option) {

            Add_ColorOption_As_TableRow(option.id, option.colorId, option.name, option.hexCode, option.price, option.inventory);
            Add_ColorItem_To_ColorList(option.id, option.colorId, option.name, option.hexCode);

            RemoveOptionByValue("Colors", option.colorId);
            RemoveOptionByValue("Insert_SelectColor", option.colorId);
            RemoveOptionByValue("Update_SelectColor", option.colorId);
        });
    }

    //////////////////////////////////////////////////////////////Related_Products

    var RelProductsList = productModel.relatedProduct;

    if (RelProductsList.length != 0) {
        RelProductsList.forEach(function (RelProduct) {

            let RelProductId = RelProduct.id
            let relativePath = "../../" + RelProduct.filePath;
            let title = RelProduct.name;

            let Row = document.createElement('div');
            Row.classList = "col-12 col-md-3 mb_class js_child";
            Row.setAttribute('data-productid', RelProductId.toString());

            Row.innerHTML = `
                        <div class="card">
                                    <img src="${relativePath}" class="related_poduct_img" alt="${title}" style="border-bottom: 1px solid #eee;">
                            <div class="card-info">
                                <span>${title}</span>
                            </div>
                            <button class="btn btn-danger remove-btn" onclick="RemoveRelProduct(this,${RelProductId})">
                                حذف
                            </button>
                        </div>
                    `;

            document.getElementById("Related_Product_List").style.display = "block";
            document.getElementById('Related_Product_List_Items').appendChild(Row);
        });
    }

}
function tagTemplate(tagData) {
    return `
            <tag title="${tagData.name}"
                contenteditable='false'
                spellcheck='false'
                tabIndex="-1"
                class="${this.settings.classNames.tag} ${tagData.class ? tagData.class : ''}"
                ${this.getAttributes(tagData)}
            >
                <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>
                <div>
                    <span class='tagify__tag-text' data-id="${tagData.value}">${tagData.name}</span>
                </div>
            </tag>
        `;
}
function suggestionItemTemplate(tagData) {
    return `
            <div ${this.getAttributes(tagData)}
                class='tagify__dropdown__item align-items-center ${tagData.class ? tagData.class : ''}'
                tabindex="0"
                role="option"
            >
                <strong>${tagData.name}</strong>
            </div>
        `;
}
function setupTagify(el, url) {

    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log('Data received:', data);

            const usersList = data.map(category => ({
                value: category.id,
                name: category.name
            }));

            console.log('Users List:', usersList);

            let tagify = new Tagify(el, {
                tagTextProp: 'name',
                enforceWhitelist: true,
                skipInvalid: true,
                dropdown: {
                    closeOnSelect: false,
                    enabled: 0,
                    classname: 'users-list',
                    searchKeys: ['name']
                },
                templates: {
                    tag: tagTemplate,
                    dropdownItem: suggestionItemTemplate
                },
                whitelist: usersList
            });

            tagify.on('dropdown:show dropdown:updated', onDropdownShow);
            tagify.on('dropdown:select', onSelectSuggestion);

            let addAllSuggestionsEl;

            function onDropdownShow(e) {
                let dropdownContentEl = e.detail.tagify.DOM.dropdown.content;

                if (tagify.suggestedListItems.length > 1) {
                    addAllSuggestionsEl = getAddAllSuggestionsEl();

                    dropdownContentEl.insertBefore(addAllSuggestionsEl, dropdownContentEl.firstChild);
                }
            }

            function onSelectSuggestion(e) {
                if (e.detail.elm == addAllSuggestionsEl) tagify.dropdown.selectAll.call(tagify);
            }

            function getAddAllSuggestionsEl() {
                return tagify.parseTemplate('dropdownItem', [
                    {
                        class: 'addAll',
                        name: 'افزودن همه',
                        count: `${tagify.settings.whitelist.length} دسته‌بندی`
                    }
                ]);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error fetching categories:', error);
        }
    });
}

///////////GetCategories && Create_Added_Categories_List_for_UpdateProduct && Create_Removed_Categories_List_for_UpdateProduct 
function ProductCategory(productModel) {

    var Added_Categories = [];
    var Removed_Categories = [];

    const TagifyUserListEl = document.querySelector('#TagifyUserList1');

    $.ajax({
        url: '/admin/Products/GetCategories',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log('Data received:', data);

            const usersList = data.map(category => ({
                value: category.id,
                name: category.name
            }));

            console.log('Users List:', usersList);

            let TagifyUserList = new Tagify(TagifyUserListEl, {
                tagTextProp: 'name',
                enforceWhitelist: true,
                skipInvalid: true,
                dropdown: {
                    closeOnSelect: false,
                    enabled: 0,
                    classname: 'users-list',
                    searchKeys: ['name']
                },
                templates: {
                    tag: tagTemplate,
                    dropdownItem: suggestionItemTemplate
                },
                whitelist: usersList
            });

            TagifyUserList.on('dropdown:show dropdown:updated', onDropdownShow);
            TagifyUserList.on('dropdown:select', onSelectSuggestion);
            TagifyUserList.on('remove', onTagRemove);

            let addAllSuggestionsEl;

            function onDropdownShow(e) {

                let dropdownContentEl = e.detail.tagify.DOM.dropdown.content;

                if (TagifyUserList.suggestedListItems.length > 1) {

                    addAllSuggestionsEl = getAddAllSuggestionsEl();

                    dropdownContentEl.insertBefore(addAllSuggestionsEl, dropdownContentEl.firstChild);
                }
            }

            function onSelectSuggestion(e) {

                var Added_Category_Cookie = GetCookie("Added_Categories");

                if (Added_Category_Cookie) {
                    Added_Categories = JSON.parse(Added_Category_Cookie);
                }

                var Removed_Categories_Cookie = GetCookie("Removed_Categories");

                if (Removed_Categories_Cookie) {
                    Removed_Categories = JSON.parse(Removed_Categories_Cookie);
                }

                const selectedItemData = e.detail.data;

                console.log('Selected item data-id:', selectedItemData.value);

                let CategoryIdsList = productModel.categoryIds.map(category => category.id);

                let Added_Category = 0;

                if (!CategoryIdsList.includes(Number(selectedItemData.value))) {

                    ///////////////////////////////////////////////////////////////اضافه کردن دسته بندی جدید

                    Added_Category = Number(selectedItemData.value);

                    Added_Categories.push({
                        Id: Added_Category
                    });

                    console.log("Added_Categories:", Added_Categories);
                    SetCookie("Added_Categories", JSON.stringify(Added_Categories), 1);
                    console.log("Removed_Categories:", Removed_Categories);

                }
                else {

                    let indexToRemove = Removed_Categories.findIndex(cat => cat.Id === Number(selectedItemData.value));

                    if (indexToRemove !== -1) {
                        Removed_Categories.splice(indexToRemove, 1);
                    }

                    console.log("Added_Categories:", Added_Categories);
                    console.log("Removed_Categories:", Removed_Categories);
                }

                appendFeatureList(selectedItemData.value);
            }

            function onTagRemove(e) {

                var Added_Category_Cookie = GetCookie("Added_Categories");

                if (Added_Category_Cookie) {
                    Added_Categories = JSON.parse(Added_Category_Cookie);
                }

                var Removed_Categories_Cookie = GetCookie("Removed_Categories");

                if (Removed_Categories_Cookie) {
                    Removed_Categories = JSON.parse(Removed_Categories_Cookie);
                }

                const removedItemData = e.detail.data;

                console.log('Removed item data-id:', removedItemData.value);

                let CategoryIdsList = productModel.categoryIds.map(category => category.id);

                let Removed_Category = 0;

                if (CategoryIdsList.includes(Number(removedItemData.value))) {

                    ///////////////////////////////////////////////////////////////حذف دسته بندی ثبت شده برای این محصول در دیتابیس

                    Removed_Category = Number(removedItemData.value);

                    Removed_Categories.push({
                        Id: Removed_Category
                    });

                    console.log("Added_Categories:", Added_Categories);
                    console.log("Removed_Categories:", Removed_Categories);
                    SetCookie("Removed_Categories", JSON.stringify(Removed_Categories), 1);
                }
                else {

                    let indexToRemove = Added_Categories.findIndex(cat => cat.Id === Number(removedItemData.value));

                    if (indexToRemove !== -1) {
                        Added_Categories.splice(indexToRemove, 1);
                    }

                    console.log("Added_Categories:", Added_Categories);
                    console.log("Removed_Categories:", Removed_Categories);
                }

                removeFeatures(removedItemData.value);
            }

            function appendFeatureList(categoryId) {

                $.ajax({
                    url: '/Admin/Products/GetFeatures',
                    method: 'GET',
                    data: { CategoryId: categoryId },
                    dataType: 'json',
                    success: function (response) {

                        console.log(response);

                        const featureList = document.getElementById('FeatureList');
                        const featureitemlist = productModel.productFeatureItems.map(featureitem => featureitem.id);

                        response.features.forEach(function (feature) {
                            const li = document.createElement('li');
                            li.className = 'params-list-item';
                            li.setAttribute('data-category-id', categoryId);

                            let valueHTML = '';
                            switch (feature.displayType) {
                                case 1: // Radio button
                                case 2: // Checkbox
                                    valueHTML += '<span class="flex-container block">';
                                    feature.featureItems.forEach(function (item) {
                                        const checked = featureitemlist.includes(item.id) ? 'checked' : '';
                                        valueHTML += `
                                        <label class="flex-item">
                                            <input class="js_featureitem_radio_or_check" data-featureitemid="${item.id}" type="${feature.displayType == 1 ? 'radio' : 'checkbox'}" name="${feature.displayedName}" value="${item.id}" ${checked}> ${item.name}
                                        </label>`;
                                    });
                                    valueHTML += '</span>';
                                    break;
                                case 3: // Select
                                    valueHTML += '<span class="flex-container block">';
                                    valueHTML += `
                                    <select name="${feature.displayedName}" class="form-select js_featureitem_select">`;
                                    feature.featureItems.forEach(function (item) {
                                        const selected = featureitemlist.includes(item.id) ? 'selected' : '';
                                        valueHTML += `<option value="${item.id}" ${selected}>${item.name}</option>`;
                                    });
                                    valueHTML += `</select>`;
                                    valueHTML += `</span>`;
                                    break;
                                default:
                                    valueHTML = `Value for ${feature.displayedName}`;
                                    break;
                            }

                            li.innerHTML = `
                            <div class="params-list-key">
                                <span class="block">${feature.displayedName}</span>
                            </div>
                            <div class="params-list-value">
                                ${valueHTML}
                            </div>`;
                            featureList.appendChild(li);
                        });
                    },
                    error: function (xhr, status, error) {
                        console.error(error);
                    }
                });
            }

            function removeFeatures(categoryId) {
                const featureList = document.getElementById('FeatureList');
                const featureItems = featureList.querySelectorAll('.params-list-item');

                featureItems.forEach(function (featureItem) {
                    const featureCategoryId = featureItem.getAttribute('data-category-id');

                    // If the feature item is associated with the removed category, remove it
                    if (featureCategoryId && parseInt(featureCategoryId) === parseInt(categoryId)) {
                        featureList.removeChild(featureItem);
                    }
                });
            }

            function getAddAllSuggestionsEl() {
                return TagifyUserList.parseTemplate('dropdownItem', [
                    {
                        class: 'addAll',
                        name: 'افزودن همه',
                        count: `${TagifyUserList.settings.whitelist.length} دسته‌بندی`
                    }
                ]);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error fetching categories:', error);
        }
    });
}

/////////////////////////////////////////////////////Option Functions

//#region

//function Remove_Option(button, optionid) {

//    var Removed_Options = [];
//    var Removed_Options_Cookie = GetCookie("Removed_Options");

//    if (Removed_Options_Cookie) {
//        Removed_Options = JSON.parse(Removed_Options_Cookie);
//    }

//    var Removed_SubOptions = [];
//    var Removed_SubOptions_Cookie = GetCookie("Removed_SubOptions");

//    if (Removed_SubOptions_Cookie) {
//        Removed_SubOptions = JSON.parse(Removed_SubOptions_Cookie);
//    }

//    document.getElementById('SubOptionBody_Parent').style.display = "none";

//    let table = button.parentNode.parentNode.parentNode.parentNode;

//    let thead = table.querySelector('thead');

//    let tbody = button.parentNode.parentNode.parentNode;

//    let parentRow = button.parentNode.parentNode;

//    let parentRowIndex = parseInt(parentRow.id.replace("parent_row", ""));

//    let tableRows = tbody.getElementsByTagName('tr');
//    const rowsCount = tbody.getElementsByTagName('tr');

//    for (let i = 0; i < tableRows.length; i++) {

//        if (tableRows[i] === parentRow) {

//            Removed_Options.push({ OptionId: optionid });
//            console.log("Removed_Options:", Removed_Options);
//            SetCookie("Removed_Options", JSON.stringify(Removed_Options), 1);

//            parentRow.parentNode.removeChild(parentRow);

//            for (let j = i; j < tableRows.length; j++) {

//                tableRows[j].id = "parent_row" + (j + 1);
//                let addButton = tableRows[j].querySelector('#addsub');

//                if (addButton) {

//                    addButton.dataset.parentid = j + 1;
//                    addButton.setAttribute("onclick", "ShowSubOptions(" + (j + 1) + ")");
//                }
//            }
//            break;
//        }
//    }

//    let selector = `[data-parentid="${optionid}"].suboption`;
//    const childTable = document.querySelector(selector);

//    if (childTable != null) {
//        let suboption_id = childTable.dataset.id;
//        let suboptions_selector = `[data-parentid="${optionid}"].suboption tr.old_suboption`
//        let suboptions_list = document.querySelectorAll(suboptions_selector);

//        suboptions_list.forEach(function (suboption) {

//            let suboptionid = suboption.dataset.id;

//            Removed_SubOptions.push({
//                SubOptionId: Number(suboptionid)
//            });
//        });

//        console.log("Removed_SubOptions:", Removed_SubOptions);
//        SetCookie("Removed_SubOptions", JSON.stringify(Removed_SubOptions), 1);

//        let siblings = document.getElementById("SubOptionBody").querySelectorAll("table");

//        for (let k = 0; k < siblings.length; k++) {

//            if (siblings[k] === childTable) {

//                childTable.parentNode.removeChild(childTable);

//                siblings = document.getElementById("SubOptionBody").querySelectorAll("table");

//                for (let l = k; l < siblings.length; l++) {
//                    siblings[l].dataset.parentid = l + 1;
//                }
//                break;
//            }
//        }
//    }

//    if (rowsCount.length < 1 && thead) {
//        table.removeChild(thead);
//    }
//}
//function Remove_SubOption(button, suboption_id) {

//    var Removed_SubOptions = [];
//    var Removed_SubOptions_Cookie = GetCookie("Removed_SubOptions");

//    if (Removed_SubOptions_Cookie) {
//        Removed_SubOptions = JSON.parse(Removed_SubOptions_Cookie);
//    }

//    let table = button.parentNode.parentNode.parentNode.parentNode;

//    let thead = table.querySelector('thead');

//    let rows = table.querySelectorAll('tbody tr');

//    const TotalRows = rows.length;

//    let rowCount = rows.length;

//    var parentRow = button.parentNode.parentNode;

//    Removed_SubOptions.push({ SubOptionId: suboption_id });
//    console.log("Removed_SubOptions:", Removed_SubOptions);
//    SetCookie("Removed_SubOptions", JSON.stringify(Removed_SubOptions), 1);

//    parentRow.parentNode.removeChild(parentRow);

//    if (parseInt(TotalRows) <= 1 && thead) {
//        table.removeChild(thead);
//    }
//}
//function ModifyOption(id) {

//    var Updated_Option = [];
//    var Updated_Option_Cookie = GetCookie("Updated_Option");

//    if (Updated_Option_Cookie) {
//        Updated_Option = JSON.parse(Updated_Option_Cookie);
//    }

//    var optionrow = document.getElementById("parent_row" + id.toString());

//    let nameInput = optionrow.querySelector(".OpName");
//    let priceInput = optionrow.querySelector(".OpPrice");
//    let ToolTipSpan = optionrow.querySelector(".tooltip-text");

//    let name = nameInput.value;
//    let price = priceInput.value;
//    var tooltiptxt = "";

//    if (ToolTipSpan.firstChild) {
//        if (ToolTipSpan.firstChild.nodeType === Node.TEXT_NODE) {
//            tooltiptxt = ToolTipSpan.firstChild.nodeValue.trim();
//        }
//        else {
//            tooltiptxt = ToolTipSpan.firstChild.textContent.trim();
//        }
//    }

//    Updated_Option.push({
//        Id: Number(id),
//        Name: name,
//        Price: parseInt(price.replaceAll(",", ""), 10),
//        ToolTip_Desc: tooltiptxt
//    });

//    SetCookie("Updated_Option", JSON.stringify(Updated_Option), 1);
//    console.log("Updated_Option:", JSON.stringify(Updated_Option));

//}
//function ModifySubOption(id) {

//    var Updated_SubOption = [];
//    var Updated_SubOption_Cookie = GetCookie("Updated_SubOption");

//    if (Updated_SubOption_Cookie) {
//        Updated_SubOption = JSON.parse(Updated_SubOption_Cookie);
//    }

//    var suboptionrow = document.querySelector('tr[data-id="' + id.toString() + '"]');

//    let nameInput = suboptionrow.querySelector(".Sub_OpName");
//    let priceInput = suboptionrow.querySelector(".Sub_OpPrice");
//    let inventoryInput = suboptionrow.querySelector(".Sub_OpInventory");
//    let ToolTipSpan = suboptionrow.querySelector(".tooltip-text");

//    let name = nameInput.value;
//    let price = priceInput.value;
//    let inventory = inventoryInput.value;
//    var tooltiptxt = "";

//    if (ToolTipSpan.firstChild) {
//        if (ToolTipSpan.firstChild.nodeType === Node.TEXT_NODE) {
//            tooltiptxt = ToolTipSpan.firstChild.nodeValue.trim();
//        }
//        else {
//            tooltiptxt = ToolTipSpan.firstChild.textContent.trim();
//        }
//    }

//    Updated_SubOption.push({
//        Id: Number(id),
//        Name: name,
//        Price: parseInt(price.replaceAll(",", ""), 10),
//        Inventory: parseInt(inventory.replaceAll(",", ""), 10),
//        ToolTip_Desc: tooltiptxt
//    });

//    SetCookie("Updated_SubOption", JSON.stringify(Updated_SubOption), 1);
//}

//#endregion

/////////////////////////////////////////////////////RelatedProducts Functions

function RelatedProductCategory() {

    const tagifyUserListEl2 = document.querySelector('#TagifyUserList2');

    setupTagify(tagifyUserListEl2, '/admin/Products/GetCategories');
}
function Toggle_Related_ProductList() {

    if (document.getElementById("Related_Product_List").classList.contains("active")) {

        document.getElementById("Related_Product_List_Header").classList.remove("toggle_menu_header");
        document.getElementById("Operation_Tab").classList.remove("operation_tab");
        document.getElementById("Operation_Tab_Parent").classList.add("operation_tab_parent");
    }
    else {

        document.getElementById("Related_Product_List_Header").classList.add("toggle_menu_header");
        document.getElementById("Operation_Tab").classList.add("operation_tab");
        document.getElementById("Operation_Tab_Parent").classList.remove("operation_tab_parent");
    }
}
function ToggleSarchResult() {

    if (document.getElementById("Search_Result").classList.contains("active")) {

        document.getElementById("Search_Result_Header").classList.remove("toggle_menu_header");
        document.getElementById("Operation_Tab").classList.remove("operation_tab");
        document.getElementById("Operation_Tab_Parent").classList.add("operation_tab_parent");
    }
    else {

        document.getElementById("Search_Result_Header").classList.add("toggle_menu_header");
        document.getElementById("Operation_Tab").classList.add("operation_tab");
        document.getElementById("Operation_Tab_Parent").classList.remove("operation_tab_parent");
    }
}
function RemoveProduct(button) {

    let childscount = document.querySelectorAll("#Related_Product_List_Items .js_child").length;

    const productitem = button.parentElement.parentElement;

    if (parseInt(childscount) == 1) {

        productitem.remove();
        document.getElementById("Related_Product_List").style.display = "none";
    }
    else {

        productitem.remove();
    }
}
function RemoveRelProduct(button, productid) {

    let childscount = document.querySelectorAll("#Related_Product_List_Items .js_child").length;
    const productitem = button.parentElement.parentElement;

    if (parseInt(childscount) == 1) {

        productitem.remove();
        document.getElementById("Related_Product_List").style.display = "none";
    }
    else {

        productitem.remove();
    }

}

function Show_SearchResult() {

    document.getElementById("Search_Result").classList.add("active");
    document.getElementById("Search_Result_Header").classList.remove("toggle_menu_header");
    document.getElementById("Search_Result_Items").classList.add("show");

    var SearchResultList_buttons = document.querySelectorAll("#Search_Result_Header > button.accordion-button");
    SearchResultList_buttons.forEach(function (button) {
        button.classList.remove("collapsed");
    });

}
function Hide_SearchResult() {

    document.getElementById("Search_Result").classList.remove("active");
    document.getElementById("Search_Result_Header").classList.add("toggle_menu_header");
    document.getElementById("Search_Result_Items").classList.remove("show");

    var SearchResultList_buttons = document.querySelectorAll("#Search_Result_Header button.accordion-button");
    SearchResultList_buttons.forEach(function (button) {
        button.classList.add("collapsed");
    });

}

function Show_RelProductList() {

    document.getElementById("Related_Product_List").classList.add("active");
    document.getElementById("Related_Product_List_Header").classList.remove("toggle_menu_header");
    document.getElementById("Related_Product_List_Items").classList.add("show");

    var RelProductList_buttons = document.querySelectorAll("#Related_Product_List_Header button.accordion-button");
    RelProductList_buttons.forEach(function (button) {
        button.classList.remove("collapsed");
    });

}
function Hide_RelProductList() {

    document.getElementById("Related_Product_List").classList.remove("active");
    document.getElementById("Related_Product_List_Header").classList.add("toggle_menu_header");
    document.getElementById("Related_Product_List_Items").classList.remove("show");

    var RelProductList_buttons = document.querySelectorAll("#Related_Product_List_Header button.accordion-button");
    RelProductList_buttons.forEach(function (button) {
        button.classList.add("collapsed");
    });

}
function SearchProducts_Update() {

    let urlProductId = GetQueryParam('ProductId');

    var formdata = new FormData();

    var tagifyTags = document.querySelectorAll("#RelProduct_Categories_Parent span.tagify__tag-text");
    var categoryIds = Array.from(tagifyTags).map(tag => Number(tag.dataset.id.trim()));

    var RelatedProductList = document.querySelectorAll("#Related_Product_List_Items div.js_child");
    var ProructIds = Array.from(RelatedProductList).map(product => Number(product.dataset.productid.trim()));

    if (urlProductId !== null) {
        ProructIds.push(Number(urlProductId.trim()));
    }

    var ProductName = document.getElementById("Rel_Product_Name").value;

    formdata.append("SearchKey", ProductName);

    categoryIds.forEach((id, index) => {
        formdata.append('Categories[' + index + ']', id);
    });

    ProructIds.forEach((id, index) => {
        formdata.append('RelProducts[' + index + ']', id);
    });

    $.ajax({
        type: "POST",
        url: "SearchProducts",
        contentType: false,
        processData: false,
        data: formdata,
        success: function (data) {

            if (data.isSuccess) {

                console.log(data);

                var searchResultItems = document.getElementById("Search_Result_Items");
                searchResultItems.innerHTML = '';

                if (data.data.relProducts.length > 0) {

                    document.getElementById("Search_Result").style.display = "block";
                    Show_SearchResult();
                    Hide_RelProductList();
                    data.data.relProducts.forEach(function (product) {

                        var productItem = `
                        <div id="product_parent_${product.productId}" class="col-12 col-md-3 mb_class js_child" data-productid="${product.productId}">
                            <div class="card">
                                <img id="product_img_${product.productId}" src="../../${product.imgSrc}" class="related_poduct_img" alt="${product.name}" style="border-bottom: 1px solid #eee;">
                                <div class="card-info">
                                    <span id="product_title_${product.productId}">${product.name}</span>
                                </div>
                                <button class="btn btn-primary" onclick="AddProductToList(this,this.dataset.productid)" data-productid="${product.productId}">
                                    افزودن به لیست
                                </button>
                            </div>
                        </div>`;

                        searchResultItems.insertAdjacentHTML('beforeend', productItem);

                    });
                }
                else {

                    document.getElementById("Search_Result").style.display = "block";
                    Show_SearchResult();
                    Hide_RelProductList();

                    var SearchResult = `<div class="col-md-12">
                                        <div class="no-products">
                                            <div class="icon">
                                                <i class="fas fa-exclamation-triangle"></i>
                                            </div>
                                            <div>محصول جدیدی برای افزودن به لیست محصولات مرتبط وجود ندارد</div>
                                        </div>
                                    </div>`

                    searchResultItems.insertAdjacentHTML('beforeend', SearchResult);
                }

            } else {
                swal.fire('هشدار!', data.message, 'warning');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}
function Remove_SearchResult_Product(button) {

    let childscount = document.querySelectorAll("#Search_Result_Items .js_child").length;
    const productitem = button.parentElement.parentElement;

    if (parseInt(childscount) == 1) {

        productitem.remove();
        document.getElementById("Search_Result").style.display = "none";
    }
    else {

        productitem.remove();
    }
}
function AddProductToList(button, id) {

    let productId = GetQueryParam('ProductId');
    let longproductId = Number()

    let childscount = document.querySelectorAll("#Search_Result_Items .js_child").length;

    let imgsrc = document.getElementById("product_img_" + id.toString()).src;
    let relativePath = new URL(imgsrc).pathname;
    let title = document.getElementById("product_title_" + id.toString()).innerText;

    let Row = document.createElement('div');
    Row.classList = "col-12 col-md-3 mb_class js_child";
    Row.setAttribute('data-productid', id.toString());

    Row.innerHTML = `
                        <div class="card">
                                    <img src="${relativePath}" class="related_poduct_img" alt="${title}" style="border-bottom: 1px solid #eee;">
                            <div class="card-info">
                                <span>${title}</span>
                            </div>
                            <button class="btn btn-danger remove-btn" onclick="RemoveProduct(this)">
                                حذف
                            </button>
                        </div>
                    `;

    document.getElementById("Related_Product_List").style.display = "block";
    Show_RelProductList();
    Hide_SearchResult();

    document.getElementById('Related_Product_List_Items').appendChild(Row);

    if (parseInt(childscount) == 1) {

        Remove_SearchResult_Product(button);
        document.getElementById("Search_Result").style.display = "none";
    }
    else {

        Remove_SearchResult_Product(button);
    }
}

/////////////////////////////////////////////////////UpdateProduct Function
function UpdateProduct() {

    var formdata = new FormData();

    let productId = GetQueryParam('ProductId');

    formdata.append("Id", Number(productId));

    console.log("//////////////////////////////////////////////////////////////////////////");

    let removedImages = GetCookie("Removed_Images");

    if (removedImages) {

        let removedImagesList = JSON.parse(removedImages);

        removedImagesList.forEach((image, index) => {
            formdata.append('Removed_Images_List[' + index + '].ImageId', image.ImageId);
        });
    }

    let removedDocuments = GetCookie("Removed_Documents");

    if (removedDocuments) {

        let removedDocumentsList = JSON.parse(removedDocuments);

        removedDocumentsList.forEach((document, index) => {
            formdata.append('Removed_Documents_List[' + index + '].DocumentId', document.DocumentId);
        });
    }

    //#region

    //let removedOptions = GetCookie("Removed_Options");

    //if (removedOptions) {

    //    let removedOptionsList = JSON.parse(removedOptions);

    //    removedOptionsList.forEach((option, index) => {
    //        formdata.append('Removed_Options_List[' + index + '].OptionId', option.OptionId);
    //    });
    //}

    //let removedSubOptions = GetCookie("Removed_SubOptions");

    //if (removedSubOptions) {

    //    let removedSubOptionsList = JSON.parse(removedSubOptions);

    //    removedSubOptionsList.forEach((subOption, index) => {
    //        formdata.append('Removed_SubOptions_List[' + index + '].SubOptionId', subOption.SubOptionId);
    //    });
    //}

    //#endregion

    let removedColorOptions = GetCookie("Removed_ColorOptions");

    if (removedColorOptions) {

        let removedColorOptionsList = JSON.parse(removedColorOptions);

        removedColorOptionsList.forEach((option, index) => {
            formdata.append('Removed_ColorOptions_List[' + index + '].Id', option.Id);
        });
    }

    //#region

    //let UpdatedOptions = GetCookie("Updated_Option");

    //if (UpdatedOptions) {

    //    let UpdatedOptionsList = JSON.parse(UpdatedOptions);

    //    UpdatedOptionsList.forEach((option, index) => {

    //        formdata.append('Updated_Options_List[' + index + '].Id', option.Id);
    //        formdata.append('Updated_Options_List[' + index + '].Name', option.Name);
    //        formdata.append('Updated_Options_List[' + index + '].Price', option.Price);
    //        formdata.append('Updated_Options_List[' + index + '].ToolTip_Desc', option.ToolTip_Desc);

    //    });
    //}

    //let UpdatedSubOptions = GetCookie("Updated_SubOption");

    //if (UpdatedSubOptions) {

    //    let UpdatedSubOptionsList = JSON.parse(UpdatedSubOptions);

    //    UpdatedSubOptionsList.forEach((suboption, index) => {

    //        formdata.append('Updated_SubOptions_List[' + index + '].Id', suboption.Id);
    //        formdata.append('Updated_SubOptions_List[' + index + '].Name', suboption.Name);
    //        formdata.append('Updated_SubOptions_List[' + index + '].Price', suboption.Price);
    //        formdata.append('Updated_SubOptions_List[' + index + '].Inventory', suboption.Inventory);
    //        formdata.append('Updated_SubOptions_List[' + index + '].ToolTip_Desc', suboption.ToolTip_Desc);

    //    });
    //}

    //#endregion

    let UpdatedColorOptions = GetCookie("Updated_ColorOptions");

    if (UpdatedColorOptions) {

        let UpdatedColorOptionsList = JSON.parse(UpdatedColorOptions);

        UpdatedColorOptionsList.forEach((option, index) => {

            formdata.append('Updated_ColorOptions_List[' + index + '].Id', option.Id);
            formdata.append('Updated_ColorOptions_List[' + index + '].ColorId', option.ColorId);
            formdata.append('Updated_ColorOptions_List[' + index + '].Name', option.Name);
            formdata.append('Updated_ColorOptions_List[' + index + '].HexCode', option.HexCode);
            formdata.append('Updated_ColorOptions_List[' + index + '].Price', option.Price);
            formdata.append('Updated_ColorOptions_List[' + index + '].Inventory', option.Inventory);

        });
    }

    let AddedCategories = GetCookie("Added_Categories");

    if (AddedCategories) {

        let AddedCategoriesList = JSON.parse(AddedCategories);

        AddedCategoriesList.forEach((category, index) => {
            formdata.append('Added_Categories_List[' + index + '].Id', category.Id);
        });
    }

    let RemovedCategories = GetCookie("Removed_Categories");

    if (RemovedCategories) {

        let RemovedCategoriesList = JSON.parse(RemovedCategories);

        RemovedCategoriesList.forEach((category, index) => {
            formdata.append('Removed_Categories_List[' + index + '].Id', category.Id);
        });
    }

    console.log("//////////////////////////////////////////////////////////////////////////");

    var brand = document.getElementById("Brands").value;
    var Existence_mode = document.getElementById("Existence").value;
    var Product_Name = document.getElementById("Product_Name").value;
    var Unique_Code = document.getElementById("Unique_Code").value;
    var Product_Price = document.getElementById("Product_Price").value;
    var Product_Inventory = document.getElementById("Product_Inventory").value;
    var Delivery_Desc = document.getElementById("Delivery_Desc").value;
    var Product_Desc = document.getElementById("Product_Desc").value;
    var Product_Video_Link = document.getElementById("Product_Video_Link").value;
    var Delivery_Period_MinTime = document.getElementById("Delivery_Period_MinTime").value;
    console.log("Delivery_Period_MinTime:", Delivery_Period_MinTime);
    var Delivery_Period_MaxTime = document.getElementById("Delivery_Period_MaxTime").value;
    console.log("Delivery_Period_MaxTime:", Delivery_Period_MaxTime);

    var Meta_Title = document.getElementById("Meta_Title").value;
    var Meta_Url = document.getElementById("Meta_Url").value;

    var tagifyMetaKeywords = document.querySelectorAll("#Meta_Keywords_Parent span.tagify__tag-text");
    var metaKeywords = Array.from(tagifyMetaKeywords).map(tag => tag.innerText.trim()).join(", ");

    var Meta_Desc = document.getElementById("Meta_Desc").value;

    var RelatedProductList = document.querySelectorAll("#Related_Product_List_Items div.js_child");
    var ProructIds = Array.from(RelatedProductList).map(product => product.dataset.productid.trim());

    var featureitems_input = document.querySelectorAll("#FeatureList input.js_featureitem_radio_or_check:checked");
    var featureitems_select = document.querySelectorAll("#FeatureList select.js_featureitem_select option:checked");

    var featureitems_List_input = Array.from(featureitems_input).map(tag => Number(tag.dataset.featureitemid.trim()));
    var featureitems_List_select = Array.from(featureitems_select).map(tag => Number(tag.value.trim()));

    var featureitems = [...featureitems_List_input, ...featureitems_List_select].join(',');

    formdata.append("BrandId", Number(brand));
    formdata.append("Existence", Existence_mode);
    formdata.append("Name", Product_Name);
    formdata.append("UniqueCode", Unique_Code);
    formdata.append("Price", parseInt(Product_Price.replace(/,/g, ''), 10));
    formdata.append("Inventory", parseInt(Product_Inventory, 10));
    formdata.append("DeliveryDescription", Delivery_Desc);
    formdata.append("Description", Product_Desc);
    formdata.append("VideoLink", Product_Video_Link);
    formdata.append("PageTitle", Meta_Title);
    formdata.append("PageUrl", Meta_Url);
    formdata.append("MetaKeywords", metaKeywords);
    formdata.append("MetaDescription", Meta_Desc);
    formdata.append("ProductFeatureItems", featureitems);
    formdata.append("MinTime", Delivery_Period_MinTime);
    formdata.append("MaxTime", Delivery_Period_MaxTime);

    /////////////////////////////////////////////////////////////////////Images

    const imagefiles = dropzoneMulti1.getAcceptedFiles();

    if (imagefiles.length > 0) {

        for (var i = 0; i < imagefiles.length; i++) {

            formdata.append('Images-' + i, imagefiles[i]);

        }
    }

    /////////////////////////////////////////////////////////////////////Documents

    const docfiles = dropzoneMulti2.getAcceptedFiles();

    if (docfiles.length > 0) {

        for (var i = 0; i < docfiles.length; i++) {

            formdata.append('Docs-' + i, docfiles[i]);

        }
    }

    /////////////////////////////////////////////////////////////////////Options&SubOptions

    //#region

    //var Options = [];
    //var Suboptions = [];

    //var mainrows = document.querySelectorAll("#options_tbl_tbody tr.new_option");
    //var rows = document.querySelectorAll("#options_tbl_tbody tr.old_option");

    //if (mainrows.length > 0) {

    //    mainrows.forEach(function (row) {

    //        var displayedNameInput = row.querySelector(".OpName");
    //        var displayedPriceInput = row.querySelector(".OpPrice");
    //        var OptionToolTipSpan = row.querySelector(".tooltip-text");
    //        var parentButton = row.querySelector(".addsub");

    //        if (displayedNameInput && displayedPriceInput && parentButton) {
    //            var Name = displayedNameInput.value;
    //            var Price = parseInt(displayedPriceInput.value.replaceAll(",", ""), 10);

    //            var OptionToolTip = "";

    //            if (OptionToolTipSpan.firstChild) {
    //                if (OptionToolTipSpan.firstChild.nodeType === Node.TEXT_NODE) {
    //                    OptionToolTip = OptionToolTipSpan.firstChild.nodeValue.trim();
    //                }
    //                else {
    //                    OptionToolTip = OptionToolTipSpan.firstChild.textContent.trim();
    //                }
    //            }

    //            var parentid = parentButton.getAttribute("data-parentid");

    //            var OptionValues = [];
    //            var subRows = document.querySelectorAll(`[data-parentid="${parentid}"].suboption tbody tr.new_suboption`);
    //            subRows.forEach(function (subRow) {

    //                var subOptionNameInput = subRow.querySelector(".Sub_OpName");
    //                var subOptionPriceInput = subRow.querySelector(".Sub_OpPrice");
    //                var subOptionInventoryInput = subRow.querySelector(".Sub_OpInventory");
    //                var subOptionToolTipSpan = subRow.querySelector(".tooltip-text");

    //                if (subOptionNameInput) {

    //                    var subOptionName = subOptionNameInput.value;
    //                    var subOptionPrice = parseInt(subOptionPriceInput.value.replaceAll(",", ""), 10);
    //                    var subOptionInventory = parseInt(subOptionInventoryInput.value, 10);

    //                    var subOptionToolTip = "";

    //                    if (subOptionToolTipSpan.firstChild) {
    //                        if (subOptionToolTipSpan.firstChild.nodeType === Node.TEXT_NODE) {
    //                            subOptionToolTip = subOptionToolTipSpan.firstChild.nodeValue.trim();
    //                        }
    //                        else {
    //                            subOptionToolTip = subOptionToolTipSpan.firstChild.textContent.trim();
    //                        }
    //                    }

    //                    OptionValues.push({
    //                        Name: subOptionName,
    //                        Price: subOptionPrice,
    //                        SubOptionInventory: subOptionInventory,
    //                        ToolTip_Desc: subOptionToolTip
    //                    });
    //                }
    //            });

    //            Options.push({
    //                Name: Name,
    //                Price: Price,
    //                ParentOptionId: null,
    //                ToolTip_Desc: OptionToolTip,
    //                SubProductOptions: OptionValues
    //            });

    //            console.log("Options:", Options);
    //        } else {
    //            console.error("خطایی رخ داده است");
    //        }
    //    });

    //    Options.forEach((option, index) => {

    //        formdata.append(`Options[${index}].Name`, option.Name);
    //        formdata.append(`Options[${index}].Price`, option.Price);
    //        formdata.append(`Options[${index}].ParentOptionId`, option.ParentOptionId);
    //        formdata.append(`Options[${index}].ToolTip_Desc`, option.ToolTip_Desc);

    //        if (!option.SubProductOptions) {
    //            option.SubProductOptions = [];
    //        }

    //        option.SubProductOptions.forEach((subOption, subIndex) => {

    //            formdata.append(`Options[${index}].SubProductOptions[${subIndex}].Name`, subOption.Name);
    //            formdata.append(`Options[${index}].SubProductOptions[${subIndex}].Price`, subOption.Price);
    //            formdata.append(`Options[${index}].SubProductOptions[${subIndex}].SubOptionInventory`, subOption.SubOptionInventory);
    //            formdata.append(`Options[${index}].SubProductOptions[${subIndex}].ParentOptionId`, subOption.ParentOptionId);
    //            formdata.append(`Options[${index}].SubProductOptions[${subIndex}].ToolTip_Desc`, subOption.ToolTip_Desc);

    //        });
    //    });

    //}
    //if (rows.length > 0) {

    //    rows.forEach(function (row) {

    //        var parentButton = row.querySelector(".addsub");

    //        if (parentButton) {

    //            var parentid = parentButton.getAttribute("data-parentid");
    //            var subRows = document.querySelectorAll(`[data-parentid="${parentid}"].suboption tbody tr.new_suboption`);
    //            subRows.forEach(function (subRow) {

    //                var subOptionNameInput = subRow.querySelector(".Sub_OpName");
    //                var subOptionPriceInput = subRow.querySelector(".Sub_OpPrice");
    //                var subOptionInventoryInput = subRow.querySelector(".Sub_OpInventory");
    //                var subOptionToolTipSpan = subRow.querySelector(".tooltip-text");
    //                console.log("subOptionToolTipSpan:", subOptionToolTipSpan);

    //                if (subOptionNameInput) {

    //                    var subOptionName = subOptionNameInput.value;
    //                    var subOptionPrice = parseInt(subOptionPriceInput.value.replaceAll(",", ""), 10);
    //                    var subOptionInventory = parseInt(subOptionInventoryInput.value, 10);

    //                    var subOptionToolTip = "";

    //                    if (subOptionToolTipSpan.firstChild) {
    //                        if (subOptionToolTipSpan.firstChild.nodeType === Node.TEXT_NODE) {
    //                            subOptionToolTip = subOptionToolTipSpan.firstChild.nodeValue.trim();
    //                        } else {
    //                            subOptionToolTip = subOptionToolTipSpan.firstChild.textContent.trim();
    //                        }
    //                    }
    //                    console.log("subOptionToolTip:", subOptionToolTip);

    //                    Suboptions.push({
    //                        Name: subOptionName,
    //                        Price: subOptionPrice,
    //                        ParentOptionId: parentid,
    //                        SubOptionInventory: subOptionInventory,
    //                        ToolTip_Desc: subOptionToolTip
    //                    });
    //                }
    //            });
    //        } else {
    //            console.error("خطایی رخ داده است");
    //        }
    //    });

    //    Suboptions.forEach((Suboption, index) => {

    //        formdata.append(`Suboptions[${index}].Name`, Suboption.Name);
    //        formdata.append(`Suboptions[${index}].Price`, Suboption.Price);
    //        formdata.append(`Suboptions[${index}].ParentOptionId`, Suboption.ParentOptionId);
    //        formdata.append(`Suboptions[${index}].SubOptionInventory`, Suboption.SubOptionInventory);
    //        formdata.append(`Suboptions[${index}].ToolTip_Desc`, Suboption.ToolTip_Desc);

    //    });
    //}

    //#endregion

    /////////////////////////////////////////////////////////////////////Color_Options

    var ColorOptions = [];

    var rows = document.querySelectorAll("#Colors_Tbl_TBody tr.new_option");

    if (rows.length > 0) {
        rows.forEach(function (row) {

            var ColorId = Number(row.dataset.colorid);
            var NameInput = row.querySelector(".OpName");
            var HexCodeInput = row.querySelector(".OpHex");
            var PriceInput = row.querySelector(".OpPrice");
            var InventoryInput = row.querySelector(".OpInventory");

            if (NameInput && HexCodeInput && PriceInput && InventoryInput) {

                var Name = NameInput.value;
                var HexCode = HexCodeInput.value;
                var Price = parseInt(PriceInput.value.replaceAll(",", ""), 10);
                var Inventory = parseInt(InventoryInput.value, 10);

                ColorOptions.push({
                    ColorId: ColorId,
                    Name: Name,
                    HexCode: HexCode,
                    Price: Price,
                    Inventory: Inventory
                });

            }
            else {
                console.error("خطایی رخ داده است");
            }
        });
    }

    ColorOptions.forEach((option, index) => {

        formdata.append(`ColorOptions[${index}].ColorId`, option.ColorId);
        formdata.append(`ColorOptions[${index}].Name`, option.Name);
        formdata.append(`ColorOptions[${index}].HexCode`, option.HexCode);
        formdata.append(`ColorOptions[${index}].Price`, option.Price);
        formdata.append(`ColorOptions[${index}].Inventory`, option.Inventory);
    });

    /////////////////////////////////////////////////////////////////////RelatedProducts

    ProructIds.forEach((id, index) => {
        formdata.append('RelProducts[' + index + ']', id);
    });

    console.log("///////////////////////////////////////////////////////////////////////////")
    //console.log("Options:", Options);
    console.log("///////////////////////////////////////////////////////////////////////////")
    //console.log("Suboptions:", Suboptions);
    console.log("///////////////////////////////////////////////////////////////////////////")
    console.log("formData:", formdata);

    var ajaxRequest = $.ajax({

        type: "POST",
        url: "UpdateProduct",
        contentType: false,
        processData: false,
        data: formdata,
        success: function (data) {

            if (data.isSuccess == true) {
                swal.fire(
                    'موفق!',
                    data.message,
                    'success'
                ).then(function (isConfirm) {
                    SetCookie("Removed_Images", "", 1);
                    SetCookie("Removed_Documents", "", 1);
                    //SetCookie("Removed_Options", "", 1);
                    //SetCookie("Removed_SubOptions", "", 1);
                    SetCookie("Updated_Option", "", 1);
                    SetCookie("Updated_SubOption", "", 1);
                    SetCookie("Added_Categories", "", 1);
                    SetCookie("Removed_Categories", "", 1);
                    SetCookie("Removed_ColorOptions", "", 1);
                    SetCookie("Updated_ColorOptions", "", 1);
                    window.location.href = "/Admin/Products/GetAllProducts";
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
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }

    });

    ajaxRequest.done(function (xhr, textStatus) {
    });
}

/////////////////////////////////////////////////////ColorOption Function
///////////////////////////bottom function is for getproductinfo()
function Add_ColorOption_As_TableRow(id, colorid, option_name, option_hexcode, option_price, option_inventory) {

    var tableElement = document.getElementById("Colors_Tbl");
    var tbodyElement = document.getElementById("Colors_Tbl_TBody");

    var hasRows = tbodyElement.rows.length > 0;
    var rowCount = tbodyElement.rows.length;
    var newRowId = id.toString();

    var newRow = document.createElement("tr");
    newRow.className = "ProductColor old_option";
    newRow.setAttribute("data-id", "coloroption-" + newRowId);
    newRow.setAttribute("data-colorid", colorid.toString());
    newRow.style.borderBottom = "1px solid #777 !important";

    option_price = Set_Comma(option_price.toString());

    newRow.innerHTML = `
        <td>
            <input type="text" class="form-control OpName" style="text-align:center" value="${option_name}" placeholder="رنگ" disabled/>
        </td>
        <td>
            <input type="text" class="form-control OpHex" style="text-align:center" value="${option_hexcode}" placeholder="کد HEX" disabled />
        </td>
        <td>
            <input type="text" class="form-control OpPrice" style="text-align:center" value="${option_price}" placeholder="500,000" disabled />
        </td>
        <td>
            <input type="number" class="form-control OpInventory" style="text-align:center" value="${option_inventory}" min="0" disabled />
        </td>
        <td>
            <a class="btn btn-success addsub action_btn" style="color:white;height: 42px !important;" data-id="coloroption-${newRowId}" onclick="Show_Update_ColorToList_Modal(this.dataset.id)">
                <i class="fas fa-pencil-alt"></i>
            </a>
        </td>
        <td>
            <a class="btn btn-danger RemoveRow action_btn" style="color:white;height: 42px !important;" data-id="coloroption-${newRowId}" onclick="Remove_ColorOption_ForUpdateProduct(this.dataset.id)">
                <i class="fas fa-trash"></i>
            </a>
        </td>
    `;

    if (!hasRows) {
        var theadRow = document.createElement("tr");
        theadRow.innerHTML = `
            <th>نام رنگ</th>
            <th>کد HEX</th>
            <th>قیمت (تومان)</th>
            <th>موجودی</th>
            <th></th>
            <th></th>
        `;
        var theadElement = document.createElement("thead");
        theadElement.style.textAlign = "center";
        theadElement.style.backgroundColor = "gainsboro";
        theadElement.style.borderBottom = "1px solid #777";
        theadElement.appendChild(theadRow);
        tableElement.appendChild(theadElement);
    }

    tbodyElement.appendChild(newRow);
}

function AddTableRow(tableId, option_name, option_hexcode, option_price, option_inventory, colorvalue) {

    var tableElement = document.getElementById(tableId);
    var tbodyElement = document.getElementById("Colors_Tbl_TBody");

    var hasRows = tbodyElement.rows.length > 0;
    var rowCount = tbodyElement.rows.length;
    var newRowId = rowCount + 1;

    var newRow = document.createElement("tr");
    newRow.className = "ProductColor new_option";
    newRow.setAttribute("data-id", "coloroption-" + newRowId);
    newRow.setAttribute("data-colorid", colorvalue.toString());
    newRow.style.borderBottom = "1px solid #777 !important";

    newRow.innerHTML = `
        <td>
            <input type="text" class="form-control OpName" style="text-align:center" value="${option_name}" placeholder="رنگ" disabled/>
        </td>
        <td>
            <input type="text" class="form-control OpHex" style="text-align:center" value="${option_hexcode}" placeholder="کد HEX" disabled />
        </td>
        <td>
            <input type="text" class="form-control OpPrice" style="text-align:center" value="${option_price}" placeholder="500,000" disabled />
        </td>
        <td>
            <input type="number" class="form-control OpInventory" style="text-align:center" value="${option_inventory}" min="0" disabled />
        </td>
        <td>
            <a class="btn btn-success addsub action_btn" style="color:white;height: 42px !important;" data-id="coloroption-${newRowId}" onclick="Show_Update_ColorToList_Modal(this.dataset.id)">
                <i class="fas fa-pencil-alt"></i>
            </a>
        </td>
        <td>
            <a class="btn btn-danger RemoveRow action_btn" style="color:white;height: 42px !important;" data-id="coloroption-${newRowId}" onclick="Remove_ColorOption(this.dataset.id)">
                <i class="fas fa-trash"></i>
            </a>
        </td>
    `;

    if (!hasRows) {
        var theadRow = document.createElement("tr");
        theadRow.innerHTML = `
            <th>نام رنگ</th>
            <th>کد HEX</th>
            <th>قیمت (تومان)</th>
            <th>موجودی</th>
            <th></th>
            <th></th>
        `;
        var theadElement = document.createElement("thead");
        theadElement.style.textAlign = "center";
        theadElement.style.backgroundColor = "gainsboro";
        theadElement.style.borderBottom = "1px solid #777";
        theadElement.appendChild(theadRow);
        tableElement.appendChild(theadElement);
    }

    tbodyElement.appendChild(newRow);
}
function Show_Insert_ColorToList_Modal() {
    var selectedColorValue = $('#Colors').val();
    $('#Insert_SelectColor').val(selectedColorValue).trigger('change.select2');

    $('#Insert_ColorToList_Modal').modal('show');

    var selectElement = document.getElementById("Insert_SelectColor");
    var selectedIndex = selectElement.selectedIndex;
    var selectedColor = selectElement.options[selectedIndex];
    var selectedColorText = selectedColor.innerText;
    var ColorTextArray = selectedColorText.trim().split("-");

    document.getElementById("Insert_ColorOp_ColorName").value = ColorTextArray[0].trim();
    document.getElementById("Insert_ColorOp_ColorHex").value = ColorTextArray[1].trim();
}
function SetColor_For_InsertOption() {

    var selectElement = document.getElementById("Insert_SelectColor");
    var selectedIndex = selectElement.selectedIndex;
    var selectedColor = selectElement.options[selectedIndex];
    var selectedColorText = selectedColor.innerText;
    var ColorTextArray = selectedColorText.trim().split("-");

    document.getElementById("Insert_ColorOp_ColorName").value = ColorTextArray[0].trim();
    document.getElementById("Insert_ColorOp_ColorHex").value = ColorTextArray[1].trim();
}
function AddColorToList() {

    var colorvalue = document.getElementById("Colors").value;
    var option_name = document.getElementById("Insert_ColorOp_ColorName").value;
    var option_hexcode = document.getElementById("Insert_ColorOp_ColorHex").value;
    var option_price = document.getElementById("Add_Color_Diff_Price").value;
    var option_inventory = document.getElementById("Add_Color_Inventory").value;

    if (option_price != "") {

        option_price = Set_Comma(option_price);
    }
    else {
        option_price = 0;
    }

    if (option_inventory === "") {
        option_inventory = 0
    }

    AddTableRow('Colors_Tbl', option_name, option_hexcode, option_price, option_inventory, colorvalue);
    AddItemToColorList(option_name, option_hexcode, colorvalue);

    RemoveOptionByValue("Colors", colorvalue);
    RemoveOptionByValue("Insert_SelectColor", colorvalue);
    RemoveOptionByValue("Update_SelectColor", colorvalue);

    var selectElement = document.getElementById("Colors");

    if (selectElement && selectElement.options.length === 0) {
        document.getElementById("update_color").style.display = "none";
        document.getElementById("delete_color").style.display = "none";
        document.getElementById("Add_ColorOption_Parent").style.display = "none";
    } else {
        document.getElementById("update_color").style.display = "block";
        document.getElementById("delete_color").style.display = "block";
        document.getElementById("Add_ColorOption_Parent").style.display = "block";
    }

    document.getElementById("Add_Color_Diff_Price").value = "";
    document.getElementById("Add_Color_Inventory").value = "0";

    HideModal("Insert_ColorToList_Modal");

}

function UpdateTableRow(rowId, option_name, option_hexcode, option_price, option_inventory, colorid) {

    var rowToUpdate = document.querySelector(`#Colors_Tbl_TBody [data-id="${rowId}"].ProductColor`);

    if (rowToUpdate) {
        rowToUpdate.querySelector('.OpName').value = option_name;
        rowToUpdate.querySelector('.OpHex').value = option_hexcode;
        rowToUpdate.querySelector('.OpPrice').value = option_price;
        rowToUpdate.querySelector('.OpInventory').value = option_inventory;
    }

    rowToUpdate.dataset.colorid = colorid;
}
function Show_Update_ColorToList_Modal(parentid) {

    $('#Update_ColorToList_Modal').modal('show');

    var rowToUpdate = document.querySelector(`#Colors_Tbl_TBody tr[data-id="${parentid}"]`);

    if (rowToUpdate) {
        document.getElementById("Update_ColorOp_ColorName").value = rowToUpdate.querySelector('.OpName').value;
        document.getElementById("Update_ColorOp_ColorHex").value = rowToUpdate.querySelector('.OpHex').value;
        document.getElementById("Update_Color_Diff_Price").value = Set_Comma(rowToUpdate.querySelector('.OpPrice').value);
        document.getElementById("Update_Color_Inventory").value = rowToUpdate.querySelector('.OpInventory').value;
    }

    var color_id = rowToUpdate.dataset.colorid;

    var modal = document.getElementById("Update_ColorToList_Modal");
    modal.dataset.parentid = parentid;
    modal.dataset.colorid = color_id;

    $('#Update_SelectColor').val(null).trigger('change');
}
function SetColor_For_UpdateOption() {

    var selectElementIds = ["Update_SelectColor", "Insert_SelectColor", "Colors"];
    var modal = document.getElementById("Update_ColorToList_Modal");

    var selectedOption = FindSelectedOption("Update_SelectColor");

    if (selectedOption) {

        var colorid = modal.dataset.colorid;
        var id = selectedOption.value;
        var name = document.getElementById("Update_ColorOp_ColorName").value;
        var hexcode = document.getElementById("Update_ColorOp_ColorHex").value;

        selectElementIds.forEach(function (selectId) {
            RemoveOptionByValue(selectId, id);
            AddOrUpdateOption(selectId, colorid, name + " - " + hexcode);
        });

        var ColorTextArray = selectedOption.innerText.trim().split(" - ");
        document.getElementById("Update_ColorOp_ColorName").value = ColorTextArray[0].trim();
        document.getElementById("Update_ColorOp_ColorHex").value = ColorTextArray[1].trim();

        modal.dataset.colorid = id;

        $('#Update_SelectColor').val(null).trigger('change');
        $('#Update_SelectColor').select2('close');
    }
}
function UpdateColorOption() {

    var parentid = document.getElementById("Update_ColorToList_Modal").dataset.parentid;
    var colorid = document.getElementById("Update_ColorToList_Modal").dataset.colorid;

    var option_name = document.getElementById("Update_ColorOp_ColorName").value;
    var option_hexcode = document.getElementById("Update_ColorOp_ColorHex").value;
    var option_price = document.getElementById("Update_Color_Diff_Price").value;
    var option_inventory = document.getElementById("Update_Color_Inventory").value;

    if (option_price != "") {

        option_price = Set_Comma(option_price);
    }
    else {
        option_price = 0;
    }

    if (option_inventory === "") {
        option_inventory = 0
    }

    UpdateTableRow(parentid, option_name, option_hexcode, option_price, option_inventory, colorid);

    var Updated_ColorOptions = [];
    var Updated_ColorOptions_Cookie = GetCookie("Updated_ColorOptions");

    if (Updated_ColorOptions_Cookie) {
        Updated_ColorOptions = JSON.parse(Updated_ColorOptions_Cookie);
    }

    Updated_ColorOptions.push({
        Id: Number(parentid.replace("coloroption-", "")),
        ColorId: Number(colorid),
        Name: option_name,
        HexCode: option_hexcode,
        Price: parseInt(option_price.replaceAll(",", ""), 10),
        Inventory: parseInt(option_inventory, 10)
    });

    SetCookie("Updated_ColorOptions", JSON.stringify(Updated_ColorOptions), 1);
    console.log("Updated_ColorOptions :", Updated_ColorOptions);

    var coloritem_id = parentid.replace("coloroption-", "");
    coloritem_id = "color-" + coloritem_id;

    UpdateItemInColorList(coloritem_id, option_name, option_hexcode, colorid);

    HideModal("Update_ColorToList_Modal");
}

function RemoveTableRow(rowId) {

    var rowToRemove = document.querySelector(`#Colors_Tbl_TBody [data-id="${rowId}"].ProductColor`);

    if (rowToRemove) {

        var tbody = rowToRemove.closest('tbody');

        rowToRemove.remove();

        if (tbody && tbody.rows.length === 0) {

            var thead = tbody.parentNode.querySelector('thead');

            if (thead) {

                thead.remove();

            }
        }
    }
}
function Remove_ColorOption(parentid) {

    var selectElementIds = ["Update_SelectColor", "Insert_SelectColor", "Colors"];

    var coloritem_id = parentid.replace("coloroption-", "");
    coloritem_id = "color-" + coloritem_id;

    var rowToRemove = document.querySelector(`#Colors_Tbl_TBody [data-id="${parentid}"].ProductColor`);

    var color_id = rowToRemove.dataset.colorid;
    var option_name = rowToRemove.querySelector('.OpName').value;
    var option_hexcode = rowToRemove.querySelector('.OpHex').value;

    selectElementIds.forEach(function (selectId) {
        AddOrUpdateOption(selectId, color_id, option_name + " - " + option_hexcode);
    });

    RemoveTableRow(parentid);
    RemoveItemFromColorList(coloritem_id);

    var selectElement = document.getElementById("Colors");

    if (selectElement && selectElement.options.length === 0) {
        document.getElementById("update_color").style.display = "none";
        document.getElementById("delete_color").style.display = "none";
        document.getElementById("Add_ColorOption_Parent").style.display = "none";
    } else {
        document.getElementById("update_color").style.display = "block";
        document.getElementById("delete_color").style.display = "block";
        document.getElementById("Add_ColorOption_Parent").style.display = "block";
    }
}

///////////////////////////bottom function is for updateproduct()
function Remove_ColorOption_ForUpdateProduct(parentid) {

    var selectElementIds = ["Update_SelectColor", "Insert_SelectColor", "Colors"];

    var coloritem_id = parentid.replace("coloroption-", "");
    coloritem_id = "color-" + coloritem_id;

    var rowToRemove = document.querySelector(`#Colors_Tbl_TBody [data-id="${parentid}"].ProductColor`);

    var color_id = rowToRemove.dataset.colorid;
    var option_name = rowToRemove.querySelector('.OpName').value;
    var option_hexcode = rowToRemove.querySelector('.OpHex').value;

    selectElementIds.forEach(function (selectId) {
        AddOrUpdateOption(selectId, color_id, option_name + " - " + option_hexcode);
    });

    RemoveTableRow(parentid);
    RemoveItemFromColorList(coloritem_id);

    var Removed_ColorOptions = [];
    var Removed_ColorOptions_Cookie = GetCookie("Removed_ColorOptions");

    if (Removed_ColorOptions_Cookie) {
        Removed_ColorOptions = JSON.parse(Removed_ColorOptions_Cookie);
    }

    Removed_ColorOption = Number(parentid.replace("coloroption-", ""));

    Removed_ColorOptions.push({
        Id: Removed_ColorOption
    });

    SetCookie("Removed_ColorOptions", JSON.stringify(Removed_ColorOptions), 1);
    console.log("Removed_ColorOptions:", Removed_ColorOptions);

    var selectElement = document.getElementById("Colors");

    if (selectElement && selectElement.options.length === 0) {
        document.getElementById("update_color").style.display = "none";
        document.getElementById("delete_color").style.display = "none";
        document.getElementById("Add_ColorOption_Parent").style.display = "none";
    } else {
        document.getElementById("update_color").style.display = "block";
        document.getElementById("delete_color").style.display = "block";
        document.getElementById("Add_ColorOption_Parent").style.display = "block";
    }
}

//////////////////////////////////////////////////////ColorList Functions
///////////////////////////bottom function is for getproductinfo()
function Add_ColorItem_To_ColorList(id, colorid, colorName, colorHex) {

    var colorListContainer = document.getElementById("Color_List");

    var newDiv = document.createElement("div");
    newDiv.className = "child_color";
    newDiv.style.backgroundColor = colorHex;
    newDiv.style.setProperty('border-radius', '100%', 'important');
    newDiv.title = colorName;
    newDiv.setAttribute("data-colorid", colorid.toString());

    var newId = "color-" + id.toString();
    newDiv.id = newId;

    colorListContainer.appendChild(newDiv);
}
function AddItemToColorList(colorName, colorHex, colorvalue) {

    var colorListContainer = document.getElementById("Color_List");

    var newDiv = document.createElement("div");
    newDiv.className = "child_color";
    newDiv.style.backgroundColor = colorHex;
    newDiv.style.setProperty('border-radius', '100%', 'important');
    newDiv.title = colorName;
    newDiv.setAttribute("data-colorid", colorvalue.toString());

    var newId = "color-" + (colorListContainer.children.length + 1);
    newDiv.id = newId;

    colorListContainer.appendChild(newDiv);
}
function UpdateItemInColorList(itemId, newColorName, newColorHex, colorid) {

    var itemToUpdate = document.getElementById(itemId);

    if (itemToUpdate) {

        itemToUpdate.style.backgroundColor = newColorHex;
        itemToUpdate.title = newColorName;
    }

    itemToUpdate.dataset.colorid = colorid;
}
function RemoveItemFromColorList(itemId) {

    var itemToRemove = document.getElementById(itemId);

    if (itemToRemove) {
        itemToRemove.remove();
    }
}

/////////////////////////////////////////////////////Color Functions

function FindSelectedOption(selectId) {
    var selectElement = document.getElementById(selectId);
    var selectedIndex = selectElement.selectedIndex;

    return selectedIndex >= 0 ? selectElement.options[selectedIndex] : null;
}
function RemoveOptionByValue(selectId, value) {
    var selectElement = document.getElementById(selectId);
    var options = selectElement.options;

    for (var i = 0; i < options.length; i++) {
        if (options[i].value == value) {
            selectElement.remove(i);
            break;
        }
    }
}
function AddOrUpdateOption(selectId, value, text) {
    var selectElement = document.getElementById(selectId);

    if (!OptionExists(selectElement, value)) {
        var option = new Option(text, value);
        selectElement.add(option);
    }
}
function OptionExists(selectElement, value) {
    for (var i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].value === value) {
            return true;
        }
    }
    return false;
}
function Toggle_Product_ColorList() {

    if (document.getElementById("Product_Color_List").classList.contains("active")) {

        document.getElementById("Product_Color_List_Header").classList.remove("toggle_menu_header");
        document.getElementById("Product_Color_List").classList.remove("notactive_color_list");
        document.getElementById("Product_Color_List").classList.add("active_color_list");
        document.getElementById("Product_Color_List_ToggleBtn").classList.add("toggle_btn_padding_right");

        if (document.getElementById("Product_Color_List_ToggleBtn").classList.contains("collapsed")) {
            document.getElementById("Product_Color_List_ToggleBtn").classList.remove("collapsed");
        }
    }
    else {

        document.getElementById("Product_Color_List_Header").classList.add("toggle_menu_header");
        document.getElementById("Product_Color_List").classList.remove("active_color_list");
        document.getElementById("Product_Color_List").classList.add("notactive_color_list");
        document.getElementById("Product_Color_List_ToggleBtn").classList.remove("toggle_btn_padding_right");
    }
}

function Show_InsertColor_Modal() {
    $('#Insert_Color_Modal').modal('show');
}
function Show_UpdateColor_Modal() {

    $('#Update_Color_Modal').modal('show');

    var selectElement = document.getElementById("Colors");
    var selectedIndex = selectElement.selectedIndex;
    var selectedColor = selectElement.options[selectedIndex];
    var selectedColorText = selectedColor.innerText;
    var ColorTextArray = selectedColorText.trim().split("-");

    document.getElementById("Update_ColorName").value = ColorTextArray[0].trim();
    document.getElementById("Update_ColorHex").value = ColorTextArray[1].trim();
}

function Check_Color_Value(id) {

    var selected_value = document.getElementById(id.toString()).value;

    if (selected_value == "") {

        document.getElementById("update_color").style.display = "none";
        document.getElementById("delete_color").style.display = "none";
        document.getElementById("Add_ColorOption_Parent").style.display = "none";
    }
    else {

        document.getElementById("update_color").style.display = "block";
        document.getElementById("delete_color").style.display = "block";
        document.getElementById("Add_ColorOption_Parent").style.display = "block";
    }
}

function AddColor() {

    var name = document.getElementById("Add_ColorName").value;
    var hexcode = document.getElementById("Add_ColorHex").value;

    var postData = {
        'Name': name,
        'HexCode': hexcode
    };

    $.ajax({
        contentType: 'application/json',
        dataType: 'json',
        type: "POST",
        url: '/Admin/Products/AddNewColor',
        data: JSON.stringify(postData),
        success: function (data) {
            if (data.isSuccess == true) {

                document.getElementById("Add_ColorName").value = '';
                document.getElementById("Add_ColorHex").value = '';

                AddOrUpdateOption("Colors", data.data.id.toString(), data.data.name + " - " + hexcode);
                AddOrUpdateOption("Insert_SelectColor", data.data.id.toString(), data.data.name + " - " + hexcode);
                AddOrUpdateOption("Update_SelectColor", data.data.id.toString(), data.data.name + " - " + hexcode);

                var selectElement = document.getElementById("Colors");

                if (selectElement && selectElement.options.length === 0) {

                    document.getElementById("update_color").style.display = "none";
                    document.getElementById("delete_color").style.display = "none";
                    document.getElementById("Add_ColorOption_Parent").style.display = "none";
                }
                else {

                    document.getElementById("update_color").style.display = "block";
                    document.getElementById("delete_color").style.display = "block";
                    document.getElementById("Add_ColorOption_Parent").style.display = "block";
                }

                HideModal("Insert_Color_Modal");

                swal.fire({
                    title: 'موفق!',
                    text: data.message,
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: 'بسیار خب',
                }).then(function (isConfirm) {
                    /*location.reload();*/
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
function UpdateColor() {

    var id = document.getElementById("Colors").value;
    var name = document.getElementById("Update_ColorName").value;
    var hexcode = document.getElementById("Update_ColorHex").value;

    var postData = {
        'Id': id,
        'Name': name,
        'HexCode': hexcode
    };


    $.ajax({
        contentType: 'application/json',
        dataType: 'json',
        type: "POST",
        url: '/Admin/Products/EditColor',
        data: JSON.stringify(postData),
        success: function (data) {
            if (data.isSuccess == true) {

                document.getElementById("Update_ColorName").value = '';
                document.getElementById("Update_ColorHex").value = '';

                RemoveOptionByValue("Colors", id);
                RemoveOptionByValue("Insert_SelectColor", id);
                RemoveOptionByValue("Update_SelectColor", id);

                AddOrUpdateOption("Colors", id, name + " - " + hexcode);
                AddOrUpdateOption("Insert_SelectColor", id, name + " - " + hexcode);
                AddOrUpdateOption("Update_SelectColor", id, name + " - " + hexcode);

                HideModal("Update_Color_Modal");

                swal.fire({
                    title: 'موفق!',
                    text: data.message,
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: 'بسیار خب',
                }).then(function (isConfirm) {
                    /*location.reload();*/
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
function DeleteColor() {

    var id = document.getElementById("Colors").value;

    swal.fire({
        title: 'حذف رنگ',
        text: "در مورد حذف رنگ مطمئن هستید؟",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: 'بله رنگ حذف شود',
        cancelButtonText: 'خیر'
    }).then((result) => {
        if (result.value) {

            var postData = {
                'Id': id
            };

            $.ajax({
                contentType: 'application/json',
                dataType: 'json',
                type: "POST",
                url: '/Admin/Products/DeleteColor',
                data: JSON.stringify(postData),
                success: function (data) {
                    if (data.isSuccess == true) {

                        RemoveOptionByValue("Colors", id);
                        RemoveOptionByValue("Insert_SelectColor", id);
                        RemoveOptionByValue("Update_SelectColor", id);

                        var selectElement = document.getElementById("Colors");

                        if (selectElement && selectElement.options.length === 0) {

                            document.getElementById("update_color").style.display = "none";
                            document.getElementById("delete_color").style.display = "none";
                            document.getElementById("Add_ColorOption_Parent").style.display = "none";
                        }
                        else {

                            document.getElementById("update_color").style.display = "block";
                            document.getElementById("delete_color").style.display = "block";
                            document.getElementById("Add_ColorOption_Parent").style.display = "block";
                        }

                        swal.fire({
                            title: 'موفق!',
                            text: data.message,
                            icon: 'success',
                            showCancelButton: false,
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: 'بسیار خب',
                        }).then(function (isConfirm) {
                            /* location.reload();*/
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

/////////////////////////////////////////////////////Video && Audio Functions
function Show_Video_Iframe(src) {
    const aparatRegex = /^https:\/\/www\.aparat\.com\/video\/video\/embed\/videohash\/[a-zA-Z0-9]+\/vt\/frame$/;
    const youtubeEmbedRegex = /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+(\?si=[a-zA-Z0-9_-]+)?$/;

    if (src === "" || (!aparatRegex.test(src) && !youtubeEmbedRegex.test(src))) {
        document.getElementById("video_iframe").style.display = "none";
        document.getElementById("video_iframe").src = "";
    } else {
        document.getElementById("video_iframe").style.display = "block";
        document.getElementById("video_iframe").src = src;
    }
}
function GenerateVideoEmbed() {

    const videoLink = document.getElementById('Product_Review_Video_Link').value;
    const videoEmbedCode = document.getElementById('videoEmbedCode');
    const VideoBtns = document.getElementById('Video_Buttons_Parent');

    let directLink = videoLink;

    if (!directLink.endsWith('.mp4') && !directLink.endsWith('.mp4.html') && directLink != "") {

        Swal.fire({
            icon: 'error',
            title: 'خطا',
            text: 'فرمت فایل باید MP4 باشد'
        });

        document.getElementById("Product_Review_Video_Link").value = "";
        videoEmbedCode.style.display = 'none';
        VideoBtns.classList.remove("d-flex");
        VideoBtns.classList.add("d-none");
        return;
    }

    const videoEmbedHtml = `
                            <video width="100%" height="auto" controls>
                              <source src="${directLink}" type="video/mp4">
                            </video>
                                `;

    videoEmbedCode.value = videoEmbedHtml.trim();
    videoEmbedCode.style.display = 'block';
    VideoBtns.classList.add("d-flex");
    VideoBtns.classList.remove("d-none");
}
function GenerateAudioEmbed() {

    const audioLink = document.getElementById('Product_Review_Audio_Link').value;
    const audioEmbedCode = document.getElementById('audioEmbedCode');
    const AudioBtns = document.getElementById('Audio_Buttons_Parent');

    let directLink = audioLink;

    if (!directLink.endsWith('.mp3') && !directLink.endsWith('.mp3.html') && directLink != "") {

        Swal.fire({
            icon: 'error',
            title: 'خطا',
            text: 'فرمت فایل باید MP3 باشد'
        });
        document.getElementById("Product_Review_Audio_Link").value = "";
        audioEmbedCode.style.display = 'none';
        AudioBtns.classList.remove("d-flex");
        AudioBtns.classList.add("d-none");
        return;
    }

    const audioEmbedHtml = `
                            <audio controls style="width:100%">
                              <source src="${directLink}" type="audio/mpeg">
                            </audio>
                                `;

    audioEmbedCode.value = audioEmbedHtml.trim();
    audioEmbedCode.style.display = 'block';
    AudioBtns.classList.add("d-flex");
    AudioBtns.classList.remove("d-none");
}
function CopyToClipboard(elementId) {

    const textarea = document.getElementById(elementId);
    textarea.select();
    document.execCommand('copy');
    Swal.fire({
        icon: 'success',
        title: 'کپی شد',
        text: 'کد HTML با موفقیت کپی شد!'
    });
}
function ClearInput(elementId) {

    const input = document.getElementById(elementId);
    input.value = "";

    if (elementId == "Product_Review_Video_Link") {

        document.getElementById("videoEmbedCode").style.display = "none"
        document.getElementById("Video_Buttons_Parent").classList.remove("d-flex");
        document.getElementById("Video_Buttons_Parent").classList.add("d-none");
    }
    else {
        document.getElementById("audioEmbedCode").style.display = "none"
        document.getElementById("Audio_Buttons_Parent").classList.remove("d-flex");
        document.getElementById("Audio_Buttons_Parent").classList.add("d-none");
    }
}
function Toggle_Product_Long_Desc() {

    if (document.getElementById("Product_Long_Desc").classList.contains("active")) {

        document.getElementById("Product_Long_Desc_Toggle_Btn").classList.add("toggle_btn_padding_right");
        document.getElementById("Product_Long_Desc_Header").classList.remove("toggle_menu_header");
        document.getElementById("Product_Long_Desc").classList.remove("notactive_color_list");
        document.getElementById("Product_Long_Desc").classList.add("active_color_list");
    }
    else {

        document.getElementById("Product_Long_Desc_Toggle_Btn").classList.remove("toggle_btn_padding_right");
        document.getElementById("Product_Long_Desc_Header").classList.add("toggle_menu_header");
        document.getElementById("Product_Long_Desc").classList.remove("active_color_list");
        document.getElementById("Product_Long_Desc").classList.add("notactive_color_list");
    }
}

/////////////////////////////////////////////////////UserOptions Functions
var SearchResultItems_Rows_Temp;
var UserSubOption_Table_List_temp;
var Current_Title_Tag = "";
var Parent_Table_Id_Temp;
var Catid_Temp;
function Get_OptionType_Text(optiontype) {
    if (optiontype === 'TextArea') {
        return 'ابزار توضیحات'
    }
    else if (optiontype === 'SelectBox') {
        return 'لیست انتخاب'
    }
    else if (optiontype === 'FileUpload') {
        return 'فایل آپلود'
    }
    else if (optiontype === 'RadioButton') {
        return 'رادیو باتن'
    }
    else {
        return 'چک باکس'
    }
}
function Get_OptionType_Value(option_type_text) {
    if (option_type_text === 'ابزار توضیحات') {
        return 'TextArea'
    }
    else if (option_type_text === 'لیست انتخاب') {
        return 'SelectBox'
    }
    else if (option_type_text === 'فایل آپلود') {
        return 'FileUpload'
    }
    else if (option_type_text === 'رادیو باتن') {
        return 'RadioButton'
    }
    else {
        return 'CheckBox'
    }
}
function Toggle_Product_User_Options() {

    if (document.getElementById("Product_User_Options").classList.contains("active")) {

        document.getElementById("Product_User_Options_Toggle_Btn").classList.add("toggle_btn_padding_right");
        document.getElementById("Product_User_Options_Header").classList.remove("toggle_menu_header");
        document.getElementById("Product_User_Options").classList.remove("notactive_color_list");
        document.getElementById("Product_User_Options").classList.add("active_color_list");
    }
    else {

        document.getElementById("Product_User_Options_Toggle_Btn").classList.remove("toggle_btn_padding_right");
        document.getElementById("Product_User_Options_Header").classList.add("toggle_menu_header");
        document.getElementById("Product_User_Options").classList.remove("active_color_list");
        document.getElementById("Product_User_Options").classList.add("notactive_color_list");
    }
}
function RewiseUserControls()
{
    var tagifyTags = document.querySelectorAll("#UserOptions_Categories_Parent span.tagify__tag-text");

    if (tagifyTags.length === 0) {
        swal.fire({
            title: 'هشدار',
            text: "یک دسته بندی انتخاب کنید!",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'بسیار خب',
        });
        return;
    }
    else if (tagifyTags.length > 1) {
        swal.fire({
            title: 'هشدار',
            text: "حداکثر یک دسته بندی انتخاب کنید!",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'بسیار خب',
        });
        return;
    }
    else {
        var formdata = new FormData();
        var categoryIds = Array.from(tagifyTags).map(tag => Number(tag.dataset.id.trim()));
        let catid = categoryIds[0] || 0;
        formdata.append("CategoryId", catid);

        var parent_table_id = 'UserOption_Table_' + catid.toString();

        $.ajax({
            type: "POST",
            url: "GetUserOptions",
            contentType: false,
            processData: false,
            data: formdata,
            success: function (data) {
                if (data.isSuccess) {
                    console.log("data:", data.data.userOptions);

                    var resultContainer = document.getElementById("Rewise_UserControls_Result");
                    resultContainer.style.display = "block";

                    document.getElementById("Rewise_UserControls_Result_Items").dataset.catid = catid;

                    document.getElementById("UserOption_Table_Title").style.display = "block";
                    document.getElementById("UserOption_Table_List").style.display = "block";
                    document.getElementById("UserSubOption_Table_Title").style.display = "none";
                    document.getElementById("UserSubOption_Table_List").style.display = "none";
                    document.getElementById("UserSubOption_Childs_Table_Title").style.display = "none";
                    document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";
                    document.getElementById("UserOption_NoResult").style.display = "none";

                    var UserOption_Table_List = document.getElementById("UserOption_Table_List");
                    var UserSubOption_Table_List = document.getElementById("UserSubOption_Table_List");
                    var TableList = document.querySelectorAll("#UserOption_Table_List table");
                    let target_table;

                    TableList.forEach(table => {
                        table.style.display = 'none';
                    });

                    if (data.data.userOptions.length > 0) {
                        if (document.getElementById(`UserOption_Table_${catid}`) != null) {
                            document.getElementById(`UserOption_Table_${catid}`).style.display = "block";
                        }
                        else {
                            UserOption_Table_List.innerHTML += `
                                <table id="UserOption_Table_${catid}" class="table table-striped mb-3" style="display:block">
                                    <thead id="UserOption_Table_THead_${catid}" class="table-dark">
                                        <tr>
                                            <th>عنوان</th>
                                            <th>نوع</th>
                                            <th>قیمت</th>
                                            <th class="compact-column">تصاویر</th>
                                            <th class="compact-column">آیتم‌ها</th>
                                            <th class="compact-column">عنوان‌ها</th>
                                            <th class="compact-column">معرفی</th>
                                            <th class="compact-column">فرزندان</th>
                                            <th class="compact-column">ویرایش</th>
                                            <th class="compact-column">حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody id="UserOption_Table_TBody_${catid}" class="table-border-bottom-0">
                                    </tbody>
                                </table>`;
                        }

                        data.data.userOptions.forEach(function (up)
                        {
                            var searchResultItems_Rows = document.getElementById(`UserOption_Table_TBody_${catid}`);

                            if (searchResultItems_Rows.querySelector(`tr[data-id="${up.id}"]`)) {
                                return;
                            }

                            let hastooltip = up.toolTip_Desc && up.toolTip_Desc !== 'توضیحاتی ارائه نشده است';
                            let ischecked = up.setAsDefault;

                            let option_type_value = up.option_Type;
                            up.option_Type = Get_OptionType_Text(up.option_Type);

                            let formattedPrice = Set_Comma_Plus(up.price);

                            let option_extensions = up.option_ExtensionList.join(',');
                            let option_filesize = up.option_FileSize;
                            let option_maxlength = up.option_Maxlength;

                            var UOCItem = `
                                <tr id="Parent_Row_${up.id}" class="old_useroption" data-id="${up.id}" data-previndex="${up.id}" data-extensions="${option_extensions}" data-filesize="${option_filesize}" data-maxlength="${option_maxlength}">
                                    <td>
                                        <span class="js_useroption_title">${up.title}</span>
                                    </td>
                                    <td>
                                        <span class="js_useroption_type" data-optiontype="${option_type_value}">${up.option_Type}</span>
                                    </td>
                                     <td>
                                        <span class="js_useroption_price">${formattedPrice}</span>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-dark text-white js_useroption_addimage ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled_button'}" style="height: 38px; cursor: ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? 'pointer' : 'default'};" data-parentid="${up.id}" data-images_table_id="" ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? `onclick="ShowInsertImageModal_ForUserOption(this.dataset.parentid,'old_useroption')"` : ''}  ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled'}><i class="fas fa-image"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-primary text-white js_useroption_additem" style="height: 38px;" data-items_table_id="" data-parentid="${up.id}" onclick="ShowInsertItemModal_ForUserOption(this)"><i class="fas fa-list-ul"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <div class="title-custom">
                                            <a class="btn btn-purple text-white js_useroption_update_title" style="height: 38px;" onclick="ShowTitleModal_ForUserOption(this,'old_useroption')">
                                                <i class="fas fa-layer-group"></i>
                                            </a>
                                            <div class="title-text">${up.title}</span>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <div class="tooltip-custom">
                                            <a class="btn ${hastooltip ? 'btn-info' : 'btn-secondary'} text-white js_useroption_update_tooltip" style="height: 38px;" onclick="ShowToolTipModal_ForUserOption(this,'old_useroption')">
                                                <i class="fas fa-question"></i>
                                            </a>
                                            <span class="tooltip-text">${up.toolTip_Desc}</span>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <div class="dropdown">
                                            <a class="btn btn-warning text-white dropdown-toggle no-dropdown-arrow" id="Dmb_${up.id}" data-bs-toggle="dropdown" aria-expanded="false" style="height: 38px;">
                                                <i class="fas fa-ellipsis-v"></i>
                                            </a>
                                            <ul class="dropdown-menu" aria-labelledby="Dmb_${up.id}">
                                                <li>
                                                    <a class="dropdown-item js_add_usersuboptions" href="#" onclick="Show_Insert_UserSubOption_Modal(event,${catid})">
                                                        <i class="fas fa-plus" style="position: relative;top: 2px;"></i> افزودن
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item js_show_usersuboptions" href="#" onclick="Show_UserSubOptions(event,${catid})">
                                                        <i class="fas fa-eye" style="position: relative;top: 2px;"></i> نمایش
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item js_refresh_usersuboptions" href="#" onclick="Refresh_UserSubOptions(event,${catid})">
                                                        <i class="fas fa-refresh" style="position: relative;top: 2px;"></i> بازنشانی زیرگروه آپشن
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-success text-white js_useroption_updateitem" style="height: 38px;" data-parentid="${up.id}" onclick="ShowUpdateModal_ForUserOption(this,this.dataset.parentid,'old_useroption')"><i class="fas fa-pencil"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-danger text-white js_useroption_remove" style="height: 38px;" onclick="Remove_UserOption_Row(this,'old_useroption')"><i class="fas fa-trash"></i></a>
                                    </td>
                                </tr>
                            `;

                            searchResultItems_Rows.insertAdjacentHTML('beforeend', UOCItem);

                            SearchResultItems_Rows_Temp = searchResultItems_Rows;
                            Parent_Table_Id_Temp = parent_table_id;
                            Catid_Temp = catid;
                        });

                        Sort_All_OptionTables(SearchResultItems_Rows_Temp, Parent_Table_Id_Temp, Catid_Temp);
                    }
                    else {
                        if (document.getElementById(`UserOption_Table_${catid}`) != null) {
                            document.getElementById(`UserOption_Table_${catid}`).style.display = "block";
                            document.getElementById("UserSubOption_Table_Title").style.display = "none";
                            document.getElementById("UserSubOption_Table_List").style.display = "none";
                        } else {
                            document.getElementById("UserOption_Table_List").style.display = "none";
                            document.getElementById("UserOption_Table_Title").style.display = "none";
                            document.getElementById("UserSubOption_Table_Title").style.display = "none";
                            document.getElementById("UserSubOption_Table_List").style.display = "none";
                            document.getElementById("UserOption_NoResult").style.display = "block";
                            document.getElementById("UserOption_NoResult_Text").innerText = "لیست آپشن‌ها برای این دسته بندی خالی است!";
                        }
                    }
                }
                else {
                    swal.fire('هشدار!', data.message, 'warning');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.error(`Error ${xhr.status}: ${xhr.responseText}`);
                swal.fire('Server Error!', `Error ${xhr.status}: ${xhr.responseText}`, 'error');
            }
        });
    }
}
function Sort_All_OptionTables(searchResultItems_Rows, parent_table_id, catid) {
    let oldUserOptionRows = Array.from(searchResultItems_Rows.querySelectorAll("tr.old_useroption"));
    let newUserOptionRows = Array.from(searchResultItems_Rows.querySelectorAll("tr.new_useroption"));

    oldUserOptionRows.sort((a, b) => {
        let idA = parseInt(a.getAttribute('data-id'));
        let idB = parseInt(b.getAttribute('data-id'));
        return idA - idB;
    });

    searchResultItems_Rows.innerHTML = '';

    oldUserOptionRows.forEach((row, index) => {
        let i = index + 1;

        if (row.hasAttribute('data-previndex')) {
            var prev_index = row.dataset.previndex;
            target_table = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${prev_index}'][data-catid='${catid}']`);

            if (target_table) {
                target_table.dataset.parentid = i;
            }

            row.dataset.previndex = i;
        }

        row.id = `Parent_Row_${i}`;


        let option_type_field = row.querySelector('.js_useroption_type');
        let option_type_attr = option_type_field.dataset.optiontype;

        let addimage = row.querySelector('.js_useroption_addimage');

        if (addimage) {
            addimage.dataset.parentid = i;

            if (option_type_attr === 'CheckBox' || option_type_attr === 'RadioButton') {
                addimage.setAttribute("onclick", `ShowInsertImageModal_ForUserOption(${i},'old_useroption')`);
            }
        }

        let updateitem = row.querySelector('.js_useroption_updateitem');

        if (updateitem) {
            updateitem.dataset.parentid = i;
            updateitem.setAttribute("onclick", `ShowUpdateModal_ForUserOption(this,${i},'old_useroption')`);
        }

        searchResultItems_Rows.appendChild(row);
    });

    let oldRowsCount = oldUserOptionRows.length;

    newUserOptionRows.forEach((row, index) => {
        let i = oldRowsCount + index + 1;

        if (row.hasAttribute('data-previndex')) {
            var prev_index = row.dataset.previndex;

            target_table = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${prev_index}'][data-catid='${catid}']`);

            if (target_table) {
                target_table.dataset.parentid = i;
            }

            row.dataset.previndex = i;
        }

        row.id = `Parent_Row_${i}`;


        let option_type_field = row.querySelector('.js_useroption_type');
        let option_type_attr = option_type_field.dataset.optiontype;

        let addimage = row.querySelector('.js_useroption_addimage');

        if (addimage) {
            addimage.dataset.parentid = i;

            if (option_type_attr === 'CheckBox' || option_type_attr === 'RadioButton') {
                addimage.setAttribute("onclick", `ShowInsertImageModal_ForUserOption(${i},'new_useroption')`);
            }
        }

        let updateitem = row.querySelector('.js_useroption_updateitem');

        if (updateitem) {
            updateitem.dataset.parentid = i;
            updateitem.setAttribute("onclick", `ShowUpdateModal_ForUserOption(this,${i},'new_useroption')`);
        }

        searchResultItems_Rows.appendChild(row);
    });
}
function Toggle_Rewise_UserControls_Result_Items() {

    if (document.getElementById("Rewise_UserControls_Result").classList.contains("active")) {

        document.getElementById("Rewise_UserControls_Result_Toggle_Btn").classList.add("toggle_btn_padding_right");
        document.getElementById("Rewise_UserControls_Result_Header").classList.remove("toggle_menu_header");
        document.getElementById("Rewise_UserControls_Result").classList.remove("notactive_color_list");
        document.getElementById("Rewise_UserControls_Result").classList.add("active_color_list");
    }
    else {

        document.getElementById("Rewise_UserControls_Result_Toggle_Btn").classList.remove("toggle_btn_padding_right");
        document.getElementById("Rewise_UserControls_Result_Header").classList.add("toggle_menu_header");
        document.getElementById("Rewise_UserControls_Result").classList.remove("active_color_list");
        document.getElementById("Rewise_UserControls_Result").classList.add("notactive_color_list");
    }
}

////////////////////////////////////////UserOption_ToolTip

var Removed_ToolTips = [];
var Removed_UserOption_ToolTips = [];
var Nested_Removed_UserOption_Toolips = [];
function ShowToolTipModal_ForUserOption(element, classname)
{
    Reset_UserOption_ToolTip_Func();

    SetCookie("Removed_ToolTips", JSON.stringify([]), 1);

    var User_Option_Parent_Table_Id_Temp = element.dataset.tooltips_table_id;

    var modal_add_or_update_btn = document.getElementById("Add_Or_Update_UserOption_ToolTip");
    modal_add_or_update_btn.setAttribute("data-parent_table_id", User_Option_Parent_Table_Id_Temp);

    const modal_tbody_temp = document.getElementById("Update_UserOption_ToolTips_Table_TBody");
    modal_tbody_temp.innerHTML = '';

    var tagifyTags = document.querySelectorAll("#UserOptions_Categories_Parent span.tagify__tag-text");
    var categoryIds = Array.from(tagifyTags).map(tag => Number(tag.dataset.id.trim()));

    let catid = 0;
    let catname = '';

    categoryIds.forEach((id, index) => {
        catid = id;
    });

    tagifyTags.forEach((tag) => {

        var textNode = tag.firstChild;

        if (textNode && textNode.nodeType === Node.TEXT_NODE) {

            catname = textNode.textContent;
        }
    });

    if (tagifyTags.length == 0)
    {
        swal.fire({
            title: 'هشدار',
            text: "یک دسته بندی انتخاب کنید!",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'بسیار خب',
        });
        return;
    }
    else if (tagifyTags.length > 1)
    {
        swal.fire({
            title: 'هشدار',
            text: "حداکثر یک دسته بندی انتخاب کنید!",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'بسیار خب',
        });
        return;
    }
    else
    {
        var grand_parent_table = null;
        var grand_parent_row = null;
        var grand_parent_row_class = '';
        var grand_parent_row_data_id = '';
        var grand_parent_row_id = '';
        var parent_table = element.closest('table');
        var table_row = element.closest('tr');

        var row_id = table_row.id;
        var row_class = table_row.classList[0];
        var row_dataid = '';

        if (row_class === 'old_useroption' || row_class === 'old_usersuboption' || row_class === 'old_usersuboption_child')
        {
            row_dataid = table_row.dataset.id;
        }

        document.getElementById("Update_UserOption_ToolTip_Modal").dataset.parent_catid = catid;
        document.getElementById("Update_UserOption_ToolTip_Modal").dataset.parent_row_id = row_id;
        document.getElementById("Update_UserOption_ToolTip_Modal").dataset.parent_row_class = row_class;
        document.getElementById("Update_UserOption_ToolTip_Modal").dataset.parent_data_id = row_dataid;

        var formdata = new FormData();

        if (row_dataid != "")
        {
            formdata.append("OptionId", Number(row_dataid));

            $.ajax({
                type: "POST",
                url: "GetUserOption_ToolTips",
                contentType: false,
                processData: false,
                data: formdata,
                success: function (data)
                {
                    if (data.isSuccess)
                    {
                        var UserOption_ToolTips_Table_List = document.getElementById("UserOption_ToolTips_Tables_List");

                        if (data.data.toolTips.length > 0)
                        {
                            if (element.dataset.tooltips_table_id === "")
                            {
                                var useroption_tooltips_table_id = "UserOption_ToolTips_Table_" + Math.random().toString(16).slice(2);
                                element.setAttribute("data-tooltips_table_id", useroption_tooltips_table_id);

                                var modal_update_btn = document.getElementById("Add_Or_Update_UserOption_ToolTip");
                                modal_update_btn.setAttribute('data-parent_table_id', useroption_tooltips_table_id);

                                var useroption_tooltips_table_index = useroption_items_table_id.replace("UserOption_ToolTips_Table_", "");
                                var useroption_tooltips_thead_id = "UserOption_ToolTips_Table_THead_" + useroption_tooltips_table_index.toString();
                                var useroption_tooltips_tbody_id = "UserOption_ToolTips_Table_TBody_" + useroption_tooltips_table_index.toString();

                                UserOption_ToolTips_Table_List.innerHTML += `
                                <table id="${useroption_tooltips_table_id}" data-remove_status="before_remove" class="table table-striped mb-3" style="display:block">
                                    <thead id="${useroption_tooltips_thead_id}" class="table-dark">
                                        <tr>
                                            <th>عنوان</th>
                                            <th class="compact-column">متن معرفی</th>
                                            <th class="compact-column">وضعیت بروزرسانی</th>
                                            <th class="compact-column">ویرایش</th>
                                            <th class="compact-column">حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody id="${useroption_tooltips_tbody_id}" class="table-border-bottom-0">
                                    </tbody>
                                </table>`;

                                data.data.toolTips.forEach(function (up)
                                {
                                    var this_parent_item_id = up.parentItemId.toString();

                                    if (this_parent_item_id != "0")
                                    {
                                        var foundItems = Removed_UserOption_Items.filter(item => item.Item_Id === this_parent_item_id);

                                        if (foundItems.length > 0)
                                        {
                                            Removed_UserOption_ToolTips.push({
                                                ToolTip_Id: up.id.toString()
                                            });

                                            return;
                                        }
                                        else
                                        {
                                            var found_Nested_Items = Nested_Removed_UserOption_Items.filter(item => item.Item_Id === this_parent_item_id);

                                            if (found_Nested_Items.length > 0)
                                            {
                                                Removed_UserOption_ToolTips.push({
                                                    ToolTip_Id: up.id.toString()
                                                });

                                                return;
                                            }
                                        }
                                    }

                                    var searchResult_ToolTips_Rows = document.getElementById(`${useroption_tooltips_tbody_id}`);
                                    var searchResult_ToolTips_Rows_Count = searchResult_ToolTips_Rows.querySelectorAll('tr').length;
                                    var tooltip_row_index = searchResult_ToolTips_Rows_Count + 1;

                                    let tooltip_id = up.id;
                                    let tooltip_option_id = up.optionId;
                                    let tooltip_parent_option_id = up.parentOptionId;
                                    let tooltip_parent_item_id = up.parentItemId;
                                    let tooltip_title = up.title;
                                    let tooltip_text = up.text;

                                    var UOCItem = `
                                    <tr id="Parent_Row_${tooltip_row_index}" class="old_useroption_tooltip" data-tooltip_id="${tooltip_id}" data-id="${tooltip_id}" data-option_id="${tooltip_option_id}" data-parent_option_id="${tooltip_parent_option_id}" data-parent_item_id="${tooltip_parent_item_id}" data-update-status="0">
                                        <td>
                                             <span class="js_useroption_tooltip_title">${tooltip_title}</span>
                                        </td>
                                        <td class="compact-column">
                                            <div class="tooltip-custom">
                                                <a class="btn btn-info text-white js_useroption_tooltip_text" style="height: 38px;">
                                                    <i class="fas fa-question"></i>
                                                </a>
                                                <div class="tooltip-text">${tooltip_text}</div>
                                            </div>
                                        </td>
                                        <td class="compact-column">
                                            <span class="badge bg-label-secondary me-1 js_useroption_tooltip_update_status" style="font-weight: bold !important;height: 38px !important;line-height: 25px !important;">مقادیر اولیه</span>
                                        </td>
                                        <td class="compact-column">
                                            <span class="badge bg-label-info me-1 js_useroption_tooltip_data_kind" style="font-weight: bold !important;height: 38px !important;line-height: 25px !important;">سطر قدیمی</span>
                                        </td>
                                        <td class="compact-column">
                                            <a class="btn btn-success text-white js_useroption_tooltip_update" data-parent_table_id="${useroption_tooltips_table_id}" data-parent_row_id="Parent_Row_${tooltip_row_index}" style="height: 38px;" onclick="Bind_ToolTip_Data_For_Update(this,this.dataset.parent_table_id,this.dataset.parent_row_id)"><i class="fas fa-pencil"></i></a>
                                        </td>
                                        <td class="compact-column">
                                            <a class="btn btn-danger text-white js_useroption_item_remove" style="height: 38px;" data-parent_table_id="${useroption_tooltips_table_id}" data-parent_row_id="Parent_Row_${tooltip_row_index}" onclick="Remove_UserOption_ToolTip_Row(this,this.dataset.parent_table_id,this.dataset.parent_row_id)"><i class="fas fa-trash"></i></a>
                                        </td>
                                    </tr>
                                `;

                                    searchResult_ToolTips_Rows.insertAdjacentHTML('beforeend', UOCItem);
                                });
                            }
                            else
                            {
                                var searchResult_ToolTips_Rows = document.getElementById(`${element.dataset.tooltips_table_id}`);
                                var searchResult_ToolTips_Rows_TBody = searchResult_ToolTips_Rows.querySelector('tbody');

                                if (searchResult_ToolTips_Rows_TBody.querySelectorAll('tbody tr').length === 0 && searchResult_ToolTips_Rows.dataset.remove_status === "before_remove") {
                                    data.data.toolTips.forEach(function (up)
                                    {
                                        var this_parent_item_id = up.parentItemId.toString();

                                        if (this_parent_item_id != "0")
                                        {
                                            var foundItems = Removed_UserOption_Items.filter(item => item.Item_Id === this_parent_item_id);

                                            if (foundItems.length > 0)
                                            {
                                                Removed_UserOption_ToolTips.push({
                                                    ToolTip_Id: up.id.toString()
                                                });

                                                return;
                                            }
                                            else
                                            {
                                                var found_Nested_Items = Nested_Removed_UserOption_Items.filter(item => item.Item_Id === this_parent_item_id);

                                                if (found_Nested_Items.length > 0)
                                                {
                                                    Removed_UserOption_ToolTips.push({
                                                        ToolTip_Id: up.id.toString()
                                                    });

                                                    return;
                                                }
                                            }
                                        }

                                        searchResult_ToolTips_Rows = document.getElementById(`${element.dataset.tooltips_table_id}`);
                                        searchResult_ToolTips_Rows_TBody = searchResult_ToolTips_Rows.querySelector('tbody');
                                        var searchResult_ToolTips_Rows_Count = searchResult_ToolTips_Rows_TBody.querySelectorAll('tr').length;
                                        var tooltip_row_index = searchResult_ToolTips_Rows_Count + 1;

                                        let tooltip_id = up.id;
                                        let tooltip_option_id = up.optionId;
                                        let tooltip_parent_option_id = up.parentOptionId;
                                        let tooltip_parent_item_id = up.parentItemId;
                                        let tooltip_title = up.title;
                                        let tooltip_text = up.text;

                                        var UOCItem = `
                                        <tr id="Parent_Row_${tooltip_row_index}" class="old_useroption_tooltip" data-tooltip_id="${tooltip_id}" data-id="${tooltip_id}" data-option_id="${tooltip_option_id}" data-parent_option_id="${tooltip_parent_option_id}" data-parent_item_id="${tooltip_parent_item_id}" data-update-status="0">
                                            <td>
                                                 <span class="js_useroption_tooltip_title">${tooltip_title}</span>
                                            </td>
                                            <td class="compact-column">
                                                <div class="tooltip-custom">
                                                    <a class="btn btn-info text-white js_useroption_tooltip_text" style="height: 38px;">
                                                        <i class="fas fa-question"></i>
                                                    </a>
                                                    <div class="tooltip-text">${tooltip_text}</div>
                                                </div>
                                            </td>
                                            <td class="compact-column">
                                                <span class="badge bg-label-secondary me-1 js_useroption_tooltip_update_status" style="font-weight: bold !important;height: 38px !important;line-height: 25px !important;">مقادیر اولیه</span>
                                            </td>
                                            <td class="compact-column">
                                                <span class="badge bg-label-info me-1 js_useroption_tooltip_data_kind" style="font-weight: bold !important;height: 38px !important;line-height: 25px !important;">سطر قدیمی</span>
                                            </td>
                                            <td class="compact-column">
                                                <a class="btn btn-success text-white js_useroption_tooltip_update" data-parent_table_id="${useroption_tooltips_table_id}" data-parent_row_id="Parent_Row_${tooltip_row_index}" style="height: 38px;" onclick="Bind_ToolTip_Data_For_Update(this,this.dataset.parent_table_id,this.dataset.parent_row_id)"><i class="fas fa-pencil"></i></a>
                                            </td>
                                            <td class="compact-column">
                                                <a class="btn btn-danger text-white js_useroption_item_remove" style="height: 38px;" data-parent_table_id="${useroption_tooltips_table_id}" data-parent_row_id="Parent_Row_${tooltip_row_index}" onclick="Remove_UserOption_ToolTip_Row(this,this.dataset.parent_table_id,this.dataset.parent_row_id)"><i class="fas fa-trash"></i></a>
                                            </td>
                                        </tr>
                                        `;

                                        searchResult_ToolTips_Rows_TBody.insertAdjacentHTML('beforeend', UOCItem);
                                    });
                                }
                            }
                        }
                        else
                        {
                            if (element.dataset.tooltips_table_id === "")
                            {
                                var useroption_tooltips_table_id = "UserOption_ToolTips_Table_" + Math.random().toString(16).slice(2);
                                element.setAttribute("data-tooltips_table_id", useroption_tooltips_table_id);

                                var modal_update_btn = document.getElementById("Add_Or_Update_UserOption_ToolTip");
                                modal_update_btn.setAttribute('data-parent_table_id', useroption_tooltips_table_id);

                                var useroption_tooltips_table_index = useroption_tooltips_table_id.replace("UserOption_ToolTips_Table_", "");
                                var useroption_tooltips_thead_id = "UserOption_ToolTips_Table_THead_" + useroption_tooltips_table_index.toString();
                                var useroption_tooltips_tbody_id = "UserOption_ToolTips_Table_TBody_" + useroption_tooltips_table_index.toString();

                                UserOption_ToolTips_Table_List.innerHTML += `
                                <table id="${useroption_tooltips_table_id}" data-remove_status="before_remove" class="table table-striped mb-3" style="display:block">
                                    <thead id="${useroption_tooltips_thead_id}" class="table-dark">
                                        <tr>
                                            <th>عنوان</th>
                                            <th class="compact-column">متن معرفی</th>
                                            <th class="compact-column">وضعیت بروزرسانی</th>
                                            <th class="compact-column">ویرایش</th>
                                            <th class="compact-column">حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody id="${useroption_tooltips_tbody_id}" class="table-border-bottom-0">
                                    </tbody>
                                </table>`;
                            }
                        }

                        var search_input = document.getElementById('Update_UserOption_ToolTip_SearchItemInput');

                        if ((parent_table.classList.contains('SubUserOption')) || (parent_table.classList.contains('SubUserOption_Child')))
                        {
                            if (element.dataset.tooltips_table_id === "")
                            {
                                if (!search_input.hasAttribute('disabled'))
                                {
                                    search_input.setAttribute('disabled', '');
                                }

                                document.getElementById("Update_UserOption_ToolTips_Table").style.display = "none";
                                document.getElementById("Update_UserOption_ToolTips_Table_NoResult").style.display = "block";
                            }
                            else
                            {

                                var tooltips_table = document.getElementById(`${element.dataset.tooltips_table_id}`);
                                var tooltips_table_tbody = tooltips_table.querySelector('tbody');
                                var tooltips_table_tbody_rows = tooltips_table_tbody.querySelectorAll('tr');
                                var tooltips_table_tbody_rows_count = tooltips_table_tbody_rows.length;

                                console.log("tooltips_table_tbody_rows_count:", tooltips_table_tbody_rows_count);

                                if (tooltips_table_tbody_rows_count > 0)
                                {
                                    if (search_input.hasAttribute('disabled'))
                                    {
                                        search_input.removeAttribute('disabled');
                                    }

                                    document.getElementById("Update_UserOption_ToolTips_Table").style.display = "block";
                                    document.getElementById("Update_UserOption_ToolTips_Table_NoResult").style.display = "none";
                                    document.getElementById("Update_UserOption_ToolTips_Table").setAttribute("data-parent_table_id", tooltips_table.id);

                                    ToolTips_PaginateTable(search_input.value, rowsPerPage, 1);
                                }
                                else
                                {
                                    if (!search_input.hasAttribute('disabled'))
                                    {
                                        search_input.setAttribute('disabled', '');
                                    }

                                    document.getElementById("Update_UserOption_ToolTips_Table").style.display = "none";
                                    document.getElementById("Update_UserOption_ToolTips_Table_NoResult").style.display = "block";
                                }

                                //var grand_parent_table = document.getElementById(`${parent_table.dataset.parent_table_id}`);
                                //var parent_table_data_parent_id = parent_table.dataset.parentid;

                                //grand_parent_table_tbody = grand_parent_table.querySelector('tbody');
                                //grand_parent_row = grand_parent_table_tbody.querySelector(`tr[data-previndex='${parent_table_data_parent_id}']`);
                                //grand_parent_row_class = grand_parent_row.classList[0];

                                //if (parent_table.classList.contains('SubUserOption')) {
                                //    if (grand_parent_row_class === 'old_useroption') {
                                //        grand_parent_row_data_id = grand_parent_row.dataset.id;
                                //        GetAllOf_Option_Items(grand_parent_row_data_id, grand_parent_row, 'old_useroption');
                                //    }
                                //}
                                //else if (parent_table.classList.contains('SubUserOption_Child')) {
                                //    if (grand_parent_row_class === 'old_usersuboption') {
                                //        grand_parent_row_data_id = grand_parent_row.dataset.id;
                                //        GetAllOf_Option_Items(grand_parent_row_data_id, grand_parent_row, 'old_usersuboption');
                                //    }
                                //}
                            }

                            var row_tooltips_tbody = document.getElementById("UserOption_ToolTips_Tables_List")
                                .querySelector(`#${element.dataset.tooltips_table_id} tbody`);

                            if (row_tooltips_tbody.innerHTML === '')
                            {
                                if (!search_input.hasAttribute('disabled'))
                                {
                                    search_input.setAttribute('disabled', '');
                                }

                                document.getElementById("Update_UserOption_ToolTips_Table").style.display = "none";
                                document.getElementById("Update_UserOption_ToolTips_Table_NoResult").style.display = "block";
                            }
                            else
                            {
                                var row_tooltips_tbody_tr = row_tooltips_tbody.querySelectorAll("tr");
                                var row_tooltips_tbody_tr_count = row_tooltips_tbody_tr.length;

                                if (row_tooltips_tbody_tr_count > 0)
                                {
                                    if (search_input.hasAttribute('disabled'))
                                    {
                                        search_input.removeAttribute('disabled');
                                    }

                                    document.getElementById("Update_UserOption_ToolTips_Table").style.display = "block";
                                    document.getElementById("Update_UserOption_ToolTips_Table_NoResult").style.display = "none";
                                    document.getElementById("Update_UserOption_ToolTips_Table").setAttribute("data-parent_table_id", tooltips_table.id);
                                    document.getElementById("Update_UserOption_ToolTips_Table_TBody").innerHTML = row_tooltips_tbody.innerHTML;

                                    ToolTips_PaginateTable(search_input.value, rowsPerPage, 1);
                                }
                                else
                                {
                                    if (!search_input.hasAttribute('disabled'))
                                    {
                                        search_input.setAttribute('disabled', '');
                                    }

                                    document.getElementById("Update_UserOption_ToolTips_Table").style.display = "none";
                                    document.getElementById("Update_UserOption_ToolTips_Table_NoResult").style.display = "block";
                                }
                            }
                        }
                        else
                        {
                            if (element.dataset.tooltips_table_id === "")
                            {
                                if (!search_input.hasAttribute('disabled'))
                                {
                                    search_input.setAttribute('disabled', '');
                                }

                                document.getElementById("Update_UserOption_ToolTips_Table").style.display = "none";
                                document.getElementById("Update_UserOption_ToolTips_Table_NoResult").style.display = "block";
                            }
                            else
                            {
                                if (search_input.hasAttribute('disabled'))
                                {
                                    search_input.removeAttribute('disabled');
                                }

                                document.getElementById("Update_UserOption_ToolTips_Table").style.display = "block";
                                document.getElementById("Update_UserOption_ToolTips_Table_NoResult").style.display = "none";
                                document.getElementById("Update_UserOption_ToolTips_Table").setAttribute("data-parent_table_id", element.dataset.tooltips_table_id);

                                ToolTips_PaginateTable(search_input.value, rowsPerPage, 1);
                            }

                            var row_tooltips_tbody = document.getElementById("UserOption_ToolTips_Tables_List")
                                .querySelector(`#${element.dataset.tooltips_table_id} tbody`);

                            if (row_tooltips_tbody.innerHTML === '')
                            {
                                if (!search_input.hasAttribute('disabled'))
                                {
                                    search_input.setAttribute('disabled', '');
                                }

                                document.getElementById("Update_UserOption_ToolTips_Table").style.display = "none";
                                document.getElementById("Update_UserOption_ToolTips_Table_NoResult").style.display = "block";
                            }
                            else
                            {
                                var row_tooltips_tbody_tr = row_tooltips_tbody.querySelectorAll("tr");
                                var row_tooltips_tbody_tr_count = row_tooltips_tbody_tr.length;

                                if (row_tooltips_tbody_tr_count > 0)
                                {
                                    if (search_input.hasAttribute('disabled'))
                                    {
                                        search_input.removeAttribute('disabled');
                                    }

                                    document.getElementById("Update_UserOption_ToolTips_Table").style.display = "block";
                                    document.getElementById("Update_UserOption_ToolTips_Table_NoResult").style.display = "none";
                                    document.getElementById("Update_UserOption_ToolTips_Table").setAttribute("data-parent_table_id", element.dataset.tooltips_table_id);
                                    document.getElementById("Update_UserOption_ToolTips_Table_TBody").innerHTML = row_tooltips_tbody.innerHTML;

                                    ToolTips_PaginateTable(search_input.value, rowsPerPage, 1);
                                }
                                else
                                {
                                    if (!search_input.hasAttribute('disabled'))
                                    {
                                        search_input.setAttribute('disabled', '');
                                    }

                                    document.getElementById("Update_UserOption_ToolTips_Table").style.display = "none";
                                    document.getElementById("Update_UserOption_ToolTips_Table_NoResult").style.display = "block";
                                }
                            }
                        }
                    }
                    else {
                        swal.fire('هشدار!', data.message, 'warning');
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.error(`Error ${xhr.status}: ${xhr.responseText}`);
                    swal.fire('Server Error!', `Error ${xhr.status}: ${xhr.responseText}`, 'error');
                }
            });
        }
        else
        {
            document.getElementById("Insert_UserOption_Items_Modal").setAttribute("data-parent_data_id", "0");

            if (element.dataset.items_table_id === "")
            {
                var UserOption_Items_Table_List = document.getElementById("UserOption_Items_Tables_List");
                var useroption_items_table_id = "UserOption_Items_Table_" + Math.random().toString(16).slice(2);
                element.setAttribute("data-items_table_id", useroption_items_table_id);

                var modal_update_btn = document.getElementById("Add_Or_Update_UserOption_Item");
                modal_update_btn.setAttribute('data-parent_table_id', useroption_items_table_id);

                var useroption_items_table_index = useroption_items_table_id.replace("UserOption_Items_Table_", "");
                var useroption_items_thead_id = "UserOption_Items_Table_THead_" + useroption_items_table_index.toString();
                var useroption_items_tbody_id = "UserOption_Items_Table_TBody_" + useroption_items_table_index.toString();

                UserOption_Items_Table_List.innerHTML += `
                <table id="${useroption_items_table_id}" data-remove_status="before_remove" class="table table-striped mb-3" style="display:block">
                    <thead id="${useroption_items_thead_id}" class="table-dark">
                        <tr>
                            <th>عنوان</th>
                            <th>نوع آپشن</th>
                            <th>قیمت</th>
                            <th>گروه آیتم</th>
                            <th>وضعیت بروزرسانی</th>
                            <th>نوع داده</th>
                            <th class="compact-column">ویرایش</th>
                            <th class="compact-column">حذف</th>
                        </tr>
                    </thead>
                    <tbody id="${useroption_items_tbody_id}" class="table-border-bottom-0">
                    </tbody>
                </table>`;
            }

            var parent_item_field = document.getElementById("Insert_UserOption_Items_ParentItem_ParentTag");
            var search_input = document.getElementById('SearchItemInput');

            if ((parent_table.classList.contains('SubUserOption')) || (parent_table.classList.contains('SubUserOption_Child'))) {
                if (element.dataset.items_table_id === "") {
                    if (!search_input.hasAttribute('disabled')) {
                        search_input.setAttribute('disabled', '');
                    }

                    parent_item_field.style.display = "none";
                    document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "none";
                    document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "block";
                }
                else {
                    if (search_input.hasAttribute('disabled')) {
                        search_input.removeAttribute('disabled');
                    }

                    parent_item_field.style.display = "block";
                    document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "block";
                    document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "none";
                    document.getElementById("Insert_UserOption_Items_Modal_Items_Table").setAttribute("data-parent_table_id", element.dataset.items_table_id);

                    Items_PaginateTable(search_input.value, rowsPerPage, 1);

                    var grand_parent_table = document.getElementById(`${parent_table.dataset.parent_table_id}`);
                    var parent_table_data_parent_id = parent_table.dataset.parentid;

                    grand_parent_table_tbody = grand_parent_table.querySelector('tbody');
                    grand_parent_row = grand_parent_table_tbody.querySelector(`tr[data-previndex='${parent_table_data_parent_id}']`);
                    grand_parent_row_class = grand_parent_row.classList[0];

                    if (parent_table.classList.contains('SubUserOption')) {
                        if (grand_parent_row_class === 'new_useroption') {
                            GetAllOf_Option_Items('', grand_parent_row, 'new_useroption');
                        }
                    }
                    else if (parent_table.classList.contains('SubUserOption_Child')) {
                        if (grand_parent_row_class === 'new_usersuboption') {
                            GetAllOf_Option_Items('', grand_parent_row, 'new_usersuboption');
                        }
                    }
                }

                var row_items_tbody = document.getElementById("UserOption_Items_Tables_List")
                    .querySelector(`#${element.dataset.items_table_id} tbody`);

                if (row_items_tbody.innerHTML === '') {
                    if (!search_input.hasAttribute('disabled')) {
                        search_input.setAttribute('disabled', '');
                    }

                    document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "none";
                    document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "block";
                }
                else {
                    var row_items_tbody_tr = row_items_tbody.querySelectorAll("tr");
                    var row_items_tbody_tr_count = row_items_tbody_tr.length;

                    if (row_items_tbody_tr_count > 0) {
                        if (search_input.hasAttribute('disabled')) {
                            search_input.removeAttribute('disabled');
                        }

                        document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "block";
                        document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "none";
                        document.getElementById("Insert_UserOption_Items_Modal_Items_Table").setAttribute("data-parent_table_id", element.dataset.items_table_id);
                        document.getElementById("Insert_UserOption_Items_Modal_Items_Table_TBody").innerHTML = row_items_tbody.innerHTML;

                        Items_PaginateTable(search_input.value, rowsPerPage, 1);
                    }
                    else {
                        if (!search_input.hasAttribute('disabled')) {
                            search_input.setAttribute('disabled', '');
                        }

                        document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "none";
                        document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "block";
                    }
                }
            }
            else {
                if (!search_input.hasAttribute('disabled')) {
                    search_input.setAttribute('disabled', '');
                }

                parent_item_field.style.display = "none";
                document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "none";
                document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "block";

                var row_items_tbody = document.getElementById("UserOption_Items_Tables_List")
                    .querySelector(`#${element.dataset.items_table_id} tbody`);


                if (row_items_tbody.innerHTML === '') {
                    if (!search_input.hasAttribute('disabled')) {
                        search_input.setAttribute('disabled', '');
                    }

                    document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "none";
                    document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "block";
                }
                else {
                    var row_items_tbody_tr = row_items_tbody.querySelectorAll("tr");
                    var row_items_tbody_tr_count = row_items_tbody_tr.length;

                    if (row_items_tbody_tr_count > 0) {
                        if (search_input.hasAttribute('disabled')) {
                            search_input.removeAttribute('disabled');
                        }

                        document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "block";
                        document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "none";
                        document.getElementById("Insert_UserOption_Items_Modal_Items_Table").setAttribute("data-parent_table_id", element.dataset.items_table_id);
                        document.getElementById("Insert_UserOption_Items_Modal_Items_Table_TBody").innerHTML = row_items_tbody.innerHTML;

                        Items_PaginateTable(search_input.value, rowsPerPage, 1);
                    }
                    else {
                        if (!search_input.hasAttribute('disabled')) {
                            search_input.setAttribute('disabled', '');
                        }

                        document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "none";
                        document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "block";
                    }
                }
            }
        }

        $('#Insert_UserOption_Items_Modal').modal('show');

    }

    currentButton = button;

    var tooltipText = $(button).next('.tooltip-text').text().trim();

    if (tooltipText !== 'توضیحاتی ارائه نشده است')
    {
        $('#Update_ToolTip_Desc_ForUserOption').val(tooltipText);
    }
    else
    {
        $('#Update_ToolTip_Desc_ForUserOption').val('');
    }

    $('#Update_UserOption_ToolTip_Modal').modal('show');
}
function Update_UserOption_ToolTip() {

    var newTitle = $('#Update_ToolTip_Desc_ForUserOption').val();

    if (newTitle === '') {

        $(currentButton).removeClass('btn-info').addClass('btn-secondary');
        $(currentButton).next('.tooltip-text').text('توضیحاتی ارائه نشده است');

    }
    else {

        $(currentButton).removeClass('btn-secondary').addClass('btn-info');
        $(currentButton).next('.tooltip-text').text(newTitle);
    }

    $('#Update_UserOption_ToolTip_Modal').modal('hide');
}
function ToolTips_PaginateTable(searchTerm = "", rowsPerPage = 5, currentPage = 1)
{
    const rows = Array.from(document.querySelectorAll("#Insert_UserOption_Items_Modal_Items_Table_TBody tr"));

    const filteredRows = rows.filter(row => {
        const rowText = row.textContent.toLowerCase();
        return rowText.includes(searchTerm.toLowerCase());
    });

    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
    const paginationContainer = document.getElementById("update_tooltips_pagination_controls");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.onclick = () => Items_PaginateTable(searchTerm, rowsPerPage, i);
        button.disabled = i === currentPage;
        paginationContainer.appendChild(button);
    }

    rows.forEach(row => row.style.display = "none");

    const startIdx = (currentPage - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    filteredRows.slice(startIdx, endIdx).forEach(row => row.style.display = "");

    const noResultsMessage = document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult");
    noResultsMessage.style.display = filteredRows.length === 0 ? "block" : "none";
}
function Bind_Option_Items(OptionId, Items_Table_Id, Parent_Row_Item) {
    var formdata = new FormData();
    formdata.append("OptionId", Number(OptionId));

    var parent_item_field = document.getElementById("Insert_UserOption_Items_ParentItem_ParentTag");
    var parent_item_field_select = document.getElementById("Insert_UserOption_Items_ParentItem");
    var parent_row_item_table_id = Parent_Row_Item.dataset.items_table_id;
    var update_btn_temp = document.getElementById("Add_Or_Update_UserOption_Item");
    var update_btn_parent_table_id = update_btn_temp.dataset.parent_table_id;

    var useroption_items_tables_list_temp = document.getElementById("UserOption_Items_Tables_List");
    var target_table = useroption_items_tables_list_temp.querySelector(`#${update_btn_parent_table_id}`);
    var target_table_tbody = target_table.querySelector('tbody');
    var target_table_tbody_rows = target_table_tbody.querySelectorAll('tr');

    target_table_tbody_rows.forEach(function (row) {
        row.setAttribute('data-parent_option_item_table_id', Items_Table_Id);
    });

    $.ajax({
        type: "POST",
        url: "GetUserOption_Items",
        contentType: false,
        processData: false,
        data: formdata,
        success: function (data) {
            if (data.isSuccess) {
                parent_item_field_select.innerHTML = '<option value="0">آیتم والد را انتخاب کنید</option>';

                if (data.data.items.length > 0) {
                    Parent_Row_Item.setAttribute('data-items_table_id', Items_Table_Id);
                    data.data.items.forEach(function (up) {
                        let item_id = up.id;
                        let item_name = up.name;

                        let option = document.createElement('option');
                        option.value = item_id;
                        option.textContent = item_name;

                        option.classList.add('old_item');
                        option.setAttribute("data-items_table_id", Items_Table_Id);

                        ////////////////////////////////////////////////////////////////////////////create_item_rows

                        var Items_Table_Tag = document.getElementById("UserOption_Items_Tables_List").querySelector(`table#${Items_Table_Id}`);
                        var Items_table_Tbody_Tag = Items_Table_Tag.querySelector('tbody');
                        var option_type_text = Get_OptionType_Text(up.option_Type);
                        let formattedPrice = Set_Comma_Plus(up.price);

                        const newRow = document.createElement("tr");

                        newRow.setAttribute("id", "Parent_Row_" + (Items_table_Tbody_Tag.rows.length + 1));
                        newRow.setAttribute("class", "old_useroption_item");
                        newRow.setAttribute("data-item_id", item_id);
                        newRow.setAttribute("data-option_id", up.optionId);
                        newRow.setAttribute("data-parent_option_id", up.parentOptionId);
                        newRow.setAttribute("data-parent_option_item_table_id", "");
                        newRow.setAttribute("data-parent_option_item_id", up.parentOptionItemId);
                        newRow.setAttribute("data-update-status", "0");

                        newRow.innerHTML = `
                        <td><span class="js_useroption_item_name">${item_name}</span></td>
                        <td><span class="js_useroption_item_type" data-optiontype="${up.option_Type}">${option_type_text}</span></td>
                        <td><span class="js_useroption_item_price">${formattedPrice}</span></td>
                        <td><span class="js_useroption_item_group">${up.item_Group}</span></td>
                        <td class="compact-column">
                            <span class="badge bg-label-secondary me-1 js_useroption_item_update_status" style="font-weight: bold !important;height: 38px !important;line-height: 25px !important;">مقادیر اولیه</span>
                        </td>
                        <td class="compact-column">
                            <span class="badge bg-label-info me-1 js_useroption_item_data_kind" style="font-weight: bold !important;height: 38px !important;line-height: 25px !important;">سطر قدیمی</span>
                        </td>
                        <td class="compact-column">
                            <a class="btn btn-success text-white js_useroption_item_update" data-parent_table_id="${Items_Table_Id}" data-parent_row_id="Parent_Row_${(Items_table_Tbody_Tag.rows.length + 1)}" style="height: 38px;" onclick="Bind_Item_Data_For_Update(this,this.dataset.parent_table_id,this.dataset.parent_row_id)"><i class="fas fa-pencil"></i></a>
                        </td>
                        <td class="compact-column">
                            <a class="btn btn-danger text-white js_useroption_item_remove" style="height: 38px;" data-parent_table_id="${Items_Table_Id}" data-parent_row_id="Parent_Row_${(Items_table_Tbody_Tag.rows.length + 1)}" onclick="Remove_UserOption_Item_Row(this,this.dataset.parent_table_id,this.dataset.parent_row_id)"><i class="fas fa-trash"></i></a>
                        </td>
                        `;

                        Items_table_Tbody_Tag.appendChild(newRow);

                        var search_input = document.getElementById('SearchItemInput');
                        Items_PaginateTable(search_input.value, rowsPerPage, 1);

                        parent_item_field_select.appendChild(option);
                    });

                }
                else {
                    parent_item_field.style.display = "none";
                }
            }
            else {
                swal.fire('هشدار!', data.message, 'warning');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.error(`Error ${xhr.status}: ${xhr.responseText}`);
            swal.fire('Server Error!', `Error ${xhr.status}: ${xhr.responseText}`, 'error');
        }
    });
}
function GetAllOf_Option_Items(Option_Data_Id, OptionTag, Parent_ClassName) {
    const parent_row_item = OptionTag.querySelector('.js_useroption_additem');
    let parent_row_item_table_id = parent_row_item.dataset.items_table_id;
    const UserOption_Items_Table_List = document.getElementById("UserOption_Items_Tables_List");
    const modal_update_btn = document.getElementById("Add_Or_Update_UserOption_Item");
    const parent_item_field_select = document.getElementById("Insert_UserOption_Items_ParentItem");

    function createTable() {
        const useroption_items_table_id = "UserOption_Items_Table_" + Math.random().toString(16).slice(2);
        const useroption_items_table_index = useroption_items_table_id.replace("UserOption_Items_Table_", "");
        const useroption_items_thead_id = "UserOption_Items_Table_THead_" + useroption_items_table_index;
        const useroption_items_tbody_id = "UserOption_Items_Table_TBody_" + useroption_items_table_index;

        UserOption_Items_Table_List.innerHTML += `
            <table id="${useroption_items_table_id}" data-remove_status="before_remove" class="table table-striped mb-3" style="display:block">
                <thead id="${useroption_items_thead_id}" class="table-dark">
                    <tr>
                        <th>عنوان</th>
                        <th>نوع آپشن</th>
                        <th>قیمت</th>
                        <th>گروه آیتم</th>
                        <th>وضعیت بروزرسانی</th>
                        <th>نوع داده</th>
                        <th class="compact-column">ویرایش</th>
                        <th class="compact-column">حذف</th>
                    </tr>
                </thead>
                <tbody id="${useroption_items_tbody_id}" class="table-border-bottom-0"></tbody>
            </table>`;

        return useroption_items_table_id;
    }
    function populateParentItemOptions(tbody) {
        var isold;
        parent_item_field_select.innerHTML = '<option value="0">آیتم والد را انتخاب کنید</option>';

        tbody.querySelectorAll('tr').forEach(row => {
            var row_class = row.classList[0];

            if (row_class === "new_useroption_item") {
                isold = false;
            }
            else {
                isold = true;
            }

            let item_uniqueid;
            let uniqueid;

            if (!isold) {
                item_uniqueid = row.dataset.uniqueid;

                if (item_uniqueid === "") {
                    uniqueid = "option_id_" + Math.random().toString(16).slice(2);
                    row.setAttribute("data-uniqueid", uniqueid)
                }
                else {
                    uniqueid = item_uniqueid;
                }
            }

            const item_id = row.id;
            const item_name = row.querySelector(".js_useroption_item_name").innerText;
            const option = document.createElement('option');

            option.value = isold ? row.dataset.item_id : uniqueid;
            option.textContent = item_name;
            option.classList.add(isold ? 'old_item' : 'new_item');
            option.setAttribute("data-items_table_id", parent_row_item_table_id);
            option.setAttribute("data-items_table_row_id", item_id);

            parent_item_field_select.appendChild(option);
        });
    }

    if ((Parent_ClassName === 'old_useroption') || (Parent_ClassName === 'old_usersuboption')) {
        if (!parent_row_item_table_id) {
            parent_row_item_table_id = createTable();
            Bind_Option_Items(Option_Data_Id, parent_row_item_table_id, parent_row_item);

        }
        else {
            const parent_row_items_table = document.getElementById(parent_row_item_table_id);
            const parent_row_items_table_tbody = parent_row_items_table.querySelector('tbody');

            if (parent_row_items_table_tbody.querySelectorAll('tr').length > 0) {
                populateParentItemOptions(parent_row_items_table_tbody);
            }
            else {
                parent_item_field_select.innerHTML = '<option value="0">آیتم والد را انتخاب کنید</option>';
            }
        }
    }
    else {
        if (!parent_row_item_table_id) {
            parent_row_item_table_id = createTable();
            parent_item_field_select.innerHTML = '<option value="0">آیتم والد را انتخاب کنید</option>';
        }
        else {
            const parent_row_items_table = document.getElementById(parent_row_item_table_id);
            const parent_row_items_table_tbody = parent_row_items_table.querySelector('tbody');

            if (parent_row_items_table_tbody.querySelectorAll('tr').length > 0) {
                populateParentItemOptions(parent_row_items_table_tbody);
            }
            else {
                parent_item_field_select.innerHTML = '<option value="0">آیتم والد را انتخاب کنید</option>';
            }
        }
    }
}
function Bind_Item_Data_For_Update(element, parent_table_id, parent_row_id) {
    var user_option_type = document.getElementById("Insert_UserOption_Items_Modal").dataset.parent_row_class;
    var target_row = element.closest('tr');
    var target_row_id = target_row.id;
    var target_row_name = target_row.querySelector('.js_useroption_item_name').innerText;
    var target_row_price = target_row.querySelector('.js_useroption_item_price').innerText;
    var target_row_item_group = target_row.querySelector('.js_useroption_item_group').innerText;
    var target_row_item_parent = "0";

    if (/^(old|new)_usersuboption(_child)?$/.test(user_option_type)) {
        target_row_item_parent = target_row.dataset.parent_option_item_id;
        document.getElementById("Insert_UserOption_Items_ParentItem").value = target_row_item_parent;
    }

    document.getElementById("Insert_UserOption_Items_ItemGroup").value = target_row_item_group;
    document.getElementById("Insert_UserOption_Items_Name").value = target_row_name;
    document.getElementById("Insert_UserOption_Items_Price").value = target_row_price;

    var update_btn = document.getElementById("Add_Or_Update_UserOption_Item");

    update_btn.setAttribute('data-parent_table_id', parent_table_id);
    update_btn.setAttribute('data-parent_row_id', parent_row_id);

    update_btn.classList.remove("btn-primary");
    update_btn.classList.add("btn-success");
    update_btn.innerText = "بروزرسانی";
}
function Reset_UserOption_ToolTip_Func() {
    var user_option_type = document.getElementById("Insert_UserOption_Items_Modal").dataset.parent_row_class;

    document.getElementById("Insert_UserOption_Items_ItemGroup").value = "A";
    document.getElementById("Insert_UserOption_Items_Name").value = "";
    document.getElementById("Insert_UserOption_Items_Price").value = 0;

    if (/^(old|new)_usersuboption(_child)?$/.test(user_option_type)) {
        document.getElementById("Insert_UserOption_Items_ParentItem").value = "0";
    }

    var update_btn = document.getElementById("Add_Or_Update_UserOption_Item");

    update_btn.setAttribute('data-parent_row_id', '');

    update_btn.classList.remove("btn-success");
    update_btn.classList.add("btn-primary");
    update_btn.innerText = "ثبت";
}
function Search_Useroption_Item_Func() {
    const searchTerm = document.getElementById("SearchItemInput").value.toLowerCase();
    currentPage = 1;
    Items_PaginateTable(searchTerm, rowsPerPage, currentPage);
}
function Add_Or_Update_UserOption_ToolTip_Func() {
    var user_option_type = document.getElementById("Insert_UserOption_Items_Modal").dataset.parent_row_class;
    var user_option_id = document.getElementById("Insert_UserOption_Items_Modal").dataset.parent_data_id;
    var update_btn = document.getElementById("Add_Or_Update_UserOption_Item");
    var parent_table_id = update_btn.dataset.parent_table_id;
    var parent_row_id = update_btn.dataset.parent_row_id;

    if (update_btn.innerText === "ثبت") {
        const tbody = document.getElementById("Insert_UserOption_Items_Modal_Items_Table_TBody");

        if (tbody.rows.length === 0) {
            document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "none";
            document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "block";
            document.getElementById("SearchItemInput").removeAttribute('disabled');
        }

        var modal_item_option_type_value = document.getElementById("Insert_UserOption_Items_OptionType").dataset.optiontype;
        var modal_item_option_type_text = document.getElementById("Insert_UserOption_Items_OptionType").value;
        var modal_item_group_value = document.getElementById("Insert_UserOption_Items_ItemGroup").value;
        var modal_item_name = document.getElementById("Insert_UserOption_Items_Name").value;
        var modal_item_price = document.getElementById("Insert_UserOption_Items_Price").value;
        var modal_parent_item = "0";
        var modal_parent_item_table = "0";

        if (/^(old|new)_usersuboption(_child)?$/.test(user_option_type)) {
            var selectElement = document.getElementById("Insert_UserOption_Items_ParentItem");
            modal_parent_item = selectElement.value;

            var selectedOption = selectElement.querySelector(`option[value="${modal_parent_item}"]`);

            if (selectedOption) {
                modal_parent_item_table = selectedOption.dataset.items_table_id;
            }
        }

        const newRow = document.createElement("tr");

        newRow.setAttribute("id", "Parent_Row_" + (tbody.rows.length + 1));
        newRow.setAttribute("class", "new_useroption_item");
        newRow.setAttribute("data-item_id", "");
        newRow.setAttribute("data-option_id", user_option_id);
        newRow.setAttribute("data-parent_option_id", "0");
        newRow.setAttribute("data-parent_option_item_table_id", modal_parent_item_table);
        newRow.setAttribute("data-parent_option_item_id", modal_parent_item);
        newRow.setAttribute("data-update-status", "0");
        newRow.setAttribute("data-uniqueid", "");

        newRow.innerHTML = `
                <td><span class="js_useroption_item_name">${modal_item_name}</span></td>
                <td><span class="js_useroption_item_type" data-optiontype="${modal_item_option_type_value}">${modal_item_option_type_text}</span></td>
                <td><span class="js_useroption_item_price">${modal_item_price}</span></td>
                <td><span class="js_useroption_item_group">${modal_item_group_value}</span></td>
                <td class="compact-column">
                    <span class="badge bg-label-secondary me-1 js_useroption_item_update_status" style="font-weight: bold !important;height: 38px !important;line-height: 25px !important;">مقادیر اولیه</span>
                </td>
                <td class="compact-column">
                    <span class="badge bg-label-warning me-1 js_useroption_item_data_kind" style="font-weight: bold !important;height: 38px !important;line-height: 25px !important;">سطر جدید</span>
                </td>
                <td class="compact-column">
                    <a class="btn btn-success text-white js_useroption_item_update" data-parent_table_id="${parent_table_id}" data-parent_row_id="Parent_Row_${(tbody.rows.length + 1)}" style="height: 38px;" onclick="Bind_Item_Data_For_Update(this,this.dataset.parent_table_id,this.dataset.parent_row_id)"><i class="fas fa-pencil"></i></a>
                </td>
                <td class="compact-column">
                    <a class="btn btn-danger text-white js_useroption_item_remove" style="height: 38px;" data-parent_table_id="${parent_table_id}" data-parent_row_id="Parent_Row_${(tbody.rows.length + 1)}" onclick="Remove_UserOption_Item_Row(this,this.dataset.parent_table_id,this.dataset.parent_row_id)"><i class="fas fa-trash"></i></a>
                </td>
            `;

        tbody.appendChild(newRow);

        var search_input = document.getElementById('SearchItemInput');
        Items_PaginateTable(search_input.value, rowsPerPage, 1);
    }
    else {
        ///////////////////////////////////////////////////////////////////////////////////////////useroption_item_table

        var target_table;
        var target_tbody;
        var target_row;

        var target_row_item_group;
        var target_row_name;
        var target_row_price;
        var target_row_parentitem;
        var target_row_parentitem_table;

        if (/^(new_useroption|new_usersuboption|new_usersuboption_child)$/.test(user_option_type)) {
            /////////////////////////////////////////////////////////////useroption_item_table

            var uo_table = document.getElementById(parent_table_id);
            var uo_table_body = uo_table.querySelector('tbody');
            var uo_table_body_rows_count = uo_table.querySelectorAll('tr').length;

            if (uo_table_body_rows_count > 0) {
                target_table = document.getElementById(parent_table_id);
                target_tbody = target_table.querySelector('tbody');
                target_row = target_table.querySelector(`#${parent_row_id}`);

                if (target_row != null) {
                    target_row_item_group = target_row.querySelector(`.js_useroption_item_group`).innerText;
                    target_row_name = target_row.querySelector(`.js_useroption_item_name`).innerText;
                    target_row_price = target_row.querySelector(`.js_useroption_item_price`).innerText;
                    target_row_parentitem = target_row.dataset.parent_option_item_id;
                    target_row_parentitem_table = target_row.dataset.parent_option_item_table_id;
                }
            }
            else {
                target_table = document.getElementById("Insert_UserOption_Items_Modal_Items_Table");
                target_tbody = target_table.querySelector('tbody');
                target_row = target_tbody.querySelector(`#${parent_row_id}`);

                if (target_row != null) {
                    target_row_item_group = target_row.querySelector(`.js_useroption_item_group`).innerText;
                    target_row_name = target_row.querySelector(`.js_useroption_item_name`).innerText;
                    target_row_price = target_row.querySelector(`.js_useroption_item_price`).innerText;
                    target_row_parentitem = target_row.dataset.parent_option_item_id;
                    target_row_parentitem_table = target_row.dataset.parent_option_item_table_id;

                }
            }
        }
        else {
            target_table = document.getElementById(parent_table_id);
            target_tbody = target_table.querySelector('tbody');
            target_row = target_table.querySelector(`#${parent_row_id}`);

            if (target_row != null) {
                target_row_item_group = target_row.querySelector(`.js_useroption_item_group`).innerText;
                target_row_name = target_row.querySelector(`.js_useroption_item_name`).innerText;
                target_row_price = target_row.querySelector(`.js_useroption_item_price`).innerText;
                target_row_parentitem = target_row.dataset.parent_option_item_id;
                target_row_parentitem_table = target_row.dataset.parent_option_item_table_id;

            }
        }

        ///////////////////////////////////////////////////////////////////////////////////////////modal_item_table

        var modal_item_table = document.getElementById("Insert_UserOption_Items_Modal_Items_Table");
        var modal_item_tbody = modal_item_table.querySelector('tbody');
        var modal_item_row = modal_item_tbody.querySelector(`#${parent_row_id}`);

        var modal_item_group_value = document.getElementById("Insert_UserOption_Items_ItemGroup").value;
        var modal_item_name = document.getElementById("Insert_UserOption_Items_Name").value;
        var modal_item_price = document.getElementById("Insert_UserOption_Items_Price").value;
        var modal_parent_item = "0";

        if (/^(old|new)_usersuboption(_child)?$/.test(user_option_type)) {
            modal_parent_item = document.getElementById("Insert_UserOption_Items_ParentItem").value;
            modal_item_row.setAttribute('data-parent_option_item_id', modal_parent_item);
        }

        //target_table_row_in_modal

        var item_group_value_tag = modal_item_row.querySelector('.js_useroption_item_group');
        var item_name_tag = modal_item_row.querySelector('.js_useroption_item_name');
        var item_price_tag = modal_item_row.querySelector('.js_useroption_item_price');

        item_group_value_tag.innerText = modal_item_group_value;
        item_name_tag.innerText = modal_item_name;
        item_price_tag.innerText = modal_item_price;

        if ((target_row_item_group != modal_item_group_value) || (target_row_name != modal_item_name) ||
            (target_row_price != modal_item_price) || (target_row_parentitem != modal_parent_item)) {
            modal_item_row.setAttribute('data-update-status', "1");

            if (modal_item_row.querySelector('.js_useroption_item_update_status').classList.contains('bg-label-secondary')) {
                modal_item_row.querySelector('.js_useroption_item_update_status').classList.remove('bg-label-secondary');
                modal_item_row.querySelector('.js_useroption_item_update_status').classList.add('bg-label-success');
                modal_item_row.querySelector('.js_useroption_item_update_status').innerText = "بروزرسانی شده";
            }
        }
        else {
            modal_item_row.setAttribute('data-update-status', "0");

            if (modal_item_row.querySelector('.js_useroption_item_update_status').classList.contains('bg-label-success')) {
                modal_item_row.querySelector('.js_useroption_item_update_status').classList.remove('bg-label-success');
                modal_item_row.querySelector('.js_useroption_item_update_status').classList.add('bg-label-secondary');
                modal_item_row.querySelector('.js_useroption_item_update_status').innerText = "مقادیر اولیه";
            }
        }
    }

    Reset_UserOption_Item_Func();
}
function Remove_UserOption_Item_Row(button, parent_table_id, parent_row_id) {
    let table = button.closest('table');
    let parentRow = button.closest('tr');

    console.log("delete -> parentRow :", parentRow);

    let modal_table = document.getElementById("Insert_UserOption_Items_Modal_Items_Table");
    let modal_tbody = modal_table.querySelector('tbody');
    let modal = button.closest('.modal');

    if (modal) {
        $(modal).modal('hide');
    }

    swal.fire({
        title: 'حذف آیتم',
        text: "در مورد حذف آیتم مطمئن هستید؟",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: 'بله آیتم حذف شود',
        cancelButtonText: 'خیر'
    })
        .then((result) => {
            if (result.isConfirmed) {
                swal.fire({
                    title: 'موفق!',
                    text: 'آیتم با موفقیت حذف شد.',
                    icon: 'success',
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: 'بسیار خب',
                })
                    .then(() => {
                        if (parentRow && parentRow.parentNode) {
                            var row_id_for_remove = parentRow.id;
                            var table_id_of_row_for_remove = document.getElementById("Insert_UserOption_Items_Modal_Items_Table").dataset.parent_table_id;
                            var row_data_item_id_for_remove;
                            var row_data_unique_id_for_remove;
                            var item_type_temp = "";

                            var useroption_childs_level1_rows = "";
                            var useroption_childs_level2_rows = "";

                            if (parentRow.classList[0] === "new_useroption_item") {
                                row_data_item_id_for_remove = "";
                                row_data_unique_id_for_remove = parentRow.dataset.uniqueid;
                                item_type_temp = "new_useroption_item";
                            }
                            else {
                                row_data_item_id_for_remove = parentRow.dataset.item_id;
                                row_data_unique_id_for_remove = "";
                                item_type_temp = "old_useroption_item";
                            }

                            if ((modal.dataset.parent_row_class === "new_usersuboption_child") || (modal.dataset.parent_row_class === "old_usersuboption_child")) {
                                Removed_Items.push({
                                    Id: row_id_for_remove,
                                    Item_Id: row_data_item_id_for_remove,
                                    Unique_Id: row_data_unique_id_for_remove,
                                    Table_Id: table_id_of_row_for_remove,
                                    Item_Type: item_type_temp
                                });

                            }
                            else if ((modal.dataset.parent_row_class === "new_usersuboption") || (modal.dataset.parent_row_class === "old_usersuboption")) {
                                Removed_Items.push({
                                    Id: row_id_for_remove,
                                    Item_Id: row_data_item_id_for_remove,
                                    Unique_Id: row_data_unique_id_for_remove,
                                    Table_Id: table_id_of_row_for_remove,
                                    Item_Type: item_type_temp
                                });

                                var data_item_id_temp;

                                if (row_data_item_id_for_remove === "" && row_data_unique_id_for_remove != "") {
                                    data_item_id_temp = row_data_unique_id_for_remove;
                                }
                                else if (row_data_item_id_for_remove != "" && row_data_unique_id_for_remove === "") {
                                    data_item_id_temp = row_data_item_id_for_remove;
                                }
                                else {
                                    data_item_id_temp = "";
                                }

                                useroption_childs_level1_rows = document.getElementById("UserOption_Items_Tables_List").querySelectorAll(`tr[data-parent_option_item_id="${data_item_id_temp}"][data-parent_option_item_table_id="${table_id_of_row_for_remove}"]`);

                                if (useroption_childs_level1_rows.length > 0) {
                                    for (var i = 0; i < useroption_childs_level1_rows.length; i++) {
                                        if (useroption_childs_level1_rows[i].classList[0] === "new_useroption_item") {
                                            Removed_Items.push({
                                                Id: useroption_childs_level1_rows[i].id,
                                                Item_Id: "",
                                                Unique_Id: useroption_childs_level1_rows[i].dataset.uniqueid,
                                                Table_Id: useroption_childs_level1_rows[i].closest('table').id,
                                                Item_Type: "new_useroption_item"
                                            });
                                        }
                                        else {
                                            Removed_Items.push({
                                                Id: useroption_childs_level1_rows[i].id,
                                                Item_Id: useroption_childs_level1_rows[i].dataset.item_id,
                                                Unique_Id: "",
                                                Table_Id: useroption_childs_level1_rows[i].closest('table').id,
                                                Item_Type: "old_useroption_item"
                                            });
                                        }
                                    }
                                }

                            }
                            else {
                                Removed_Items.push({
                                    Id: row_id_for_remove,
                                    Item_Id: row_data_item_id_for_remove,
                                    Unique_Id: row_data_unique_id_for_remove,
                                    Table_Id: table_id_of_row_for_remove,
                                    Item_Type: item_type_temp
                                });

                                var data_item_id_temp;

                                if (row_data_item_id_for_remove === "" && row_data_unique_id_for_remove != "") {
                                    data_item_id_temp = row_data_unique_id_for_remove;
                                }
                                else if (row_data_item_id_for_remove != "" && row_data_unique_id_for_remove === "") {
                                    data_item_id_temp = row_data_item_id_for_remove;
                                }
                                else {
                                    data_item_id_temp = "";
                                }

                                useroption_childs_level1_rows = document.getElementById("UserOption_Items_Tables_List").querySelectorAll(`tr[data-parent_option_item_id="${data_item_id_temp}"][data-parent_option_item_table_id="${table_id_of_row_for_remove}"]`);

                                if (useroption_childs_level1_rows.length > 0) {
                                    for (var i = 0; i < useroption_childs_level1_rows.length; i++) {
                                        if (useroption_childs_level1_rows[i].classList[0] === "new_useroption_item") {
                                            Removed_Items.push({
                                                Id: useroption_childs_level1_rows[i].id,
                                                Item_Id: "",
                                                Unique_Id: useroption_childs_level1_rows[i].dataset.uniqueid,
                                                Table_Id: useroption_childs_level1_rows[i].closest('table').id,
                                                Item_Type: "new_useroption_item"
                                            });

                                            useroption_childs_level2_rows = document.getElementById("UserOption_Items_Tables_List").querySelectorAll(`tr[data-parent_option_item_id="${useroption_childs_level1_rows[i].dataset.uniqueid}"][data-parent_option_item_table_id="${useroption_childs_level1_rows[i].closest('table').id}"]`);

                                            if (useroption_childs_level2_rows.length > 0) {
                                                for (var j = 0; j < useroption_childs_level2_rows.length; j++) {
                                                    if (useroption_childs_level2_rows[j].classList[0] === "new_useroption_item") {
                                                        Removed_Items.push({
                                                            Id: useroption_childs_level2_rows[j].id,
                                                            Item_Id: "",
                                                            Unique_Id: useroption_childs_level2_rows[j].dataset.uniqueid,
                                                            Table_Id: useroption_childs_level2_rows[j].closest('table').id,
                                                            Item_Type: "new_useroption_item"
                                                        });
                                                    }
                                                    else {
                                                        Removed_Items.push({
                                                            Id: useroption_childs_level2_rows[j].id,
                                                            Item_Id: useroption_childs_level2_rows[j].dataset.item_id,
                                                            Unique_Id: "",
                                                            Table_Id: useroption_childs_level2_rows[j].closest('table').id,
                                                            Item_Type: "old_useroption_item"
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            Removed_Items.push({
                                                Id: useroption_childs_level1_rows[i].id,
                                                Item_Id: useroption_childs_level1_rows[i].dataset.item_id,
                                                Unique_Id: "",
                                                Table_Id: useroption_childs_level1_rows[i].closest('table').id,
                                                Item_Type: "old_useroption_item"
                                            });

                                            useroption_childs_level2_rows = document.getElementById("UserOption_Items_Tables_List").querySelectorAll(`tr[data-parent_option_item_id="${useroption_childs_level1_rows[i].dataset.item_id}"][data-parent_option_item_table_id="${useroption_childs_level1_rows[i].closest('table').id}"]`);

                                            if (useroption_childs_level2_rows.length > 0) {
                                                for (var j = 0; j < useroption_childs_level2_rows.length; j++) {
                                                    if (useroption_childs_level2_rows[j].classList[0] === "new_useroption_item") {
                                                        Removed_Items.push({
                                                            Id: useroption_childs_level2_rows[j].id,
                                                            Item_Id: "",
                                                            Unique_Id: useroption_childs_level2_rows[j].dataset.uniqueid,
                                                            Table_Id: useroption_childs_level2_rows[j].closest('table').id,
                                                            Item_Type: "new_useroption_item"
                                                        });
                                                    }
                                                    else {
                                                        Removed_Items.push({
                                                            Id: useroption_childs_level2_rows[j].id,
                                                            Item_Id: useroption_childs_level2_rows[j].dataset.item_id,
                                                            Unique_Id: "",
                                                            Table_Id: useroption_childs_level2_rows[j].closest('table').id,
                                                            Item_Type: "old_useroption_item"
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                            }

                            parentRow.parentNode.removeChild(parentRow);
                        }

                        let modal_rows = modal_tbody.querySelectorAll('tr');

                        modal_rows.forEach((row, index) => {
                            let newRowId = 'Parent_Row_' + (index + 1);
                            row.setAttribute('id', newRowId);
                            let updateButton = row.querySelector('.js_useroption_item_update');
                            let removeButton = row.querySelector('.js_useroption_item_remove');

                            if (updateButton) {
                                updateButton.setAttribute('data-parent_row_id', newRowId);
                            }
                            if (removeButton) {
                                removeButton.setAttribute('data-parent_row_id', newRowId);
                            }
                        });

                        modal_table = document.getElementById("Insert_UserOption_Items_Modal_Items_Table");
                        modal_tbody = modal_table.querySelector('tbody');
                        var modal_table_rows_count = modal_tbody.querySelectorAll('tr').length;
                        var modal_no_result = document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult");
                        var search_input = document.getElementById('SearchItemInput');

                        if (modal_table_rows_count > 0) {
                            if (search_input.hasAttribute('disabled')) {
                                search_input.removeAttribute('disabled');
                            }

                            modal_no_result.style.display = "none";
                            modal_table.style.display = "block";

                            Items_PaginateTable(search_input.value, rowsPerPage, 1);
                        }
                        else {
                            if (!search_input.hasAttribute('disabled')) {
                                search_input.setAttribute('disabled', '');
                            }

                            modal_no_result.style.display = "block";
                            modal_table.style.display = "none";
                        }

                        $(modal).modal('show');
                    });
            }
            else {
                $(modal).modal('show');
            }
        });
}
function Submit_UserOption_Items_Changes()
{
    Removed_UserOption_Items = Removed_UserOption_Items.concat(Removed_Items);

    var user_option_items_table_list = document.getElementById("UserOption_Items_Tables_List");

    Removed_Items.forEach((item, index) => {
        console.log("Item at index", index, ":", item);
        console.log("Id:", item.Id);
        console.log("Item_Id:", item.Item_Id);
        console.log("Table_Id:", item.Table_Id);
        console.log("Item_Type:", item.Item_Type);
        console.log("Unique_Id:", item.Unique_Id);
        console.log("-----------------------------------");

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        var target_table_to_remove = user_option_items_table_list.querySelector(`table#${item.Table_Id}`);
        var target_tbody_to_remove = target_table_to_remove.querySelector('tbody');
        var target_row_to_remove;

        if (item.Item_Type === "old_useroption_item") {
            var target_item_id = item.Item_Id;
            target_row_to_remove = target_tbody_to_remove.querySelector(`tr[data-item_id="${target_item_id}"]`);
        }
        else {
            var target_unique_id = item.Unique_Id;
            target_row_to_remove = target_tbody_to_remove.querySelector(`tr[data-uniqueid="${target_unique_id}"]`);
        }

        if (target_row_to_remove != null) {
            var target_row_to_remove_parent_table = target_row_to_remove.closest('table');
            target_row_to_remove_parent_table.setAttribute("data-remove_status", "after_remove");

            target_row_to_remove.parentNode.removeChild(target_row_to_remove);
        }

    });

    ///////////////////////////////////////////////////////////////////////////////useroption_items_table

    var update_btn = document.getElementById("Add_Or_Update_UserOption_Item");
    var parent_table_id = update_btn.dataset.parent_table_id;
    var parent_table = document.getElementById(parent_table_id);
    var parent_table_tbody = parent_table.querySelector('tbody');

    ///////////////////////////////////////////////////////////////////////////////modal_items_table

    target_table = document.getElementById("Insert_UserOption_Items_Modal_Items_Table");
    target_tbody = target_table.querySelector('tbody');

    parent_table_tbody.innerHTML = target_tbody.innerHTML;

    console.log("همسان سازی انجام شد");

    $('#Insert_UserOption_Items_Modal').modal('hide');

}

////////////////////////////////////////UserOption_Title

var Removed_Titles = [];
var Removed_UserOption_Titles = [];
var Nested_Removed_UserOption_Titles = [];
function ShowTitleModal_ForUserOption(button, classname)
{
    currentButton = button;
    Current_Title_Tag = button.closest('tr').querySelector('span.js_useroption_title');

    var titleText = $(button).next('.title-text').text().trim();

    if (titleText !== 'عنوانی تعیین نشده است')
    {
        $('#Update_Title_Text_ForUserOption').val(titleText);
    }
    else
    {
        $('#Update_Title_Text_ForUserOption').val('');
    }

    $('#Update_UserOption_Title_Modal').modal('show');
}
function Update_UserOption_Title()
{
    var newTitle = $('#Update_Title_Text_ForUserOption').val();

    if (newTitle === '')
    {
        $(currentButton).next('.title-text').text('عنوانی تعیین نشده است');
        Current_Title_Tag.innerText = "";
    }
    else
    {
        $(currentButton).next('.title-text').text(newTitle);
        Current_Title_Tag.innerText = newTitle;
    }

    $('#Update_UserOption_Title_Modal').modal('hide');
}

////////////////////////////////////////UserOption_Insert
function CheckOptionType(id, selectedType)
{
    if (id === "Insert_UserOption_Type")
    {
        var insert_option_modal = document.getElementById("Insert_UserOption_Modal");
        var insert_option_extension = insert_option_modal.querySelector('.js_insert_useroption_extension');
        var option_extension_alltags_parent = insert_option_extension.querySelector('tags');

        if (option_extension_alltags_parent != null) {
            var option_extension_alltags = option_extension_alltags_parent.querySelectorAll('tag.tagify__tag');

            for (var i = 0; i < option_extension_alltags.length; i++) {
                var child_tag = option_extension_alltags[i];
                var parent_tag = child_tag.parentNode;
                parent_tag.removeChild(child_tag);
            }

            option_extension_alltags_parent.classList = "tagify form-control mt-2 tagify--noTags tagify--empty";
        }

        if (selectedType === "FileUpload") {
            document.getElementById("Insert_UserOption_FileUpload_Area").style.display = "block";
            document.getElementById("Insert_UserOption_TextArea_Area").style.display = "none";

            document.getElementById("Insert_UserOption_FileSize").value = "1";
            document.getElementById("Insert_UserOption_FileSize").setAttribute("min", "1");

            document.getElementById("Insert_UserOption_MaxLength").value = "0";
            document.getElementById("Insert_UserOption_MaxLength").setAttribute("min", "0");
        }
        else if (selectedType === "TextArea") {
            document.getElementById("Insert_UserOption_FileUpload_Area").style.display = "none";
            document.getElementById("Insert_UserOption_TextArea_Area").style.display = "block";

            document.getElementById("Insert_UserOption_MaxLength").value = "1";
            document.getElementById("Insert_UserOption_MaxLength").setAttribute("min", "1");

            document.getElementById("Insert_UserOption_FileSize").value = "0";
            document.getElementById("Insert_UserOption_FileSize").setAttribute("min", "0");
        }
        else {
            document.getElementById("Insert_UserOption_FileUpload_Area").style.display = "none";
            document.getElementById("Insert_UserOption_TextArea_Area").style.display = "none";

            document.getElementById("Insert_UserOption_FileSize").value = "0";
            document.getElementById("Insert_UserOption_FileSize").setAttribute("min", "0");

            document.getElementById("Insert_UserOption_MaxLength").value = "0";
            document.getElementById("Insert_UserOption_MaxLength").setAttribute("min", "0");
        }
    }
    else if (id === "Update_UserOption_Type") {
        var update_option_modal = document.getElementById("Update_UserOption_Modal");
        var update_option_extension = update_option_modal.querySelector('.js_update_useroption_extension');
        var option_extension_alltags_parent = update_option_extension.querySelector('tags');

        if (option_extension_alltags_parent != null) {
            var option_extension_alltags = option_extension_alltags_parent.querySelectorAll('tag.tagify__tag');

            for (var i = 0; i < option_extension_alltags.length; i++) {
                var child_tag = option_extension_alltags[i];
                var parent_tag = child_tag.parentNode;
                parent_tag.removeChild(child_tag);
            }

            option_extension_alltags_parent.classList = "tagify form-control mt-2 tagify--noTags tagify--empty";
        }

        if (selectedType === "FileUpload") {
            document.getElementById("Update_UserOption_FileUpload_Area").style.display = "block";
            document.getElementById("Update_UserOption_TextArea_Area").style.display = "none";

            document.getElementById("Update_UserOption_FileSize").value = "1";
            document.getElementById("Update_UserOption_FileSize").setAttribute("min", "1");

            document.getElementById("Update_UserOption_MaxLength").value = "0";
            document.getElementById("Update_UserOption_MaxLength").setAttribute("min", "0");
        }
        else if (selectedType === "TextArea") {
            document.getElementById("Update_UserOption_FileUpload_Area").style.display = "none";
            document.getElementById("Update_UserOption_TextArea_Area").style.display = "block";

            document.getElementById("Update_UserOption_MaxLength").value = "1";
            document.getElementById("Update_UserOption_MaxLength").setAttribute("min", "1");

            document.getElementById("Update_UserOption_FileSize").value = "0";
            document.getElementById("Update_UserOption_FileSize").setAttribute("min", "0");
        }
        else {
            document.getElementById("Update_UserOption_FileUpload_Area").style.display = "none";
            document.getElementById("Update_UserOption_TextArea_Area").style.display = "none";

            document.getElementById("Update_UserOption_FileSize").value = "0";
            document.getElementById("Update_UserOption_FileSize").setAttribute("min", "0");

            document.getElementById("Update_UserOption_MaxLength").value = "0";
            document.getElementById("Update_UserOption_MaxLength").setAttribute("min", "0");
        }
    }
    else if (id === "Insert_UserSubOption_Type") {
        var insert_option_modal = document.getElementById("Insert_UserSubOption_Modal");
        var insert_option_extension = insert_option_modal.querySelector('.js_insert_usersuboption_extension');
        var option_extension_alltags_parent = insert_option_extension.querySelector('tags');

        if (option_extension_alltags_parent != null) {
            var option_extension_alltags = option_extension_alltags_parent.querySelectorAll('tag.tagify__tag');

            for (var i = 0; i < option_extension_alltags.length; i++) {
                var child_tag = option_extension_alltags[i];
                var parent_tag = child_tag.parentNode;
                parent_tag.removeChild(child_tag);
            }

            option_extension_alltags_parent.classList = "tagify form-control mt-2 tagify--noTags tagify--empty";
        }

        if (selectedType === "FileUpload") {
            document.getElementById("Insert_UserSubOption_FileUpload_Area").style.display = "block";
            document.getElementById("Insert_UserSubOption_TextArea_Area").style.display = "none";

            document.getElementById("Insert_UserSubOption_FileSize").value = "1";
            document.getElementById("Insert_UserSubOption_FileSize").setAttribute("min", "1");

            document.getElementById("Insert_UserSubOption_MaxLength").value = "0";
            document.getElementById("Insert_UserSubOption_MaxLength").setAttribute("min", "0");
        }
        else if (selectedType === "TextArea") {
            document.getElementById("Insert_UserSubOption_FileUpload_Area").style.display = "none";
            document.getElementById("Insert_UserSubOption_TextArea_Area").style.display = "block";

            document.getElementById("Insert_UserSubOption_MaxLength").value = "1";
            document.getElementById("Insert_UserSubOption_MaxLength").setAttribute("min", "1");

            document.getElementById("Insert_UserSubOption_FileSize").value = "0";
            document.getElementById("Insert_UserSubOption_FileSize").setAttribute("min", "0");
        }
        else {
            document.getElementById("Insert_UserSubOption_FileUpload_Area").style.display = "none";
            document.getElementById("Insert_UserSubOption_TextArea_Area").style.display = "none";

            document.getElementById("Insert_UserSubOption_FileSize").value = "0";
            document.getElementById("Insert_UserSubOption_FileSize").setAttribute("min", "0");

            document.getElementById("Insert_UserSubOption_MaxLength").value = "0";
            document.getElementById("Insert_UserSubOption_MaxLength").setAttribute("min", "0");
        }
    }
}
function Show_Insert_UserOption_Modal()
{
    var tagifyTags = document.querySelectorAll("#UserOptions_Categories_Parent span.tagify__tag-text");
    var categoryIds = Array.from(tagifyTags).map(tag => Number(tag.dataset.id.trim()));

    let catid = 0;
    let catname = '';

    categoryIds.forEach((id, index) => {
        catid = id;
    });

    tagifyTags.forEach((tag) => {

        var textNode = tag.firstChild;

        if (textNode && textNode.nodeType === Node.TEXT_NODE) {

            catname = textNode.textContent;
        }
    });

    if (tagifyTags.length == 0) {
        swal.fire({
            title: 'هشدار',
            text: "یک دسته بندی انتخاب کنید!",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'بسیار خب',
        });
        return;
    }
    else if (tagifyTags.length > 1) {
        swal.fire({
            title: 'هشدار',
            text: "حداکثر یک دسته بندی انتخاب کنید!",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'بسیار خب',
        });
        return;
    }
    else {
        document.getElementById("Insert_UserOption_Category").value = catname;
        document.getElementById("Insert_UserOption_Category").dataset.catid = catid;

        var selectElement = document.getElementById("UserOptions_Type_Select");
        var selectedValue = selectElement.value;

        var insertSelectElement = document.getElementById("Insert_UserOption_Type");
        insertSelectElement.value = selectedValue;

        var selectedType = document.getElementById("UserOptions_Type_Select").value;

        var insert_option_modal = document.getElementById("Insert_UserOption_Modal");
        var insert_option_extension = insert_option_modal.querySelector('.js_insert_useroption_extension');
        var option_extension_alltags_parent = insert_option_extension.querySelector('tags');

        if (option_extension_alltags_parent != null) {
            var option_extension_alltags = option_extension_alltags_parent.querySelectorAll('tag.tagify__tag');

            for (var i = 0; i < option_extension_alltags.length; i++) {
                var child_tag = option_extension_alltags[i];
                var parent_tag = child_tag.parentNode;
                parent_tag.removeChild(child_tag);
            }

            option_extension_alltags_parent.classList = "tagify form-control mt-2 tagify--noTags tagify--empty";
        }

        if (selectedType === "FileUpload") {
            document.getElementById("Insert_UserOption_FileUpload_Area").style.display = "block";
            document.getElementById("Insert_UserOption_TextArea_Area").style.display = "none";

            document.getElementById("Insert_UserOption_FileSize").value = "1";
            document.getElementById("Insert_UserOption_FileSize").setAttribute("min", "1");

            document.getElementById("Insert_UserOption_MaxLength").value = "0";
            document.getElementById("Insert_UserOption_MaxLength").setAttribute("min", "0");
        }
        else if (selectedType === "TextArea") {
            document.getElementById("Insert_UserOption_FileUpload_Area").style.display = "none";
            document.getElementById("Insert_UserOption_TextArea_Area").style.display = "block";

            document.getElementById("Insert_UserOption_MaxLength").value = "1";
            document.getElementById("Insert_UserOption_MaxLength").setAttribute("min", "1");

            document.getElementById("Insert_UserOption_FileSize").value = "0";
            document.getElementById("Insert_UserOption_FileSize").setAttribute("min", "0");

        }
        else {
            document.getElementById("Insert_UserOption_FileUpload_Area").style.display = "none";
            document.getElementById("Insert_UserOption_TextArea_Area").style.display = "none";

            document.getElementById("Insert_UserOption_FileSize").value = "0";
            document.getElementById("Insert_UserOption_FileSize").setAttribute("min", "0");
            document.getElementById("Insert_UserOption_MaxLength").value = "0";
            document.getElementById("Insert_UserOption_MaxLength").setAttribute("min", "0");
        }

        $('#Insert_UserOption_Modal').modal('show');
    }
}
function ExecuteOperation_ForInsertUserOption(catid)
{
    document.getElementById("Rewise_UserControls_Result").style.display = "block";
    document.getElementById("UserOption_Table_Title").style.display = "block";
    document.getElementById("UserOption_Table_List").style.display = "block";
    document.getElementById("UserSubOption_Table_Title").style.display = "none";
    document.getElementById("UserSubOption_Table_List").style.display = "none";
    document.getElementById("UserSubOption_Childs_Table_Title").style.display = "none";
    document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";
    document.getElementById("UserOption_NoResult").style.display = "none";

    var UserOption_Table_List = document.getElementById("UserOption_Table_List");
    var UserOption_Table_List_Count = UserOption_Table_List.querySelectorAll('table').length;
    let userOptionTable;

    if (UserOption_Table_List_Count > 0)
    {
        userOptionTable = document.getElementById(`UserOption_Table_${catid}`);

        if (userOptionTable == null)
        {
            UserOption_Table_List.innerHTML += `
                <table id="UserOption_Table_${catid}" class="table table-striped mb-3" style="display:block">
                    <thead id="UserOption_Table_THead_${catid}" class="table-dark">
                        <tr>
                            <th>عنوان</th>
                            <th>نوع</th>
                            <th>قیمت</th>
                            <th class="compact-column">تصاویر</th>
                            <th class="compact-column">آیتم‌ها</th>
                            <th class="compact-column">عنوان‌ها</th>
                            <th class="compact-column">معرفی</th>
                            <th class="compact-column">فرزندان</th>
                            <th class="compact-column">ویرایش</th>
                            <th class="compact-column">حذف</th>
                        </tr>
                    </thead>
                    <tbody id="UserOption_Table_TBody_${catid}" class="table-border-bottom-0">
                    </tbody>
                </table>`;
        }
    }
    else
    {
        UserOption_Table_List.innerHTML += `
            <table id="UserOption_Table_${catid}" class="table table-striped mb-3" style="display:block">
                <thead id="UserOption_Table_THead_${catid}" class="table-dark">
                    <tr>
                        <th>عنوان</th>
                        <th>نوع</th>
                        <th>قیمت</th>
                        <th class="compact-column">تصاویر</th>
                        <th class="compact-column">آیتم‌ها</th>
                        <th class="compact-column">عنوان‌ها</th>
                        <th class="compact-column">معرفی</th>
                        <th class="compact-column">فرزندان</th>
                        <th class="compact-column">ویرایش</th>
                        <th class="compact-column">حذف</th>
                    </tr>
                </thead>
                <tbody id="UserOption_Table_TBody_${catid}" class="table-border-bottom-0">
                </tbody>
            </table>`;
    }

    userOptionTable = document.getElementById(`UserOption_Table_${catid}`);
    userOptionTable.dataset.catid = catid;

    const uop_title = document.getElementById("Insert_UserOption_Title").value || 'عنوانی تعیین نشده است';
    const option_type_element = document.getElementById("Insert_UserOption_Type");
    const option_type_value = option_type_element.value;
    const uop_type = option_type_element.options[option_type_element.selectedIndex].innerText;
    const uop_price_text = document.getElementById("Insert_UserOption_Price").value;
    const uop_price = uop_price_text.replace(/,/g, "");
    const uop_tooltip = document.getElementById("Insert_UserOption_ToolTip").value || 'توضیحاتی ارائه نشده است';
    const hastooltip = uop_tooltip !== 'توضیحاتی ارائه نشده است';

    const tagifyTags = document.querySelectorAll(".js_insert_useroption_extension span.tagify__tag-text");
    const extensionList = Array.from(tagifyTags).map(tag => tag.dataset.id.trim());
    const optionExtensions = extensionList.join(',');

    const uop_filesize = document.getElementById("Insert_UserOption_FileSize").value;
    const uop_maxlength = document.getElementById("Insert_UserOption_MaxLength").value;

    const parentElement = document.getElementById("Sub_UserOption_Tables_Parent");

    if (parentElement)
    {
        parentElement.style.display = "none";
    }

    let tbody = document.getElementById(`UserOption_Table_TBody_${catid}`);

    if (!tbody)
    {
        tbody = document.createElement('tbody');
        tbody.id = `UserOption_Table_TBody_${catid}`;
        userOptionTable.appendChild(tbody);
    }

    const oldrowsCount = tbody.querySelectorAll('tr.old_useroption').length;
    const newrowsCount = tbody.querySelectorAll('tr.new_useroption').length;
    const tableRowCount = oldrowsCount + newrowsCount + 1;

    const tableRow = document.createElement('tr');
    tableRow.id = `Parent_Row_${tableRowCount}`;
    tableRow.className = "new_useroption";
    tableRow.dataset.previndex = `${tableRowCount}`;
    tableRow.dataset.extensions = optionExtensions;
    tableRow.dataset.filesize = uop_filesize;
    tableRow.dataset.maxlength = uop_maxlength;

    tableRow.innerHTML = `
        <td><span class="js_useroption_title">${uop_title === "عنوانی تعیین نشده است" ? '' : uop_title}</span></td>
        <td><span class="js_useroption_type" data-optiontype="${option_type_value}">${uop_type}</span></td>
        <td><span class="js_useroption_price">${uop_price_text}</span></td>
        <td class="compact-column">
            <a class="btn btn-dark text-white js_useroption_addimage ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled_button'}" style="height: 38px;" data-parentid="${tableRowCount}" data-images_table_id="" ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? `onclick="ShowInsertImageModal_ForUserOption(this.dataset.parentid,'new_useroption')"` : 'disabled'}><i class="fas fa-image"></i></a>
        </td>
        <td class="compact-column">
            <a class="btn btn-primary text-white js_useroption_additem" style="height: 38px;" data-parentid="${tableRowCount}" data-items_table_id="" onclick="ShowInsertItemModal_ForUserOption(this)"><i class="fas fa-list-ul"></i></a>
        </td>
        <td class="compact-column">
            <div class="title-custom">
                <a class="btn btn-purple text-white js_useroption_update_title" style="height: 38px;" onclick="ShowTitleModal_ForUserOption(this,'new_useroption')">
                    <i class="fas fa-layer-group"></i>
                </a>
                <span class="title-text">${uop_title}</span>
            </div>
        </td>
        <td class="compact-column">
            <div class="tooltip-custom">
                <a class="btn ${hastooltip ? 'btn-info' : 'btn-secondary'} text-white js_useroption_update_tooltip" style="height: 38px;" onclick="ShowToolTipModal_ForUserOption(this, 'new_useroption')">
                    <i class="fas fa-question"></i>
                </a>
                <span class="tooltip-text">${uop_tooltip}</span>
            </div>
        </td>
        <td class="compact-column">
            <div class="dropdown">
                <a class="btn btn-warning text-white dropdown-toggle no-dropdown-arrow" id="Dmb_${tableRowCount}" data-bs-toggle="dropdown" aria-expanded="false" style="height: 38px;">
                    <i class="fas fa-ellipsis-v"></i>
                </a>
                <ul class="dropdown-menu" aria-labelledby="Dmb_${tableRowCount}">
                    <li><a class="dropdown-item js_add_usersuboptions" href="#" onclick="Show_Insert_UserSubOption_Modal(event, ${catid})"><i class="fas fa-plus"></i> افزودن</a></li>
                    <li><a class="dropdown-item js_show_usersuboptions" href="#" onclick="Show_UserSubOptions(event, ${catid})"><i class="fas fa-eye"></i> نمایش</a></li>
                </ul>
            </div>
        </td>
        <td class="compact-column">
            <a class="btn btn-success text-white js_useroption_updateitem" style="height: 38px;" data-parentid="${tableRowCount}" onclick="ShowUpdateModal_ForUserOption(this,this.dataset.parentid,'new_useroption')"><i class="fas fa-pencil"></i></a>
        </td>
        <td class="compact-column">
            <a class="btn btn-danger text-white js_useroption_remove" style="height: 38px;" onclick="Remove_UserOption_Row(this,'new_useroption')"><i class="fas fa-trash"></i></a>
        </td>`;

    tbody.appendChild(tableRow);

    document.getElementById("Insert_UserOption_Title").value = '';
    document.getElementById("Insert_UserOption_Price").value = "0";
    document.getElementById("Insert_UserOption_ToolTip").value = '';

    $('#Insert_UserOption_Modal').modal('hide');
}
function Insert_UserOption()
{
    const tagifyTags = document.querySelectorAll("#UserOptions_Categories_Parent span.tagify__tag-text");
    const categoryIds = Array.from(tagifyTags).map(tag => Number(tag.dataset.id.trim()));
    const catId = categoryIds[0];

    ExecuteOperation_ForInsertUserOption(catId);
}

////////////////////////////////////////UserOption_Items_Functions

let currentPage = 1;
const rowsPerPage = 5;

var Removed_Items = [];
var Removed_UserOption_Items = [];
var Nested_Removed_UserOption_Items = [];
function Items_PaginateTable(searchTerm = "", rowsPerPage = 5, currentPage = 1)
{
    const rows = Array.from(document.querySelectorAll("#Insert_UserOption_Items_Modal_Items_Table_TBody tr"));

    const filteredRows = rows.filter(row => {
        const rowText = row.textContent.toLowerCase();
        return rowText.includes(searchTerm.toLowerCase());
    });

    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
    const paginationContainer = document.getElementById("update_items_pagination_controls");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.onclick = () => Items_PaginateTable(searchTerm, rowsPerPage, i);
        button.disabled = i === currentPage;
        paginationContainer.appendChild(button);
    }

    rows.forEach(row => row.style.display = "none");

    const startIdx = (currentPage - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    filteredRows.slice(startIdx, endIdx).forEach(row => row.style.display = "");

    const noResultsMessage = document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult");
    noResultsMessage.style.display = filteredRows.length === 0 ? "block" : "none";
}
function ShowInsertItemModal_ForUserOption(element)
{
    Reset_UserOption_Item_Func();

    SetCookie("Removed_Items", JSON.stringify([]), 1);

    var User_Option_Parent_Table_Id_Temp = element.dataset.items_table_id;

    var modal_add_or_update_btn = document.getElementById("Add_Or_Update_UserOption_Item");
    modal_add_or_update_btn.setAttribute("data-parent_table_id", User_Option_Parent_Table_Id_Temp);

    const modal_tbody_temp = document.getElementById("Insert_UserOption_Items_Modal_Items_Table_TBody");
    modal_tbody_temp.innerHTML = '';

    var tagifyTags = document.querySelectorAll("#UserOptions_Categories_Parent span.tagify__tag-text");
    var categoryIds = Array.from(tagifyTags).map(tag => Number(tag.dataset.id.trim()));

    let catid = 0;
    let catname = '';

    categoryIds.forEach((id, index) => {
        catid = id;
    });

    tagifyTags.forEach((tag) => {

        var textNode = tag.firstChild;

        if (textNode && textNode.nodeType === Node.TEXT_NODE) {

            catname = textNode.textContent;
        }
    });

    if (tagifyTags.length == 0) {
        swal.fire({
            title: 'هشدار',
            text: "یک دسته بندی انتخاب کنید!",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'بسیار خب',
        });
        return;
    }
    else if (tagifyTags.length > 1) {
        swal.fire({
            title: 'هشدار',
            text: "حداکثر یک دسته بندی انتخاب کنید!",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'بسیار خب',
        });
        return;
    }
    else
    {
        document.getElementById("Insert_UserOption_Items_Category").value = catname;
        document.getElementById("Insert_UserOption_Items_Category").dataset.catid = catid;

        var grand_parent_table = null;
        var grand_parent_row = null;
        var grand_parent_row_class = '';
        var grand_parent_row_data_id = '';
        var grand_parent_row_id = '';
        var parent_table = element.closest('table');
        var table_row = element.closest('tr');

        var row_id = table_row.id;
        var row_class = table_row.classList[0];
        var row_dataid = '';

        if (row_class === 'old_useroption' || row_class === 'old_usersuboption' || row_class === 'old_usersuboption_child') {
            row_dataid = table_row.dataset.id;
        }

        let option_type_tag = table_row.querySelector(".js_useroption_type");
        let option_type_value = option_type_tag.innerText;
        let option_type_dataset_value = option_type_tag.dataset.optiontype;

        document.getElementById("Insert_UserOption_Items_OptionType").value = option_type_value;
        document.getElementById("Insert_UserOption_Items_OptionType").dataset.optiontype = option_type_dataset_value;

        document.getElementById("Insert_UserOption_Items_Modal").dataset.parent_catid = catid;
        document.getElementById("Insert_UserOption_Items_Modal").dataset.parent_row_id = row_id;
        document.getElementById("Insert_UserOption_Items_Modal").dataset.parent_row_class = row_class;
        document.getElementById("Insert_UserOption_Items_Modal").dataset.parent_data_id = row_dataid;

        var formdata = new FormData();

        if (row_dataid != "")
        {
            formdata.append("OptionId", Number(row_dataid));

            $.ajax({
                type: "POST",
                url: "GetUserOption_Items",
                contentType: false,
                processData: false,
                data: formdata,
                success: function (data)
                {
                    if (data.isSuccess)
                    {
                        var UserOption_Items_Table_List = document.getElementById("UserOption_Items_Tables_List");

                        if (data.data.items.length > 0)
                        {
                            if (element.dataset.items_table_id === "")
                            {
                                var useroption_items_table_id = "UserOption_Items_Table_" + Math.random().toString(16).slice(2);
                                element.setAttribute("data-items_table_id", useroption_items_table_id);

                                var modal_update_btn = document.getElementById("Add_Or_Update_UserOption_Item");
                                modal_update_btn.setAttribute('data-parent_table_id', useroption_items_table_id);

                                var useroption_items_table_index = useroption_items_table_id.replace("UserOption_Items_Table_", "");
                                var useroption_items_thead_id = "UserOption_Items_Table_THead_" + useroption_items_table_index.toString();
                                var useroption_items_tbody_id = "UserOption_Items_Table_TBody_" + useroption_items_table_index.toString();

                                UserOption_Items_Table_List.innerHTML += `
                                <table id="${useroption_items_table_id}" data-remove_status="before_remove" class="table table-striped mb-3" style="display:block">
                                    <thead id="${useroption_items_thead_id}" class="table-dark">
                                        <tr>
                                            <th>عنوان</th>
                                            <th>نوع آپشن</th>
                                            <th>قیمت</th>
                                            <th>گروه آیتم</th>
                                            <th>وضعیت بروزرسانی</th>
                                            <th>نوع داده</th>
                                            <th class="compact-column">ویرایش</th>
                                            <th class="compact-column">حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody id="${useroption_items_tbody_id}" class="table-border-bottom-0">
                                    </tbody>
                                </table>`;

                                data.data.items.forEach(function (up)
                                {
                                    var this_parent_item_id = up.parentOptionItemId.toString();

                                    if (this_parent_item_id != "0")
                                    {
                                        var foundItems = Removed_UserOption_Items.filter(item => item.Item_Id === this_parent_item_id || item.Unique_Id === this_parent_item_id);

                                        if (foundItems.length > 0)
                                        {
                                            Nested_Removed_UserOption_Items.push({
                                                Item_Id: up.id.toString()
                                            });

                                            return;
                                        }
                                        else
                                        {
                                            var found_Nested_Items = Nested_Removed_UserOption_Items.filter(item => item.Item_Id === this_parent_item_id);

                                            if (found_Nested_Items.length > 0)
                                            {
                                                Nested_Removed_UserOption_Items.push({
                                                    Item_Id: up.id.toString()
                                                });

                                                return;
                                            }
                                        }
                                    }

                                    var searchResultItems_Rows = document.getElementById(`${useroption_items_tbody_id}`);
                                    var searchResultItems_Rows_Count = searchResultItems_Rows.querySelectorAll('tr').length;
                                    var item_row_index = searchResultItems_Rows_Count + 1;

                                    let item_id = up.id;
                                    let item_option_id = up.optionId;
                                    let item_parent_option_id = up.parentOptionId;
                                    let item_parent_option_item_id = up.parentOptionItemId;
                                    let item_name = up.name;
                                    let formattedPrice = Set_Comma_Plus(up.price);
                                    let option_item_type_value = up.option_Type;
                                    let option_item_type_text = Get_OptionType_Text(option_item_type_value);
                                    let item_group = up.item_Group;

                                    var UOCItem = `
                                    <tr id="Parent_Row_${item_row_index}" class="old_useroption_item" data-item_id="${item_id}" data-id="${item_id}" data-option_id="${item_option_id}" data-parent_option_id="${item_parent_option_id}" data-parent_option_item_id="${item_parent_option_item_id}" data-update-status="0">
                                        <td>
                                             <span class="js_useroption_item_name">${item_name}</span>
                                        </td>
                                        <td>
                                             <span class="js_useroption_item_type" data-optiontype="${option_item_type_value}">${option_item_type_text}</span>
                                        </td>
                                         <td>
                                            <span class="js_useroption_item_price">${formattedPrice}</span>
                                        </td>
                                        <td>
                                            <span class="js_useroption_item_group">${item_group}</span>
                                        </td>
                                        <td class="compact-column">
                                            <span class="badge bg-label-secondary me-1 js_useroption_item_update_status" style="font-weight: bold !important;height: 38px !important;line-height: 25px !important;">مقادیر اولیه</span>
                                        </td>
                                        <td class="compact-column">
                                            <span class="badge bg-label-info me-1 js_useroption_item_data_kind" style="font-weight: bold !important;height: 38px !important;line-height: 25px !important;">سطر قدیمی</span>
                                        </td>
                                        <td class="compact-column">
                                            <a class="btn btn-success text-white js_useroption_item_update" data-parent_table_id="${useroption_items_table_id}" data-parent_row_id="Parent_Row_${item_row_index}" style="height: 38px;" onclick="Bind_Item_Data_For_Update(this,this.dataset.parent_table_id,this.dataset.parent_row_id)"><i class="fas fa-pencil"></i></a>
                                        </td>
                                        <td class="compact-column">
                                            <a class="btn btn-danger text-white js_useroption_item_remove" style="height: 38px;" data-parent_table_id="${useroption_items_table_id}" data-parent_row_id="Parent_Row_${item_row_index}" onclick="Remove_UserOption_Item_Row(this,this.dataset.parent_table_id,this.dataset.parent_row_id)"><i class="fas fa-trash"></i></a>
                                        </td>
                                    </tr>
                                `;

                                    searchResultItems_Rows.insertAdjacentHTML('beforeend', UOCItem);
                                });
                            }
                            else
                            {
                                var searchResultItems_Rows = document.getElementById(`${element.dataset.items_table_id}`);
                                var searchResultItems_Rows_TBody = searchResultItems_Rows.querySelector('tbody');

                                if (searchResultItems_Rows_TBody.querySelectorAll('tbody tr').length === 0 && searchResultItems_Rows.dataset.remove_status === "before_remove")
                                {
                                    data.data.items.forEach(function (up)
                                    {
                                        var this_parent_item_id = up.parentOptionItemId.toString();

                                        if (this_parent_item_id != "0")
                                        {
                                            var foundItems = Removed_UserOption_Items.filter(item => item.Item_Id === this_parent_item_id || item.Unique_Id === this_parent_item_id);

                                            if (foundItems.length > 0)
                                            {
                                                Nested_Removed_UserOption_Items.push({
                                                    Item_Id: up.id.toString()
                                                });

                                                return;
                                            }
                                            else
                                            {
                                                var found_Nested_Items = Nested_Removed_UserOption_Items.filter(item => item.Item_Id === this_parent_item_id);

                                                if (found_Nested_Items.length > 0)
                                                {
                                                    Nested_Removed_UserOption_Items.push({
                                                        Item_Id: up.id.toString()
                                                    });

                                                    return;
                                                }
                                            }
                                        }

                                        searchResultItems_Rows = document.getElementById(`${element.dataset.items_table_id}`);
                                        searchResultItems_Rows_TBody = searchResultItems_Rows.querySelector('tbody');
                                        var searchResultItems_Rows_Count = searchResultItems_Rows_TBody.querySelectorAll('tr').length;
                                        var item_row_index = searchResultItems_Rows_Count + 1;

                                        let item_id = up.id;
                                        let item_option_id = up.optionId;
                                        let item_parent_option_id = up.parentOptionId;
                                        let item_parent_option_item_id = up.parentOptionItemId;
                                        let item_name = up.name;
                                        let formattedPrice = Set_Comma_Plus(up.price);
                                        let option_item_type_value = up.option_Type;
                                        let option_item_type_text = Get_OptionType_Text(option_item_type_value);
                                        let item_group = up.item_Group;

                                        var UOCItem = `
                                        <tr id="Parent_Row_${item_row_index}" class="old_useroption_item" data-item_id="${item_id}" data-id="${item_id}" data-option_id="${item_option_id}" data-parent_option_id="${item_parent_option_id}" data-parent_option_item_id="${item_parent_option_item_id}" data-update-status="0">
                                            <td>
                                                    <span class="js_useroption_item_name">${item_name}</span>
                                            </td>
                                            <td>
                                                    <span class="js_useroption_item_type" data-optiontype="${option_item_type_value}">${option_item_type_text}</span>
                                            </td>
                                                <td>
                                                <span class="js_useroption_item_price">${formattedPrice}</span>
                                            </td>
                                            <td>
                                                <span class="js_useroption_item_group">${item_group}</span>
                                            </td>
                                            <td class="compact-column">
                                                <span class="badge bg-label-secondary me-1 js_useroption_item_update_status" style="font-weight: bold !important;height: 38px !important;line-height: 25px !important;">مقادیر اولیه</span>
                                            </td>
                                            <td class="compact-column">
                                                <span class="badge bg-label-info me-1 js_useroption_item_data_kind" style="font-weight: bold !important;height: 38px !important;line-height: 25px !important;">سطر قدیمی</span>
                                            </td>
                                            <td class="compact-column">
                                                <a class="btn btn-success text-white js_useroption_item_update" data-parent_table_id="${useroption_items_table_id}" data-parent_row_id="Parent_Row_${item_row_index}" style="height: 38px;" onclick="Bind_Item_Data_For_Update(this,this.dataset.parent_table_id,this.dataset.parent_row_id)"><i class="fas fa-pencil"></i></a>
                                            </td>
                                            <td class="compact-column">
                                                <a class="btn btn-danger text-white js_useroption_item_remove" style="height: 38px;" data-parent_table_id="${useroption_items_table_id}" data-parent_row_id="Parent_Row_${item_row_index}" onclick="Remove_UserOption_Item_Row(this,this.dataset.parent_table_id,this.dataset.parent_row_id)"><i class="fas fa-trash"></i></a>
                                            </td>
                                        </tr>
                                    `;

                                        searchResultItems_Rows_TBody.insertAdjacentHTML('beforeend', UOCItem);
                                    });
                                }
                            }
                        }
                        else
                        {
                            if (element.dataset.items_table_id === "")
                            {
                                var useroption_items_table_id = "UserOption_Items_Table_" + Math.random().toString(16).slice(2);
                                element.setAttribute("data-items_table_id", useroption_items_table_id);

                                var modal_update_btn = document.getElementById("Add_Or_Update_UserOption_Item");
                                modal_update_btn.setAttribute('data-parent_table_id', useroption_items_table_id);

                                var useroption_items_table_index = useroption_items_table_id.replace("UserOption_Items_Table_", "");
                                var useroption_items_thead_id = "UserOption_Items_Table_THead_" + useroption_items_table_index.toString();
                                var useroption_items_tbody_id = "UserOption_Items_Table_TBody_" + useroption_items_table_index.toString();

                                UserOption_Items_Table_List.innerHTML += `
                                <table id="${useroption_items_table_id}" data-remove_status="before_remove" class="table table-striped mb-3" style="display:block">
                                    <thead id="${useroption_items_thead_id}" class="table-dark">
                                        <tr>
                                            <th>عنوان</th>
                                            <th>نوع آپشن</th>
                                            <th>قیمت</th>
                                            <th>گروه آیتم</th>
                                            <th>وضعیت بروزرسانی</th>
                                            <th>نوع داده</th>
                                            <th class="compact-column">ویرایش</th>
                                            <th class="compact-column">حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody id="${useroption_items_tbody_id}" class="table-border-bottom-0">
                                    </tbody>
                                </table>`;
                            }
                        }

                        var parent_item_field = document.getElementById("Insert_UserOption_Items_ParentItem_ParentTag");
                        var search_input = document.getElementById('SearchItemInput');

                        if ((parent_table.classList.contains('SubUserOption')) || (parent_table.classList.contains('SubUserOption_Child')))
                        {
                            if (element.dataset.items_table_id === "")
                            {
                                if (!search_input.hasAttribute('disabled'))
                                {
                                    search_input.setAttribute('disabled', '');
                                }

                                parent_item_field.style.display = "none";
                                document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "none";
                                document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "block";
                            }
                            else
                            {
                                parent_item_field.style.display = "block";

                                var items_table = document.getElementById(`${element.dataset.items_table_id}`);
                                var items_table_tbody = items_table.querySelector('tbody');
                                var items_table_tbody_rows = items_table_tbody.querySelectorAll('tr');
                                var items_table_tbody_rows_count = items_table_tbody_rows.length;

                                console.log("items_table_tbody_rows_count:", items_table_tbody_rows_count);

                                if (items_table_tbody_rows_count > 0)
                                {
                                    if (search_input.hasAttribute('disabled'))
                                    {
                                        search_input.removeAttribute('disabled');
                                    }

                                    document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "block";
                                    document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "none";
                                    document.getElementById("Insert_UserOption_Items_Modal_Items_Table").setAttribute("data-parent_table_id", items_table.id);

                                    Items_PaginateTable(search_input.value, rowsPerPage, 1);
                                }
                                else
                                {
                                    if (!search_input.hasAttribute('disabled'))
                                    {
                                        search_input.setAttribute('disabled', '');
                                    }

                                    document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "none";
                                    document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "block";
                                }

                                var grand_parent_table = document.getElementById(`${parent_table.dataset.parent_table_id}`);
                                var parent_table_data_parent_id = parent_table.dataset.parentid;

                                grand_parent_table_tbody = grand_parent_table.querySelector('tbody');
                                grand_parent_row = grand_parent_table_tbody.querySelector(`tr[data-previndex='${parent_table_data_parent_id}']`);
                                grand_parent_row_class = grand_parent_row.classList[0];

                                if (parent_table.classList.contains('SubUserOption'))
                                {
                                    if (grand_parent_row_class === 'old_useroption')
                                    {
                                        grand_parent_row_data_id = grand_parent_row.dataset.id;
                                        GetAllOf_Option_Items(grand_parent_row_data_id, grand_parent_row, 'old_useroption');
                                    }
                                }
                                else if (parent_table.classList.contains('SubUserOption_Child'))
                                {
                                    if (grand_parent_row_class === 'old_usersuboption')
                                    {
                                        grand_parent_row_data_id = grand_parent_row.dataset.id;
                                        GetAllOf_Option_Items(grand_parent_row_data_id, grand_parent_row, 'old_usersuboption');
                                    }
                                }
                            }

                            var row_items_tbody = document.getElementById("UserOption_Items_Tables_List")
                                .querySelector(`#${element.dataset.items_table_id} tbody`);

                            if (row_items_tbody.innerHTML === '')
                            {
                                if (!search_input.hasAttribute('disabled'))
                                {
                                    search_input.setAttribute('disabled', '');
                                }

                                document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "none";
                                document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "block";
                            }
                            else
                            {
                                var row_items_tbody_tr = row_items_tbody.querySelectorAll("tr");
                                var row_items_tbody_tr_count = row_items_tbody_tr.length;

                                if (row_items_tbody_tr_count > 0)
                                {
                                    if (search_input.hasAttribute('disabled'))
                                    {
                                        search_input.removeAttribute('disabled');
                                    }

                                    document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "block";
                                    document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "none";
                                    document.getElementById("Insert_UserOption_Items_Modal_Items_Table").setAttribute("data-parent_table_id", items_table.id);
                                    document.getElementById("Insert_UserOption_Items_Modal_Items_Table_TBody").innerHTML = row_items_tbody.innerHTML;

                                    Items_PaginateTable(search_input.value, rowsPerPage, 1);
                                }
                                else
                                {
                                    if (!search_input.hasAttribute('disabled'))
                                    {
                                        search_input.setAttribute('disabled', '');
                                    }

                                    document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "none";
                                    document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "block";
                                }
                            }
                        }
                        else
                        {
                            if (element.dataset.items_table_id === "")
                            {
                                if (!search_input.hasAttribute('disabled'))
                                {
                                    search_input.setAttribute('disabled', '');
                                }

                                parent_item_field.style.display = "none";
                                document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "none";
                                document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "block";
                            }
                            else
                            {
                                if (search_input.hasAttribute('disabled'))
                                {
                                    search_input.removeAttribute('disabled');
                                }

                                parent_item_field.style.display = "none";
                                document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "block";
                                document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "none";
                                document.getElementById("Insert_UserOption_Items_Modal_Items_Table").setAttribute("data-parent_table_id", element.dataset.items_table_id);

                                Items_PaginateTable(search_input.value, rowsPerPage, 1);
                            }

                            var row_items_tbody = document.getElementById("UserOption_Items_Tables_List")
                                .querySelector(`#${element.dataset.items_table_id} tbody`);

                            if (row_items_tbody.innerHTML === '')
                            {
                                if (!search_input.hasAttribute('disabled'))
                                {
                                    search_input.setAttribute('disabled', '');
                                }

                                document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "none";
                                document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "block";
                            }
                            else
                            {
                                var row_items_tbody_tr = row_items_tbody.querySelectorAll("tr");
                                var row_items_tbody_tr_count = row_items_tbody_tr.length;

                                if (row_items_tbody_tr_count > 0)
                                {
                                    if (search_input.hasAttribute('disabled'))
                                    {
                                        search_input.removeAttribute('disabled');
                                    }

                                    document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "block";
                                    document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "none";
                                    document.getElementById("Insert_UserOption_Items_Modal_Items_Table").setAttribute("data-parent_table_id", element.dataset.items_table_id);
                                    document.getElementById("Insert_UserOption_Items_Modal_Items_Table_TBody").innerHTML = row_items_tbody.innerHTML;

                                    Items_PaginateTable(search_input.value, rowsPerPage, 1);
                                }
                                else
                                {
                                    if (!search_input.hasAttribute('disabled'))
                                    {
                                        search_input.setAttribute('disabled', '');
                                    }

                                    document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "none";
                                    document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "block";
                                }
                            }
                        }
                    }
                    else {
                        swal.fire('هشدار!', data.message, 'warning');
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.error(`Error ${xhr.status}: ${xhr.responseText}`);
                    swal.fire('Server Error!', `Error ${xhr.status}: ${xhr.responseText}`, 'error');
                }
            });
        }
        else
        {
            document.getElementById("Insert_UserOption_Items_Modal").setAttribute("data-parent_data_id", "0");

            if (element.dataset.items_table_id === "")
            {
                var UserOption_Items_Table_List = document.getElementById("UserOption_Items_Tables_List");
                var useroption_items_table_id = "UserOption_Items_Table_" + Math.random().toString(16).slice(2);
                element.setAttribute("data-items_table_id", useroption_items_table_id);

                var modal_update_btn = document.getElementById("Add_Or_Update_UserOption_Item");
                modal_update_btn.setAttribute('data-parent_table_id', useroption_items_table_id);

                var useroption_items_table_index = useroption_items_table_id.replace("UserOption_Items_Table_", "");
                var useroption_items_thead_id = "UserOption_Items_Table_THead_" + useroption_items_table_index.toString();
                var useroption_items_tbody_id = "UserOption_Items_Table_TBody_" + useroption_items_table_index.toString();

                UserOption_Items_Table_List.innerHTML += `
                <table id="${useroption_items_table_id}" data-remove_status="before_remove" class="table table-striped mb-3" style="display:block">
                    <thead id="${useroption_items_thead_id}" class="table-dark">
                        <tr>
                            <th>عنوان</th>
                            <th>نوع آپشن</th>
                            <th>قیمت</th>
                            <th>گروه آیتم</th>
                            <th>وضعیت بروزرسانی</th>
                            <th>نوع داده</th>
                            <th class="compact-column">ویرایش</th>
                            <th class="compact-column">حذف</th>
                        </tr>
                    </thead>
                    <tbody id="${useroption_items_tbody_id}" class="table-border-bottom-0">
                    </tbody>
                </table>`;
            }

            var parent_item_field = document.getElementById("Insert_UserOption_Items_ParentItem_ParentTag");
            var search_input = document.getElementById('SearchItemInput');

            if ((parent_table.classList.contains('SubUserOption')) || (parent_table.classList.contains('SubUserOption_Child')))
            {
                if (element.dataset.items_table_id === "")
                {
                    if (!search_input.hasAttribute('disabled'))
                    {
                        search_input.setAttribute('disabled', '');
                    }

                    parent_item_field.style.display = "none";
                    document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "none";
                    document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "block";
                }
                else
                {
                    if (search_input.hasAttribute('disabled'))
                    {
                        search_input.removeAttribute('disabled');
                    }

                    parent_item_field.style.display = "block";
                    document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "block";
                    document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "none";
                    document.getElementById("Insert_UserOption_Items_Modal_Items_Table").setAttribute("data-parent_table_id", element.dataset.items_table_id);

                    Items_PaginateTable(search_input.value, rowsPerPage, 1);

                    var grand_parent_table = document.getElementById(`${parent_table.dataset.parent_table_id}`);
                    var parent_table_data_parent_id = parent_table.dataset.parentid;

                    grand_parent_table_tbody = grand_parent_table.querySelector('tbody');
                    grand_parent_row = grand_parent_table_tbody.querySelector(`tr[data-previndex='${parent_table_data_parent_id}']`);
                    grand_parent_row_class = grand_parent_row.classList[0];

                    if (parent_table.classList.contains('SubUserOption'))
                    {
                        if (grand_parent_row_class === 'new_useroption')
                        {
                            GetAllOf_Option_Items('', grand_parent_row, 'new_useroption');
                        }
                    }
                    else if (parent_table.classList.contains('SubUserOption_Child'))
                    {
                        if (grand_parent_row_class === 'new_usersuboption')
                        {
                            GetAllOf_Option_Items('', grand_parent_row, 'new_usersuboption');
                        }
                    }
                }

                var row_items_tbody = document.getElementById("UserOption_Items_Tables_List")
                    .querySelector(`#${element.dataset.items_table_id} tbody`);

                if (row_items_tbody.innerHTML === '') {
                    if (!search_input.hasAttribute('disabled')) {
                        search_input.setAttribute('disabled', '');
                    }

                    document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "none";
                    document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "block";
                }
                else {
                    var row_items_tbody_tr = row_items_tbody.querySelectorAll("tr");
                    var row_items_tbody_tr_count = row_items_tbody_tr.length;

                    if (row_items_tbody_tr_count > 0) {
                        if (search_input.hasAttribute('disabled')) {
                            search_input.removeAttribute('disabled');
                        }

                        document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "block";
                        document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "none";
                        document.getElementById("Insert_UserOption_Items_Modal_Items_Table").setAttribute("data-parent_table_id", element.dataset.items_table_id);
                        document.getElementById("Insert_UserOption_Items_Modal_Items_Table_TBody").innerHTML = row_items_tbody.innerHTML;

                        Items_PaginateTable(search_input.value, rowsPerPage, 1);
                    }
                    else {
                        if (!search_input.hasAttribute('disabled')) {
                            search_input.setAttribute('disabled', '');
                        }

                        document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "none";
                        document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "block";
                    }
                }
            }
            else {
                if (!search_input.hasAttribute('disabled')) {
                    search_input.setAttribute('disabled', '');
                }

                parent_item_field.style.display = "none";
                document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "none";
                document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "block";

                var row_items_tbody = document.getElementById("UserOption_Items_Tables_List")
                    .querySelector(`#${element.dataset.items_table_id} tbody`);


                if (row_items_tbody.innerHTML === '') {
                    if (!search_input.hasAttribute('disabled')) {
                        search_input.setAttribute('disabled', '');
                    }

                    document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "none";
                    document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "block";
                }
                else {
                    var row_items_tbody_tr = row_items_tbody.querySelectorAll("tr");
                    var row_items_tbody_tr_count = row_items_tbody_tr.length;

                    if (row_items_tbody_tr_count > 0) {
                        if (search_input.hasAttribute('disabled')) {
                            search_input.removeAttribute('disabled');
                        }

                        document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "block";
                        document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "none";
                        document.getElementById("Insert_UserOption_Items_Modal_Items_Table").setAttribute("data-parent_table_id", element.dataset.items_table_id);
                        document.getElementById("Insert_UserOption_Items_Modal_Items_Table_TBody").innerHTML = row_items_tbody.innerHTML;

                        Items_PaginateTable(search_input.value, rowsPerPage, 1);
                    }
                    else {
                        if (!search_input.hasAttribute('disabled')) {
                            search_input.setAttribute('disabled', '');
                        }

                        document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "none";
                        document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "block";
                    }
                }
            }
        }

        $('#Insert_UserOption_Items_Modal').modal('show');

    }
}
function Bind_Option_Items(OptionId,Items_Table_Id,Parent_Row_Item)
{
    var formdata = new FormData();
    formdata.append("OptionId", Number(OptionId));

    var parent_item_field = document.getElementById("Insert_UserOption_Items_ParentItem_ParentTag");
    var parent_item_field_select = document.getElementById("Insert_UserOption_Items_ParentItem");
    var parent_row_item_table_id = Parent_Row_Item.dataset.items_table_id;
    var update_btn_temp = document.getElementById("Add_Or_Update_UserOption_Item");
    var update_btn_parent_table_id = update_btn_temp.dataset.parent_table_id;

    var useroption_items_tables_list_temp = document.getElementById("UserOption_Items_Tables_List");
    var target_table = useroption_items_tables_list_temp.querySelector(`#${update_btn_parent_table_id}`);
    var target_table_tbody = target_table.querySelector('tbody');
    var target_table_tbody_rows = target_table_tbody.querySelectorAll('tr');

    target_table_tbody_rows.forEach(function (row)
    {
        row.setAttribute('data-parent_option_item_table_id', Items_Table_Id);
    });

    $.ajax({
        type: "POST",
        url: "GetUserOption_Items",
        contentType: false,
        processData: false,
        data: formdata,
        success: function (data)
        {
            if (data.isSuccess)
            {
                parent_item_field_select.innerHTML = '<option value="0">آیتم والد را انتخاب کنید</option>';

                if (data.data.items.length > 0)
                {
                    Parent_Row_Item.setAttribute('data-items_table_id', Items_Table_Id);
                    data.data.items.forEach(function (up)
                    {
                        let item_id = up.id;
                        let item_name = up.name;

                        let option = document.createElement('option');
                        option.value = item_id;
                        option.textContent = item_name;

                        option.classList.add('old_item');
                        option.setAttribute("data-items_table_id", Items_Table_Id);

                        ////////////////////////////////////////////////////////////////////////////create_item_rows

                        var Items_Table_Tag = document.getElementById("UserOption_Items_Tables_List").querySelector(`table#${Items_Table_Id}`);
                        var Items_table_Tbody_Tag = Items_Table_Tag.querySelector('tbody');
                        var option_type_text = Get_OptionType_Text(up.option_Type);
                        let formattedPrice = Set_Comma_Plus(up.price);

                        const newRow = document.createElement("tr");

                        newRow.setAttribute("id", "Parent_Row_" + (Items_table_Tbody_Tag.rows.length + 1));
                        newRow.setAttribute("class", "old_useroption_item");
                        newRow.setAttribute("data-item_id", item_id);
                        newRow.setAttribute("data-option_id", up.optionId);
                        newRow.setAttribute("data-parent_option_id", up.parentOptionId);
                        newRow.setAttribute("data-parent_option_item_table_id", "");
                        newRow.setAttribute("data-parent_option_item_id", up.parentOptionItemId);
                        newRow.setAttribute("data-update-status", "0");

                        newRow.innerHTML = `
                        <td><span class="js_useroption_item_name">${item_name}</span></td>
                        <td><span class="js_useroption_item_type" data-optiontype="${up.option_Type}">${option_type_text}</span></td>
                        <td><span class="js_useroption_item_price">${formattedPrice}</span></td>
                        <td><span class="js_useroption_item_group">${up.item_Group}</span></td>
                        <td class="compact-column">
                            <span class="badge bg-label-secondary me-1 js_useroption_item_update_status" style="font-weight: bold !important;height: 38px !important;line-height: 25px !important;">مقادیر اولیه</span>
                        </td>
                        <td class="compact-column">
                            <span class="badge bg-label-info me-1 js_useroption_item_data_kind" style="font-weight: bold !important;height: 38px !important;line-height: 25px !important;">سطر قدیمی</span>
                        </td>
                        <td class="compact-column">
                            <a class="btn btn-success text-white js_useroption_item_update" data-parent_table_id="${Items_Table_Id}" data-parent_row_id="Parent_Row_${(Items_table_Tbody_Tag.rows.length + 1)}" style="height: 38px;" onclick="Bind_Item_Data_For_Update(this,this.dataset.parent_table_id,this.dataset.parent_row_id)"><i class="fas fa-pencil"></i></a>
                        </td>
                        <td class="compact-column">
                            <a class="btn btn-danger text-white js_useroption_item_remove" style="height: 38px;" data-parent_table_id="${Items_Table_Id}" data-parent_row_id="Parent_Row_${(Items_table_Tbody_Tag.rows.length + 1)}" onclick="Remove_UserOption_Item_Row(this,this.dataset.parent_table_id,this.dataset.parent_row_id)"><i class="fas fa-trash"></i></a>
                        </td>
                        `;

                        Items_table_Tbody_Tag.appendChild(newRow);

                        var search_input = document.getElementById('SearchItemInput');
                        Items_PaginateTable(search_input.value, rowsPerPage, 1);

                        parent_item_field_select.appendChild(option);
                    });

                }
                else
                {
                    parent_item_field.style.display = "none";
                }
            }
            else {
                swal.fire('هشدار!', data.message, 'warning');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.error(`Error ${xhr.status}: ${xhr.responseText}`);
            swal.fire('Server Error!', `Error ${xhr.status}: ${xhr.responseText}`, 'error');
        }
    });
}
function GetAllOf_Option_Items(Option_Data_Id, OptionTag, Parent_ClassName)
{
    const parent_row_item = OptionTag.querySelector('.js_useroption_additem');
    let parent_row_item_table_id = parent_row_item.dataset.items_table_id;
    const UserOption_Items_Table_List = document.getElementById("UserOption_Items_Tables_List");
    const modal_update_btn = document.getElementById("Add_Or_Update_UserOption_Item");
    const parent_item_field_select = document.getElementById("Insert_UserOption_Items_ParentItem");

    function createTable()
    {
        const useroption_items_table_id = "UserOption_Items_Table_" + Math.random().toString(16).slice(2);
        const useroption_items_table_index = useroption_items_table_id.replace("UserOption_Items_Table_", "");
        const useroption_items_thead_id = "UserOption_Items_Table_THead_" + useroption_items_table_index;
        const useroption_items_tbody_id = "UserOption_Items_Table_TBody_" + useroption_items_table_index;

        UserOption_Items_Table_List.innerHTML += `
            <table id="${useroption_items_table_id}" data-remove_status="before_remove" class="table table-striped mb-3" style="display:block">
                <thead id="${useroption_items_thead_id}" class="table-dark">
                    <tr>
                        <th>عنوان</th>
                        <th>نوع آپشن</th>
                        <th>قیمت</th>
                        <th>گروه آیتم</th>
                        <th>وضعیت بروزرسانی</th>
                        <th>نوع داده</th>
                        <th class="compact-column">ویرایش</th>
                        <th class="compact-column">حذف</th>
                    </tr>
                </thead>
                <tbody id="${useroption_items_tbody_id}" class="table-border-bottom-0"></tbody>
            </table>`;

        return useroption_items_table_id;
    }
    function populateParentItemOptions(tbody)
    {
        var isold;
        parent_item_field_select.innerHTML = '<option value="0">آیتم والد را انتخاب کنید</option>';

        tbody.querySelectorAll('tr').forEach(row =>
        {
            var row_class = row.classList[0];

            if (row_class === "new_useroption_item")
            {
                isold = false;
            }
            else
            {
                isold = true;
            }

            let item_uniqueid;
            let uniqueid;

            if (!isold)
            {
                item_uniqueid = row.dataset.uniqueid;

                if (item_uniqueid === "")
                {
                    uniqueid = "option_id_" + Math.random().toString(16).slice(2);
                    row.setAttribute("data-uniqueid", uniqueid)
                }
                else
                {
                    uniqueid = item_uniqueid;
                }
            }

            const item_id = row.id;
            const item_name = row.querySelector(".js_useroption_item_name").innerText;
            const option = document.createElement('option');

            option.value = isold ? row.dataset.item_id : uniqueid;
            option.textContent = item_name;
            option.classList.add(isold ? 'old_item' : 'new_item');
            option.setAttribute("data-items_table_id", parent_row_item_table_id);
            option.setAttribute("data-items_table_row_id", item_id);

            parent_item_field_select.appendChild(option);
        });
    }

    if ((Parent_ClassName === 'old_useroption') || (Parent_ClassName === 'old_usersuboption'))
    {
        if (!parent_row_item_table_id)
        {
            parent_row_item_table_id = createTable();
            Bind_Option_Items(Option_Data_Id, parent_row_item_table_id, parent_row_item);

        }
        else
        {
            const parent_row_items_table = document.getElementById(parent_row_item_table_id);
            const parent_row_items_table_tbody = parent_row_items_table.querySelector('tbody');

            if (parent_row_items_table_tbody.querySelectorAll('tr').length > 0)
            {
                populateParentItemOptions(parent_row_items_table_tbody);
            }
            else
            {
                parent_item_field_select.innerHTML = '<option value="0">آیتم والد را انتخاب کنید</option>';
            }
        }
    }
    else
    {
        if (!parent_row_item_table_id)
        {
            parent_row_item_table_id = createTable();
            parent_item_field_select.innerHTML = '<option value="0">آیتم والد را انتخاب کنید</option>';
        }
        else
        {
            const parent_row_items_table = document.getElementById(parent_row_item_table_id);
            const parent_row_items_table_tbody = parent_row_items_table.querySelector('tbody');

            if (parent_row_items_table_tbody.querySelectorAll('tr').length > 0)
            {
                populateParentItemOptions(parent_row_items_table_tbody);
            }
            else
            {
                parent_item_field_select.innerHTML = '<option value="0">آیتم والد را انتخاب کنید</option>';
            }
        }
    }
}
function Bind_Item_Data_For_Update(element, parent_table_id, parent_row_id)
{
    var user_option_type = document.getElementById("Insert_UserOption_Items_Modal").dataset.parent_row_class;
    var target_row = element.closest('tr');
    var target_row_id = target_row.id;
    var target_row_name = target_row.querySelector('.js_useroption_item_name').innerText;
    var target_row_price = target_row.querySelector('.js_useroption_item_price').innerText;
    var target_row_item_group = target_row.querySelector('.js_useroption_item_group').innerText;
    var target_row_item_parent = "0";

    if (/^(old|new)_usersuboption(_child)?$/.test(user_option_type)) {
        target_row_item_parent = target_row.dataset.parent_option_item_id;
        document.getElementById("Insert_UserOption_Items_ParentItem").value = target_row_item_parent;
    }

    document.getElementById("Insert_UserOption_Items_ItemGroup").value = target_row_item_group;
    document.getElementById("Insert_UserOption_Items_Name").value = target_row_name;
    document.getElementById("Insert_UserOption_Items_Price").value = target_row_price;

    var update_btn = document.getElementById("Add_Or_Update_UserOption_Item");

    update_btn.setAttribute('data-parent_table_id', parent_table_id);
    update_btn.setAttribute('data-parent_row_id', parent_row_id);

    update_btn.classList.remove("btn-primary");
    update_btn.classList.add("btn-success");
    update_btn.innerText = "بروزرسانی";
}
function Reset_UserOption_Item_Func()
{
    var user_option_type = document.getElementById("Insert_UserOption_Items_Modal").dataset.parent_row_class;

    document.getElementById("Insert_UserOption_Items_ItemGroup").value = "A";
    document.getElementById("Insert_UserOption_Items_Name").value = "";
    document.getElementById("Insert_UserOption_Items_Price").value = 0;

    if (/^(old|new)_usersuboption(_child)?$/.test(user_option_type)) {
        document.getElementById("Insert_UserOption_Items_ParentItem").value = "0";
    }

    var update_btn = document.getElementById("Add_Or_Update_UserOption_Item");

    update_btn.setAttribute('data-parent_row_id', '');

    update_btn.classList.remove("btn-success");
    update_btn.classList.add("btn-primary");
    update_btn.innerText = "ثبت";
}
function Search_Useroption_Item_Func()
{
    const searchTerm = document.getElementById("SearchItemInput").value.toLowerCase();
    currentPage = 1;
    Items_PaginateTable(searchTerm, rowsPerPage, currentPage);
}
function Add_Or_Update_UserOption_Item_Func()
{
    var user_option_type = document.getElementById("Insert_UserOption_Items_Modal").dataset.parent_row_class;
    var user_option_id = document.getElementById("Insert_UserOption_Items_Modal").dataset.parent_data_id;
    var update_btn = document.getElementById("Add_Or_Update_UserOption_Item");
    var parent_table_id = update_btn.dataset.parent_table_id;
    var parent_row_id = update_btn.dataset.parent_row_id;

    if (update_btn.innerText === "ثبت")
    {
        const tbody = document.getElementById("Insert_UserOption_Items_Modal_Items_Table_TBody");

        if (tbody.rows.length === 0)
        {
            document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult").style.display = "none";
            document.getElementById("Insert_UserOption_Items_Modal_Items_Table").style.display = "block";
            document.getElementById("SearchItemInput").removeAttribute('disabled');
        }

        var modal_item_option_type_value = document.getElementById("Insert_UserOption_Items_OptionType").dataset.optiontype;
        var modal_item_option_type_text = document.getElementById("Insert_UserOption_Items_OptionType").value;
        var modal_item_group_value = document.getElementById("Insert_UserOption_Items_ItemGroup").value;
        var modal_item_name = document.getElementById("Insert_UserOption_Items_Name").value;
        var modal_item_price = document.getElementById("Insert_UserOption_Items_Price").value;
        var modal_parent_item = "0";
        var modal_parent_item_table = "0";

        if (/^(old|new)_usersuboption(_child)?$/.test(user_option_type))
        {
            var selectElement = document.getElementById("Insert_UserOption_Items_ParentItem");
            modal_parent_item = selectElement.value;

            var selectedOption = selectElement.querySelector(`option[value="${modal_parent_item}"]`);

            if (selectedOption)
            {
                modal_parent_item_table = selectedOption.dataset.items_table_id;
            }
        }

        const newRow = document.createElement("tr");

        newRow.setAttribute("id", "Parent_Row_" + (tbody.rows.length + 1));
        newRow.setAttribute("class", "new_useroption_item");
        newRow.setAttribute("data-item_id", "");
        newRow.setAttribute("data-option_id", user_option_id);
        newRow.setAttribute("data-parent_option_id", "0");
        newRow.setAttribute("data-parent_option_item_table_id", modal_parent_item_table);
        newRow.setAttribute("data-parent_option_item_id", modal_parent_item);
        newRow.setAttribute("data-update-status", "0");
        newRow.setAttribute("data-uniqueid", "");

        newRow.innerHTML = `
                <td><span class="js_useroption_item_name">${modal_item_name}</span></td>
                <td><span class="js_useroption_item_type" data-optiontype="${modal_item_option_type_value}">${modal_item_option_type_text}</span></td>
                <td><span class="js_useroption_item_price">${modal_item_price}</span></td>
                <td><span class="js_useroption_item_group">${modal_item_group_value}</span></td>
                <td class="compact-column">
                    <span class="badge bg-label-secondary me-1 js_useroption_item_update_status" style="font-weight: bold !important;height: 38px !important;line-height: 25px !important;">مقادیر اولیه</span>
                </td>
                <td class="compact-column">
                    <span class="badge bg-label-warning me-1 js_useroption_item_data_kind" style="font-weight: bold !important;height: 38px !important;line-height: 25px !important;">سطر جدید</span>
                </td>
                <td class="compact-column">
                    <a class="btn btn-success text-white js_useroption_item_update" data-parent_table_id="${parent_table_id}" data-parent_row_id="Parent_Row_${(tbody.rows.length + 1)}" style="height: 38px;" onclick="Bind_Item_Data_For_Update(this,this.dataset.parent_table_id,this.dataset.parent_row_id)"><i class="fas fa-pencil"></i></a>
                </td>
                <td class="compact-column">
                    <a class="btn btn-danger text-white js_useroption_item_remove" style="height: 38px;" data-parent_table_id="${parent_table_id}" data-parent_row_id="Parent_Row_${(tbody.rows.length + 1)}" onclick="Remove_UserOption_Item_Row(this,this.dataset.parent_table_id,this.dataset.parent_row_id)"><i class="fas fa-trash"></i></a>
                </td>
            `;

        tbody.appendChild(newRow);

        var search_input = document.getElementById('SearchItemInput');
        Items_PaginateTable(search_input.value, rowsPerPage, 1);
    }
    else
    {
        ///////////////////////////////////////////////////////////////////////////////////////////useroption_item_table

        var target_table;
        var target_tbody;
        var target_row;

        var target_row_item_group;
        var target_row_name;
        var target_row_price;
        var target_row_parentitem;
        var target_row_parentitem_table;

        if (/^(new_useroption|new_usersuboption|new_usersuboption_child)$/.test(user_option_type))
        {
            /////////////////////////////////////////////////////////////useroption_item_table

            var uo_table = document.getElementById(parent_table_id);
            var uo_table_body = uo_table.querySelector('tbody');
            var uo_table_body_rows_count = uo_table.querySelectorAll('tr').length;

            if (uo_table_body_rows_count > 0)
            {
                target_table = document.getElementById(parent_table_id);
                target_tbody = target_table.querySelector('tbody');
                target_row = target_table.querySelector(`#${parent_row_id}`);

                if (target_row != null)
                {
                    target_row_item_group = target_row.querySelector(`.js_useroption_item_group`).innerText;
                    target_row_name = target_row.querySelector(`.js_useroption_item_name`).innerText;
                    target_row_price = target_row.querySelector(`.js_useroption_item_price`).innerText;
                    target_row_parentitem = target_row.dataset.parent_option_item_id;
                    target_row_parentitem_table = target_row.dataset.parent_option_item_table_id;
                }
            }
            else
            {
                target_table = document.getElementById("Insert_UserOption_Items_Modal_Items_Table");
                target_tbody = target_table.querySelector('tbody');
                target_row = target_tbody.querySelector(`#${parent_row_id}`);

                if (target_row != null)
                {
                    target_row_item_group = target_row.querySelector(`.js_useroption_item_group`).innerText;
                    target_row_name = target_row.querySelector(`.js_useroption_item_name`).innerText;
                    target_row_price = target_row.querySelector(`.js_useroption_item_price`).innerText;
                    target_row_parentitem = target_row.dataset.parent_option_item_id;
                    target_row_parentitem_table = target_row.dataset.parent_option_item_table_id;

                }
            }
        }
        else
        {
            target_table = document.getElementById(parent_table_id);
            target_tbody = target_table.querySelector('tbody');
            target_row = target_table.querySelector(`#${parent_row_id}`);

            if (target_row != null)
            {
                target_row_item_group = target_row.querySelector(`.js_useroption_item_group`).innerText;
                target_row_name = target_row.querySelector(`.js_useroption_item_name`).innerText;
                target_row_price = target_row.querySelector(`.js_useroption_item_price`).innerText;
                target_row_parentitem = target_row.dataset.parent_option_item_id;
                target_row_parentitem_table = target_row.dataset.parent_option_item_table_id;

            }
        }

        ///////////////////////////////////////////////////////////////////////////////////////////modal_item_table

        var modal_item_table = document.getElementById("Insert_UserOption_Items_Modal_Items_Table");
        var modal_item_tbody = modal_item_table.querySelector('tbody');
        var modal_item_row = modal_item_tbody.querySelector(`#${parent_row_id}`);

        var modal_item_group_value = document.getElementById("Insert_UserOption_Items_ItemGroup").value;
        var modal_item_name = document.getElementById("Insert_UserOption_Items_Name").value;
        var modal_item_price = document.getElementById("Insert_UserOption_Items_Price").value;
        var modal_parent_item = "0";

        if (/^(old|new)_usersuboption(_child)?$/.test(user_option_type))
        {
            modal_parent_item = document.getElementById("Insert_UserOption_Items_ParentItem").value;
            modal_item_row.setAttribute('data-parent_option_item_id', modal_parent_item);
        }

        //target_table_row_in_modal

        var item_group_value_tag = modal_item_row.querySelector('.js_useroption_item_group');
        var item_name_tag = modal_item_row.querySelector('.js_useroption_item_name');
        var item_price_tag = modal_item_row.querySelector('.js_useroption_item_price');

        item_group_value_tag.innerText = modal_item_group_value;
        item_name_tag.innerText = modal_item_name;
        item_price_tag.innerText = modal_item_price;

        if ((target_row_item_group != modal_item_group_value) || (target_row_name != modal_item_name) ||
            (target_row_price != modal_item_price) || (target_row_parentitem != modal_parent_item)) {
            modal_item_row.setAttribute('data-update-status', "1");

            if (modal_item_row.querySelector('.js_useroption_item_update_status').classList.contains('bg-label-secondary')) {
                modal_item_row.querySelector('.js_useroption_item_update_status').classList.remove('bg-label-secondary');
                modal_item_row.querySelector('.js_useroption_item_update_status').classList.add('bg-label-success');
                modal_item_row.querySelector('.js_useroption_item_update_status').innerText = "بروزرسانی شده";
            }
        }
        else {
            modal_item_row.setAttribute('data-update-status', "0");

            if (modal_item_row.querySelector('.js_useroption_item_update_status').classList.contains('bg-label-success')) {
                modal_item_row.querySelector('.js_useroption_item_update_status').classList.remove('bg-label-success');
                modal_item_row.querySelector('.js_useroption_item_update_status').classList.add('bg-label-secondary');
                modal_item_row.querySelector('.js_useroption_item_update_status').innerText = "مقادیر اولیه";
            }
        }
    }

    Reset_UserOption_Item_Func();
}
function Remove_UserOption_Item_Row(button, parent_table_id, parent_row_id)
{
    let table = button.closest('table');
    let parentRow = button.closest('tr');

    console.log("delete -> parentRow :", parentRow);

    let modal_table = document.getElementById("Insert_UserOption_Items_Modal_Items_Table");
    let modal_tbody = modal_table.querySelector('tbody');
    let modal = button.closest('.modal');

    if (modal)
    {
        $(modal).modal('hide');
    }

    swal.fire({
        title: 'حذف آیتم',
        text: "در مورد حذف آیتم مطمئن هستید؟",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: 'بله آیتم حذف شود',
        cancelButtonText: 'خیر'
    })
    .then((result) =>
    {
        if (result.isConfirmed)
        {
            swal.fire({
                title: 'موفق!',
                text: 'آیتم با موفقیت حذف شد.',
                icon: 'success',
                confirmButtonColor: "#3085d6",
                confirmButtonText: 'بسیار خب',
            })
            .then(() => 
            {
                if (parentRow && parentRow.parentNode)
                {
                    var row_id_for_remove = parentRow.id;
                    var table_id_of_row_for_remove = document.getElementById("Insert_UserOption_Items_Modal_Items_Table").dataset.parent_table_id;
                    var row_data_item_id_for_remove;
                    var row_data_unique_id_for_remove;
                    var item_type_temp = "";

                    var useroption_childs_level1_rows = "";
                    var useroption_childs_level2_rows = "";

                    if (parentRow.classList[0] === "new_useroption_item")
                    {
                        row_data_item_id_for_remove = "";
                        row_data_unique_id_for_remove = parentRow.dataset.uniqueid;
                        item_type_temp = "new_useroption_item";
                    }
                    else
                    {
                        row_data_item_id_for_remove = parentRow.dataset.item_id;
                        row_data_unique_id_for_remove = "";
                        item_type_temp = "old_useroption_item";
                    }

                    if ((modal.dataset.parent_row_class === "new_usersuboption_child") || (modal.dataset.parent_row_class === "old_usersuboption_child"))
                    {
                        Removed_Items.push({
                            Id: row_id_for_remove,
                            Item_Id: row_data_item_id_for_remove,
                            Unique_Id: row_data_unique_id_for_remove,
                            Table_Id: table_id_of_row_for_remove,
                            Item_Type: item_type_temp
                        });

                    }
                    else if ((modal.dataset.parent_row_class === "new_usersuboption") || (modal.dataset.parent_row_class === "old_usersuboption"))
                    {
                        Removed_Items.push({
                            Id: row_id_for_remove,
                            Item_Id: row_data_item_id_for_remove,
                            Unique_Id: row_data_unique_id_for_remove,
                            Table_Id: table_id_of_row_for_remove,
                            Item_Type: item_type_temp
                        });

                        var data_item_id_temp;

                        if (row_data_item_id_for_remove === "" && row_data_unique_id_for_remove != "")
                        {
                            data_item_id_temp = row_data_unique_id_for_remove;
                        }
                        else if (row_data_item_id_for_remove != "" && row_data_unique_id_for_remove === "")
                        {
                            data_item_id_temp = row_data_item_id_for_remove;
                        }
                        else
                        {
                            data_item_id_temp = "";
                        }

                        useroption_childs_level1_rows = document.getElementById("UserOption_Items_Tables_List").querySelectorAll(`tr[data-parent_option_item_id="${data_item_id_temp}"][data-parent_option_item_table_id="${table_id_of_row_for_remove}"]`);

                        if (useroption_childs_level1_rows.length > 0)
                        {
                            for (var i = 0; i < useroption_childs_level1_rows.length; i++)
                            {
                                if (useroption_childs_level1_rows[i].classList[0] === "new_useroption_item")
                                {
                                    Removed_Items.push({
                                        Id: useroption_childs_level1_rows[i].id,
                                        Item_Id: "",
                                        Unique_Id: useroption_childs_level1_rows[i].dataset.uniqueid,
                                        Table_Id: useroption_childs_level1_rows[i].closest('table').id,
                                        Item_Type: "new_useroption_item"
                                    });
                                }
                                else
                                {
                                    Removed_Items.push({
                                        Id: useroption_childs_level1_rows[i].id,
                                        Item_Id: useroption_childs_level1_rows[i].dataset.item_id,
                                        Unique_Id: "",
                                        Table_Id: useroption_childs_level1_rows[i].closest('table').id,
                                        Item_Type: "old_useroption_item"
                                    });
                                }
                            }
                        }

                    }
                    else
                    {
                        Removed_Items.push({
                            Id: row_id_for_remove,
                            Item_Id: row_data_item_id_for_remove,
                            Unique_Id: row_data_unique_id_for_remove,
                            Table_Id: table_id_of_row_for_remove,
                            Item_Type: item_type_temp
                        });

                        var data_item_id_temp;

                        if (row_data_item_id_for_remove === "" && row_data_unique_id_for_remove != "")
                        {
                            data_item_id_temp = row_data_unique_id_for_remove;
                        }
                        else if (row_data_item_id_for_remove != "" && row_data_unique_id_for_remove === "")
                        {
                            data_item_id_temp = row_data_item_id_for_remove;
                        }
                        else
                        {
                            data_item_id_temp = "";
                        }

                        useroption_childs_level1_rows = document.getElementById("UserOption_Items_Tables_List").querySelectorAll(`tr[data-parent_option_item_id="${data_item_id_temp}"][data-parent_option_item_table_id="${table_id_of_row_for_remove}"]`);

                        if (useroption_childs_level1_rows.length > 0)
                        {
                            for (var i = 0; i < useroption_childs_level1_rows.length; i++)
                            {
                                if (useroption_childs_level1_rows[i].classList[0] === "new_useroption_item")
                                {
                                    Removed_Items.push({
                                        Id: useroption_childs_level1_rows[i].id,
                                        Item_Id: "",
                                        Unique_Id: useroption_childs_level1_rows[i].dataset.uniqueid,
                                        Table_Id: useroption_childs_level1_rows[i].closest('table').id,
                                        Item_Type: "new_useroption_item"
                                    });

                                    useroption_childs_level2_rows = document.getElementById("UserOption_Items_Tables_List").querySelectorAll(`tr[data-parent_option_item_id="${useroption_childs_level1_rows[i].dataset.uniqueid}"][data-parent_option_item_table_id="${useroption_childs_level1_rows[i].closest('table').id}"]`);

                                    if (useroption_childs_level2_rows.length > 0)
                                    {
                                        for (var j = 0; j < useroption_childs_level2_rows.length; j++)
                                        {
                                            if (useroption_childs_level2_rows[j].classList[0] === "new_useroption_item")
                                            {
                                                Removed_Items.push({
                                                    Id: useroption_childs_level2_rows[j].id,
                                                    Item_Id: "",
                                                    Unique_Id: useroption_childs_level2_rows[j].dataset.uniqueid,
                                                    Table_Id: useroption_childs_level2_rows[j].closest('table').id,
                                                    Item_Type: "new_useroption_item"
                                                });
                                            }
                                            else
                                            {
                                                Removed_Items.push({
                                                    Id: useroption_childs_level2_rows[j].id,
                                                    Item_Id: useroption_childs_level2_rows[j].dataset.item_id,
                                                    Unique_Id: "",
                                                    Table_Id: useroption_childs_level2_rows[j].closest('table').id,
                                                    Item_Type: "old_useroption_item"
                                                });
                                            }
                                        }
                                    }
                                }
                                else
                                {
                                    Removed_Items.push({
                                        Id: useroption_childs_level1_rows[i].id,
                                        Item_Id: useroption_childs_level1_rows[i].dataset.item_id,
                                        Unique_Id: "",
                                        Table_Id: useroption_childs_level1_rows[i].closest('table').id,
                                        Item_Type: "old_useroption_item"
                                    });

                                    useroption_childs_level2_rows = document.getElementById("UserOption_Items_Tables_List").querySelectorAll(`tr[data-parent_option_item_id="${useroption_childs_level1_rows[i].dataset.item_id}"][data-parent_option_item_table_id="${useroption_childs_level1_rows[i].closest('table').id}"]`);

                                    if (useroption_childs_level2_rows.length > 0)
                                    {
                                        for (var j = 0; j < useroption_childs_level2_rows.length; j++)
                                        {
                                            if (useroption_childs_level2_rows[j].classList[0] === "new_useroption_item")
                                            {
                                                Removed_Items.push({
                                                    Id: useroption_childs_level2_rows[j].id,
                                                    Item_Id: "",
                                                    Unique_Id: useroption_childs_level2_rows[j].dataset.uniqueid,
                                                    Table_Id: useroption_childs_level2_rows[j].closest('table').id,
                                                    Item_Type: "new_useroption_item"
                                                });
                                            }
                                            else
                                            {
                                                Removed_Items.push({
                                                    Id: useroption_childs_level2_rows[j].id,
                                                    Item_Id: useroption_childs_level2_rows[j].dataset.item_id,
                                                    Unique_Id: "",
                                                    Table_Id: useroption_childs_level2_rows[j].closest('table').id,
                                                    Item_Type: "old_useroption_item"
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    }

                    parentRow.parentNode.removeChild(parentRow);
                }

                let modal_rows = modal_tbody.querySelectorAll('tr');

                modal_rows.forEach((row, index) =>
                {
                    let newRowId = 'Parent_Row_' + (index + 1);
                    row.setAttribute('id', newRowId);
                    let updateButton = row.querySelector('.js_useroption_item_update');
                    let removeButton = row.querySelector('.js_useroption_item_remove');

                    if (updateButton)
                    {
                        updateButton.setAttribute('data-parent_row_id', newRowId);
                    }
                    if (removeButton)
                    {
                        removeButton.setAttribute('data-parent_row_id', newRowId);
                    }
                });

                modal_table = document.getElementById("Insert_UserOption_Items_Modal_Items_Table");
                modal_tbody = modal_table.querySelector('tbody');
                var modal_table_rows_count = modal_tbody.querySelectorAll('tr').length;
                var modal_no_result = document.getElementById("Insert_UserOption_Items_Modal_Items_NoResult");
                var search_input = document.getElementById('SearchItemInput');

                if (modal_table_rows_count > 0)
                {
                    if (search_input.hasAttribute('disabled')) {
                        search_input.removeAttribute('disabled');
                    }

                    modal_no_result.style.display = "none";
                    modal_table.style.display = "block";

                    Items_PaginateTable(search_input.value, rowsPerPage, 1);
                }
                else
                {
                    if (!search_input.hasAttribute('disabled')) {
                        search_input.setAttribute('disabled', '');
                    }

                    modal_no_result.style.display = "block";
                    modal_table.style.display = "none";
                }

                $(modal).modal('show');
            });
        }
        else {
            $(modal).modal('show');
        }
    });
}
function Submit_UserOption_Items_Changes()
{
    Removed_UserOption_Items = Removed_UserOption_Items.concat(Removed_Items);

    var user_option_items_table_list = document.getElementById("UserOption_Items_Tables_List");

    Removed_Items.forEach((item, index) =>
    {
        console.log("Item at index", index, ":", item);
        console.log("Id:", item.Id);
        console.log("Item_Id:", item.Item_Id);
        console.log("Table_Id:", item.Table_Id);
        console.log("Item_Type:", item.Item_Type);
        console.log("Unique_Id:", item.Unique_Id);
        console.log("-----------------------------------");

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        var target_table_to_remove = user_option_items_table_list.querySelector(`table#${item.Table_Id}`);
        var target_tbody_to_remove = target_table_to_remove.querySelector('tbody');
        var target_row_to_remove;

        if (item.Item_Type === "old_useroption_item")
        {
            var target_item_id = item.Item_Id;
            target_row_to_remove = target_tbody_to_remove.querySelector(`tr[data-item_id="${target_item_id}"]`);
        }
        else
        {
            var target_unique_id = item.Unique_Id;
            target_row_to_remove = target_tbody_to_remove.querySelector(`tr[data-uniqueid="${target_unique_id}"]`);
        }

        if (target_row_to_remove != null)
        {
            var target_row_to_remove_parent_table = target_row_to_remove.closest('table');
            target_row_to_remove_parent_table.setAttribute("data-remove_status", "after_remove");

            target_row_to_remove.parentNode.removeChild(target_row_to_remove);
        }

    });

    ///////////////////////////////////////////////////////////////////////////////useroption_items_table

    var update_btn = document.getElementById("Add_Or_Update_UserOption_Item");
    var parent_table_id = update_btn.dataset.parent_table_id;
    var parent_table = document.getElementById(parent_table_id);
    var parent_table_tbody = parent_table.querySelector('tbody');

    ///////////////////////////////////////////////////////////////////////////////modal_items_table

    target_table = document.getElementById("Insert_UserOption_Items_Modal_Items_Table");
    target_tbody = target_table.querySelector('tbody');

    parent_table_tbody.innerHTML = target_tbody.innerHTML;

    console.log("همسان سازی انجام شد");

    $('#Insert_UserOption_Items_Modal').modal('hide');

}

////////////////////////////////////////UserOption_Update/_Remove

var tbody_index;
function ShowUpdateModal_ForUserOption(element, parentid, classname) {

    var element_parent_row = element.closest('tr');
    var tbody_tag = element_parent_row.closest('tbody');
    var table_tag = element_parent_row.closest('table');
    var tbody_id = tbody_tag.id;

    if (classname === "old_useroption" || classname === "new_useroption") {
        tbody_index = tbody_id.replace("UserOption_Table_TBody_", "");
    }
    else if (classname === "old_usersuboption" || classname === "new_usersuboption") {
        tbody_index = tbody_id.replace("UserSubOption_TBody_", "");
    }
    else {
        tbody_index = tbody_id.replace("UserSubOption_Child_TBody_", "");
    }

    document.getElementById("Update_UserOption_Modal").dataset.id = parentid;
    document.getElementById("Update_UserOption_Modal").dataset.optionmodel = classname;
    document.getElementById("Update_UserOption_Modal").dataset.parenttable = table_tag.id;

    let catid = document.getElementById("Rewise_UserControls_Result_Items").dataset.catid;
    let catname = '';

    var matchingTag = document.querySelector(`#UserOptions_Categories_Parent span.tagify__tag-text[data-id="${catid}"]`);

    if (matchingTag) {
        var textNode = matchingTag.firstChild;

        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
            catname = textNode.textContent;
        }
    }

    document.getElementById("Update_UserOption_Category").dataset.catid = catid;
    document.getElementById("Update_UserOption_Category").value = catname;

    var SelectedType = document.querySelector(`#${tbody_id} #Parent_Row_${parentid}.${classname} span.js_useroption_type`).dataset.optiontype;
    var SelectTypeElement = document.getElementById("Update_UserOption_Type");
    SelectTypeElement.value = SelectedType;

    var update_option_modal = document.getElementById("Update_UserOption_Modal");
    var update_option_extension = update_option_modal.querySelector('.js_update_useroption_extension');
    var option_extension_alltags_parent = update_option_extension.querySelector('tags');

    if (option_extension_alltags_parent != null) {
        var option_extension_alltags = option_extension_alltags_parent.querySelectorAll('tag.tagify__tag');

        for (var i = 0; i < option_extension_alltags.length; i++) {
            var child_tag = option_extension_alltags[i];
            var parent_tag = child_tag.parentNode;
            parent_tag.removeChild(child_tag);
        }

        option_extension_alltags_parent.classList = "tagify form-control mt-2 tagify--noTags tagify--empty";
    }

    if (SelectedType === "FileUpload") {
        document.getElementById("Update_UserOption_FileUpload_Area").style.display = "block";
        document.getElementById("Update_UserOption_TextArea_Area").style.display = "none";

        document.getElementById("Update_UserOption_MaxLength").value = "0";
        document.getElementById("Update_UserOption_MaxLength").setAttribute("min", "0");

        document.getElementById("Update_UserOption_FileSize").value = "1";
        document.getElementById("Update_UserOption_FileSize").setAttribute("min", "1");

        let Extensions = element_parent_row.dataset.extensions;
        document.getElementById("Update_UserOption_Extension").value = Extensions;

        let FileSize = element_parent_row.dataset.filesize;
        document.getElementById("Update_UserOption_FileSize").value = FileSize;

    }
    else if (SelectedType === "TextArea") {
        document.getElementById("Update_UserOption_FileUpload_Area").style.display = "none";
        document.getElementById("Update_UserOption_TextArea_Area").style.display = "block";

        document.getElementById("Update_UserOption_FileSize").value = "0";
        document.getElementById("Update_UserOption_FileSize").setAttribute("min", "0");

        document.getElementById("Update_UserOption_MaxLength").value = "1";
        document.getElementById("Update_UserOption_MaxLength").setAttribute("min", "1");

        let MaxLength = element_parent_row.dataset.maxlength;
        document.getElementById("Update_UserOption_MaxLength").value = MaxLength;
    }
    else {
        document.getElementById("Update_UserOption_FileUpload_Area").style.display = "none";
        document.getElementById("Update_UserOption_TextArea_Area").style.display = "none";

        document.getElementById("Update_UserOption_FileSize").value = "0";
        document.getElementById("Update_UserOption_FileSize").setAttribute("min", "0");

        document.getElementById("Update_UserOption_MaxLength").value = "0";
        document.getElementById("Update_UserOption_MaxLength").setAttribute("min", "0");
    }

    var selectedTitle = document.querySelector(`#${tbody_id} #Parent_Row_${parentid}.${classname} span.js_useroption_title`).innerText;
    document.getElementById("Update_UserOption_Title").value = selectedTitle;

    var selectedPrice = document.querySelector(`#${tbody_id} #Parent_Row_${parentid}.${classname} span.js_useroption_price`).innerText;
    document.getElementById("Update_UserOption_Price").value = selectedPrice;

    var selectedTooltip = document.querySelector(`#${tbody_id} #Parent_Row_${parentid}.${classname} span.tooltip-text`).firstChild.textContent;

    if (selectedTooltip !== 'توضیحاتی ارائه نشده است') {
        document.getElementById("Update_UserOption_ToolTip").value = selectedTooltip;
    }
    else {
        document.getElementById("Update_UserOption_ToolTip").value = '';
    }

    $('#Update_UserOption_Modal').modal('show');
}
function Update_UserOption()
{
    let parentid = document.getElementById("Update_UserOption_Modal").dataset.id;
    let classname = document.getElementById("Update_UserOption_Modal").dataset.optionmodel;
    let parent_table = document.getElementById("Update_UserOption_Modal").dataset.parenttable;

    let catid = document.getElementById("Rewise_UserControls_Result_Items").dataset.catid;

    let uop_title = document.getElementById("Update_UserOption_Title").value;

    var selectElement = document.getElementById("Update_UserOption_Type");
    let uop_type = selectElement.value;

    let uop_price = document.getElementById("Update_UserOption_Price").value;

    let uop_tooltip = document.getElementById("Update_UserOption_ToolTip").value;
    let hastooltip = true;

    if (uop_tooltip === 'توضیحاتی ارائه نشده است' || uop_tooltip === '') {
        hastooltip = false;
    }

    if (classname === "old_useroption" || classname === "new_useroption") {
        //////////////////////////////////////////////////////////user_suboption

        document.getElementById("UserSubOption_Table_Title").style.display = "none";
        document.getElementById("UserSubOption_Table_List").style.display = "none";

        //////////////////////////////////////////////////////////user_suboption_child

        document.getElementById("UserSubOption_Childs_Table_Title").style.display = "none";
        document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";
    }
    else if (classname === "old_usersuboption" || classname === "new_usersuboption") {
        //////////////////////////////////////////////////////////user_suboption_child

        document.getElementById("UserSubOption_Childs_Table_Title").style.display = "none";
        document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";
    }

    var tableRow = null;

    if (classname === "old_usersuboption_child" || classname === "new_usersuboption_child") {
        tableRow = document.querySelector(`#UserSubOption_Child_TBody_${tbody_index} tr#Parent_Row_${parentid}.${classname}`)
    }
    else if (classname === "old_usersuboption" || classname === "new_usersuboption") {
        tableRow = document.querySelector(`#UserSubOption_TBody_${tbody_index} tr#Parent_Row_${parentid}.${classname}`)
    }
    else {
        tableRow = document.querySelector(`#UserOption_Table_TBody_${tbody_index} tr#Parent_Row_${parentid}.${classname}`)
    }

    let tableRow_Class = tableRow.classList[0];

    let titleElement = tableRow.querySelector('.js_useroption_title');
    titleElement.innerText = uop_title;

    let option_type_value = '';

    option_type_value = uop_type;
    uop_type = Get_OptionType_Text(uop_type);

    let imageElement = tableRow.querySelector('.js_useroption_addimage');

    if (option_type_value === 'CheckBox' || option_type_value === 'RadioButton') {
        if (!imageElement.hasAttribute("onclick")) {
            imageElement.setAttribute("onclick", `ShowInsertImageModal_ForUserOption(${parentid},'${tableRow_Class}')`);
            imageElement.classList.remove("disabled_button");
            imageElement.removeAttribute("disabled");
            imageElement.style.cursor = "pointer";
        }
    }
    else {
        if (imageElement.hasAttribute("onclick")) {
            imageElement.removeAttribute("onclick");
            imageElement.classList.add("disabled_button");
            imageElement.setAttribute("disabled", "");
            imageElement.style.cursor = "default";
        }
    }

    let optionTypeElement = tableRow.querySelector('.js_useroption_type');
    optionTypeElement.innerText = uop_type;
    optionTypeElement.dataset.optiontype = option_type_value;

    let priceElement = tableRow.querySelector('.js_useroption_price');
    priceElement.innerText = uop_price;

    let tooltipTextElement = tableRow.querySelector('.tooltip-text');

    if (tooltipTextElement)
    {
        if (tooltipTextElement.firstChild && tooltipTextElement.firstChild.nodeType === Node.TEXT_NODE)
        {
            tooltipTextElement.firstChild.textContent = uop_tooltip;
        }
        else
        {
            let sampleTextNode = document.createTextNode(uop_tooltip);
            tooltipTextElement.insertBefore(sampleTextNode, tooltipTextElement.firstChild);
        }
    }

    var tooltip_tag = tableRow.querySelector('.js_useroption_update_tooltip');

    if (hastooltip)
    {
        if (tooltip_tag.classList.contains('btn-secondary')) {
            tooltip_tag.classList.remove('btn-secondary');
            tooltip_tag.classList.add('btn-info');
        }
    }
    else
    {
        if (tooltip_tag.classList.contains('btn-info')) {
            tooltip_tag.classList.remove('btn-info');
            tooltip_tag.classList.add('btn-secondary');
        }
    }

    let titleTextElement = tableRow.querySelector('.title-text');

    if (titleTextElement)
    {
        if (titleTextElement.firstChild && titleTextElement.firstChild.nodeType === Node.TEXT_NODE)
        {
            titleTextElement.firstChild.textContent = uop_title;
        }
        else
        {
            let sampleTextNode = document.createTextNode(uop_title);
            titleTextElement.insertBefore(sampleTextNode, titleTextElement.firstChild);
        }
    }

    var TagifyTags = document.querySelectorAll(".js_update_useroption_extension span.tagify__tag-text");
    var ExtensionList = Array.from(TagifyTags).map(tag => tag.dataset.id.trim());
    var Option_Extensions = ExtensionList.join(',');

    const filesize_value = document.getElementById("Update_UserOption_FileSize").value;
    const maxlength_value = document.getElementById("Update_UserOption_MaxLength").value;

    tableRow.dataset.extensions = Option_Extensions;
    tableRow.dataset.filesize = filesize_value;
    tableRow.dataset.maxlength = maxlength_value;

    $('#Update_UserOption_Modal').modal('hide');
}
function Remove_UserOption_Row(button, classname)
{
    var Userption_Items_List_ToRemove = [];
    var Items_Tables_List = document.getElementById("UserOption_Items_Tables_List");
    var Target_Table_Rows_Temp = "";
    var Target_Row_Table_Id = "";

    /////////////////////////////////////////////////////////////////////

    let is_oldoption = false;
    let is_newoption = false;
    let is_oldsuboption = false;
    let is_newsuboption = false;
    let is_oldsuboption_child = false;
    let is_newsuboption_child = false;

    let check_option_type = '';

    const user_suboption_table_title = document.getElementById("UserSubOption_Table_Title");
    const user_suboption_table_element = document.getElementById("UserSubOption_Table_List");
    const user_suboption_child_table_title = document.getElementById("UserSubOption_Childs_Table_Title");
    const user_suboption_child_table_element = document.getElementById("UserSubOption_Childs_Table_List");

    const table = button.closest('table');
    const thead = table.querySelector('thead');
    const catid = document.getElementById("Rewise_UserControls_Result_Items").dataset.catid;

    if (classname === "old_useroption" || classname === "new_useroption")
    {
        user_suboption_table_title.style.display = "none";
        user_suboption_table_element.style.display = "none";
        user_suboption_child_table_title.style.display = "none";
        user_suboption_child_table_element.style.display = "none";

        check_option_type = 'is_option';

        if (classname === "old_useroption") {
            is_oldoption = true;
        }
        else {
            is_newoption = true;
        }
    }
    else if (classname === "old_usersuboption" || classname === "new_usersuboption")
    {
        user_suboption_child_table_title.style.display = "none";
        user_suboption_child_table_element.style.display = "none";

        check_option_type = 'is_suboption';

        if (classname === "old_usersuboption") {
            is_oldsuboption = true;
        }
        else {
            is_newsuboption = true;
        }
    }
    else
    {
        check_option_type = 'is_suboption_child';

        if (classname === "old_usersuboption_child") {
            is_oldsuboption_child = true;
        }
        else {
            is_newsuboption_child = true;
        }
    }

    let parentRow = button.closest('tr');
    let parentRowIndex;
    let parentRowid;
    let current_id;
    let parent_table_id;

    parentRowIndex = parseInt(parentRow.dataset.previndex);
    current_id = (parentRow.id).replace("Parent_Row_", "");
    parentRowid = parseInt(current_id);

    let TargetBody;
    let TargetBody_List;

    if (is_oldoption || is_newoption)
    {
        TargetBody = document.getElementById(`UserOption_Table_TBody_${catid}`);
        TargetBody_List = TargetBody.querySelectorAll('tr');
        parent_table_id = table.id;
    }
    else
    {
        TargetBody = table.querySelector('tbody');
        TargetBody_List = TargetBody.querySelectorAll('tr');
        parent_table_id = table.id;
    }

    Target_Row_Table_Id = parentRow.querySelector("a.js_useroption_additem").dataset.items_table_id;

    if (Target_Row_Table_Id != "")
    {
        Userption_Items_List_ToRemove.push({
            Table_Id: Target_Row_Table_Id
        });
    }

    parentRow.parentNode.removeChild(parentRow);

    if (is_oldoption || is_newoption)
    {
        user_suboption_table_title.style.display = "none";
        user_suboption_table_element.style.display = "none";
        user_suboption_child_table_title.style.display = "none";
        user_suboption_child_table_element.style.display = "none";

        let UserSubOption_Table_List = document.getElementById("UserSubOption_Table_List");
        let UserSubOption_Child_Table_List = document.getElementById("UserSubOption_Childs_Table_List");

        let target_table = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${parentRowIndex}'][data-catid='${catid}']`);

        if (target_table)
        {
            let target_table_id = target_table.id;
            let target_child_tables = UserSubOption_Child_Table_List.querySelectorAll(`table.SubUserOption_Child[data-parent_table_id='${target_table_id}'][data-catid='${catid}']`);

            if ((target_child_tables != null) && (target_child_tables.length > 0))
            {
                for (var i = 0; i < target_child_tables.length; i++)
                {
                    Target_Table_Rows_Temp = target_child_tables[i].querySelectorAll('tbody tr');

                    for (var j = 0; j < Target_Table_Rows_Temp.length; j++)
                    {
                        Target_Row_Table_Id = Target_Table_Rows_Temp[j].querySelector("a.js_useroption_additem").dataset.items_table_id;

                        if (Target_Row_Table_Id != "")
                        {
                            Userption_Items_List_ToRemove.push({
                                Table_Id: Target_Row_Table_Id
                            });
                        }
                    }

                    target_child_tables[i].parentNode.removeChild(target_child_tables[i]);
                }

                SortSubOptionChildTables();
            }

            Target_Table_Rows_Temp = target_table.querySelectorAll('tbody tr');

            for (var j = 0; j < Target_Table_Rows_Temp.length; j++)
            {
                Target_Row_Table_Id = Target_Table_Rows_Temp[j].querySelector("a.js_useroption_additem").dataset.items_table_id;

                if (Target_Row_Table_Id != "")
                {
                    Userption_Items_List_ToRemove.push({
                        Table_Id: Target_Row_Table_Id
                    });
                }
            }

            target_table.parentNode.removeChild(target_table);
        }

        for (let i = parentRowid; i < TargetBody_List.length; i++)
        {
            var oldindex = TargetBody_List[i].id.replace("Parent_Row_", "");
            var newindex = parseInt(oldindex) - 1;

            UpdateUserOptionRow(TargetBody_List[i], newindex, TargetBody_List[i].classList[0], catid, parent_table_id);
        }

        SortSubOptionTables();
    }
    else if (is_oldsuboption || is_newsuboption)
    {
        user_suboption_child_table_title.style.display = "none";
        user_suboption_child_table_element.style.display = "none";

        let UserSubOption_Child_Table_List = document.getElementById("UserSubOption_Childs_Table_List");
        let target_table = UserSubOption_Child_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${parentRowIndex}'][data-catid='${catid}']`);

        if (target_table != null)
        {
            Target_Table_Rows_Temp = target_table.querySelectorAll('tbody tr');

            for (var j = 0; j < Target_Table_Rows_Temp.length; j++)
            {
                Target_Row_Table_Id = Target_Table_Rows_Temp[j].querySelector("a.js_useroption_additem").dataset.items_table_id;

                if (Target_Row_Table_Id != "")
                {
                    Userption_Items_List_ToRemove.push({
                        Table_Id: Target_Row_Table_Id
                    });
                }
            }

            target_table.parentNode.removeChild(target_table);
        }

        if (TargetBody_List.length == 1)
        {
            var SubOptionTables_Parent = document.getElementById("UserSubOption_Table_List");
            var TargetTable = TargetBody.closest('table');

            Target_Table_Rows_Temp = TargetTable.querySelectorAll('tbody tr');

            for (var j = 0; j < Target_Table_Rows_Temp.length; j++)
            {
                Target_Row_Table_Id = Target_Table_Rows_Temp[j].querySelector("a.js_useroption_additem").dataset.items_table_id;

                if (Target_Row_Table_Id != "")
                {
                    Userption_Items_List_ToRemove.push({
                        Table_Id: Target_Row_Table_Id
                    });
                }
            }

            SubOptionTables_Parent.removeChild(TargetTable);
        }
        else
        {
            for (let i = parentRowid; i < TargetBody_List.length; i++) {
                var oldindex = TargetBody_List[i].id.replace("Parent_Row_", "");
                var newindex = parseInt(oldindex) - 1;

                UpdateUserSubOptionRow(TargetBody_List[i], newindex, TargetBody_List[i].classList[0], catid, parent_table_id);
            }
        }

        SortSubOptionChildTables();
    }
    else
    {
        if (TargetBody_List.length == 1)
        {
            var SubOptionTables_Parent = document.getElementById("UserSubOption_Childs_Table_List");
            var TargetTable = TargetBody.closest('table');

            Target_Table_Rows_Temp = TargetTable.querySelectorAll('tbody tr');

            for (var j = 0; j < Target_Table_Rows_Temp.length; j++)
            {
                Target_Row_Table_Id = Target_Table_Rows_Temp[j].querySelector("a.js_useroption_additem").dataset.items_table_id;

                if (Target_Row_Table_Id != "")
                {
                    Userption_Items_List_ToRemove.push({
                        Table_Id: Target_Row_Table_Id
                    });
                }
            }

            SubOptionTables_Parent.removeChild(TargetTable);

            SortSubOptionChildTables();

        }
        else
        {
            for (let i = parentRowid; i < TargetBody_List.length; i++) {
                var oldindex = TargetBody_List[i].id.replace("Parent_Row_", "");
                var newindex = parseInt(oldindex) - 1;
                UpdateUserSubOptionChildRow(TargetBody_List[i], i, TargetBody_List[i].classList[0], parent_table_id);
            }
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////Remove_Items_Tebles_Of_Removed_UserOptions

    Userption_Items_List_ToRemove.forEach((item) =>
    {
        var target_item_table_to_remove = Items_Tables_List.querySelector(`table#${item.Table_Id}`);

        console.log("target_item_table_to_remove:", target_item_table_to_remove.id);
        console.log("------------------------------------------------------------");

        Items_Tables_List.removeChild(target_item_table_to_remove);
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////

    if (is_oldoption || is_newoption)
    {
        TargetBody = document.getElementById(`UserOption_Table_TBody_${catid}`);
        TargetBody_List = TargetBody.querySelectorAll('tr');
    }
    else
    {
        TargetBody = table.querySelector('tbody');
        TargetBody_List = TargetBody.querySelectorAll('tr');
    }

    if (TargetBody_List.length === 0 && thead)
    {
        HandleEmptyTableDisplay(check_option_type);
    }
}
function SortSubOptionTables() {
    var TargetBody = document.getElementById("UserSubOption_Table_List");
    var TargetBody_List = TargetBody.querySelectorAll('table');

    var UserSubOption_Child_Table_List = document.getElementById("UserSubOption_Childs_Table_List");

    for (var i = 0; i < TargetBody_List.length; i++) {
        var thead = TargetBody_List[i].querySelector('thead');
        var tbody = TargetBody_List[i].querySelector('tbody');

        var suboption_table_id = TargetBody_List[i].id;
        var suboption_table_catid = TargetBody_List[i].dataset.catid;

        let target_child_tables = UserSubOption_Child_Table_List.querySelectorAll(`table.SubUserOption_Child[data-parent_table_id='${suboption_table_id}'][data-catid='${suboption_table_catid}']`);

        if ((target_child_tables != null) && (target_child_tables.length > 0)) {
            for (var j = 0; j < target_child_tables.length; j++) {
                target_child_tables[j].dataset.parent_table_id = "UserSubOption_Table_" + (i + 1).toString();
            }
        }

        TargetBody_List[i].id = "UserSubOption_Table_" + (i + 1).toString();
        thead.id = "UserSubOption_THead_" + (i + 1).toString();
        tbody.id = "UserSubOption_TBody_" + (i + 1).toString();
    }
}
function SortSubOptionChildTables() {
    var TargetBody = document.getElementById("UserSubOption_Childs_Table_List");
    var TargetBody_List = TargetBody.querySelectorAll('table');

    for (var i = 0; i < TargetBody_List.length; i++) {
        var thead = TargetBody_List[i].querySelector('thead');
        var tbody = TargetBody_List[i].querySelector('tbody');

        TargetBody_List[i].id = "UserSubOption_Child_Table_" + (i + 1).toString();
        thead.id = "UserSubOption_Child_THead_" + (i + 1).toString();
        tbody.id = "UserSubOption_Child_TBody_" + (i + 1).toString();
    }
}
function UpdateUserOptionRow(row, newIndex, classname, catid, parent_table_id) {
    var row_previndex = parseInt(row.dataset.previndex);
    let category_id = parseInt(catid);

    var related_suboption = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${row_previndex}'][data-catid='${category_id}']`);

    if (related_suboption != null) {
        related_suboption.dataset.parentid = newIndex + 1;
    }

    row.id = "Parent_Row_" + newIndex;
    row.setAttribute('data-previndex', newIndex + 1);


    let option_type_field = row.querySelector('.js_useroption_type');
    let option_type_attr = option_type_field.dataset.optiontype;

    let addimage = row.querySelector('.js_useroption_addimage');

    if (addimage) {
        addimage.dataset.parentid = newIndex;

        if (option_type_attr === 'CheckBox' || option_type_attr === 'RadioButton') {
            addimage.setAttribute("onclick", `ShowInsertImageModal_ForUserOption(${newIndex}, '${classname}')`);
        }
    }

    let updateitem = row.querySelector('.js_useroption_updateitem');

    if (updateitem) {
        updateitem.dataset.parentid = newIndex;
        updateitem.setAttribute("onclick", `ShowUpdateModal_ForUserOption(this, ${newIndex}, '${classname}')`);
    }
}
function UpdateUserSubOptionRow(row, newIndex, classname, catid, parent_table_id) {
    var row_previndex = parseInt(row.dataset.previndex);
    let category_id = parseInt(catid);

    var related_suboption = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${row_previndex}'][data-catid='${category_id}']`);

    if (related_suboption != null) {
        related_suboption.dataset.parentid = newIndex + 1;
    }

    row.id = "Parent_Row_" + newIndex;
    row.setAttribute('data-previndex', newIndex + 1);


    let option_type_field = row.querySelector('.js_useroption_type');
    let option_type_attr = option_type_field.dataset.optiontype;

    let addimage = row.querySelector('.js_useroption_addimage');

    if (addimage) {
        addimage.dataset.parentid = newIndex;

        if (option_type_attr === 'CheckBox' || option_type_attr === 'RadioButton') {
            addimage.setAttribute("onclick", `ShowInsertImageModal_ForUserOption(${newIndex}, '${classname}')`);
        }
    }

    let updateitem = row.querySelector('.js_useroption_updateitem');

    if (updateitem) {
        updateitem.dataset.parentid = newIndex;
        updateitem.setAttribute("onclick", `ShowUpdateModal_ForUserOption(this, ${newIndex}, '${classname}')`);
    }
}
function UpdateUserSubOptionChildRow(row, newIndex, classname, parent_table_id) {
    row.id = "Parent_Row_" + newIndex;

    let option_type_field = row.querySelector('.js_useroption_type');
    let option_type_attr = option_type_field.dataset.optiontype;

    let addimage = row.querySelector('.js_useroption_addimage');

    if (addimage) {
        addimage.dataset.parentid = newIndex;

        if (option_type_attr === 'CheckBox' || option_type_attr === 'RadioButton') {
            addimage.setAttribute("onclick", `ShowInsertImageModal_ForUserOption(${newIndex}, '${classname}')`);
        }
    }

    let updateitem = row.querySelector('.js_useroption_updateitem');

    if (updateitem) {
        updateitem.dataset.parentid = newIndex;
        updateitem.setAttribute("onclick", `ShowUpdateModal_ForUserOption(this, ${newIndex}, '${classname}')`);
    }
}
function HandleEmptyTableDisplay(check_option_type) {
    const resultElement = document.getElementById("Rewise_UserControls_Result");
    const noResultText = document.getElementById("UserOption_NoResult_Text");

    if (check_option_type === 'is_option') {
        document.getElementById("UserOption_Table_Title").style.display = "none";
        document.getElementById("UserOption_Table_List").style.display = "none";
        document.getElementById("UserOption_NoResult").style.display = "block";
        noResultText.innerText = "لیست آپشن‌ها برای این دسته بندی خالی است!";
    }
    else if (check_option_type === 'is_suboption') {
        document.getElementById("UserOption_Table_Title").style.display = "block";
        document.getElementById("UserOption_Table_List").style.display = "block";
        document.getElementById("UserSubOption_Table_Title").style.display = "block";
        document.getElementById("UserSubOption_Table_List").style.display = "none";
        document.getElementById("UserOption_NoResult").style.display = "block";
        noResultText.innerText = "لیست فرزندان مربوط به این آپشن خالی است!";
    }
    else {
        document.getElementById("UserOption_Table_Title").style.display = "block";
        document.getElementById("UserOption_Table_List").style.display = "block";
        document.getElementById("UserSubOption_Table_Title").style.display = "block";
        document.getElementById("UserSubOption_Table_List").style.display = "block";
        document.getElementById("UserSubOption_Childs_Table_Title").style.display = "block";
        document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";
        document.getElementById("UserOption_NoResult").style.display = "block";
        noResultText.innerText = "لیست فرزندان مربوط به این آپشن خالی است!";
    }

    resultElement.style.display = "block";
}

////////////////////////////////////////UserSubOption_Functions

var current_parentrow;
function Sort_All_SubOptionTables(searchResultItems_Rows, parent_table_id, catid) {
    let oldUserOptionRows = Array.from(searchResultItems_Rows.querySelectorAll("tr.old_usersuboption"));
    let newUserOptionRows = Array.from(searchResultItems_Rows.querySelectorAll("tr.new_usersuboption"));

    oldUserOptionRows.sort((a, b) => {
        let idA = parseInt(a.getAttribute('data-id'));
        let idB = parseInt(b.getAttribute('data-id'));
        return idA - idB;
    });

    searchResultItems_Rows.innerHTML = '';

    oldUserOptionRows.forEach((row, index) => {
        let i = index + 1;

        if (row.hasAttribute('data-previndex')) {
            var prev_index = row.dataset.previndex;
            target_table = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${prev_index}'][data-catid='${catid}']`);

            if (target_table) {
                target_table.dataset.parentid = i
            }

            row.dataset.previndex = i;
        }

        row.id = `Parent_Row_${i}`;


        let option_type_field = row.querySelector('.js_useroption_type');
        let option_type_attr = option_type_field.dataset.optiontype;

        let addimage = row.querySelector('.js_useroption_addimage');

        if (addimage) {
            addimage.dataset.parentid = i;

            if (option_type_attr === 'CheckBox' || option_type_attr === 'RadioButton') {
                addimage.setAttribute("onclick", `ShowInsertImageModal_ForUserOption(${i},'old_usersuboption')`);
            }
        }

        let updateitem = row.querySelector('.js_useroption_updateitem');

        if (updateitem) {
            updateitem.dataset.parentid = i;
            updateitem.setAttribute("onclick", `ShowUpdateModal_ForUserOption(this,${i},'old_usersuboption')`);
        }

        searchResultItems_Rows.appendChild(row);
    });

    let oldRowsCount = oldUserOptionRows.length;

    newUserOptionRows.forEach((row, index) => {
        let i = oldRowsCount + index + 1;

        if (row.hasAttribute('data-previndex')) {
            var prev_index = row.dataset.previndex;
            target_table = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${prev_index}'][data-catid='${catid}']`);

            if (target_table) {
                target_table.dataset.parentid = i
            }

            row.dataset.previndex = i;
        }

        row.id = `Parent_Row_${i}`;


        let option_type_field = row.querySelector('.js_useroption_type');
        let option_type_attr = option_type_field.dataset.optiontype;

        let addimage = row.querySelector('.js_useroption_addimage');

        if (addimage) {
            addimage.dataset.parentid = i;

            if (option_type_attr === 'CheckBox' || option_type_attr === 'RadioButton') {
                addimage.setAttribute("onclick", `ShowInsertImageModal_ForUserOption(${i},'new_usersuboption')`);
            }
        }

        let updateitem = row.querySelector('.js_useroption_updateitem');

        if (updateitem) {
            updateitem.dataset.parentid = i;
            updateitem.setAttribute("onclick", `ShowUpdateModal_ForUserOption(this,${i},'new_usersuboption')`);
        }

        searchResultItems_Rows.appendChild(row);
    });
}
function Sort_All_SubOptionTables_Plus(searchResultItems_Rows, parent_table_id, catid) {
    const updateRowIDs = (rows, prefix) => {
        rows.forEach((row, index) => {
            let i = index + 1;

            if (row.hasAttribute('data-previndex')) {
                var prev_index = row.dataset.previndex;
                target_table = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${prev_index}'][data-catid='${catid}']`);

                if (target_table) {
                    target_table.dataset.parentid = i
                }

                row.dataset.previndex = i;
            }

            row.id = `Parent_Row_${i}`;
            row.querySelector('.js_useroption_addimage').dataset.parentid = i;
            row.querySelector('.js_useroption_addimage').setAttribute("onclick", `ShowInsertImageModal_ForUserOption(${i}, '${prefix}')`);
            row.querySelector('.js_useroption_updateitem').dataset.parentid = i;
            row.querySelector('.js_useroption_updateitem').setAttribute("onclick", `ShowUpdateModal_ForUserOption(this, ${i}, '${prefix}')`);
            searchResultItems_Rows.appendChild(row);
        });
    };

    let oldUserOptionRows = Array.from(searchResultItems_Rows.querySelectorAll("tr.old_usersuboption"));
    let newUserOptionRows = Array.from(searchResultItems_Rows.querySelectorAll("tr.new_usersuboption"));

    oldUserOptionRows.sort((a, b) => parseInt(a.getAttribute('data-id')) - parseInt(b.getAttribute('data-id')));
    searchResultItems_Rows.innerHTML = '';
    updateRowIDs(oldUserOptionRows, 'old_usersuboption');
    updateRowIDs(newUserOptionRows, 'new_usersuboption');
}
function Sort_All_Tables_For_Bind_SubOptions(UserSubOption_Table_List, previndex, parent_table_id, catid) {
    var searchResultItems_Rows = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}'] tbody`);

    var element = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);
    var element_index = element.id.replace("UserSubOption_Table_", "");

    var oldUserOptionRows = Array.from(document.querySelectorAll(`#UserSubOption_TBody_${element_index} tr.old_usersuboption`));

    oldUserOptionRows.sort((a, b) => {
        var idA = parseInt(a.getAttribute('data-id'));
        var idB = parseInt(b.getAttribute('data-id'));
        return idA - idB;
    });

    searchResultItems_Rows.innerHTML = '';

    oldUserOptionRows.forEach((row, index) => {
        var i = index + 1;

        if (row.hasAttribute('data-previndex')) {
            var prev_index = row.dataset.previndex;
            target_table = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${prev_index}'][data-catid='${catid}']`);

            if (target_table) {
                target_table.dataset.parentid = i
            }

            row.dataset.previndex = i;
        }

        row.id = `Parent_Row_${i}`;

        let option_type_field = row.querySelector('.js_useroption_type');
        let option_type_attr = option_type_field.dataset.optiontype;

        let addimage = row.querySelector('.js_useroption_addimage');

        if (addimage) {
            addimage.dataset.parentid = i;

            if (option_type_attr === 'CheckBox' || option_type_attr === 'RadioButton') {
                addimage.setAttribute("onclick", `ShowInsertImageModal_ForUserOption(${i},'old_usersuboption')`);
            }
        }

        var updateitem = row.querySelector('.js_useroption_updateitem');

        if (updateitem) {
            updateitem.dataset.parentid = i;
            updateitem.setAttribute("onclick", `ShowUpdateModal_ForUserOption(this,${i},'old_usersuboption')`);
        }

        searchResultItems_Rows.appendChild(row);
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
function Sort_All_SubOption_Child_Tables(searchResultItems_Rows, parent_table_id, catid) {
    let oldUserOptionRows = Array.from(searchResultItems_Rows.querySelectorAll("tr.old_usersuboption_child"));
    let newUserOptionRows = Array.from(searchResultItems_Rows.querySelectorAll("tr.new_usersuboption_child"));

    oldUserOptionRows.sort((a, b) => {
        let idA = parseInt(a.getAttribute('data-id'));
        let idB = parseInt(b.getAttribute('data-id'));
        return idA - idB;
    });

    searchResultItems_Rows.innerHTML = '';

    oldUserOptionRows.forEach((row, index) => {
        let i = index + 1;

        if (row.hasAttribute('data-previndex')) {
            var prev_index = row.dataset.previndex;
            target_table = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${prev_index}'][data-catid='${catid}']`);

            if (target_table) {
                target_table.dataset.parentid = i
            }

            row.dataset.previndex = i;
        }

        row.id = `Parent_Row_${i}`;


        let option_type_field = row.querySelector('.js_useroption_type');
        let option_type_attr = option_type_field.dataset.optiontype;

        let addimage = row.querySelector('.js_useroption_addimage');

        if (addimage) {
            addimage.dataset.parentid = i;

            if (option_type_attr === 'CheckBox' || option_type_attr === 'RadioButton') {
                addimage.setAttribute("onclick", `ShowInsertImageModal_ForUserOption(${i},'old_usersuboption_child')`);
            }
        }

        let updateitem = row.querySelector('.js_useroption_updateitem');

        if (updateitem) {
            updateitem.dataset.parentid = i;
            updateitem.setAttribute("onclick", `ShowUpdateModal_ForUserOption(this,${i},'old_usersuboption_child')`);
        }

        searchResultItems_Rows.appendChild(row);
    });

    let oldRowsCount = oldUserOptionRows.length;

    newUserOptionRows.forEach((row, index) => {
        let i = oldRowsCount + index + 1;

        if (row.hasAttribute('data-previndex')) {
            var prev_index = row.dataset.previndex;
            target_table = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${prev_index}'][data-catid='${catid}']`);

            if (target_table) {
                target_table.dataset.parentid = i
            }

            row.dataset.previndex = i;
        }

        row.id = `Parent_Row_${i}`;


        let option_type_field = row.querySelector('.js_useroption_type');
        let option_type_attr = option_type_field.dataset.optiontype;

        let addimage = row.querySelector('.js_useroption_addimage');

        if (addimage) {
            addimage.dataset.parentid = i;

            if (option_type_attr === 'CheckBox' || option_type_attr === 'RadioButton') {
                addimage.setAttribute("onclick", `ShowInsertImageModal_ForUserOption(${i},'new_usersuboption_child')`);
            }
        }

        let updateitem = row.querySelector('.js_useroption_updateitem');

        if (updateitem) {
            updateitem.dataset.parentid = i;
            updateitem.setAttribute("onclick", `ShowUpdateModal_ForUserOption(this,${i},'new_usersuboption_child')`);
        }

        searchResultItems_Rows.appendChild(row);
    });
}
function Sort_All_SubOption_Child_Tables_Plus(searchResultItems_Rows, parent_table_id, catid) {
    const updateRowIDs = (rows, prefix) => {
        rows.forEach((row, index) => {
            let i = index + 1;

            if (row.hasAttribute('data-previndex')) {
                var prev_index = row.dataset.previndex;
                target_table = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${prev_index}'][data-catid='${catid}']`);

                if (target_table) {
                    target_table.dataset.parentid = i
                }

                row.dataset.previndex = i;
            }

            row.id = `Parent_Row_${i}`;
            row.querySelector('.js_useroption_addimage').dataset.parentid = i;
            row.querySelector('.js_useroption_addimage').setAttribute("onclick", `ShowInsertImageModal_ForUserOption(${i}, '${prefix}')`);
            row.querySelector('.js_useroption_updateitem').dataset.parentid = i;
            row.querySelector('.js_useroption_updateitem').setAttribute("onclick", `ShowUpdateModal_ForUserOption(this, ${i}, '${prefix}')`);
            searchResultItems_Rows.appendChild(row);
        });
    };

    let oldUserOptionRows = Array.from(searchResultItems_Rows.querySelectorAll("tr.old_usersuboption_child"));
    let newUserOptionRows = Array.from(searchResultItems_Rows.querySelectorAll("tr.new_usersuboption_child"));

    oldUserOptionRows.sort((a, b) => parseInt(a.getAttribute('data-id')) - parseInt(b.getAttribute('data-id')));
    searchResultItems_Rows.innerHTML = '';
    updateRowIDs(oldUserOptionRows, 'old_usersuboption_child');
    updateRowIDs(newUserOptionRows, 'new_usersuboption_child');
}
function Sort_All_Tables_For_Bind_SubOption_Childs(UserSubOption_Table_List, previndex, parent_table_id, catid) {
    var searchResultItems_Rows = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}'] tbody`);

    var element = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);
    var element_index = element.id.replace("UserSubOption_Child_Table_", "");

    var oldUserOptionRows = Array.from(document.querySelectorAll(`#UserSubOption_Child_TBody_${element_index} tr.old_usersuboption_child`));

    oldUserOptionRows.sort((a, b) => {
        var idA = parseInt(a.getAttribute('data-id'));
        var idB = parseInt(b.getAttribute('data-id'));
        return idA - idB;
    });

    searchResultItems_Rows.innerHTML = '';

    oldUserOptionRows.forEach((row, index) => {
        var i = index + 1;

        if (row.hasAttribute('data-previndex')) {
            var prev_index = row.dataset.previndex;
            target_table = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${prev_index}'][data-catid='${catid}']`);

            if (target_table) {
                target_table.dataset.parentid = i
            }

            row.dataset.previndex = i;
        }

        row.id = `Parent_Row_${i}`;

        let option_type_field = row.querySelector('.js_useroption_type');
        let option_type_attr = option_type_field.dataset.optiontype;

        let addimage = row.querySelector('.js_useroption_addimage');

        if (addimage) {
            addimage.dataset.parentid = i;

            if (option_type_attr === 'CheckBox' || option_type_attr === 'RadioButton') {
                addimage.setAttribute("onclick", `ShowInsertImageModal_ForUserOption(${i},'old_usersuboption_child')`);
            }
        }

        var updateitem = row.querySelector('.js_useroption_updateitem');

        if (updateitem) {
            updateitem.dataset.parentid = i;
            updateitem.setAttribute("onclick", `ShowUpdateModal_ForUserOption(this,${i},'old_usersuboption_child')`);
        }

        searchResultItems_Rows.appendChild(row);
    });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
function Show_UserSubOptions(event, catid) {
    event.preventDefault();

    var parent_usersuboption_table = event.target.closest('table');
    var parent_table_id = parent_usersuboption_table.id;

    console.log("parent_table_id:", parent_table_id);

    var table_level = "";

    if (parent_usersuboption_table.classList.contains('SubUserOption')) {
        table_level = "2";
    }
    else {
        table_level = "1";
    }

    var parentrow = event.target.closest('tr');

    var parentid;
    var previndex;

    if (parentrow.classList.contains("old_useroption") || parentrow.classList.contains("old_usersuboption")) {
        parentid = parentrow.dataset.id;
        previndex = parentrow.dataset.previndex;

        var formdata = new FormData();

        formdata.append("CategoryId", Number(catid));
        formdata.append("ParentId", Number(parentid));

        $.ajax({
            type: "POST",
            url: "GetUserSubOptions",
            contentType: false,
            processData: false,
            data: formdata,
            success: function (data) {
                if (data.isSuccess) {
                    var resultContainer = document.getElementById("Rewise_UserControls_Result");
                    resultContainer.style.display = "block";

                    document.getElementById("Rewise_UserControls_Result_Items").dataset.catid = catid;

                    document.getElementById("UserOption_Table_Title").style.display = "block";
                    document.getElementById("UserOption_Table_List").style.display = "block";
                    document.getElementById("UserSubOption_Table_Title").style.display = "block";
                    document.getElementById("UserSubOption_Table_List").style.display = "block";
                    document.getElementById("UserOption_NoResult").style.display = "none";

                    var UserSubOption_Table_List;
                    var SUOCount = 0;
                    var TableList;
                    let target_table;

                    if (table_level === "1") {
                        document.getElementById("UserSubOption_Childs_Table_Title").style.display = "none";
                        document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";

                        UserSubOption_Table_List = document.getElementById("UserSubOption_Table_List");
                        SUOCount = UserSubOption_Table_List.querySelectorAll("table").length;
                        TableList = document.querySelectorAll("#UserSubOption_Table_List table");
                    }
                    else {
                        document.getElementById("UserSubOption_Childs_Table_Title").style.display = "block";
                        document.getElementById("UserSubOption_Childs_Table_List").style.display = "block";

                        UserSubOption_Table_List = document.getElementById("UserSubOption_Childs_Table_List");
                        SUOCount = UserSubOption_Table_List.querySelectorAll("table").length;
                        TableList = document.querySelectorAll("#UserSubOption_Childs_Table_List table");
                    }

                    TableList.forEach(table => {
                        table.style.display = 'none';
                    });

                    if (data.data.userSubOptions.length > 0) {
                        if (table_level === "1") {
                            if (UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`) != null) {
                                var suotable = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);
                                suotable.style.display = "block";
                            }
                            else {
                                var index = SUOCount + 1;
                                UserSubOption_Table_List.innerHTML += `
                                <table id="UserSubOption_Table_${index}" class="table table-striped mb-3 SubUserOption" data-parent_table_id='${parent_table_id}' data-parentid="${previndex}" data-catid="${catid}" style="display:block">
                                    <thead id="UserSubOption_THead_${index}" class="table-dark">
                                        <tr>
                                            <th>عنوان</th>
                                            <th>نوع</th>
                                            <th>قیمت</th>
                                            <th class="compact-column">تصاویر</th>
                                            <th class="compact-column">آیتم‌ها</th>
                                            <th class="compact-column">عنوان‌ها</th>
                                            <th class="compact-column">معرفی</th>
                                            <th class="compact-column">فرزندان</th>
                                            <th class="compact-column">ویرایش</th>
                                            <th class="compact-column">حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody id="UserSubOption_TBody_${index}" class="table-border-bottom-0">
                                    </tbody>
                                </table>`;

                                data.data.userSubOptions.forEach(function (up) {
                                    var searchResultItems_Rows = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}'] tbody`);

                                    if (searchResultItems_Rows.querySelector(`tr[data-id="${up.id}"]`)) {
                                        return;
                                    }

                                    let hastooltip = up.toolTip_Desc && up.toolTip_Desc !== 'توضیحاتی ارائه نشده است';
                                    let ischecked = up.setAsDefault;

                                    let option_type_value = up.option_Type;
                                    up.option_Type = Get_OptionType_Text(up.option_Type);

                                    let formattedPrice = Set_Comma_Plus(up.price);
                                    let option_extensions = up.option_ExtensionList.join(',');
                                    let option_filesize = up.option_FileSize;
                                    let option_maxlength = up.option_Maxlength;

                                    var UOCItem = `
                                   <tr id="Parent_Row_${up.id}" class="old_usersuboption" data-previndex="${up.id}" data-id="${up.id}" data-extensions="${option_extensions}" data-filesize="${option_filesize}" data-maxlength="${option_maxlength}">
                                    <td>
                                        <span class="js_useroption_title">${up.title}</span>
                                    </td>
                                    <td>
                                        <span class="js_useroption_type" data-optiontype="${option_type_value}">${up.option_Type}</span>
                                    </td>
                                     <td>
                                        <span class="js_useroption_price">${formattedPrice}</span>
                                    </td>
                                     <td class="compact-column">
                                        <a class="btn btn-dark text-white js_useroption_addimage ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled_button'}" style="height: 38px; cursor: ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? 'pointer' : 'default'};" data-parentid="${up.id}" data-images_table_id="" ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? `onclick="ShowInsertImageModal_ForUserOption(this.dataset.parentid,'old_usersuboption')"` : ''}  ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled'}><i class="fas fa-image"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-primary text-white js_useroption_additem" style="height: 38px;" data-parentid="${up.id}" data-items_table_id="" onclick="ShowInsertItemModal_ForUserOption(this)"><i class="fas fa-list-ul"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <div class="title-custom">
                                            <a class="btn btn-purple text-white js_useroption_update_title" style="height: 38px;" onclick="ShowTitleModal_ForUserOption(this,'old_usersuboption')">
                                                <i class="fas fa-layer-group"></i>
                                            </a>
                                            <span class="title-text">${up.title}</span>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <div class="tooltip-custom">
                                            <a class="btn ${hastooltip ? 'btn-info' : 'btn-secondary'} text-white js_useroption_update_tooltip" style="height: 38px;" onclick="ShowToolTipModal_ForUserOption(this,'old_usersuboption')">
                                                <i class="fas fa-question"></i>
                                            </a>
                                            <span class="tooltip-text">${up.toolTip_Desc}</span>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <div class="dropdown">
                                            <a class="btn btn-warning text-white dropdown-toggle no-dropdown-arrow" id="Dmb_${up.id}" data-bs-toggle="dropdown" aria-expanded="false" style="height: 38px;">
                                                <i class="fas fa-ellipsis-v"></i>
                                            </a>
                                            <ul class="dropdown-menu" aria-labelledby="Dmb_${up.id}">
                                                <li>
                                                    <a class="dropdown-item js_add_usersuboptions" href="#" onclick="Show_Insert_UserSubOption_Modal(event,${catid})">
                                                        <i class="fas fa-plus" style="position: relative;top: 2px;"></i> افزودن
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item js_show_usersuboptions" href="#" onclick="Show_UserSubOptions(event,${catid})">
                                                        <i class="fas fa-eye" style="position: relative;top: 2px;"></i> نمایش
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item js_refresh_usersuboptions" href="#" onclick="Refresh_UserSubOptions(event,${catid})">
                                                        <i class="fas fa-refresh" style="position: relative;top: 2px;"></i> بازنشانی زیرگروه آپشن
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-success text-white js_useroption_updateitem" style="height: 38px;" data-parentid="${up.id}" onclick="ShowUpdateModal_ForUserOption(this,this.dataset.parentid,'old_usersuboption')"><i class="fas fa-pencil"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-danger text-white js_useroption_remove" style="height: 38px;" onclick="Remove_UserOption_Row(this,'old_usersuboption')"><i class="fas fa-trash"></i></a>
                                    </td>
                                </tr>
                                `;

                                    searchResultItems_Rows.insertAdjacentHTML('beforeend', UOCItem);

                                    SearchResultItems_Rows_Temp = searchResultItems_Rows;
                                    Parent_Table_Id_Temp = parent_table_id;
                                    Catid_Temp = catid;
                                });

                                Sort_All_SubOptionTables(SearchResultItems_Rows_Temp, Parent_Table_Id_Temp, Catid_Temp);
                            }
                        }
                        else {
                            if (UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`) != null) {
                                var suotable = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);
                                suotable.style.display = "block";
                            }
                            else {
                                var index = SUOCount + 1;
                                UserSubOption_Table_List.innerHTML += `
                                <table id="UserSubOption_Child_Table_${index}" class="table table-striped mb-3 SubUserOption_Child" data-parent_table_id='${parent_table_id}' data-parentid="${previndex}" data-catid="${catid}" style="display:block">
                                    <thead id="UserSubOption_Child_THead_${index}" class="table-dark">
                                        <tr>
                                            <th>عنوان</th>
                                            <th>نوع</th>
                                            <th>قیمت</th>
                                            <th class="compact-column">تصاویر</th>
                                            <th class="compact-column">آیتم‌ها</th>
                                            <th class="compact-column">عنوان‌ها</th>
                                            <th class="compact-column">معرفی</th>
                                            <th class="compact-column">ویرایش</th>
                                            <th class="compact-column">حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody id="UserSubOption_Child_TBody_${index}" class="table-border-bottom-0">
                                    </tbody>
                                </table>`;

                                data.data.userSubOptions.forEach(function (up) {
                                    var searchResultItems_Rows = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}'] tbody`);

                                    if (searchResultItems_Rows.querySelector(`tr[data-id="${up.id}"]`)) {
                                        return;
                                    }

                                    let hastooltip = up.toolTip_Desc && up.toolTip_Desc !== 'توضیحاتی ارائه نشده است';
                                    let ischecked = up.setAsDefault;

                                    let option_type_value = up.option_Type;
                                    up.option_Type = Get_OptionType_Text(up.option_Type);

                                    let formattedPrice = Set_Comma_Plus(up.price);
                                    let option_extensions = up.option_ExtensionList.join(',');
                                    let option_filesize = up.option_FileSize;
                                    let option_maxlength = up.option_Maxlength;

                                    var UOCItem = `
                                    <tr id="Parent_Row_${up.id}" class="old_usersuboption_child" data-previndex="${up.id}" data-id="${up.id}" data-extensions="${option_extensions}" data-filesize="${option_filesize}" data-maxlength="${option_maxlength}">
                                    <td>
                                        <span class="js_useroption_title">${up.title}</span>
                                    </td>
                                    <td>
                                        <span class="js_useroption_type" data-optiontype="${option_type_value}">${up.option_Type}</span>
                                    </td>
                                     <td>
                                        <span class="js_useroption_price">${formattedPrice}</span>
                                    </td>
                                     <td class="compact-column">
                                        <a class="btn btn-dark text-white js_useroption_addimage ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled_button'}" style="height: 38px; cursor: ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? 'pointer' : 'default'};" data-parentid="${up.id}" data-images_table_id="" ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? `onclick="ShowInsertImageModal_ForUserOption(this.dataset.parentid,'old_usersuboption_child')"` : ''}  ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled'}><i class="fas fa-image"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-primary text-white js_useroption_additem" style="height: 38px;" data-parentid="${up.id}" data-items_table_id="" onclick="ShowInsertItemModal_ForUserOption(this)"><i class="fas fa-list-ul"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <div class="title-custom">
                                            <a class="btn btn-purple text-white js_useroption_update_title" style="height: 38px;" onclick="ShowTitleModal_ForUserOption(this,'old_usersuboption_child')">
                                                <i class="fas fa-layer-group"></i>
                                            </a>
                                            <span class="title-text">${up.title}</span>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <div class="tooltip-custom">
                                            <a class="btn ${hastooltip ? 'btn-info' : 'btn-secondary'} text-white js_useroption_update_tooltip" style="height: 38px;" onclick="ShowToolTipModal_ForUserOption(this,'old_usersuboption_child')">
                                                <i class="fas fa-question"></i>
                                            </a>
                                            <span class="tooltip-text">${up.toolTip_Desc}</span>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-success text-white js_useroption_updateitem" style="height: 38px;" data-parentid="${up.id}" onclick="ShowUpdateModal_ForUserOption(this,this.dataset.parentid,'old_usersuboption_child')"><i class="fas fa-pencil"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-danger text-white js_useroption_remove" style="height: 38px;" onclick="Remove_UserOption_Row(this,'old_usersuboption_child')"><i class="fas fa-trash"></i></a>
                                    </td>
                                    </tr>
                            `;

                                    searchResultItems_Rows.insertAdjacentHTML('beforeend', UOCItem);

                                    SearchResultItems_Rows_Temp = searchResultItems_Rows;
                                    Parent_Table_Id_Temp = parent_table_id;
                                    Catid_Temp = catid;

                                });

                                Sort_All_SubOption_Child_Tables(SearchResultItems_Rows_Temp, Parent_Table_Id_Temp, Catid_Temp);
                            }
                        }
                    }
                    else {
                        if (table_level === "1") {
                            if (UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`) != null) {
                                var suotable = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);
                                var rowscount = suotable.querySelectorAll('tbody tr').length;

                                if (rowscount > 0) {
                                    suotable.style.display = "block";
                                }
                                else {
                                    document.getElementById("UserSubOption_Table_Title").style.display = "block";
                                    document.getElementById("UserSubOption_Table_List").style.display = "none";
                                    document.getElementById("UserSubOption_Childs_Table_Title").style.display = "none";
                                    document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";
                                    document.getElementById("UserOption_NoResult").style.display = "block";
                                    document.getElementById("UserOption_NoResult_Text").innerText = "لیست فرزندان مربوط به این آپشن خالی است!";
                                }
                            }
                            else {
                                document.getElementById("UserSubOption_Table_Title").style.display = "block";
                                document.getElementById("UserSubOption_Table_List").style.display = "none";
                                document.getElementById("UserSubOption_Childs_Table_Title").style.display = "none";
                                document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";
                                document.getElementById("UserOption_NoResult").style.display = "block";
                                document.getElementById("UserOption_NoResult_Text").innerText = "لیست فرزندان مربوط به این آپشن خالی است!";
                            }
                        }
                        else {
                            if (UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`) != null) {
                                var suotable = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);
                                var rowscount = suotable.querySelectorAll('tbody tr').length;

                                if (rowscount > 0) {
                                    suotable.style.display = "block";
                                }
                                else {
                                    document.getElementById("UserSubOption_Table_Title").style.display = "block";
                                    document.getElementById("UserSubOption_Table_List").style.display = "block";
                                    document.getElementById("UserSubOption_Childs_Table_Title").style.display = "block";
                                    document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";
                                    document.getElementById("UserOption_NoResult").style.display = "block";
                                    document.getElementById("UserOption_NoResult_Text").innerText = "لیست فرزندان مربوط به این آپشن خالی است!";
                                }
                            }
                            else {
                                document.getElementById("UserSubOption_Table_Title").style.display = "block";
                                document.getElementById("UserSubOption_Table_List").style.display = "block";
                                document.getElementById("UserSubOption_Childs_Table_Title").style.display = "block";
                                document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";
                                document.getElementById("UserOption_NoResult").style.display = "block";
                                document.getElementById("UserOption_NoResult_Text").innerText = "لیست فرزندان مربوط به این آپشن خالی است!";
                            }
                        }
                    }

                } else {
                    swal.fire('هشدار!', data.message, 'warning');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.error(`Error ${xhr.status}: ${thrownError}`);
            }
        });
    }
    else {
        parentid = parentrow.dataset.previndex;

        document.getElementById("UserSubOption_Table_Title").style.display = "block";
        document.getElementById("UserSubOption_Table_List").style.display = "block";
        document.getElementById("UserOption_NoResult").style.display = "none";

        var UserSubOption_Table_List;
        var TableList;

        if (table_level === "1") {
            document.getElementById("UserSubOption_Childs_Table_Title").style.display = "none";
            document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";

            UserSubOption_Table_List = document.getElementById("UserSubOption_Table_List");
            TableList = document.querySelectorAll("#UserSubOption_Table_List table");
        }
        else {
            document.getElementById("UserSubOption_Childs_Table_Title").style.display = "block";
            document.getElementById("UserSubOption_Childs_Table_List").style.display = "block";

            UserSubOption_Table_List = document.getElementById("UserSubOption_Childs_Table_List");
            TableList = document.querySelectorAll("#UserSubOption_Childs_Table_List table");
        }

        TableList.forEach(table => {
            table.style.display = 'none';
        });

        var element;
        var element_index;
        var rowscount = 0;

        if (table_level === "1") {
            element = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${parentid}'][data-catid='${catid}']`);

            if (element != null) {
                element_index = element.id.replace("UserSubOption_Table_", "");
                rowscount = element.querySelectorAll(`#UserSubOption_TBody_${element_index} tr.new_usersuboption`).length;

                if (rowscount > 0) {
                    element.style.display = "block";
                }
                else {
                    document.getElementById("UserSubOption_Table_List").style.display = "none";
                    document.getElementById("UserOption_NoResult").style.display = "block";
                    document.getElementById("UserOption_NoResult_Text").innerText = "لیست فرزندان مربوط به این آپشن خالی است!";
                }
            }
            else {
                document.getElementById("UserSubOption_Table_List").style.display = "none";
                document.getElementById("UserOption_NoResult").style.display = "block";
                document.getElementById("UserOption_NoResult_Text").innerText = "لیست فرزندان مربوط به این آپشن خالی است!";
            }
        }
        else {
            element = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${parentid}'][data-catid='${catid}']`);

            if (element != null) {
                element_index = element.id.replace("UserSubOption_Child_Table_", "");
                rowscount = element.querySelectorAll(`#UserSubOption_Child_TBody_${element_index} tr.new_usersuboption_child`).length;

                if (rowscount > 0) {
                    element.style.display = "block";
                }
                else {
                    document.getElementById("UserSubOption_Table_List").style.display = "block";
                    document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";
                    document.getElementById("UserOption_NoResult").style.display = "block";
                    document.getElementById("UserOption_NoResult_Text").innerText = "لیست فرزندان مربوط به این آپشن خالی است!";
                }
            }
            else {
                document.getElementById("UserSubOption_Table_List").style.display = "block";
                document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";
                document.getElementById("UserOption_NoResult").style.display = "block";
                document.getElementById("UserOption_NoResult_Text").innerText = "لیست فرزندان مربوط به این آپشن خالی است!";
            }
        }
    }
}
function ShowAllUserSubOptions(parentid, catid, previndex, option_level, parent_table_id) {
    if (current_parentrow.classList.contains("old_useroption") || current_parentrow.classList.contains("old_usersuboption")) {
        var formdata = new FormData();
        formdata.append("CategoryId", Number(catid));
        formdata.append("ParentId", Number(parentid));

        $.ajax({
            type: "POST",
            url: "GetUserSubOptions",
            contentType: false,
            processData: false,
            data: formdata,
            success: function (data) {
                if (data.isSuccess) {
                    var resultContainer = document.getElementById("Rewise_UserControls_Result");
                    resultContainer.style.display = "block";

                    document.getElementById("Rewise_UserControls_Result_Items").dataset.catid = catid;
                    document.getElementById("UserOption_Table_Title").style.display = "block";
                    document.getElementById("UserOption_Table_List").style.display = "block";
                    document.getElementById("UserSubOption_Table_Title").style.display = "block";
                    document.getElementById("UserSubOption_Table_List").style.display = "block";
                    document.getElementById("UserOption_NoResult").style.display = "none";

                    var UserSubOption_Table_List;
                    var SUOCount = 0;
                    var TableList;
                    let target_table;

                    if (option_level === "1") {
                        document.getElementById("UserSubOption_Childs_Table_Title").style.display = "none";
                        document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";

                        UserSubOption_Table_List = document.getElementById("UserSubOption_Table_List");
                        SUOCount = UserSubOption_Table_List.querySelectorAll("table").length;
                        TableList = document.querySelectorAll("#UserSubOption_Table_List table");
                    }
                    else {
                        document.getElementById("UserSubOption_Childs_Table_Title").style.display = "block";
                        document.getElementById("UserSubOption_Childs_Table_List").style.display = "block";

                        UserSubOption_Table_List = document.getElementById("UserSubOption_Childs_Table_List");
                        SUOCount = UserSubOption_Table_List.querySelectorAll("table").length;
                        TableList = document.querySelectorAll("#UserSubOption_Childs_Table_List table");
                    }

                    TableList.forEach(table => table.style.display = 'none');

                    if (data.data.userSubOptions.length > 0) {
                        if (option_level === "1") {
                            var table = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);

                            if (table) {
                                table.style.display = "block";
                            }
                            else {
                                var index = SUOCount + 1;

                                UserSubOption_Table_List.innerHTML += `
                                <table id="UserSubOption_Table_${index}" class="table table-striped mb-3 SubUserOption" data-parent_table_id='${parent_table_id}' data-parentid="${previndex}" data-catid="${catid}" style="display:block">
                                    <thead id="UserSubOption_THead_${index}" class="table-dark">
                                        <tr>
                                            <th>عنوان</th>
                                            <th>نوع</th>
                                            <th>قیمت</th>
                                            <th class="compact-column">تصاویر</th>
                                            <th class="compact-column">آیتم‌ها</th>
                                            <th class="compact-column">عنوان‌ها</th>
                                            <th class="compact-column">معرفی</th>
                                            <th class="compact-column">فرزندان</th>
                                            <th class="compact-column">ویرایش</th>
                                            <th class="compact-column">حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody id="UserSubOption_TBody_${index}" class="table-border-bottom-0"></tbody>
                                </table>`;

                                data.data.userSubOptions.forEach(up => {
                                    UserSubOption_Table_List = document.getElementById("UserSubOption_Table_List");
                                    var searchResultItems_Rows = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}'] tbody`);

                                    if (searchResultItems_Rows.querySelector(`tr[data-id="${up.id}"]`)) return;

                                    let hastooltip = up.toolTip_Desc && up.toolTip_Desc !== 'توضیحاتی ارائه نشده است';
                                    let ischecked = up.setAsDefault;

                                    let option_type_value = up.option_Type;
                                    up.option_Type = Get_OptionType_Text(up.option_Type);

                                    let formattedPrice = Set_Comma_Plus(up.price);
                                    let option_extensions = up.option_ExtensionList.join(',');
                                    let option_filesize = up.option_FileSize;
                                    let option_maxlength = up.option_Maxlength;

                                    var UOCItem = `
                                   <tr id="Parent_Row_${up.id}" class="old_usersuboption" data-previndex="${up.id}" data-id="${up.id}" data-extensions="${option_extensions}" data-filesize="${option_filesize}" data-maxlength="${option_maxlength}">
                                    <td><span class="js_useroption_title">${up.title}</span></td>
                                    <td><span class="js_useroption_type" data-optiontype="${option_type_value}">${up.option_Type}</span></td>
                                    <td><span class="js_useroption_price">${formattedPrice}</span></td>
                                    <td class="compact-column">
                                        <a class="btn btn-dark text-white js_useroption_addimage ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled_button'}" style="height: 38px; cursor: ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? 'pointer' : 'default'};" data-parentid="${up.id}" data-images_table_id="" ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? `onclick="ShowInsertImageModal_ForUserOption(this.dataset.parentid, 'old_usersuboption')"` : ''} ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled'}><i class="fas fa-image"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-primary text-white js_useroption_additem" style="height: 38px;" data-parentid="${up.id}" data-items_table_id="" onclick="ShowInsertItemModal_ForUserOption(this)"><i class="fas fa-list-ul"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <div class="title-custom">
                                            <a class="btn btn-purple text-white js_useroption_update_title" style="height: 38px;" onclick="ShowTitleModal_ForUserOption(this,'old_usersuboption')">
                                                <i class="fas fa-layer-group"></i>
                                            </a>
                                            <span class="title-text">${up.title}</span>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <div class="tooltip-custom">
                                            <a class="btn ${hastooltip ? 'btn-info' : 'btn-secondary'} text-white js_useroption_update_tooltip" style="height: 38px;" onclick="ShowToolTipModal_ForUserOption(this, 'old_usersuboption')">
                                                <i class="fas fa-question"></i>
                                            </a>
                                            <span class="tooltip-text">${up.toolTip_Desc}</span>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <div class="dropdown">
                                            <a class="btn btn-warning text-white dropdown-toggle no-dropdown-arrow" id="Dmb_${up.id}" data-bs-toggle="dropdown" aria-expanded="false" style="height: 38px;">
                                                <i class="fas fa-ellipsis-v"></i>
                                            </a>
                                            <ul class="dropdown-menu" aria-labelledby="Dmb_${up.id}">
                                                <li>
                                                    <a class="dropdown-item js_add_usersuboptions" href="#" onclick="Show_Insert_UserSubOption_Modal(event,${catid})">
                                                        <i class="fas fa-plus" style="position: relative;top: 2px;"></i> افزودن
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item js_show_usersuboptions" href="#" onclick="Show_UserSubOptions(event,${catid})">
                                                        <i class="fas fa-eye" style="position: relative;top: 2px;"></i> نمایش
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item js_refresh_usersuboptions" href="#" onclick="Refresh_UserSubOptions(event,${catid})">
                                                        <i class="fas fa-refresh" style="position: relative;top: 2px;"></i> بازنشانی زیرگروه آپشن
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-success text-white js_useroption_updateitem" style="height: 38px;" data-parentid="${up.id}" onclick="ShowUpdateModal_ForUserOption(this, this.dataset.parentid, 'old_usersuboption')"><i class="fas fa-pencil"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-danger text-white js_useroption_remove" style="height: 38px;" onclick="Remove_UserOption_Row(this, 'old_usersuboption')"><i class="fas fa-trash"></i></a>
                                    </td>
                                </tr>`;

                                    searchResultItems_Rows.insertAdjacentHTML('beforeend', UOCItem);

                                    SearchResultItems_Rows_Temp = searchResultItems_Rows;
                                    Parent_Table_Id_Temp = parent_table_id;
                                    Catid_Temp = catid;

                                });
                            }

                            Sort_All_SubOptionTables_Plus(SearchResultItems_Rows_Temp, Parent_Table_Id_Temp, Catid_Temp);
                            InsertNewSubOption(parentid, catid, previndex, option_level, parent_table_id);
                        }
                        else {
                            var table = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);

                            if (table) {
                                table.style.display = "block";
                            }
                            else {
                                var index = SUOCount + 1;

                                UserSubOption_Table_List.innerHTML += `
                                <table id="UserSubOption_Child_Table_${index}" class="table table-striped mb-3 SubUserOption_Child" data-parent_table_id='${parent_table_id}' data-parentid="${previndex}" data-catid="${catid}" style="display:block">
                                    <thead id="UserSubOption_Child_THead_${index}" class="table-dark">
                                        <tr>
                                            <th>عنوان</th>
                                            <th>نوع</th>
                                            <th>قیمت</th>
                                            <th class="compact-column">تصاویر</th>
                                            <th class="compact-column">آیتم‌ها</th>
                                            <th class="compact-column">عنوان‌ها</th>
                                            <th class="compact-column">معرفی</th>
                                            <th class="compact-column">ویرایش</th>
                                            <th class="compact-column">حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody id="UserSubOption_Child_TBody_${index}" class="table-border-bottom-0"></tbody>
                                </table>`;

                                data.data.userSubOptions.forEach(up => {
                                    UserSubOption_Table_List = document.getElementById("UserSubOption_Childs_Table_List");
                                    var searchResultItems_Rows = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}'] tbody`);

                                    if (searchResultItems_Rows.querySelector(`tr[data-id="${up.id}"]`)) return;

                                    let hastooltip = up.toolTip_Desc && up.toolTip_Desc !== 'توضیحاتی ارائه نشده است';
                                    let ischecked = up.setAsDefault;

                                    let option_type_value = up.option_Type;
                                    up.option_Type = Get_OptionType_Text(up.option_Type);

                                    let formattedPrice = Set_Comma_Plus(up.price);
                                    let option_extensions = up.option_ExtensionList.join(',');
                                    let option_filesize = up.option_FileSize;
                                    let option_maxlength = up.option_Maxlength;

                                    var UOCItem = `
                                   <tr id="Parent_Row_${up.id}" class="old_usersuboption_child" data-previndex="${up.id}" data-id="${up.id}" data-extensions="${option_extensions}" data-filesize="${option_filesize}" data-maxlength="${option_maxlength}">
                                    <td><span class="js_useroption_title">${up.title}</span></td>
                                    <td><span class="js_useroption_type" data-optiontype="${option_type_value}">${up.option_Type}</span></td>
                                    <td><span class="js_useroption_price">${formattedPrice}</span></td>
                                    <td class="compact-column">
                                        <a class="btn btn-dark text-white js_useroption_addimage ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled_button'}" style="height: 38px; cursor: ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? 'pointer' : 'default'};" data-parentid="${up.id}" data-images_table_id="" ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? `onclick="ShowInsertImageModal_ForUserOption(this.dataset.parentid, 'old_usersuboption_child')"` : ''} ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled'}><i class="fas fa-image"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-primary text-white js_useroption_additem" style="height: 38px;" data-parentid="${up.id}" data-items_table_id="" onclick="ShowInsertItemModal_ForUserOption(this)"><i class="fas fa-list-ul"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <div class="title-custom">
                                            <a class="btn btn-purple text-white js_useroption_update_title" style="height: 38px;" onclick="ShowTitleModal_ForUserOption(this,'old_usersuboption_child')">
                                                <i class="fas fa-layer-group"></i>
                                            </a>
                                            <span class="title-text">${up.title}</span>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <div class="tooltip-custom">
                                            <a class="btn ${hastooltip ? 'btn-info' : 'btn-secondary'} text-white js_useroption_update_tooltip" style="height: 38px;" onclick="ShowToolTipModal_ForUserOption(this, 'old_usersuboption_child')">
                                                <i class="fas fa-question"></i>
                                            </a>
                                            <span class="tooltip-text">${up.toolTip_Desc}</span>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-success text-white js_useroption_updateitem" style="height: 38px;" data-parentid="${up.id}" onclick="ShowUpdateModal_ForUserOption(this, this.dataset.parentid, 'old_usersuboption_child')"><i class="fas fa-pencil"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-danger text-white js_useroption_remove" style="height: 38px;" onclick="Remove_UserOption_Row(this, 'old_usersuboption_child')"><i class="fas fa-trash"></i></a>
                                    </td>
                                </tr>`;

                                    searchResultItems_Rows.insertAdjacentHTML('beforeend', UOCItem);

                                    SearchResultItems_Rows_Temp = searchResultItems_Rows;
                                    Parent_Table_Id_Temp = parent_table_id;
                                    Catid_Temp = catid;

                                });
                            }

                            Sort_All_SubOption_Child_Tables_Plus(SearchResultItems_Rows_Temp, Parent_Table_Id_Temp, Catid_Temp);
                            InsertNewSubOption(parentid, catid, previndex, option_level, parent_table_id);
                        }
                    }
                    else {
                        if (option_level === "1") {
                            var table = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);

                            if (table) {
                                table.style.display = "block";
                            }
                            else {
                                var index = SUOCount + 1;

                                UserSubOption_Table_List.innerHTML += `
                                <table id="UserSubOption_Table_${index}" class="table table-striped mb-3 SubUserOption" data-parent_table_id='${parent_table_id}' data-parentid="${previndex}" data-catid="${catid}" style="display:block">
                                    <thead id="UserSubOption_THead_${index}" class="table-dark">
                                        <tr>
                                            <th>عنوان</th>
                                            <th>نوع</th>
                                            <th>قیمت</th>
                                            <th class="compact-column">تصاویر</th>
                                            <th class="compact-column">آیتم‌ها</th>
                                            <th class="compact-column">عنوان‌ها</th>
                                            <th class="compact-column">معرفی</th>
                                            <th class="compact-column">فرزندان</th>
                                            <th class="compact-column">ویرایش</th>
                                            <th class="compact-column">حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody id="UserSubOption_TBody_${index}" class="table-border-bottom-0"></tbody>
                                </table>`;

                            }

                            InsertNewSubOption(parentid, catid, previndex, option_level, parent_table_id);
                        }
                        else {
                            var table = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);

                            if (table) {
                                table.style.display = "block";
                            }
                            else {
                                var index = SUOCount + 1;

                                UserSubOption_Table_List.innerHTML += `
                                <table id="UserSubOption_Child_Table_${index}" class="table table-striped mb-3 SubUserOption_Child" data-parent_table_id='${parent_table_id}' data-parentid="${previndex}" data-catid="${catid}" style="display:block">
                                    <thead id="UserSubOption_Child_THead_${index}" class="table-dark">
                                        <tr>
                                            <th>عنوان</th>
                                            <th>نوع</th>
                                            <th>قیمت</th>
                                            <th class="compact-column">تصاویر</th>
                                            <th class="compact-column">آیتم‌ها</th>
                                            <th class="compact-column">عنوان‌ها</th>
                                            <th class="compact-column">معرفی</th>
                                            <th class="compact-column">ویرایش</th>
                                            <th class="compact-column">حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody id="UserSubOption_Child_TBody_${index}" class="table-border-bottom-0"></tbody>
                                </table>`;

                            }

                            InsertNewSubOption(parentid, catid, previndex, option_level, parent_table_id);
                        }
                    }
                } else {
                    swal.fire('هشدار!', data.message, 'warning');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.error(`Error ${xhr.status}: ${thrownError}`);
            }
        });
    }
    else {
        document.getElementById("UserSubOption_Table_Title").style.display = "block";
        document.getElementById("UserSubOption_Table_List").style.display = "block";
        document.getElementById("UserOption_NoResult").style.display = "none";

        var UserSubOption_Table_List;
        var SUOCount;
        var TableList;

        if (option_level === "1") {
            document.getElementById("UserSubOption_Childs_Table_Title").style.display = "none";
            document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";

            UserSubOption_Table_List = document.getElementById("UserSubOption_Table_List");
            SUOCount = UserSubOption_Table_List.querySelectorAll("table").length;
            TableList = document.querySelectorAll("#UserSubOption_Table_List table");
        }
        else {
            document.getElementById("UserSubOption_Childs_Table_Title").style.display = "block";
            document.getElementById("UserSubOption_Childs_Table_List").style.display = "block";

            UserSubOption_Table_List = document.getElementById("UserSubOption_Childs_Table_List");
            SUOCount = UserSubOption_Table_List.querySelectorAll("table").length;
            TableList = document.querySelectorAll("#UserSubOption_Childs_Table_List table");
        }

        TableList.forEach(table => table.style.display = 'none');

        var element;
        var element_index;
        var rowscount = 0;

        if (option_level === "1") {
            element = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);

            if (element != null) {
                element_index = element.id.replace("UserSubOption_Table_", "");
                document.getElementById(`UserSubOption_Table_${element_index}`).style.display = "block";
            }
            else {
                var index = SUOCount + 1;

                UserSubOption_Table_List.innerHTML += `
                                <table id="UserSubOption_Table_${index}" class="table table-striped mb-3 SubUserOption" data-parent_table_id='${parent_table_id}' data-parentid="${previndex}" data-catid="${catid}" style="display:block">
                                    <thead id="UserSubOption_THead_${index}" class="table-dark">
                                        <tr>
                                            <th>عنوان</th>
                                            <th>نوع</th>
                                            <th>قیمت</th>
                                            <th class="compact-column">تصاویر</th>
                                            <th class="compact-column">آیتم‌ها</th>
                                            <th class="compact-column">عنوان‌ها</th>
                                            <th class="compact-column">معرفی</th>
                                            <th class="compact-column">فرزندان</th>
                                            <th class="compact-column">ویرایش</th>
                                            <th class="compact-column">حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody id="UserSubOption_TBody_${index}" class="table-border-bottom-0"></tbody>
                                </table>`;
            }

            InsertNewSubOption(parentid, catid, previndex, option_level, parent_table_id);
        }
        else {
            element = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);

            if (element != null) {
                element_index = element.id.replace("UserSubOption_Child_Table_", "");
                document.getElementById(`UserSubOption_Child_Table_${element_index}`).style.display = "block";
            }
            else {
                var index = SUOCount + 1;

                UserSubOption_Table_List.innerHTML += `
                                <table id="UserSubOption_Child_Table_${index}" class="table table-striped mb-3 SubUserOption_Child" data-parent_table_id='${parent_table_id}' data-parentid="${previndex}" data-catid="${catid}" style="display:block">
                                    <thead id="UserSubOption_Child_THead_${index}" class="table-dark">
                                        <tr>
                                            <th>عنوان</th>
                                            <th>نوع</th>
                                            <th>قیمت</th>
                                            <th class="compact-column">تصاویر</th>
                                            <th class="compact-column">آیتم‌ها</th>
                                            <th class="compact-column">عنوان‌ها</th>
                                            <th class="compact-column">معرفی</th>
                                            <th class="compact-column">ویرایش</th>
                                            <th class="compact-column">حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody id="UserSubOption_Child_TBody_${index}" class="table-border-bottom-0"></tbody>
                                </table>`;
            }

            InsertNewSubOption(parentid, catid, previndex, option_level, parent_table_id);
        }
    }
}
function Refresh_UserSubOptions(event, catid) {
    event.preventDefault();

    var parent_usersuboption_table = event.target.closest('table');
    var parent_table_id = parent_usersuboption_table.id;

    console.log("parent_table_id:", parent_table_id);

    var table_level = "";

    if (parent_usersuboption_table.classList.contains('SubUserOption')) {
        table_level = "2";
    }
    else {
        table_level = "1";
    }

    var parentrow = event.target.closest('tr');

    var parentid;
    var previndex;

    if (parentrow.classList.contains("old_useroption") || parentrow.classList.contains("old_usersuboption")) {
        parentid = parentrow.dataset.id;
        previndex = parentrow.dataset.previndex;

        var formdata = new FormData();

        formdata.append("CategoryId", Number(catid));
        formdata.append("ParentId", Number(parentid));

        $.ajax({
            type: "POST",
            url: "GetUserSubOptions",
            contentType: false,
            processData: false,
            data: formdata,
            success: function (data) {
                if (data.isSuccess) {
                    var resultContainer = document.getElementById("Rewise_UserControls_Result");
                    resultContainer.style.display = "block";

                    document.getElementById("Rewise_UserControls_Result_Items").dataset.catid = catid;

                    document.getElementById("UserOption_Table_Title").style.display = "block";
                    document.getElementById("UserOption_Table_List").style.display = "block";
                    document.getElementById("UserSubOption_Table_Title").style.display = "block";
                    document.getElementById("UserSubOption_Table_List").style.display = "block";
                    document.getElementById("UserOption_NoResult").style.display = "none";

                    var UserSubOption_Table_List;
                    var SUOCount = 0;
                    var TableList;
                    let target_table;

                    if (table_level === "1") {
                        document.getElementById("UserSubOption_Childs_Table_Title").style.display = "none";
                        document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";

                        UserSubOption_Table_List = document.getElementById("UserSubOption_Table_List");
                        SUOCount = UserSubOption_Table_List.querySelectorAll("table").length;
                        TableList = document.querySelectorAll("#UserSubOption_Table_List table");
                    }
                    else {
                        document.getElementById("UserSubOption_Childs_Table_Title").style.display = "block";
                        document.getElementById("UserSubOption_Childs_Table_List").style.display = "block";

                        UserSubOption_Table_List = document.getElementById("UserSubOption_Childs_Table_List");
                        SUOCount = UserSubOption_Table_List.querySelectorAll("table").length;
                        TableList = document.querySelectorAll("#UserSubOption_Childs_Table_List table");
                    }

                    TableList.forEach(table => {
                        table.style.display = 'none';
                    });

                    if (data.data.userSubOptions.length > 0) {
                        if (table_level === "1") {
                            if (UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`) != null) {
                                var suotable = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);
                                suotable.style.display = "block";

                                data.data.userSubOptions.forEach(function (up) {
                                    var searchResultItems_Rows = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}'] tbody`);

                                    if (searchResultItems_Rows.querySelector(`tr[data-id="${up.id}"]`)) {
                                        return;
                                    }

                                    let hastooltip = up.toolTip_Desc && up.toolTip_Desc !== 'توضیحاتی ارائه نشده است';
                                    let ischecked = up.setAsDefault;

                                    let option_type_value = up.option_Type;
                                    up.option_Type = Get_OptionType_Text(up.option_Type);

                                    let formattedPrice = Set_Comma_Plus(up.price);
                                    let option_extensions = up.option_ExtensionList.join(',');
                                    let option_filesize = up.option_FileSize;
                                    let option_maxlength = up.option_Maxlength;

                                    var UOCItem = `
                                    <tr id="Parent_Row_${up.id}" class="old_usersuboption" data-previndex="${up.id}" data-id="${up.id}" data-extensions="${option_extensions}" data-filesize="${option_filesize}" data-maxlength="${option_maxlength}">
                                    <td>
                                        <span class="js_useroption_title">${up.title}</span>
                                    </td>
                                    <td>
                                        <span class="js_useroption_type" data-optiontype="${option_type_value}">${up.option_Type}</span>
                                    </td>
                                        <td>
                                        <span class="js_useroption_price">${formattedPrice}</span>
                                    </td>
                                        <td class="compact-column">
                                        <a class="btn btn-dark text-white js_useroption_addimage ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled_button'}" style="height: 38px; cursor: ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? 'pointer' : 'default'};" data-parentid="${up.id}" data-images_table_id="" ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? `onclick="ShowInsertImageModal_ForUserOption(this.dataset.parentid,'old_usersuboption')"` : ''}  ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled'}><i class="fas fa-image"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-primary text-white js_useroption_additem" style="height: 38px;" data-parentid="${up.id}" data-items_table_id="" onclick="ShowInsertItemModal_ForUserOption(this)"><i class="fas fa-list-ul"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <div class="title-custom">
                                            <a class="btn btn-purple text-white js_useroption_update_title" style="height: 38px;" onclick="ShowTitleModal_ForUserOption(this,'old_usersuboption')">
                                                <i class="fas fa-layer-group"></i>
                                            </a>
                                            <span class="title-text">${up.title}</span>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <div class="tooltip-custom">
                                            <a class="btn ${hastooltip ? 'btn-info' : 'btn-secondary'} text-white js_useroption_update_tooltip" style="height: 38px;" onclick="ShowToolTipModal_ForUserOption(this,'old_usersuboption')">
                                                <i class="fas fa-question"></i>
                                            </a>
                                            <span class="tooltip-text">${up.toolTip_Desc}</span>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <div class="dropdown">
                                            <a class="btn btn-warning text-white dropdown-toggle no-dropdown-arrow" id="Dmb_${up.id}" data-bs-toggle="dropdown" aria-expanded="false" style="height: 38px;">
                                                <i class="fas fa-ellipsis-v"></i>
                                            </a>
                                            <ul class="dropdown-menu" aria-labelledby="Dmb_${up.id}">
                                                <li>
                                                    <a class="dropdown-item js_add_usersuboptions" href="#" onclick="Show_Insert_UserSubOption_Modal(event,${catid})">
                                                        <i class="fas fa-plus" style="position: relative;top: 2px;"></i> افزودن
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item js_show_usersuboptions" href="#" onclick="Show_UserSubOptions(event,${catid})">
                                                        <i class="fas fa-eye" style="position: relative;top: 2px;"></i> نمایش
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item js_refresh_usersuboptions" href="#" onclick="Refresh_UserSubOptions(event,${catid})">
                                                        <i class="fas fa-refresh" style="position: relative;top: 2px;"></i> بازنشانی زیرگروه آپشن
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-success text-white js_useroption_updateitem" style="height: 38px;" data-parentid="${up.id}" onclick="ShowUpdateModal_ForUserOption(this,this.dataset.parentid,'old_usersuboption')"><i class="fas fa-pencil"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-danger text-white js_useroption_remove" style="height: 38px;" onclick="Remove_UserOption_Row(this,'old_usersuboption')"><i class="fas fa-trash"></i></a>
                                    </td>
                                </tr>
                                `;

                                    searchResultItems_Rows.insertAdjacentHTML('beforeend', UOCItem);

                                    SearchResultItems_Rows_Temp = searchResultItems_Rows;
                                    Parent_Table_Id_Temp = parent_table_id;
                                    Catid_Temp = catid;

                                });

                                Sort_All_SubOptionTables(SearchResultItems_Rows_Temp, Parent_Table_Id_Temp, Catid_Temp);
                            }
                            else {
                                var index = SUOCount + 1;
                                UserSubOption_Table_List.innerHTML += `
                                <table id="UserSubOption_Table_${index}" class="table table-striped mb-3 SubUserOption" data-parent_table_id='${parent_table_id}' data-parentid="${previndex}" data-catid="${catid}" style="display:block">
                                    <thead id="UserSubOption_THead_${index}" class="table-dark">
                                        <tr>
                                            <th>عنوان</th>
                                            <th>نوع</th>
                                            <th>قیمت</th>
                                            <th class="compact-column">تصاویر</th>
                                            <th class="compact-column">آیتم‌ها</th>
                                            <th class="compact-column">عنوان‌ها</th>
                                            <th class="compact-column">معرفی</th>
                                            <th class="compact-column">فرزندان</th>
                                            <th class="compact-column">ویرایش</th>
                                            <th class="compact-column">حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody id="UserSubOption_TBody_${index}" class="table-border-bottom-0">
                                    </tbody>
                                </table>`;

                                data.data.userSubOptions.forEach(function (up) {
                                    UserSubOption_Table_List = document.getElementById("UserSubOption_Table_List");
                                    var searchResultItems_Rows = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}'] tbody`);

                                    if (searchResultItems_Rows.querySelector(`tr[data-id="${up.id}"]`)) {
                                        return;
                                    }

                                    let hastooltip = up.toolTip_Desc && up.toolTip_Desc !== 'توضیحاتی ارائه نشده است';
                                    let ischecked = up.setAsDefault;

                                    let option_type_value = up.option_Type;
                                    up.option_Type = Get_OptionType_Text(up.option_Type);

                                    let formattedPrice = Set_Comma_Plus(up.price);
                                    let option_extensions = up.option_ExtensionList.join(',');
                                    let option_filesize = up.option_FileSize;
                                    let option_maxlength = up.option_Maxlength;

                                    var UOCItem = `
                                    <tr id="Parent_Row_${up.id}" class="old_usersuboption" data-previndex="${up.id}" data-id="${up.id}" data-extensions="${option_extensions}" data-filesize="${option_filesize}" data-maxlength="${option_maxlength}">
                                        <td>
                                            <span class="js_useroption_title">${up.title}</span>
                                        </td>
                                        <td>
                                            <span class="js_useroption_type" data-optiontype="${option_type_value}">${up.option_Type}</span>
                                        </td>
                                         <td>
                                            <span class="js_useroption_price">${formattedPrice}</span>
                                        </td>
                                          <td class="compact-column">
                                            <a class="btn btn-dark text-white js_useroption_addimage ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled_button'}" style="height: 38px; cursor: ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? 'pointer' : 'default'};" data-parentid="${up.id}" data-images_table_id="" ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? `onclick="ShowInsertImageModal_ForUserOption(this.dataset.parentid,'old_usersuboption')"` : ''} ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled'}><i class="fas fa-image"></i></a>
                                        </td>
                                        <td class="compact-column">
                                            <a class="btn btn-primary text-white js_useroption_additem" style="height: 38px;" data-parentid="${up.id}" data-items_table_id="" onclick="ShowInsertItemModal_ForUserOption(this)"><i class="fas fa-list-ul"></i></a>
                                        </td>
                                        <td class="compact-column">
                                            <div class="title-custom">
                                                <a class="btn btn-purple text-white js_useroption_update_title" style="height: 38px;" onclick="ShowTitleModal_ForUserOption(this,'old_usersuboption')">
                                                    <i class="fas fa-layer-group"></i>
                                                </a>
                                                <span class="title-text">${up.title}</span>
                                            </div>
                                        </td>
                                        <td class="compact-column">
                                            <div class="tooltip-custom">
                                                <a class="btn ${hastooltip ? 'btn-info' : 'btn-secondary'} text-white js_useroption_update_tooltip" style="height: 38px;" onclick="ShowToolTipModal_ForUserOption(this,'old_usersuboption')">
                                                    <i class="fas fa-question"></i>
                                                </a>
                                                <span class="tooltip-text">${up.toolTip_Desc}</span>
                                            </div>
                                        </td>
                                        <td class="compact-column">
                                            <div class="dropdown">
                                                <a class="btn btn-warning text-white dropdown-toggle no-dropdown-arrow" id="Dmb_${up.id}" data-bs-toggle="dropdown" aria-expanded="false" style="height: 38px;">
                                                    <i class="fas fa-ellipsis-v"></i>
                                                </a>
                                                <ul class="dropdown-menu" aria-labelledby="Dmb_${up.id}">
                                                    <li>
                                                        <a class="dropdown-item js_add_usersuboptions" href="#" onclick="Show_Insert_UserSubOption_Modal(event,${catid})">
                                                            <i class="fas fa-plus" style="position: relative;top: 2px;"></i> افزودن
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a class="dropdown-item js_show_usersuboptions" href="#" onclick="Show_UserSubOptions(event,${catid})">
                                                            <i class="fas fa-eye" style="position: relative;top: 2px;"></i> نمایش
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a class="dropdown-item js_refresh_usersuboptions" href="#" onclick="Refresh_UserSubOptions(event,${catid})">
                                                            <i class="fas fa-refresh" style="position: relative;top: 2px;"></i> بازنشانی زیرگروه آپشن
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                        <td class="compact-column">
                                            <a class="btn btn-success text-white js_useroption_updateitem" style="height: 38px;" data-parentid="${up.id}" onclick="ShowUpdateModal_ForUserOption(this,this.dataset.parentid,'old_usersuboption')"><i class="fas fa-pencil"></i></a>
                                        </td>
                                        <td class="compact-column">
                                            <a class="btn btn-danger text-white js_useroption_remove" style="height: 38px;" onclick="Remove_UserOption_Row(this,'old_usersuboption')"><i class="fas fa-trash"></i></a>
                                        </td>
                                    </tr>
                                `;

                                    searchResultItems_Rows.insertAdjacentHTML('beforeend', UOCItem);

                                    SearchResultItems_Rows_Temp = searchResultItems_Rows;
                                    Parent_Table_Id_Temp = parent_table_id;
                                    Catid_Temp = catid;

                                });

                                Sort_All_SubOptionTables(SearchResultItems_Rows_Temp, Parent_Table_Id_Temp, Catid_Temp);
                            }
                        }
                        else {
                            if (UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`) != null) {
                                var suotable = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);
                                suotable.style.display = "block";

                                data.data.userSubOptions.forEach(function (up) {
                                    var searchResultItems_Rows = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}'] tbody`);

                                    if (searchResultItems_Rows.querySelector(`tr[data-id="${up.id}"]`)) {
                                        return;
                                    }

                                    let hastooltip = up.toolTip_Desc && up.toolTip_Desc !== 'توضیحاتی ارائه نشده است';
                                    let ischecked = up.setAsDefault;

                                    let option_type_value = up.option_Type;
                                    up.option_Type = Get_OptionType_Text(up.option_Type);

                                    let formattedPrice = Set_Comma_Plus(up.price);
                                    let option_extensions = up.option_ExtensionList.join(',');
                                    let option_filesize = up.option_FileSize;
                                    let option_maxlength = up.option_Maxlength;

                                    var UOCItem = `
                                   <tr id="Parent_Row_${up.id}" class="old_usersuboption_child" data-previndex="${up.id}" data-id="${up.id}" data-extensions="${option_extensions}" data-filesize="${option_filesize}" data-maxlength="${option_maxlength}">
                                    <td>
                                        <span class="js_useroption_title">${up.title}</span>
                                    </td>
                                    <td>
                                        <span class="js_useroption_type" data-optiontype="${option_type_value}">${up.option_Type}</span>
                                    </td>
                                     <td>
                                        <span class="js_useroption_price">${formattedPrice}</span>
                                    </td>
                                       <td class="compact-column">
                                        <a class="btn btn-dark text-white js_useroption_addimage ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled_button'}" style="height: 38px; cursor: ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? 'pointer' : 'default'};" data-parentid="${up.id}" data-images_table_id="" ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? `onclick="ShowInsertImageModal_ForUserOption(this.dataset.parentid,'old_usersuboption_child')"` : ''}  ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled'}><i class="fas fa-image"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-primary text-white js_useroption_additem" style="height: 38px;" data-parentid="${up.id}" data-items_table_id="" onclick="ShowInsertItemModal_ForUserOption(this)"><i class="fas fa-list-ul"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <div class="title-custom">
                                            <a class="btn btn-purple text-white js_useroption_update_title" style="height: 38px;" onclick="ShowTitleModal_ForUserOption(this,'old_usersuboption_child')">
                                                <i class="fas fa-layer-group"></i>
                                            </a>
                                            <span class="title-text">${up.title}</span>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <div class="tooltip-custom">
                                            <a class="btn ${hastooltip ? 'btn-info' : 'btn-secondary'} text-white js_useroption_update_tooltip" style="height: 38px;" onclick="ShowToolTipModal_ForUserOption(this,'old_usersuboption_child')">
                                                <i class="fas fa-question"></i>
                                            </a>
                                            <span class="tooltip-text">${up.toolTip_Desc}</span>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-success text-white js_useroption_updateitem" style="height: 38px;" data-parentid="${up.id}" onclick="ShowUpdateModal_ForUserOption(this,this.dataset.parentid,'old_usersuboption_child')"><i class="fas fa-pencil"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-danger text-white js_useroption_remove" style="height: 38px;" onclick="Remove_UserOption_Row(this,'old_usersuboption_child')"><i class="fas fa-trash"></i></a>
                                    </td>
                                </tr>
                            `;

                                    searchResultItems_Rows.insertAdjacentHTML('beforeend', UOCItem);

                                    SearchResultItems_Rows_Temp = searchResultItems_Rows;
                                    Parent_Table_Id_Temp = parent_table_id;
                                    Catid_Temp = catid;

                                });

                                Sort_All_SubOption_Child_Tables(SearchResultItems_Rows_Temp, Parent_Table_Id_Temp, Catid_Temp);
                            }
                            else {
                                var index = SUOCount + 1;
                                UserSubOption_Table_List.innerHTML += `
                                <table id="UserSubOption_Child_Table_${index}" class="table table-striped mb-3 SubUserOption_Child" data-parent_table_id='${parent_table_id}' data-parentid="${previndex}" data-catid="${catid}" style="display:block">
                                    <thead id="UserSubOption_Child_THead_${index}" class="table-dark">
                                        <tr>
                                            <th>عنوان</th>
                                            <th>نوع</th>
                                            <th>قیمت</th>
                                            <th class="compact-column">تصاویر</th>
                                            <th class="compact-column">آیتم‌ها</th>
                                            <th class="compact-column">عنوان‌ها</th>
                                            <th class="compact-column">معرفی</th>
                                            <th class="compact-column">ویرایش</th>
                                            <th class="compact-column">حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody id="UserSubOption_Child_TBody_${index}" class="table-border-bottom-0">
                                    </tbody>
                                </table>`;

                                data.data.userSubOptions.forEach(function (up) {
                                    UserSubOption_Table_List = document.getElementById("UserSubOption_Childs_Table_List");
                                    var searchResultItems_Rows = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}'] tbody`);

                                    if (searchResultItems_Rows.querySelector(`tr[data-id="${up.id}"]`)) {
                                        return;
                                    }

                                    let hastooltip = up.toolTip_Desc && up.toolTip_Desc !== 'توضیحاتی ارائه نشده است';
                                    let ischecked = up.setAsDefault;

                                    let option_type_value = up.option_Type;
                                    up.option_Type = Get_OptionType_Text(up.option_Type);

                                    let formattedPrice = Set_Comma_Plus(up.price);
                                    let option_extensions = up.option_ExtensionList.join(',');
                                    let option_filesize = up.option_FileSize;
                                    let option_maxlength = up.option_Maxlength;

                                    var UOCItem = `
                                  <tr id="Parent_Row_${up.id}" class="old_usersuboption_child" data-previndex="${up.id}" data-id="${up.id}" data-extensions="${option_extensions}" data-filesize="${option_filesize}" data-maxlength="${option_maxlength}">
                                    <td>
                                        <span class="js_useroption_title">${up.title}</span>
                                    </td>
                                    <td>
                                        <span class="js_useroption_type" data-optiontype="${option_type_value}">${up.option_Type}</span>
                                    </td>
                                     <td>
                                        <span class="js_useroption_price">${formattedPrice}</span>
                                    </td>
                                      <td class="compact-column">
                                        <a class="btn btn-dark text-white js_useroption_addimage ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled_button'}" style="height: 38px; cursor: ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? 'pointer' : 'default'};" data-parentid="${up.id}" data-images_table_id="" ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? `onclick="ShowInsertImageModal_ForUserOption(this.dataset.parentid,'old_usersuboption_child')"` : ''} ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled'}><i class="fas fa-image"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-primary text-white js_useroption_additem" style="height: 38px;" data-parentid="${up.id}" data-items_table_id="" onclick="ShowInsertItemModal_ForUserOption(this)"><i class="fas fa-list-ul"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <div class="title-custom">
                                            <a class="btn btn-purple text-white js_useroption_update_title" style="height: 38px;" onclick="ShowTitleModal_ForUserOption(this,'old_usersuboption_child')">
                                                <i class="fas fa-layer-group"></i>
                                            </a>
                                            <span class="title-text">${up.title}</span>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <div class="tooltip-custom">
                                            <a class="btn ${hastooltip ? 'btn-info' : 'btn-secondary'} text-white js_useroption_update_tooltip" style="height: 38px;" onclick="ShowToolTipModal_ForUserOption(this,'old_usersuboption_child')">
                                                <i class="fas fa-question"></i>
                                            </a>
                                            <span class="tooltip-text">${up.toolTip_Desc}</span>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-success text-white js_useroption_updateitem" style="height: 38px;" data-parentid="${up.id}" onclick="ShowUpdateModal_ForUserOption(this,this.dataset.parentid,'old_usersuboption_child')"><i class="fas fa-pencil"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-danger text-white js_useroption_remove" style="height: 38px;" onclick="Remove_UserOption_Row(this,'old_usersuboption_child')"><i class="fas fa-trash"></i></a>
                                    </td>
                                </tr>
                            `;

                                    searchResultItems_Rows.insertAdjacentHTML('beforeend', UOCItem);

                                    SearchResultItems_Rows_Temp = searchResultItems_Rows;
                                    Parent_Table_Id_Temp = parent_table_id;
                                    Catid_Temp = catid;

                                });

                                Sort_All_SubOption_Child_Tables(SearchResultItems_Rows_Temp, Parent_Table_Id_Temp, Catid_Temp);
                            }
                        }
                    }
                    else {
                        var suotable;

                        if (table_level === "1") {
                            suotable = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);

                            if (suotable != null) {
                                var rowscount = suotable.querySelectorAll("tr").length;

                                if (rowscount > 0) {
                                    suotable.style.display = "block";
                                }
                                else {
                                    document.getElementById("UserSubOption_Table_Title").style.display = "block";
                                    document.getElementById("UserSubOption_Table_List").style.display = "none";
                                    document.getElementById("UserSubOption_Childs_Table_Title").style.display = "none";
                                    document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";
                                    document.getElementById("UserOption_NoResult").style.display = "block";
                                    document.getElementById("UserOption_NoResult_Text").innerText = "لیست فرزندان مربوط به این آپشن خالی است!";
                                }
                            }
                            else {
                                document.getElementById("UserSubOption_Table_Title").style.display = "block";
                                document.getElementById("UserSubOption_Table_List").style.display = "none";
                                document.getElementById("UserSubOption_Childs_Table_Title").style.display = "none";
                                document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";
                                document.getElementById("UserOption_NoResult").style.display = "block";
                                document.getElementById("UserOption_NoResult_Text").innerText = "لیست فرزندان مربوط به این آپشن خالی است!";
                            }
                        }
                        else {
                            suotable = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);

                            if (suotable != null) {
                                var rowscount = suotable.querySelectorAll("tr").length;

                                if (rowscount > 0) {
                                    suotable.style.display = "block";
                                }
                                else {
                                    document.getElementById("UserSubOption_Table_Title").style.display = "block";
                                    document.getElementById("UserSubOption_Table_List").style.display = "block";
                                    document.getElementById("UserSubOption_Childs_Table_Title").style.display = "block";
                                    document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";
                                    document.getElementById("UserOption_NoResult").style.display = "block";
                                    document.getElementById("UserOption_NoResult_Text").innerText = "لیست فرزندان مربوط به این آپشن خالی است!";
                                }
                            }
                            else {
                                document.getElementById("UserSubOption_Table_Title").style.display = "block";
                                document.getElementById("UserSubOption_Table_List").style.display = "block";
                                document.getElementById("UserSubOption_Childs_Table_Title").style.display = "block";
                                document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";
                                document.getElementById("UserOption_NoResult").style.display = "block";
                                document.getElementById("UserOption_NoResult_Text").innerText = "لیست فرزندان مربوط به این آپشن خالی است!";
                            }
                        }
                    }

                }
                else {
                    swal.fire('هشدار!', data.message, 'warning');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.error(`Error ${xhr.status}: ${thrownError}`);
            }
        });
    }
    else {
        parentid = parentrow.dataset.previndex;

        document.getElementById("UserSubOption_Table_Title").style.display = "block";
        document.getElementById("UserSubOption_Table_List").style.display = "block";
        document.getElementById("UserOption_NoResult").style.display = "none";

        var UserSubOption_Table_List;
        var TableList;

        if (table_level === "1") {
            document.getElementById("UserSubOption_Childs_Table_Title").style.display = "none";
            document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";

            UserSubOption_Table_List = document.getElementById("UserSubOption_Table_List");
            TableList = document.querySelectorAll("#UserSubOption_Table_List table");
        }
        else {
            document.getElementById("UserSubOption_Childs_Table_Title").style.display = "block";
            document.getElementById("UserSubOption_Childs_Table_List").style.display = "block";

            UserSubOption_Table_List = document.getElementById("UserSubOption_Childs_Table_List");
            TableList = document.querySelectorAll("#UserSubOption_Childs_Table_List table");
        }

        TableList.forEach(table => {
            table.style.display = 'none';
        });

        var element;
        var element_index;
        var rowscount = 0;

        if (table_level === "1") {
            element = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${parentid}'][data-catid='${catid}']`);

            if (element != null) {
                element_index = element.id.replace("UserSubOption_Table_", "");
                rowscount = element.querySelectorAll(`UserSubOption_TBody_${element_index} tr.new_usersuboption`).length;

                if (rowscount > 0) {
                    element.style.display = "block";
                }
                else {
                    document.getElementById("UserSubOption_Table_List").style.display = "none";
                    document.getElementById("UserOption_NoResult").style.display = "block";
                    document.getElementById("UserOption_NoResult_Text").innerText = "لیست فرزندان مربوط به این آپشن خالی است!";
                }
            }
            else {
                document.getElementById("UserSubOption_Table_List").style.display = "none";
                document.getElementById("UserOption_NoResult").style.display = "block";
                document.getElementById("UserOption_NoResult_Text").innerText = "لیست فرزندان مربوط به این آپشن خالی است!";
            }
        }
        else {
            element = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${parentid}'][data-catid='${catid}']`);

            if (element != null) {
                element_index = element.id.replace("UserSubOption_Child_Table_", "");
                rowscount = element.querySelectorAll(`UserSubOption_Child_TBody_${element_index} tr.new_usersuboption_child`).length;

                if (rowscount > 0) {
                    element.style.display = "block";
                }
                else {
                    document.getElementById("UserSubOption_Table_List").style.display = "block";
                    document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";
                    document.getElementById("UserOption_NoResult").style.display = "block";
                    document.getElementById("UserOption_NoResult_Text").innerText = "لیست فرزندان مربوط به این آپشن خالی است!";
                }
            }
            else {
                document.getElementById("UserSubOption_Table_List").style.display = "block";
                document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";
                document.getElementById("UserOption_NoResult").style.display = "block";
                document.getElementById("UserOption_NoResult_Text").innerText = "لیست فرزندان مربوط به این آپشن خالی است!";
            }
        }

    }
}
function BindAllUserSubOptions(parentid, catid, previndex, option_level, parent_table_id) {
    if (current_parentrow.classList.contains("old_useroption") || current_parentrow.classList.contains("old_usersuboption")) {
        var formdata = new FormData();
        formdata.append("CategoryId", Number(catid));
        formdata.append("ParentId", Number(parentid));

        $.ajax({
            type: "POST",
            url: "GetUserSubOptions",
            contentType: false,
            processData: false,
            data: formdata,
            success: function (data) {
                if (data.isSuccess) {
                    var resultContainer = document.getElementById("Rewise_UserControls_Result");
                    resultContainer.style.display = "block";
                    document.getElementById("Rewise_UserControls_Result_Items").dataset.catid = catid;

                    var UserSubOption_Table_List;
                    var SUOCount = 0;
                    var TableList;
                    let target_table;

                    if (option_level === "1") {
                        document.getElementById("UserSubOption_Childs_Table_Title").style.display = "none";
                        document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";

                        UserSubOption_Table_List = document.getElementById("UserSubOption_Table_List");
                        SUOCount = UserSubOption_Table_List.querySelectorAll("table").length;
                        TableList = document.querySelectorAll("#UserSubOption_Table_List table");
                    }
                    else {
                        document.getElementById("UserSubOption_Childs_Table_Title").style.display = "block";
                        document.getElementById("UserSubOption_Childs_Table_List").style.display = "block";

                        UserSubOption_Table_List = document.getElementById("UserSubOption_Childs_Table_List");
                        SUOCount = UserSubOption_Table_List.querySelectorAll("table").length;
                        TableList = document.querySelectorAll("#UserSubOption_Childs_Table_List table");
                    }

                    TableList.forEach(table => {
                        table.style.display = 'none';
                    });

                    document.getElementById("UserOption_NoResult").style.display = "none";

                    if (data.data.userSubOptions.length > 0) {
                        if (option_level === "1") {
                            if (UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`) != null) {
                                var suotable = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);
                                suotable.style.display = "block";
                            }
                            else {
                                var index = SUOCount + 1;

                                UserSubOption_Table_List.innerHTML += `
                                <table id="UserSubOption_Table_${index}" class="table table-striped mb-3 SubUserOption" data-parent_table_id='${parent_table_id}' data-parentid="${previndex}" data-catid="${catid}" style="display:block">
                                    <thead id="UserSubOption_THead_${index}" class="table-dark">
                                        <tr>
                                            <th>عنوان</th>
                                            <th>نوع</th>
                                            <th>قیمت</th>
                                            <th class="compact-column">تصاویر</th>
                                            <th class="compact-column">آیتم‌ها</th>
                                            <th class="compact-column">عنوان‌ها</th>
                                            <th class="compact-column">معرفی</th>
                                            <th class="compact-column">فرزندان</th>
                                            <th class="compact-column">ویرایش</th>
                                            <th class="compact-column">حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody id="UserSubOption_TBody_${index}" class="table-border-bottom-0">
                                    </tbody>
                                </table>`;
                            }

                            data.data.userSubOptions.forEach(function (up) {
                                UserSubOption_Table_List = document.getElementById("UserSubOption_Table_List");
                                var searchResultItems_Rows = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}'] tbody`);

                                var hastooltip = up.toolTip_Desc && up.toolTip_Desc !== 'توضیحاتی ارائه نشده است';
                                var ischecked = up.setAsDefault;

                                var option_type_value = up.option_Type;
                                up.option_Type = Get_OptionType_Text(up.option_Type);

                                var formattedPrice = Set_Comma_Plus(up.price);
                                let option_extensions = up.option_ExtensionList.join(',');
                                let option_filesize = up.option_FileSize;
                                let option_maxlength = up.option_Maxlength;

                                var UOCItem = `
                                <tr id="Parent_Row_${up.id}" class="old_usersuboption" data-previndex="${up.id}" data-id="${up.id}" data-extensions="${option_extensions}" data-filesize="${option_filesize}" data-maxlength="${option_maxlength}">
                                    <td>
                                        <span class="js_useroption_title">${up.title}</span>
                                    </td>
                                    <td>
                                        <span class="js_useroption_type" data-optiontype="${option_type_value}">${up.option_Type}</span>
                                    </td>
                                    <td>
                                        <span class="js_useroption_price">${formattedPrice}</span>
                                    </td>
                                     <td class="compact-column">
                                        <a class="btn btn-dark text-white js_useroption_addimage ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled_button'}" style="height: 38px; cursor: ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? 'pointer' : 'default'};" data-parentid="${up.id}" data-images_table_id="" ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? `onclick="ShowInsertImageModal_ForUserOption(this.dataset.parentid,'old_usersuboption')"` : ''} ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled'}><i class="fas fa-image"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-primary text-white js_useroption_additem" style="height: 38px;" data-parentid="${up.id}" data-items_table_id="" onclick="ShowInsertItemModal_ForUserOption(this)"><i class="fas fa-list-ul"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <div class="title-custom">
                                            <a class="btn btn-purple text-white js_useroption_update_title" style="height: 38px;" onclick="ShowTitleModal_ForUserOption(this,'old_usersuboption')">
                                                <i class="fas fa-layer-group"></i>
                                            </a>
                                            <span class="title-text">${up.title}</span>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <div class="tooltip-custom">
                                            <a class="btn ${hastooltip ? 'btn-info' : 'btn-secondary'} text-white js_useroption_update_tooltip" style="height: 38px;" onclick="ShowToolTipModal_ForUserOption(this,'old_usersuboption')">
                                                <i class="fas fa-question"></i>
                                            </a>
                                            <span class="tooltip-text">${up.toolTip_Desc}</span>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                            <div class="dropdown">
                                                <a class="btn btn-warning text-white dropdown-toggle no-dropdown-arrow" id="Dmb_${up.id}" data-bs-toggle="dropdown" aria-expanded="false" style="height: 38px;">
                                                    <i class="fas fa-ellipsis-v"></i>
                                                </a>
                                                <ul class="dropdown-menu" aria-labelledby="Dmb_${up.id}">
                                                    <li>
                                                        <a class="dropdown-item js_add_usersuboptions" href="#" onclick="Show_Insert_UserSubOption_Modal(event,${catid})">
                                                            <i class="fas fa-plus" style="position: relative;top: 2px;"></i> افزودن
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a class="dropdown-item js_show_usersuboptions" href="#" onclick="Show_UserSubOptions(event,${catid})">
                                                            <i class="fas fa-eye" style="position: relative;top: 2px;"></i> نمایش
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a class="dropdown-item js_refresh_usersuboptions" href="#" onclick="Refresh_UserSubOptions(event,${catid})">
                                                            <i class="fas fa-refresh" style="position: relative;top: 2px;"></i> بازنشانی زیرگروه آپشن
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    <td class="compact-column">
                                        <a class="btn btn-success text-white js_useroption_updateitem" style="height: 38px;" data-parentid="${up.id}" onclick="ShowUpdateModal_ForUserOption(this,this.dataset.parentid,'old_usersuboption')"><i class="fas fa-pencil"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-danger text-white js_useroption_remove" style="height: 38px;" onclick="Remove_UserOption_Row(this,'old_usersuboption')"><i class="fas fa-trash"></i></a>
                                    </td>
                                </tr>
                            `;

                                searchResultItems_Rows.insertAdjacentHTML('beforeend', UOCItem);
                            });

                            Sort_All_Tables_For_Bind_SubOptions(UserSubOption_Table_List, previndex, parent_table_id, catid);
                        }
                        else {
                            if (UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`) != null) {
                                var suotable = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);
                                suotable.style.display = "block";
                            }
                            else {
                                var index = SUOCount + 1;

                                UserSubOption_Table_List.innerHTML += `
                                <table id="UserSubOption_Child_Table_${index}" class="table table-striped mb-3 SubUserOption_Child" data-parent_table_id='${parent_table_id}' data-parentid="${previndex}" data-catid="${catid}" style="display:block">
                                    <thead id="UserSubOption_Child_THead_${index}" class="table-dark">
                                        <tr>
                                            <th>عنوان</th>
                                            <th>نوع</th>
                                            <th>قیمت</th>
                                            <th class="compact-column">تصاویر</th>
                                            <th class="compact-column">آیتم‌ها</th>
                                            <th class="compact-column">عنوان‌ها</th>
                                            <th class="compact-column">معرفی</th>
                                            <th class="compact-column">ویرایش</th>
                                            <th class="compact-column">حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody id="UserSubOption_Child_TBody_${index}" class="table-border-bottom-0">
                                    </tbody>
                                </table>`;
                            }

                            data.data.userSubOptions.forEach(function (up) {
                                UserSubOption_Table_List = document.getElementById("UserSubOption_Childs_Table_List");
                                var searchResultItems_Rows = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}'] tbody`);

                                var hastooltip = up.toolTip_Desc && up.toolTip_Desc !== 'توضیحاتی ارائه نشده است';
                                var ischecked = up.setAsDefault;

                                var option_type_value = up.option_Type;
                                up.option_Type = Get_OptionType_Text(up.option_Type);

                                var formattedPrice = Set_Comma_Plus(up.price);
                                let option_extensions = up.option_ExtensionList.join(',');
                                let option_filesize = up.option_FileSize;
                                let option_maxlength = up.option_Maxlength;

                                var UOCItem = `
                                <tr id="Parent_Row_${up.id}" class="old_usersuboption_child" data-previndex="${up.id}" data-id="${up.id}" data-extensions="${option_extensions}" data-filesize="${option_filesize}" data-maxlength="${option_maxlength}">
                                    <td>
                                        <span class="js_useroption_title">${up.title}</span>
                                    </td>
                                    <td>
                                        <span class="js_useroption_type" data-optiontype="${option_type_value}">${up.option_Type}</span>
                                    </td>
                                    <td>
                                        <span class="js_useroption_price">${formattedPrice}</span>
                                    </td>
                                     <td class="compact-column">
                                        <a class="btn btn-dark text-white js_useroption_addimage ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled_button'}" style="height: 38px; cursor: ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? 'pointer' : 'default'};" data-parentid="${up.id}" data-images_table_id="" ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? `onclick="ShowInsertImageModal_ForUserOption(this.dataset.parentid,'old_usersuboption_child')"` : ''} ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled'}><i class="fas fa-image"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-primary text-white js_useroption_additem" style="height: 38px;" data-parentid="${up.id}" data-items_table_id="" onclick="ShowInsertItemModal_ForUserOption(this)"><i class="fas fa-list-ul"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <div class="title-custom">
                                            <a class="btn btn-purple text-white js_useroption_update_title" style="height: 38px;" onclick="ShowTitleModal_ForUserOption(this,'old_usersuboption_child')">
                                                <i class="fas fa-layer-group"></i>
                                            </a>
                                            <span class="title-text">${up.title}</span>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <div class="tooltip-custom">
                                            <a class="btn ${hastooltip ? 'btn-info' : 'btn-secondary'} text-white js_useroption_update_tooltip" style="height: 38px;" onclick="ShowToolTipModal_ForUserOption(this,'old_usersuboption_child')">
                                                <i class="fas fa-question"></i>
                                            </a>
                                            <span class="tooltip-text">${up.toolTip_Desc}</span>
                                        </div>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-success text-white js_useroption_updateitem" style="height: 38px;" data-parentid="${up.id}" onclick="ShowUpdateModal_ForUserOption(this,this.dataset.parentid,'old_usersuboption_child')"><i class="fas fa-pencil"></i></a>
                                    </td>
                                    <td class="compact-column">
                                        <a class="btn btn-danger text-white js_useroption_remove" style="height: 38px;" onclick="Remove_UserOption_Row(this,'old_usersuboption_child')"><i class="fas fa-trash"></i></a>
                                    </td>
                                </tr>
                            `;

                                searchResultItems_Rows.insertAdjacentHTML('beforeend', UOCItem);
                            });

                            Sort_All_Tables_For_Bind_SubOption_Childs(UserSubOption_Table_List, previndex, parent_table_id, catid);
                        }
                    }
                    else {
                        if (option_level === "1") {
                            if (UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`) != null) {
                                var suotable = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);
                                suotable.style.display = "block";
                            }
                            else {
                                var index = SUOCount + 1;

                                UserSubOption_Table_List.innerHTML += `
                                <table id="UserSubOption_Table_${index}" class="table table-striped mb-3 SubUserOption" data-parent_table_id='${parent_table_id}' data-parentid="${previndex}" data-catid="${catid}" style="display:block">
                                    <thead id="UserSubOption_THead_${index}" class="table-dark">
                                        <tr>
                                            <th>عنوان</th>
                                            <th>نوع</th>
                                            <th>قیمت</th>
                                            <th class="compact-column">تصاویر</th>
                                            <th class="compact-column">آیتم‌ها</th>
                                            <th class="compact-column">عنوان‌ها</th>
                                            <th class="compact-column">معرفی</th>
                                            <th class="compact-column">فرزندان</th>
                                            <th class="compact-column">ویرایش</th>
                                            <th class="compact-column">حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody id="UserSubOption_TBody_${index}" class="table-border-bottom-0">
                                    </tbody>
                                </table>`;
                            }
                        }
                        else {
                            if (UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`) != null) {
                                var suotable = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);
                                suotable.style.display = "block";
                            }
                            else {
                                var index = SUOCount + 1;

                                UserSubOption_Table_List.innerHTML += `
                                <table id="UserSubOption_Child_Table_${index}" class="table table-striped mb-3 SubUserOption_Child" data-parent_table_id='${parent_table_id}' data-parentid="${previndex}" data-catid="${catid}" style="display:block">
                                    <thead id="UserSubOption_Child_THead_${index}" class="table-dark">
                                        <tr>
                                            <th>عنوان</th>
                                            <th>نوع</th>
                                            <th>قیمت</th>
                                            <th class="compact-column">تصاویر</th>
                                            <th class="compact-column">آیتم‌ها</th>
                                            <th class="compact-column">عنوان‌ها</th>
                                            <th class="compact-column">معرفی</th>
                                            <th class="compact-column">ویرایش</th>
                                            <th class="compact-column">حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody id="UserSubOption_Child_TBody_${index}" class="table-border-bottom-0">
                                    </tbody>
                                </table>`;
                            }
                        }
                    }

                    InsertNewSubOption(parentid, catid, previndex, option_level, parent_table_id);
                }
                else {
                    swal.fire('هشدار!', data.message, 'warning');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.error(`Error ${xhr.status}: ${thrownError}`);
            }
        });
    }
    else {
        document.getElementById("UserSubOption_Table_Title").style.display = "block";
        document.getElementById("UserSubOption_Table_List").style.display = "block";
        document.getElementById("UserOption_NoResult").style.display = "none";

        var UserSubOption_Table_List;
        var SUOCount;
        var TableList;

        if (option_level === "1") {
            document.getElementById("UserSubOption_Childs_Table_Title").style.display = "none";
            document.getElementById("UserSubOption_Childs_Table_List").style.display = "none";

            UserSubOption_Table_List = document.getElementById("UserSubOption_Table_List");
            SUOCount = UserSubOption_Table_List.querySelectorAll("table").length;
            TableList = document.querySelectorAll("#UserSubOption_Table_List table");
        }
        else {
            document.getElementById("UserSubOption_Childs_Table_Title").style.display = "block";
            document.getElementById("UserSubOption_Childs_Table_List").style.display = "block";

            UserSubOption_Table_List = document.getElementById("UserSubOption_Childs_Table_List");
            SUOCount = UserSubOption_Table_List.querySelectorAll("table").length;
            TableList = document.querySelectorAll("#UserSubOption_Childs_Table_List table");
        }

        TableList.forEach(table => table.style.display = 'none');

        if (option_level === "1") {
            var index = SUOCount + 1;
            UserSubOption_Table_List.innerHTML += `
                          <table id="UserSubOption_Table_${index}" class="table table-striped mb-3 SubUserOption" data-parent_table_id='${parent_table_id}' data-parentid="${previndex}" data-catid="${catid}" style="display:block">
                              <thead id="UserSubOption_THead_${index}" class="table-dark">
                                  <tr>
                                      <th>عنوان</th>
                                      <th>نوع</th>
                                      <th>قیمت</th>
                                      <th class="compact-column">تصاویر</th>
                                      <th class="compact-column">آیتم‌ها</th>
                                      <th class="compact-column">عنوان‌ها</th>
                                      <th class="compact-column">معرفی</th>
                                      <th class="compact-column">فرزندان</th>
                                      <th class="compact-column">ویرایش</th>
                                      <th class="compact-column">حذف</th>
                                  </tr>
                              </thead>
                              <tbody id="UserSubOption_TBody_${index}" class="table-border-bottom-0"></tbody>
                          </table>`;

            InsertNewSubOption(parentid, catid, previndex, option_level, parent_table_id);
        }
        else {
            var index = SUOCount + 1;
            UserSubOption_Table_List.innerHTML += `
                          <table id="UserSubOption_Child_Table_${index}" class="table table-striped mb-3 SubUserOption_Child" data-parent_table_id='${parent_table_id}' data-parentid="${previndex}" data-catid="${catid}" style="display:block">
                              <thead id="UserSubOption_Child_THead_${index}" class="table-dark">
                                  <tr>
                                      <th>عنوان</th>
                                      <th>نوع</th>
                                      <th>قیمت</th>
                                      <th class="compact-column">تصاویر</th>
                                      <th class="compact-column">آیتم‌ها</th>
                                      <th class="compact-column">عنوان‌ها</th>
                                      <th class="compact-column">معرفی</th>
                                      <th class="compact-column">ویرایش</th>
                                      <th class="compact-column">حذف</th>
                                  </tr>
                              </thead>
                              <tbody id="UserSubOption_Child_TBody_${index}" class="table-border-bottom-0"></tbody>
                          </table>`;

            InsertNewSubOption(parentid, catid, previndex, option_level, parent_table_id);
        }
    }
}
function Show_Insert_UserSubOption_Modal(event, categoryid) {
    event.preventDefault();

    var parent_table = event.target.closest('table');
    var parent_table_id = parent_table.id;

    console.log("parent_table_id:", parent_table_id);

    var table_level = "";

    if (parent_table.classList.contains('SubUserOption')) {
        table_level = "2";
    }
    else {
        table_level = "1";
    }

    var parentrow = event.target.closest('tr');
    var parentid;
    var previndex;

    current_parentrow = parentrow;

    previndex = parentrow.dataset.previndex;

    if (parentrow.classList.contains("old_useroption") || parentrow.classList.contains("old_usersuboption")) {
        parentid = parentrow.dataset.id;
    }
    else {
        parentid = parentrow.id;
        parentid = parentid.replace("Parent_Row_", "");
    }

    var tagifyTags = document.querySelectorAll("#UserOptions_Categories_Parent span.tagify__tag-text");
    var categoryIds = Array.from(tagifyTags).map(tag => Number(tag.dataset.id.trim()));

    let catid = categoryid;
    let catname = '';

    tagifyTags.forEach((tag) => {

        var textNode = tag.firstChild;

        if (textNode && textNode.nodeType === Node.TEXT_NODE) {

            catname = textNode.textContent;
        }
    });

    if (tagifyTags.length == 0) {
        swal.fire({
            title: 'هشدار',
            text: "یک دسته بندی انتخاب کنید!",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'بسیار خب',
        });
        return;
    }
    else if (tagifyTags.length > 1) {
        swal.fire({
            title: 'هشدار',
            text: "حداکثر یک دسته بندی انتخاب کنید!",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'بسیار خب',
        });
        return;
    }
    else {
        document.getElementById("Insert_UserSubOption_Modal").dataset.id = parentid;
        document.getElementById("Insert_UserSubOption_Modal").dataset.previndex = previndex;
        document.getElementById("Insert_UserSubOption_Modal").dataset.optionlevel = table_level;
        document.getElementById("Insert_UserSubOption_Modal").dataset.parent_table_id = parent_table_id;
        document.getElementById("Insert_UserSubOption_Category").value = catname;
        document.getElementById("Insert_UserSubOption_Category").dataset.catid = catid;

        var selectElement = document.getElementById("UserOptions_Type_Select");
        var selectedValue = selectElement.value;

        var insertSelectElement = document.getElementById("Insert_UserSubOption_Type");
        insertSelectElement.value = selectedValue;

        var insert_option_modal = document.getElementById("Insert_UserSubOption_Modal");
        var insert_option_extension = insert_option_modal.querySelector('.js_insert_usersuboption_extension');
        var option_extension_alltags_parent = insert_option_extension.querySelector('tags');

        if (option_extension_alltags_parent != null) {
            var option_extension_alltags = option_extension_alltags_parent.querySelectorAll('tag.tagify__tag');

            for (var i = 0; i < option_extension_alltags.length; i++) {
                var child_tag = option_extension_alltags[i];
                var parent_tag = child_tag.parentNode;
                parent_tag.removeChild(child_tag);
            }

            option_extension_alltags_parent.classList = "tagify form-control mt-2 tagify--noTags tagify--empty";
        }

        if (selectElement === "FileUpload") {
            document.getElementById("Insert_UserSubOption_FileUpload_Area").style.display = "block";
            document.getElementById("Insert_UserSubOption_TextArea_Area").style.display = "none";

            document.getElementById("Insert_UserSubOption_FileSize").value = "1";
            document.getElementById("Insert_UserSubOption_FileSize").setAttribute("min", "1");

            document.getElementById("Insert_UserSubOption_MaxLength").value = "0";
            document.getElementById("Insert_UserSubOption_MaxLength").setAttribute("min", "0");
        }
        else if (selectElement === "TextArea") {
            document.getElementById("Insert_UserSubOption_FileUpload_Area").style.display = "none";
            document.getElementById("Insert_UserSubOption_TextArea_Area").style.display = "block";

            document.getElementById("Insert_UserSubOption_MaxLength").value = "1";
            document.getElementById("Insert_UserSubOption_MaxLength").setAttribute("min", "1");

            document.getElementById("Insert_UserSubOption_FileSize").value = "0";
            document.getElementById("Insert_UserSubOption_FileSize").setAttribute("min", "0");

        }
        else {
            document.getElementById("Insert_UserSubOption_FileUpload_Area").style.display = "none";
            document.getElementById("Insert_UserSubOption_TextArea_Area").style.display = "none";

            document.getElementById("Insert_UserSubOption_FileSize").value = "0";
            document.getElementById("Insert_UserSubOption_FileSize").setAttribute("min", "0");

            document.getElementById("Insert_UserSubOption_MaxLength").value = "0";
            document.getElementById("Insert_UserSubOption_MaxLength").setAttribute("min", "0");
        }
    }

    $('#Insert_UserSubOption_Modal').modal('show');
}
function InsertNewSubOption(parentid, catid, previndex, option_level, parent_table_id) {
    if (option_level === "1") {
        var UserSubOption_Table_List = document.getElementById("UserSubOption_Table_List");
        var SUOCount = UserSubOption_Table_List.querySelectorAll("table").length;
        var specified_table;

        if (SUOCount > 0) {
            specified_table = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);

            if (specified_table == null) {
                var index = SUOCount + 1;

                UserSubOption_Table_List.innerHTML += `
                <table id="UserSubOption_Table_${index}" class="table table-striped mb-3 SubUserOption" data-parent_table_id='${parent_table_id}' data-parentid="${previndex}" data-catid="${catid}" style="display:block">
                    <thead id="UserSubOption_THead_${index}" class="table-dark">
                        <tr>
                            <th>عنوان</th>
                            <th>نوع</th>
                            <th>قیمت</th>
                            <th class="compact-column">تصاویر</th>
                            <th class="compact-column">آیتم‌ها</th>
                            <th class="compact-column">عنوان‌ها</th>
                            <th class="compact-column">معرفی</th>
                            <th class="compact-column">فرزندان</th>
                            <th class="compact-column">ویرایش</th>
                            <th class="compact-column">حذف</th>
                        </tr>
                    </thead>
                    <tbody id="UserSubOption_TBody_${index}" class="table-border-bottom-0">
                    </tbody>
                </table>`;
            }
        }
        else {
            var index = SUOCount + 1;

            UserSubOption_Table_List.innerHTML += `
            <table id="UserSubOption_Table_${index}" class="table table-striped mb-3 SubUserOption" data-parent_table_id='${parent_table_id}' data-parentid="${previndex}" data-catid="${catid}" style="display:block">
                <thead id="UserSubOption_THead_${index}" class="table-dark">
                    <tr>
                        <th>عنوان</th>
                        <th>نوع</th>
                        <th>قیمت</th>
                        <th class="compact-column">تصاویر</th>
                        <th class="compact-column">آیتم‌ها</th>
                        <th class="compact-column">عنوان‌ها</th>
                        <th class="compact-column">معرفی</th>
                        <th class="compact-column">فرزندان</th>
                        <th class="compact-column">ویرایش</th>
                        <th class="compact-column">حذف</th>
                    </tr>
                </thead>
                <tbody id="UserSubOption_TBody_${index}" class="table-border-bottom-0">
                </tbody>
            </table>`;
        }

        var tbody = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}'] tbody`);

        const uop_title = document.getElementById("Insert_UserSubOption_Title").value;
        const selectElement = document.getElementById("Insert_UserSubOption_Type");
        const option_type_value = selectElement.value;
        const selectedOptionText = selectElement.options[selectElement.selectedIndex].innerText;
        const uop_type = selectedOptionText;

        const uop_price_text = document.getElementById("Insert_UserSubOption_Price").value;
        const uop_price = uop_price_text.replace(/,/g, "");

        const uop_tooltip = document.getElementById("Insert_UserSubOption_ToolTip").value;
        const hastooltip = uop_tooltip && uop_tooltip !== 'توضیحاتی ارائه نشده است';

        var uop_extensions = "";
        var uop_filesize = "0";
        var uop_maxlength = "0";

        if (option_type_value === "FileUpload") {
            var TagifyTags = document.querySelectorAll(".js_insert_usersuboption_extension span.tagify__tag-text");
            var ExtensionList = Array.from(TagifyTags).map(tag => tag.dataset.id.trim());
            var Option_Extensions = ExtensionList.join(',');

            const filesize_value = document.getElementById("Insert_UserSubOption_FileSize").value;

            uop_extensions = Option_Extensions;
            uop_filesize = filesize_value;

        }
        else if (option_type_value === "TextArea") {
            const maxlength_value = document.getElementById("Insert_UserSubOption_MaxLength").value;
            uop_maxlength = maxlength_value;
        }

        const oldrowsCount = tbody.querySelectorAll('tr.old_usersuboption').length;
        const newrowsCount = tbody.querySelectorAll('tr.new_usersuboption').length;
        let tableRowCount = 0;

        if (newrowsCount === 0) {
            tableRowCount = oldrowsCount === 0 ? 1 : oldrowsCount + 1;
        }
        else {
            tableRowCount = newrowsCount + 1;
        }

        const tableRow = document.createElement('tr');
        tableRow.id = `Parent_Row_${tableRowCount}`;
        tableRow.className = "new_usersuboption";
        tableRow.setAttribute('data-previndex', `${tableRowCount}`);
        tableRow.setAttribute('data-extensions', `${uop_extensions}`);
        tableRow.setAttribute('data-filesize', `${uop_filesize}`);
        tableRow.setAttribute('data-maxlength', `${uop_maxlength}`);

        tableRow.innerHTML = `
        <td>
            <span class="js_useroption_title">${uop_title}</span>
        </td>
        <td>
            <span class="js_useroption_type" data-optiontype="${option_type_value}">${uop_type}</span>
        </td>
        <td>
            <span class="js_useroption_price">${uop_price_text}</span>
        </td>
        <td class="compact-column">
            <a class="btn btn-dark text-white js_useroption_addimage ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled_button'}" style="height: 38px; cursor: ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? 'pointer' : 'default'};" data-parentid="${tableRowCount}" data-images_table_id="" ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? `onclick="ShowInsertImageModal_ForUserOption(this.dataset.parentid, 'new_usersuboption')"` : ''} ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled'}><i class="fas fa-image"></i></a>
        </td>
        <td class="compact-column">
            <a class="btn btn-primary text-white js_useroption_additem" style="height: 38px;" data-parentid="${tableRowCount}" data-items_table_id="" onclick="ShowInsertItemModal_ForUserOption(this)"><i class="fas fa-list-ul"></i></a>
        </td>
        <td class="compact-column">
            <div class="title-custom">
                <a class="btn btn-purple text-white js_useroption_update_title" style="height: 38px;" onclick="ShowTitleModal_ForUserOption(this,'new_usersuboption')">
                    <i class="fas fa-layer-group"></i>
                </a>
                <span class="title-text">${uop_title}</span>
            </div>
        </td>
        <td class="compact-column">
            <div class="tooltip-custom">
                <a class="btn ${hastooltip ? 'btn-info' : 'btn-secondary'} text-white js_useroption_update_tooltip" style="height: 38px;" onclick="ShowToolTipModal_ForUserOption(this, 'new_usersuboption')">
                    <i class="fas fa-question"></i>
                </a>
                <span class="tooltip-text">${uop_tooltip || 'توضیحاتی ارائه نشده است'}</span>
            </div>
        </td>
        <td class="compact-column">
            <div class="dropdown">
                <a class="btn btn-warning text-white dropdown-toggle no-dropdown-arrow" id="Dmb_${tableRowCount}" data-bs-toggle="dropdown" aria-expanded="false" style="height: 38px;">
                    <i class="fas fa-ellipsis-v"></i>
                </a>
                <ul class="dropdown-menu" aria-labelledby="Dmb_${tableRowCount}">
                    <li>
                    <a class="dropdown-item js_add_usersuboptions" href="#" onclick="Show_Insert_UserSubOption_Modal(event,${catid})">
                        <i class="fas fa-plus" style="position: relative;top: 2px;"></i> افزودن
                    </a>
                    </li>
                    <li>
                    <a class="dropdown-item js_show_usersuboptions" href="#" onclick="Show_UserSubOptions(event,${catid})">
                        <i class="fas fa-eye" style="position: relative;top: 2px;"></i> نمایش
                    </a>
                    </li>
                </ul>
            </div>
        </td>
        <td class="compact-column">
            <a class="btn btn-success text-white js_useroption_updateitem" style="height: 38px;" data-parentid="${tableRowCount}" onclick="ShowUpdateModal_ForUserOption(this, this.dataset.parentid, 'new_usersuboption')"><i class="fas fa-pencil"></i></a>
        </td>
        <td class="compact-column">
            <a class="btn btn-danger text-white js_useroption_remove" style="height: 38px;" onclick="Remove_UserOption_Row(this, 'new_usersuboption')"><i class="fas fa-trash"></i></a>
        </td>
    `;

        tbody.appendChild(tableRow);

        var TableList = document.querySelectorAll("#UserSubOption_Table_List table");
        TableList.forEach(table => table.style.display = 'none');

        document.getElementById('UserSubOption_Table_Title').style.display = "block";
        document.getElementById('UserSubOption_Table_List').style.display = "block";

        var element = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);
        var element_index = element.id.replace("UserSubOption_Table_", "");

        document.getElementById(`UserSubOption_Table_${element_index}`).style.display = "block";

        document.getElementById("Insert_UserSubOption_Title").value = '';
        document.getElementById("Insert_UserSubOption_Price").value = "0";
        document.getElementById("Insert_UserSubOption_ToolTip").value = '';

        $('#Insert_UserSubOption_Modal').modal('hide');
    }
    else {
        var UserSubOption_Table_List = document.getElementById("UserSubOption_Childs_Table_List");
        var SUOCount = UserSubOption_Table_List.querySelectorAll("table").length;
        var specified_table;

        if (SUOCount > 0) {
            specified_table = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);

            if (specified_table == null) {
                var index = SUOCount + 1;

                UserSubOption_Table_List.innerHTML += `
                <table id="UserSubOption_Child_Table_${index}" class="table table-striped mb-3 SubUserOption_Child" data-parent_table_id='${parent_table_id}' data-parentid="${previndex}" data-catid="${catid}" style="display:block">
                    <thead id="UserSubOption_Child_THead_${index}" class="table-dark">
                        <tr>
                            <th>عنوان</th>
                            <th>نوع</th>
                            <th>قیمت</th>
                            <th class="compact-column">تصاویر</th>
                            <th class="compact-column">آیتم‌ها</th>
                            <th class="compact-column">عنوان‌ها</th>
                            <th class="compact-column">معرفی</th>
                            <th class="compact-column">ویرایش</th>
                            <th class="compact-column">حذف</th>
                        </tr>
                    </thead>
                    <tbody id="UserSubOption_Child_TBody_${index}" class="table-border-bottom-0">
                    </tbody>
                </table>`;
            }
        }
        else {
            var index = SUOCount + 1;

            UserSubOption_Table_List.innerHTML += `
            <table id="UserSubOption_Child_Table_${index}" class="table table-striped mb-3 SubUserOption_Child" data-parent_table_id='${parent_table_id}' data-parentid="${previndex}" data-catid="${catid}" style="display:block">
                <thead id="UserSubOption_Child_THead_${index}" class="table-dark">
                    <tr>
                        <th>عنوان</th>
                        <th>نوع</th>
                        <th>قیمت</th>
                        <th class="compact-column">تصاویر</th>
                        <th class="compact-column">آیتم‌ها</th>
                        <th class="compact-column">عنوان‌ها</th>
                        <th class="compact-column">معرفی</th>
                        <th class="compact-column">ویرایش</th>
                        <th class="compact-column">حذف</th>
                    </tr>
                </thead>
                <tbody id="UserSubOption_Child_TBody_${index}" class="table-border-bottom-0">
                </tbody>
            </table>`;
        }

        let tbody = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}'] tbody`);

        const uop_title = document.getElementById("Insert_UserSubOption_Title").value;
        const selectElement = document.getElementById("Insert_UserSubOption_Type");
        const option_type_value = selectElement.value;
        const selectedOptionText = selectElement.options[selectElement.selectedIndex].innerText;
        const uop_type = selectedOptionText;

        const uop_price_text = document.getElementById("Insert_UserSubOption_Price").value;
        const uop_price = uop_price_text.replace(/,/g, "");

        const uop_tooltip = document.getElementById("Insert_UserSubOption_ToolTip").value;
        const hastooltip = uop_tooltip && uop_tooltip !== 'توضیحاتی ارائه نشده است';

        var uop_extensions = "";
        var uop_filesize = "0";
        var uop_maxlength = "0";

        if (option_type_value === "FileUpload") {
            var TagifyTags = document.querySelectorAll(".js_insert_usersuboption_extension span.tagify__tag-text");
            var ExtensionList = Array.from(TagifyTags).map(tag => tag.dataset.id.trim());
            var Option_Extensions = ExtensionList.join(',');
            var filesize_value = document.getElementById("Insert_UserSubOption_FileSize").value;

            uop_extensions = Option_Extensions;
            uop_filesize = filesize_value;

        }
        else if (option_type_value === "TextArea") {
            var maxlength_value = document.getElementById("Insert_UserSubOption_MaxLength").value;
            uop_maxlength = maxlength_value;
        }

        const oldrowsCount = tbody.querySelectorAll('tr.old_usersuboption_child').length;
        const newrowsCount = tbody.querySelectorAll('tr.new_usersuboption_child').length;
        let tableRowCount = 0;

        if (newrowsCount === 0) {
            tableRowCount = oldrowsCount === 0 ? 1 : oldrowsCount + 1;
        }
        else {
            tableRowCount = newrowsCount + 1;
        }

        const tableRow = document.createElement('tr');
        tableRow.id = `Parent_Row_${tableRowCount}`;
        tableRow.className = "new_usersuboption_child";
        tableRow.setAttribute('data-previndex', `${tableRowCount}`);
        tableRow.setAttribute('data-extensions', `${uop_extensions}`);
        tableRow.setAttribute('data-filesize', `${uop_filesize}`);
        tableRow.setAttribute('data-maxlength', `${uop_maxlength}`);

        tableRow.innerHTML = `
        <td>
            <span class="js_useroption_title">${uop_title}</span>
        </td>
        <td>
            <span class="js_useroption_type" data-optiontype="${option_type_value}">${uop_type}</span>
        </td>
        <td>
            <span class="js_useroption_price">${uop_price_text}</span>
        </td>
        <td class="compact-column">
            <a class="btn btn-dark text-white js_useroption_addimage ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled_button'}" style="height: 38px; cursor: ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? 'pointer' : 'default'};" data-parentid="${tableRowCount}" data-images_table_id="" ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? `onclick="ShowInsertImageModal_ForUserOption(this.dataset.parentid, 'new_usersuboption_child')"` : ''} ${option_type_value === 'CheckBox' || option_type_value === 'RadioButton' ? '' : 'disabled'}><i class="fas fa-image"></i></a>
        </td>
        <td class="compact-column">
            <a class="btn btn-primary text-white js_useroption_additem" style="height: 38px;" data-parentid="${tableRowCount}" data-items_table_id="" onclick="ShowInsertItemModal_ForUserOption(this)"><i class="fas fa-list-ul"></i></a>
        </td>
        <td class="compact-column">
            <div class="title-custom">
                <a class="btn btn-purple text-white js_useroption_update_title" style="height: 38px;" onclick="ShowTitleModal_ForUserOption(this,'new_usersuboption_child')">
                    <i class="fas fa-layer-group"></i>
                </a>
                <span class="title-text">${uop_title}</span>
            </div>
        </td>
        <td class="compact-column">
            <div class="tooltip-custom">
                <a class="btn ${hastooltip ? 'btn-info' : 'btn-secondary'} text-white js_useroption_update_tooltip" style="height: 38px;" onclick="ShowToolTipModal_ForUserOption(this, 'new_usersuboption_child')">
                    <i class="fas fa-question"></i>
                </a>
                <span class="tooltip-text">${uop_tooltip || 'توضیحاتی ارائه نشده است'}</span>
            </div>
        </td>
        <td class="compact-column">
            <a class="btn btn-success text-white js_useroption_updateitem" style="height: 38px;" data-parentid="${tableRowCount}" onclick="ShowUpdateModal_ForUserOption(this, this.dataset.parentid, 'new_usersuboption_child')"><i class="fas fa-pencil"></i></a>
        </td>
        <td class="compact-column">
            <a class="btn btn-danger text-white js_useroption_remove" style="height: 38px;" onclick="Remove_UserOption_Row(this, 'new_usersuboption_child')"><i class="fas fa-trash"></i></a>
        </td>
    `;

        tbody.appendChild(tableRow);

        var TableList = document.querySelectorAll("#UserSubOption_Childs_Table_List table");
        TableList.forEach(table => table.style.display = 'none');

        document.getElementById('UserSubOption_Childs_Table_Title').style.display = "block";
        document.getElementById('UserSubOption_Childs_Table_List').style.display = "block";

        var element = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);
        var element_index = element.id.replace("UserSubOption_Child_Table_", "");

        document.getElementById(`UserSubOption_Child_Table_${element_index}`).style.display = "block";

        document.getElementById("Insert_UserSubOption_Title").value = '';
        document.getElementById("Insert_UserSubOption_Price").value = "0";
        document.getElementById("Insert_UserSubOption_ToolTip").value = '';

        $('#Insert_UserSubOption_Modal').modal('hide');
    }
}
function ExecuteOperation_ForInsertUserSubOption(catid, parentid, previndex, option_level, parent_table_id) {
    var element;

    if (option_level === "1") {
        var UserSubOption_Table_List = document.getElementById("UserSubOption_Table_List");
        element = UserSubOption_Table_List.querySelector(`table.SubUserOption[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);
    }
    else {
        var UserSubOption_Table_List = document.getElementById("UserSubOption_Childs_Table_List");
        element = UserSubOption_Table_List.querySelector(`table.SubUserOption_Child[data-parent_table_id='${parent_table_id}'][data-parentid='${previndex}'][data-catid='${catid}']`);
    }

    if (!element) {
        BindAllUserSubOptions(parentid, catid, previndex, option_level, parent_table_id);
    }
    else {
        ShowAllUserSubOptions(parentid, catid, previndex, option_level, parent_table_id);
    }
}
function Insert_UserSubOption() {
    const tagifyTags = document.querySelectorAll("#UserOptions_Categories_Parent span.tagify__tag-text");
    const categoryIds = Array.from(tagifyTags).map(tag => Number(tag.dataset.id.trim()));
    const catId = categoryIds[0];

    var parentid = document.getElementById("Insert_UserSubOption_Modal").dataset.id;
    var previndex = document.getElementById("Insert_UserSubOption_Modal").dataset.previndex;
    var option_level = document.getElementById("Insert_UserSubOption_Modal").dataset.optionlevel;
    var parent_table_id = document.getElementById("Insert_UserSubOption_Modal").dataset.parent_table_id;

    ExecuteOperation_ForInsertUserSubOption(catId, parentid, previndex, option_level, parent_table_id);
}

///////////////////////////////////////////////Product_Review_Option Functions
function AddNewOption() {

    const editor = CKEDITOR.instances['Product_Review_Desc'];
    let titleValue = document.getElementById("Product_Review_Title").value.trim();
    let contentValue = editor.getData().trim();

    if (titleValue === "") {

        swal.fire({
            title: 'هشدار',
            text: "عنوان نقد و بررسی وارد نشده است",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'بسیار خب',
        });
        return;
    }

    if (contentValue === "") {
        swal.fire({
            title: 'هشدار',
            text: "توضیحات نقد و بررسی وارد نشده است",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'بسیار خب',
        });
        return;
    }

    let optionCount = document.querySelectorAll('#Product_Review_Long_Desc_List .accordion-item').length;

    if (optionCount === 0) {
        document.getElementById("Review_Options_List").style.display = "block";
    }

    optionCount++;

    const newOptionId = `Product_Long_Desc_Option_${optionCount}`;
    const newOptionHeaderId = `Product_Long_Desc_Option_Header_${optionCount}`;
    const newOptionHeaderToggleBtnId = `Product_Long_Desc_Option_Header_Toggle_Btn_${optionCount}`;
    const newOptionItemsId = `Product_Long_Desc_Option_Items_${optionCount}`;
    const newUpdateBtnId = `Update_Option_${optionCount}`;
    const newRemoveBtnId = `Remove_Option_${optionCount}`;
    const newOptionTitle = titleValue;
    let newOptionContent = contentValue;

    const newOptionHTML = `
        <div id="${newOptionId}" class="container accordion-item active active_color_list" style="display:block">
            <h2 id="${newOptionHeaderId}" class="accordion-header" style="border-bottom: 1px solid #bdbdbd !important;border-radius: 5px;">
                <button id="${newOptionHeaderToggleBtnId}" class="accordion-button toggle_btn_padding_right" type="button" data-bs-toggle="collapse" aria-expanded="true" data-bs-target="#${newOptionItemsId}" aria-controls="${newOptionItemsId}" onclick="Toggle_Product_Long_Desc_Option(this.id)">
                    ${newOptionTitle}
                </button>
            </h2>
            <div id="${newOptionItemsId}" class="row collapse show" style="margin-top:20px;">
                <div class="btn-container">
                    <button class="btn btn-success" id="${newUpdateBtnId}" onclick="GetData_From_ReviewOption('${optionCount}')" style="margin-left: 10px;"><i class="fas fa-pencil-alt"></i></button>
                    <button class="btn btn-danger" id="${newRemoveBtnId}" onclick="Remove_ReviewOption('Product_Long_Desc_Option_Parent_${optionCount}')"><i class="fas fa-trash"></i></button>
                </div>
                <div id="Product_Long_Desc_Content_${optionCount}" style="font-family: IRANSans !important;margin-top:20px;padding-top: 25px;border-top: 1px solid #eee;">
                    ${newOptionContent}
                </div>
            </div>
        </div>
    `;

    const productReviewList = document.getElementById('Product_Review_Long_Desc_List');
    const newOptionParent = document.createElement('div');
    newOptionParent.id = `Product_Long_Desc_Option_Parent_${optionCount}`;
    newOptionParent.className = 'col-lg-12 col-md-12 col-sm-12 accordion accordion-header-primary';
    newOptionParent.style.marginBottom = '10px';
    newOptionParent.innerHTML = newOptionHTML;
    productReviewList.appendChild(newOptionParent);

    RefreshForm();
}
function EditOption() {

    const index = document.getElementById("Product_Long_Desc").dataset.index;
    const editor = CKEDITOR.instances['Product_Review_Desc'];
    let title = document.getElementById("Product_Review_Title").value.trim();
    let content = editor.getData().trim();

    if (title === "") {

        swal.fire({
            title: 'هشدار',
            text: "عنوان نقد و بررسی وارد نشده است",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'بسیار خب',
        });
        return;
    }
    if (content === "") {
        swal.fire({
            title: 'هشدار',
            text: "توضیحات نقد و بررسی وارد نشده است",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'بسیار خب',
        });
        return;
    }

    document.getElementById("Product_Long_Desc_Option_Header_Toggle_Btn_" + index.toString()).innerText = title;
    document.getElementById("Product_Long_Desc_Content_" + index.toString()).innerHTML = content;

    const productLongDescoption = document.getElementById('Product_Long_Desc_Option_' + index.toString());

    if (productLongDescoption) {
        productLongDescoption.scrollIntoView({ behavior: 'smooth' });
    }

    document.getElementById("Product_Long_Desc").dataset.index = "";
    RefreshForm();
}
function RefreshForm() {

    const editor = CKEDITOR.instances['Product_Review_Desc'];
    editor.setData('');
    document.getElementById("Product_Review_Title").value = "";
    document.getElementById("Product_Review_Audio_Link").value = "";
    document.getElementById("Product_Review_Video_Link").value = "";

    document.getElementById("Btn_Add_LongDesc_Item").style.display = "block";
    document.getElementById("Update_Btns_LongDesc").style.display = "none";
}
function Remove_ReviewOption(id) {

    const element = document.getElementById(id);
    element.parentNode.removeChild(element);

    let optionCount = document.querySelectorAll('#Product_Review_Long_Desc_List .accordion-item').length;

    if (optionCount === 0) {
        document.getElementById("Review_Options_List").style.display = "none";
    }
}
function GetData_From_ReviewOption(index) {

    document.getElementById("Btn_Add_LongDesc_Item").style.display = "none";
    document.getElementById("Update_Btns_LongDesc").style.display = "flex";

    const editor = CKEDITOR.instances['Product_Review_Desc'];

    const title = document.getElementById("Product_Long_Desc_Option_Header_Toggle_Btn_" + index.toString()).innerText;
    const desc = document.getElementById("Product_Long_Desc_Content_" + index.toString()).innerHTML;

    document.getElementById("Product_Review_Title").value = title;
    editor.setData(desc);

    document.getElementById("Product_Long_Desc").dataset.index = index.toString();

    if (document.getElementById("Product_Long_Desc").classList.contains("notactive_color_list")) {

        document.getElementById("Product_Long_Desc").classList.add("active");
        document.getElementById("Product_Long_Desc_Items").classList.add("show");
        document.getElementById("Product_Long_Desc_Toggle_Btn").classList.add("toggle_btn_padding_right");
        document.getElementById("Product_Long_Desc_Toggle_Btn").classList.remove("collapsed");
        document.getElementById("Product_Long_Desc_Header").classList.remove("toggle_menu_header");
        document.getElementById("Product_Long_Desc").classList.remove("notactive_color_list");
        document.getElementById("Product_Long_Desc").classList.add("active_color_list");
    }

    const productLongDesc = document.getElementById('Product_Long_Desc');

    if (productLongDesc) {
        productLongDesc.scrollIntoView({ behavior: 'smooth' });
    }
}
function Toggle_Product_Long_Desc_Option(button_id) {

    const index = button_id.replace("Product_Long_Desc_Option_Header_Toggle_Btn_", "");
    const parent_id = "Product_Long_Desc_Option_" + index.toString();
    const header_id = "Product_Long_Desc_Option_Header_" + index.toString();

    if (document.getElementById(parent_id.toString()).classList.contains("active")) {

        document.getElementById(parent_id.toString()).classList.remove("active");
        document.getElementById(button_id.toString()).classList.remove("toggle_btn_padding_right");
        document.getElementById(header_id.toString()).classList.add("toggle_menu_header");
        document.getElementById(parent_id.toString()).classList.remove("active_color_list");
        document.getElementById(parent_id.toString()).classList.add("notactive_color_list");

    }
    else {

        document.getElementById(parent_id.toString()).classList.add("active");
        document.getElementById(button_id.toString()).classList.add("toggle_btn_padding_right");
        document.getElementById(header_id.toString()).classList.remove("toggle_menu_header");
        document.getElementById(parent_id.toString()).classList.remove("notactive_color_list");
        document.getElementById(parent_id.toString()).classList.add("active_color_list");
    }
}

/////////////////////////////////////////////////////Product_Quality_Points Functions
function Toggle_Product_Quality_Points() {

    if (document.getElementById("Product_Quality_Points").classList.contains("active")) {

        document.getElementById("Product_Quality_Points_Toggle_Btn").classList.add("toggle_btn_padding_right");
        document.getElementById("Product_Quality_Points_Header").classList.remove("toggle_menu_header");
        document.getElementById("Product_Quality_Points").classList.remove("notactive_color_list");
        document.getElementById("Product_Quality_Points").classList.add("active_color_list");
    }
    else {

        document.getElementById("Product_Quality_Points_Toggle_Btn").classList.remove("toggle_btn_padding_right");
        document.getElementById("Product_Quality_Points_Header").classList.add("toggle_menu_header");
        document.getElementById("Product_Quality_Points").classList.remove("active_color_list");
        document.getElementById("Product_Quality_Points").classList.add("notactive_color_list");
    }
}
function Add_PositivePoint(text) {

    if (text === "") {

        swal.fire({
            title: 'هشدار',
            text: "عنوان ویژگی را وارد نمایید",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'بسیار خب',
        });

        return;
    }

    const specificTableHead = document.getElementById('Positive_Points_Tbl_Thead');
    let parentElement = document.getElementById('Positive_Points_Tbl');

    if (!specificTableHead) {

        let thead = document.createElement('thead');
        thead.id = "Positive_Points_Tbl_Thead";
        thead.style.textAlign = 'center';
        thead.style.backgroundColor = 'gainsboro';
        thead.style.borderBottom = '1px solid #777';

        thead.innerHTML = `
            <tr>
                <th>نام</th>
                <th>حذف</th>
            </tr>
        `;

        parentElement.insertBefore(thead, parentElement.firstChild);
    }

    let tbody = document.getElementById('Positive_Points_Tbl_Tbody');
    let tableRowCount = tbody.getElementsByTagName('tr').length;

    tableRowCount++;

    let tableRow = document.createElement('tr');
    tableRow.id = "positive_row" + tableRowCount;
    tableRow.style.borderBottom = "1px solid #777";
    tableRow.style.textAlign = "center";
    tableRow.className = "new_option";

    tableRow.innerHTML = `
            <td>
                <input type="text" class="form-control positive_point" placeholder="نقاط قوت" value="${text}" />
            </td>
            <td>
                <a class="btn btn-outline-danger quality_point_removebtn" style="color:white;width:100%" onclick="Remove_PositivePoint(this)"><i class="fas fa-trash"></i></a>
            </td>
        `;

    tbody.appendChild(tableRow);

    document.getElementById("Positive_Points_Text").value = "";
}
function Add_NegativePoint(text) {

    if (text === "") {

        swal.fire({
            title: 'هشدار',
            text: "عنوان ویژگی را وارد نمایید",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'بسیار خب',
        });

        return;
    }

    const specificTableHead = document.getElementById('Negative_Points_Tbl_Thead');
    let parentElement = document.getElementById('Negative_Points_Tbl');

    if (!specificTableHead) {

        let thead = document.createElement('thead');
        thead.id = "Negative_Points_Tbl_Thead";
        thead.style.textAlign = 'center';
        thead.style.backgroundColor = 'gainsboro';
        thead.style.borderBottom = '1px solid #777';

        thead.innerHTML = `
            <tr>
                <th>نام</th>
                <th>حذف</th>
            </tr>
        `;

        parentElement.insertBefore(thead, parentElement.firstChild);
    }

    let tbody = document.getElementById('Negative_Points_Tbl_Tbody');
    let tableRowCount = tbody.getElementsByTagName('tr').length;

    tableRowCount++;

    let tableRow = document.createElement('tr');
    tableRow.id = "negative_row" + tableRowCount;
    tableRow.style.borderBottom = "1px solid #777";
    tableRow.style.textAlign = "center";
    tableRow.className = "new_option";

    tableRow.innerHTML = `
            <td>
                <input type="text" class="form-control negative_point" placeholder="نقاط ضعف" value="${text}" />
            </td>
            <td>
                <a class="btn btn-outline-danger quality_point_removebtn" style="color:white;width:100%" onclick="Remove_NegativePoint(this)"><i class="fas fa-trash"></i></a>
            </td>
        `;

    tbody.appendChild(tableRow);

    document.getElementById("Negative_Points_Text").value = "";
}
function Remove_PositivePoint(button) {

    let table = button.closest('table');

    let thead = table.querySelector('thead');
    let tbody = table.querySelector('tbody');

    let parentRow = button.closest('tr');
    let parentRowIndex = parseInt(parentRow.id.replace("positive_row", ""));

    parentRow.parentNode.removeChild(parentRow);

    let tableRows = tbody.getElementsByTagName('tr');

    if (tableRows.length > 0) {
        for (var i = 0; i < tableRows.length; i++) {
            tableRows[i].id = "positive_row" + (i + 1);
        }
    }

    if (tbody.getElementsByTagName('tr').length === 0 && thead) {
        table.removeChild(thead);
    }
}
function Remove_NegativePoint(button) {

    let table = button.closest('table');

    let thead = table.querySelector('thead');
    let tbody = table.querySelector('tbody');

    let parentRow = button.closest('tr');
    let parentRowIndex = parseInt(parentRow.id.replace("negative_row", ""));

    parentRow.parentNode.removeChild(parentRow);

    let tableRows = tbody.getElementsByTagName('tr');

    if (tableRows.length > 0) {
        for (var i = 0; i < tableRows.length; i++) {
            tableRows[i].id = "negative_row" + (i + 1);
        }
    }

    if (tbody.getElementsByTagName('tr').length === 0 && thead) {
        table.removeChild(thead);
    }
}

/////////////////////////////////////////////////////Product_Delivery_Time
function SetMAxTime(MinTime) {
    document.getElementById("Delivery_Period_MaxTime").setAttribute('min', MinTime);

    var Input_Value = document.getElementById("Delivery_Period_MaxTime").value;

    if (parseInt(Input_Value) < parseInt(MinTime)) {
        document.getElementById("Delivery_Period_MaxTime").value = MinTime;
    }

    console.log("Delivery_Period_MinTime:", document.getElementById("Delivery_Period_MinTime").value);
    console.log("Delivery_Period_MaxTime:", document.getElementById("Delivery_Period_MaxTime").value);
}


















