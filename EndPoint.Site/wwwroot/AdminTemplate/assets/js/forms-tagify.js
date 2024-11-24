/**
 * Tagify
 */

'use strict';

(function () {
    // Basic
    //------------------------------------------------------
    const tagifyBasicEl = document.querySelector('#TagifyBasic');
    const TagifyBasic = new Tagify(tagifyBasicEl);

    // Read only
    //------------------------------------------------------
    const tagifyReadonlyEl = document.querySelector('#TagifyReadonly');
    const TagifyReadonly = new Tagify(tagifyReadonlyEl);

    // Custom list & inline suggestion
    //------------------------------------------------------
    const TagifyCustomInlineSuggestionEl = document.querySelector('#TagifyCustomInlineSuggestion');
    const TagifyCustomListSuggestionEl = document.querySelector('#TagifyCustomListSuggestion');

    const whitelist = [
        'A# .NET',
        'A# (Axiom)',
        'A-0 System',
        'A+',
        'A++',
        'ABAP',
        'ABC',
        'ABC ALGOL',
        'ABSET',
        'ABSYS',
        'ACC',
        'Accent',
        'Ace DASL',
        'ACL2',
        'Avicsoft',
        'ACT-III',
        'Action!',
        'ActionScript',
        'Ada',
        'Adenine',
        'Agda',
        'Agilent VEE',
        'Agora',
        'AIMMS',
        'Alef',
        'ALF',
        'ALGOL 58',
        'ALGOL 60',
        'ALGOL 68',
        'ALGOL W',
        'Alice',
        'Alma-0',
        'AmbientTalk',
        'Amiga E',
        'AMOS',
        'AMPL',
        'Apex (Salesforce.com)',
        'APL',
        'AppleScript',
        'Arc',
        'ARexx',
        'Argus',
        'AspectJ',
        'Assembly language',
        'ATS',
        'Ateji PX',
        'AutoHotkey',
        'Autocoder',
        'AutoIt',
        'AutoLISP / Visual LISP',
        'Averest',
        'AWK',
        'Axum',
        'Active Server Pages',
        'ASP.NET'
    ];
    // Inline
    let TagifyCustomInlineSuggestion = new Tagify(TagifyCustomInlineSuggestionEl, {
        whitelist: whitelist,
        maxTags: 10,
        dropdown: {
            maxItems: 20,
            classname: 'tags-inline',
            enabled: 0,
            closeOnSelect: false
        }
    });
    // List
    let TagifyCustomListSuggestion = new Tagify(TagifyCustomListSuggestionEl, {
        whitelist: whitelist,
        maxTags: 10,
        dropdown: {
            maxItems: 20,
            classname: '',
            enabled: 0,
            closeOnSelect: false
        }
    });

    
    //Users List suggestion
    //------------------------------------------------------
    $(document).ready(function () {

        const TagifyUserListEl = document.querySelector('#TagifyUserList');

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
                    const selectedItemData = e.detail.data;
                    console.log('Selected item data-id:', selectedItemData.value);

                    appendFeatureList(selectedItemData.value);
                }

                function onTagRemove(e) {
                    const removedItemData = e.detail.data;
                    console.log('Removed item data-id:', removedItemData.value);

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
                                            valueHTML += `
                                            <label class="flex-item">
                                                <input class="js_featureitem_radio_or_check" data-featureitemid="${item.id}" type="${feature.displayType == 1 ? 'radio' : 'checkbox'}" name="${feature.displayedName}" value="${item.id}"> ${item.name}
                                            </label>`;
                                        });
                                        valueHTML += '</span>';
                                        break;
                                    case 3: // Select
                                        valueHTML += '<span class="flex-container block">';
                                        valueHTML += `
                                        <select name="${feature.displayedName}" class="form-select js_featureitem_select">`;
                                        feature.featureItems.forEach(function (item) {
                                            valueHTML += `<option value="${item.id}">${item.name}</option>`;
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
                                    </div>
                                `;
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

    });

    let randomStringsArr = Array.apply(null, Array(100)).map(function () {
        return (
            Array.apply(null, Array(~~(Math.random() * 10 + 3)))
                .map(function () {
                    return String.fromCharCode(Math.random() * (123 - 97) + 97);
                })
                .join('') + '@gmail.com'
        );
    });

    //const TagifyEmailListEl = document.querySelector('#TagifyEmailList'),
    //    TagifyEmailList = new Tagify(TagifyEmailListEl, {
    //        // email address validation (https://stackoverflow.com/a/46181/104380)
    //        pattern:
    //            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    //        whitelist: randomStringsArr,
    //        callbacks: {
    //            invalid: onInvalidTag
    //        },
    //        dropdown: {
    //            position: 'text',
    //            enabled: 1 // show suggestions dropdown after 1 typed character
    //        }
    //    }),
    //    button = TagifyEmailListEl.nextElementSibling; // "add new tag" action-button

    //button.addEventListener('click', onAddButtonClick);

    //function onAddButtonClick() {
    //    TagifyEmailList.addEmptyTag();
    //}

    function onInvalidTag(e) {
        console.log('invalid', e.detail);
    }
})();
