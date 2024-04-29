
function nextPage() {

    const role = localStorage.getItem("data_config_role");
    if (role == "teacher") {
        location.href = './start_teacher.html';
    }
    else {
        location.href = './start.html';
    }


}
let user_data = {};
function initData() {
    user_data = JSON.parse(localStorage.getItem("user_data"));
    document.querySelector("#text_name").innerText = user_data["name"];
}



function load_list(list_url, callback) {
    fetch(list_url)
        .then((response) => response.json())
        .then((json) => callback(json));
}
function initQuestionsDataOptions() {


    load_list('./database/data_options.json', (data_options) => {
        //console.log(data_options);
        localStorage.removeItem("data_options");
        localStorage.setItem("data_options", JSON.stringify(data_options));
        loadDataOptions();
    });
}

function loadDataOptions() {
    let data_options = JSON.parse(localStorage.getItem("data_options"));

    //fill lang query options
    let str_html = "";
    for (let [k, v] of Object.entries(data_options["s_lang"])) {
        str_html += `<div class="cat">
           <label>
              <input type="checkbox" name="s_lang" value="${k}"><span>${v}</span>
           </label>
        </div>`;
    }
    document.querySelector("#config_question_s_langs").innerHTML = str_html;

    //fill gender query options
    str_html = "";
    for (let [k, v] of Object.entries(data_options["user_gender"])) {
        str_html += `<div class="cat">
           <label>
              <input type="radio" name="gender" value="${k}"><span>${v}</span>
           </label>
        </div>`;
    }
    document.querySelector("#config_question_gender").innerHTML = str_html;
}


initData();
initQuestionsDataOptions();