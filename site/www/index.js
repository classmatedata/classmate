function load_list(list_url, callback) {
    fetch(list_url)
        .then((response) => response.json())
        .then((json) => callback(json));
}
function loadDictionaries() {
    let dictionaries = { "he": { dir: "rtl" }, "en": { dir: "ltr" } };
    localStorage.setItem("dictionaries", JSON.stringify(dictionaries));

    load_list('./database/lang/he_index.json', (json) => {
        //console.log(json);
        let stored_dictionaries = JSON.parse(localStorage.getItem("dictionaries"));
        stored_dictionaries["he"]["texts"] = json;
        localStorage.removeItem("dictionaries");
        localStorage.setItem("dictionaries", JSON.stringify(stored_dictionaries));
        updateGUI();
    });

    load_list('./database/lang/en_index.json', (json) => {
        //console.log(json);
        let stored_dictionaries = JSON.parse(localStorage.getItem("dictionaries"));
        stored_dictionaries["en"]["texts"] = json;
        localStorage.removeItem("dictionaries");
        localStorage.setItem("dictionaries", JSON.stringify(stored_dictionaries));
        updateGUI();
    });
}

function fill_texts(lang_file) {

    for (let [quilifier, data] of Object.entries(lang_file)) {
        if (typeof (data) === "string") {
            const elem = document.querySelector(quilifier);
            if (elem !== null) { elem.innerHTML = data; }
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
    console.log("AR lang dictionary is not defined for this page");

}

function translate_to_en() {
    const lang = "en";
    localStorage.setItem("data_config_lang", lang);
    document.querySelector("#lang").value = lang;
    updateGUI();
}

function translate_to_ru() {
    console.log("RU lang dictionary is not defined for this page");

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
    fill_texts(dictionaries[lang]['texts']);

    let gui_role = localStorage.getItem("data_config_role");
    if (gui_role === null) {
        gui_role = document.querySelector("#role_type").value;
        localStorage.setItem("data_config_role", gui_role);
    }
    if (gui_role === "student") {
        document.querySelector("#to-teacher-view").classList.add('selected');
        document.querySelector("#to-student-view").classList.remove('selected');
    } else {
        document.querySelector("#to-teacher-view").classList.remove('selected');
        document.querySelector("#to-student-view").classList.add('selected');
    }


}
loadDictionaries();

document.querySelector('#lang_he').addEventListener('click', translate_to_he);
document.querySelector('#lang_en').addEventListener('click', translate_to_en);
document.querySelector('#lang_ar').addEventListener('click', translate_to_ar);
document.querySelector('#lang_ru').addEventListener('click', translate_to_ru);

document.querySelector('#to-teacher-view').addEventListener('click', to_teacher_view);
document.querySelector('#to-student-view').addEventListener('click', to_student_view);



