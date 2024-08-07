function loadUserData() {
    let user_data = JSON.parse(localStorage.getItem("user_data"));
    document.querySelector("#text_name").innerText = user_data["name"];
}
function loadCoursesSearchOptions() {
    let data_options = JSON.parse(localStorage.getItem("data_courses"));

    let str_html = "<option  disabled selected>לבחור קורס</option>";
    for (let str of Object.keys(data_options)) {
        str_html += `<option value-id="${str}" value="${data_options[str]["name"]}">${data_options[str]["name"]}</option>`;;
    }
    document.querySelector("#dl_courses").innerHTML = str_html;

}
function loadTopicsSearchOptions() {

    let data_options = JSON.parse(localStorage.getItem("data_courses"));
    let course = document.querySelector("#fnd_course").value;
    let datalist_courses = document.getElementById('dl_courses');
    let selectedOption = Array.from(datalist_courses.options).find(function (option) {
        return option.value === course;
    });
    if (selectedOption) {
        const courseId = selectedOption.getAttribute("value-id");
        document.querySelector("#fnd_subject").removeAttribute("disabled");
        let str_html = "<option  disabled selected>לבחור נושא</option>";
        for (let [key, str] of Object.entries(data_options[courseId]["topics"])) {
            str_html += `<option value-id="${key}" value="${str}">${str}</option>`;;
        }
        document.querySelector("#dl_subject").innerHTML = str_html;
    }
}

function defaultHour(date) {

    let hour = date.getHours();
    let min = date.getMinutes();
    min = (Math.floor(min / 10) + 1) * 10;
    if (min > 60) {
        hour++, min = 0;
    }
    let z = "";
    let mz = "";
    if (hour < 10) { z = "0"; }
    if (min < 10) { mz = "0"; }
    return `${z}${hour}:${mz}${min}`;
}
function initSearchCourseData() {

    load_list('api/data/courses', (data_courses) => {
        //console.log(data_options);
        localStorage.removeItem("data_courses");
        localStorage.setItem("data_courses", JSON.stringify(data_courses));
        loadCoursesSearchOptions();
    });
    const d = new Date()
    document.querySelector("#fnd_day").value = `${d.toISOString().slice(0, 10)}`;
    let hour = d.getHours();
    let min = d.getMinutes();

    document.querySelector("#fnd_hour").value = defaultHour(d);
    //tested code with  defaultHour(new Date('Fri May 03 2024 01:03:40 '));

}

loadUserData();
initSearchCourseData();