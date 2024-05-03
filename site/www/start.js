function loadUserData() {
    let user_data = JSON.parse(localStorage.getItem("user_data"));
    document.querySelector("#text_name").innerText = user_data["name"];
}
function loadCoursesSearchOptions() {
    let data_options = JSON.parse(localStorage.getItem("data_options"));


    let str_html = "";
    for (let str of Object.keys(data_options)) {
        str_html += `<option value="${str}">${data_options[key]["name"]}</option>`;;
    }
    document.querySelector("#dl_courses").innerHTML = str_html;
}
function loadTopicsSearchOptions() {

    str_html = "";
    for (let [k, v] of Object.entries(data_options["user_gender"])) {
        str_html += `<div class="cat">
           <label>
              <input type="radio" name="gender" value="${k}"><span>${v}</span>
           </label>
        </div>`;
    }
    document.querySelector("#dl_courses").innerHTML = str_html;
}

function initSearchCourseData() {

    load_list('./database/courses.json', (data_options) => {
        //console.log(data_options);
        localStorage.removeItem("data_courses");
        localStorage.setItem("data_courses", JSON.stringify(data_options));
        loadCoursesSearchOptions();
    });
}

loadUserData();
initSearchCourseData();