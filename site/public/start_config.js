
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

function fillLangs() {

    load_list('./api/lang', (data) => {
        //fill lang query options
        let str_html = "";
        for (let [k, v] of Object.entries(data)) {
            str_html += `<div class="cat">
           <label>
              <input type="checkbox" name="s_lang" value="${v.langcode}"><span>${v.langname}</span>
           </label>
        </div>`;
        }
        document.querySelector("#config_question_s_langs").innerHTML = str_html;
    });
}

function fillGender() {
    //fill gender query options
    load_list('./api/gender/he', (data) => {
        str_html = "";
        for (let [k, v] of Object.entries(data)) {
            str_html += `<div class="cat">
           <label>
              <input type="radio" name="gender" value="${v.gendercode}"><span>${v.gendername}</span>
           </label>
        </div>`;
        }
        document.querySelector("#config_question_gender").innerHTML = str_html;
    });
}


initData();
fillLangs();
fillGender();


