
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
    let uid = localStorage.getItem("user_uid");
    if (!uid) {
        console.error("User ID not found in local storage");
        return;
    }

    fetch(`/api/users/uid/${uid}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            localStorage.setItem("user_db_data", JSON.stringify(data));
            document.querySelector("#text_name").innerText = data.firstname;
            localStorage.setItem("user_id", data.userid);
            localStorage.setItem("user_name", data.username);
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });


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


