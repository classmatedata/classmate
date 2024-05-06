function load_list(list_url, callback) {
    fetch(list_url)
        .then((response) => response.json())
        .then((json) => callback(json));
}
function updateTextsInLocalStorage(json, lang) {
    let stored_dictionaries = JSON.parse(localStorage.getItem("dictionaries"));
    stored_dictionaries[lang]["texts"] = json;
    localStorage.removeItem("dictionaries");
    localStorage.setItem("dictionaries", JSON.stringify(stored_dictionaries));
    updateGUI();
}

function loadDictionaries() {
    let dictionaries = { "he": { dir: "rtl" }, "en": { dir: "ltr" }, "ru": { dir: "ltr" }, "ar": { dir: "rtl" } };
    localStorage.setItem("dictionaries", JSON.stringify(dictionaries));

    load_list('./database/lang/he_index.json', (json) => {
        updateTextsInLocalStorage(json, "he");
    });

    load_list('./database/lang/en_index.json', (json) => {
        updateTextsInLocalStorage(json, "en");
    });

    load_list('./database/lang/ru_index.json', (json) => {
        updateTextsInLocalStorage(json, "ru");
    });
    load_list('./database/lang/ar_index.json', (json) => {
        updateTextsInLocalStorage(json, "ar");
    });
}

function fill_texts(lang_file, dir) {
    document.querySelector("html").setAttribute("lang", lang_file["#lang"]);
    document.querySelector("body").setAttribute("dir", dir);

    for (let [quilifier, data] of Object.entries(lang_file)) {
        if (typeof (data) === "string") {
            const elem = document.querySelector(quilifier);
            if (elem !== null) {
                elem.innerHTML = data;
                elem.setAttribute("style", `direction:${dir};`);
                elem.setAttribute("dir", dir);

                elem.parentElement.setAttribute("style", `direction:${dir};`);
                elem.parentElement.setAttribute("dir", dir);

                elem.parentElement.parentElement.setAttribute("style", `direction:${dir};`);
                elem.parentElement.parentElement.setAttribute("dir", dir);
                elem.parentElement.parentElement.parentElement.setAttribute("style", `direction:${dir};`);
                elem.parentElement.parentElement.parentElement.setAttribute("dir", dir);

            }
            else {
                // console.log("error find  from dictionary ", lang_file["lang"], " not found in html:", quilifier, " not found");
            }
        }
        else {
            console.log("error found in dictionary ", lang_file["lang"], " with ", quilifier, " non string value");
        }

    }
}

function update_page_direction(dir) {
    let rtl_elements = document.querySelectorAll(".lang_rtl");
    for (let [_, elem] of Object.entries(rtl_elements)) {
        if (dir === 'rtl') {
            elem.classList.remove('hidden');
        }
        else {
            elem.classList.add('hidden');
        }
    }
    let ltr_elements = document.querySelectorAll(".lang_ltr");
    for (let [_, elem] of Object.entries(ltr_elements)) {
        if (dir === 'ltr') {
            elem.classList.remove('hidden');
        }
        else {
            elem.classList.add('hidden');
        }
    }
}
function translate_to_he() {
    const lang = "he";
    localStorage.setItem("data_config_lang", lang);
    document.querySelector("#lang").value = lang;
    updateGUI();
}
function translate_to_ar() {
    const lang = "ar";
    localStorage.setItem("data_config_lang", lang);
    document.querySelector("#lang").value = lang;
    updateGUI();
}


function translate_to_en() {
    const lang = "en";
    localStorage.setItem("data_config_lang", lang);
    document.querySelector("#lang").value = lang;
    updateGUI();
}

function translate_to_ru() {
    const lang = "ru";
    localStorage.setItem("data_config_lang", lang);
    document.querySelector("#lang").value = lang;
    updateGUI();
}


function to_teacher_view() {
    const role = "teacher";
    document.querySelector("#role_type").value = role;
    localStorage.setItem("data_config_role", role);
    updateGUI();
}

function to_student_view() {
    role = "student";
    document.querySelector("#role_type").value = role;
    localStorage.setItem("data_config_role", role);
    updateGUI();
}

function updateGUI() {
    let lang = localStorage.getItem("data_config_lang");
    if (lang === null) {
        lang = document.querySelector("#lang").value;
        localStorage.setItem("data_config_lang", lang);
    }
    let lang_select_nodes = document.querySelectorAll("#navList_LangMenu>li>a");
    for (let [_, elem] of Object.entries(lang_select_nodes)) {
        elem.classList.remove('selected');
    }
    document.querySelector(`#lang_${lang}`).classList.add('selected');

    let dictionaries = JSON.parse(localStorage.getItem("dictionaries"));
    update_page_direction(dictionaries[lang]["dir"]);
    if (dictionaries[lang]['texts'] == undefined) {
        return;
    }
    fill_texts(dictionaries[lang]['texts'], dictionaries[lang]["dir"]);

    let gui_role = localStorage.getItem("data_config_role");
    if (gui_role === null) {
        gui_role = document.querySelector("#role_type").value;
        localStorage.setItem("data_config_role", gui_role);
    }
    if (gui_role === "student") {
        document.querySelectorAll(".to-teacher-view").forEach((item) => { item.classList.add('selected') });
        document.querySelectorAll(".to-student-view").forEach((item) => { item.classList.remove('selected') });
    } else {
        document.querySelectorAll(".to-teacher-view").forEach((item) => { item.classList.remove('selected') });
        document.querySelectorAll(".to-student-view").forEach((item) => { item.classList.add('selected') });
    }


}
loadDictionaries();

document.querySelector('#lang_he').addEventListener('click', translate_to_he);
document.querySelector('#lang_en').addEventListener('click', translate_to_en);
document.querySelector('#lang_ar').addEventListener('click', translate_to_ar);
document.querySelector('#lang_ru').addEventListener('click', translate_to_ru);

document.querySelector('nav.to-teacher-view').addEventListener('click', to_teacher_view);
document.querySelector('nav.to-student-view').addEventListener('click', to_student_view);
document.querySelector('span.to-teacher-view').addEventListener('click', to_teacher_view);
document.querySelector('span.to-student-view').addEventListener('click', to_student_view);


