// import texts_json_he from './lang/he_index.json' with { type: 'json' };
// import texts_json_en from './lang/en_index.json' with { type: 'json' };

const texts_json_en = {
    "#lang": "en",
    ".lang_English": "English",
    ".lang_Arab": "العربية",
    ".lang_Russian": "Русский",
    ".lang_Hebrew": "עברית",
    ".text-home": "Home",
    ".text-about": "About",
    ".to-teacher-view": "Switch to teaching",
    ".to-student-view": "Switch to studying",
    ".text_intro_title-0": "Free ",
    ".text_intro_title": "Online",
    ".text_intro_title_cont1": "Tutoring",
    ".text_intro_title_cont2": "",
    ".btn_sign_in_with_edu": "Eye-Level Lesson "
};
const texts_json_he = {
    "#lang": "he",
    ".lang_English": "English",

    ".lang_Arab": "العربية",
    ".lang_Russian": "Русский",

    ".text-home": "בית",
    ".text-about": "אודות",
    ".to-teacher-view": "עבור למצב מלמד",
    ".to-student-view": "עבור למצב לומד",
    ".text_intro_title-0": " ",
    ".text_intro_title": "שיעורי עזר",
    ".text_intro_title_cont1": "בלימודים",
    ".text_intro_title_cont2": "בחינם",
    ".btn_sign_in_with_edu": "לשיעור בגובה עיניים "
};

function translate_to(lang_file) {

    for (let [quilifier, data] of Object.entries(lang_file)) {
        if (typeof (data) === "string") {
            const elem = document.querySelector(quilifier);
            if (elem !== null) { elem.innerHTML = data; }
            else {
                console.log("error find  from dictionary ", lang_file["lang"], " not found in html:", quilifier, " not found");
            }
        }
        else {
            console.log("error found in dictionary ", lang_file["lang"], " with ", quilifier, " non string value");
        }

    }
}


function update_lang_slector(lang) {
    document.querySelector("#lang").value = lang;
    let lang_select_nodes = document.querySelectorAll("#navList_LangMenu>li>a");
    for (let [_, elem] of Object.entries(lang_select_nodes)) {
        console.log(elem.classList, elem)
        elem.classList.remove('selected');
    }
    document.querySelector(`#lang_${lang}`).classList.add('selected');
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
    update_lang_slector('he');
    update_page_direction('rtl');
    translate_to(texts_json_he);
}
function translate_to_ar() {
    console.log("AR lang dictionary is not defined for this page");
    // update_lang_slector('ar');
    // update_page_direction('ltr');
    // translate_to(texts_json_ar);
}

function translate_to_en() {
    update_lang_slector('en');
    update_page_direction('ltr');
    translate_to(texts_json_en)
}
function translate_to_ru() {
    console.log("RU lang dictionary is not defined for this page");
    // update_lang_slector('ru');
    // update_page_direction('ltr');
    // translate_to(texts_json_ru)
}


function to_teacher_view() {
    document.querySelector("#to-teacher-view").removeAttribute('hidden');
    document.querySelector("#to-student-view").setAttribute('hidden', '');
    document.querySelector("#role_type").value = "teacher";
}
function to_student_view() {
    document.querySelector("#to-teacher-view").setAttribute('hidden', '');
    document.querySelector("#to-student-view").removeAttribute('hidden');
    document.querySelector("#role_type").value = "student";

}

function nextPage() {

    location.href = './sign.html';
}

document.querySelector('#lang_he').addEventListener('click', translate_to_he);
document.querySelector('#lang_en').addEventListener('click', translate_to_en);
document.querySelector('#lang_ar').addEventListener('click', translate_to_ar);
document.querySelector('#lang_ru').addEventListener('click', translate_to_ru);

document.querySelector('#to-teacher-view').addEventListener('click', to_teacher_view);
document.querySelector('#to-student-view').addEventListener('click', to_student_view);

document.querySelector('#next-btn').addEventListener('click', nextPage);

translate_to_he();