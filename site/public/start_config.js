
function nextPage() {

    const role = localStorage.getItem("data_config_role");
    if (role == "teacher") {
        location.href = './start_teacher.html';
    }
    else {
        location.href = './start.html';
    }


}

function initData() {
    let user_data = JSON.parse(localStorage.getItem("user_data"));
    document.querySelector("#text_name").innerText = user_data["name"];
}


function load_list(list_url, callback) {
    fetch(list_url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.json()
        })
        .then((json) => callback(json));
}
function initQuestionsDataOptions() {


    load_list('./lang', (data) => {
        //console.log(data_options);
        localStorage.removeItem("data_options_lang");
        localStorage.setItem("data_options_lang", JSON.stringify(data));
        fillLangs();
    });

    load_list('./api/lang', (data) => {
        //console.log(data_options);
        localStorage.removeItem("data_options_gender");
        localStorage.setItem("data_options_gender", JSON.stringify(data));
        fillGender();
    });
}

function fillLangs() {
    let data_options_lang = JSON.parse(localStorage.getItem("data_options_lang"));

    //fill lang query options
    let str_html = "";
    for (let [k, v] of Object.entries(data_options_lang)) {
        str_html += `<div class="cat">
           <label>
              <input type="checkbox" name="s_lang" value="${k}"><span>${v}</span>
           </label>
        </div>`;
    }
    document.querySelector("#config_question_s_langs").innerHTML = str_html;
}

function fillGender() {
    //fill gender query options
    let data_options_gender = JSON.parse(localStorage.getItem("data_options_gender"));
    str_html = "";
    for (let [k, v] of Object.entries(data_options_gender)) {
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


