function loadUserData() {
    let user_data = JSON.parse(localStorage.getItem("user_data"));
    document.querySelector("#text_name").innerText = user_data["name"];
}
function loadCoursesSearchOptions() {
    let data_options = JSON.parse(localStorage.getItem("data_courses"));

    let str_html = "<option  disabled selected>לבחור קורס</option>";
    for (let str of Object.keys(data_options)) {
        str_html += `<option value="${str}">${data_options[str]["name"]}</option>`;;
    }
    document.querySelector("#fnd_course").innerHTML = str_html;
}
function loadTopicsSearchOptions() {
    let data_options = JSON.parse(localStorage.getItem("data_courses"));
    let course = document.querySelector("#fnd_course").value;

    let str_html = "<option  disabled selected>לבחור נושא</option>";
    for (let [_, str] of Object.entries(data_options[course]["topics"])) {
        str_html += `<option value="${str}">${str}</option>`;;
    }
    document.querySelector("#fnd_subject").innerHTML = str_html;
}

function initSearchCourseData() {

    load_list('./database/courses.json', (data_courses) => {
        //console.log(data_options);
        localStorage.removeItem("data_courses");
        localStorage.setItem("data_courses", JSON.stringify(data_courses));
        loadCoursesSearchOptions();
    });
    let d = Date();
    document.querySelector("#fnd_day").value = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`;
}

loadUserData();
initSearchCourseData();