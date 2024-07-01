//https://www.codingnepalweb.com/free-login-registration-form-html-css/
//https://youtu.be/T9K8bkMEA3Q?si=OhyCYF4tZURlexLG&t=12419
// npm run build

//https://youtu.be/56D9-WvzGk8?si=nx9Ht7xtH4pgxlP_
//https://youtu.be/b3p_pH419O0?si=am54n6asX69d1sx6


function registerNewUser() {
    let email_val = document.querySelector('#signUpEmail').value;
    let password_val = document.querySelector('#signUpPassword').value;
    let password_confirm_val = document.querySelector('#signUpConfirmPassword').value;
    if (password_val !== password_confirm_val) {
        alert("passwords are not same");
        console.log('register with email:', email_val, ", password:", password_val, " confirm password:", password_confirm_val);
        return;
    }
    console.log('register with email:', email_val, ", password:", password_val);

    let data = { email: email_val, password: password_val };

    fetch('/api/register', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',//'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then((response) => response.json())
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
            console.log(`new user ${user}: ${JSON.stringify(userCredential)}`);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Coudn't create new account!\nerror register new user ${errorCode}: ${errorMessage}`, error);
            console.log(`error register new user ${errorCode}: ${errorMessage}`);
        });
};
function logInUser() {
    let email_val = document.querySelector('#logInEmailInput').value;
    let password_val = document.querySelector('#logInPasswordInput').value;
    console.log('log in email:', email_val, ", password:", password_val);
    let data = { email: email_val, password: password_val };
    fetch('/api/login', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',//'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then((response) => response.json())
        .then((x) => {
            // Signed up 
            const user = x.userCredential.user;
            // ...
            console.log(x.message);
            console.log(`new user ${user}: ${JSON.stringify(x.userCredential)}`);
            console.log(`logged in user ${JSON.stringify(user)}`);
            localStorage.setItem("user_id", user.uid);
            localStorage.setItem(
                "user_data",
                JSON.stringify(user)
            );
            document.querySelector('#dispalyIsLoggedInDiv').innerHTML = `loggedIn - ${JSON.stringify(user.email)}`;
            //hide login form
            document.querySelector('#loginForm').classList.toggle("hdn");
            document.querySelector('#logOutButton').classList.toggle("hdn");
            document.querySelector('#btn_next_page').classList.toggle("hdn");
            document.querySelector('#logInEmailInput').value = "";
            document.querySelector('#logInPasswordInput').value = "";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`error signing in: ${error}`)
        });
};
function logOutUser() {
    fetch('/api/logout', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',//'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: "" // body data type must match "Content-Type" header
    }).then((response) => response.json())
        .then((x) => {
            // ...
            console.log(x.message);
            document.querySelector('#dispalyIsLoggedInDiv').innerHTML = ` not loggedIn`;
            localStorage.removeItem("user_id");
            localStorage.removeItem("user_data");
            //display login form
            document.querySelector('#loginForm').classList.toggle("hdn");
            document.querySelector('#logOutButton').classList.toggle("hdn");
            document.querySelector('#btn_next_page').classList.toggle("hdn");

        }).catch((err) => {
            console.log(`error sign out ${err}`);
        })
};
function resetPasswordMail() {
    let email_val = document.querySelector('#logInEmailInput').value;

    console.log('log in email:', email_val);
    let data = { email: email_val };

    fetch('/api/reset-password', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',//'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then((response) => response.json())
        .then((x) => {


            console.log(`reset password in user ${JSON.stringify(x.message)}`);
            document.querySelector('#dispalyIsLoggedInDiv').innerHTML = `reset password link send to email`

            //hide login form

            document.querySelector('#logInEmailInput').value = "";
            document.querySelector('#logInPasswordInput').value = "";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`error signing in: ${error}`)
        });
};

document.addEventListener('DOMContentLoaded', function () {
    console.log('signin.js: DOMContentLoaded loaded');

    const forms = document.querySelector(".forms"),
        pwShowHide = document.querySelectorAll(".eye-icon"),
        links = document.querySelectorAll(".link");

    pwShowHide.forEach(eyeIcon => {
        eyeIcon.addEventListener("click", () => {
            let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");

            pwFields.forEach(password => {
                if (password.type === "password") {
                    password.type = "text";
                    eyeIcon.classList.replace("bx-hide", "bx-show");
                    return;
                }
                password.type = "password";
                eyeIcon.classList.replace("bx-show", "bx-hide");
            })

        })
    });

    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault(); //preventing form submit
            forms.classList.toggle("show-signup");
        })
    });

});

window.addEventListener('load', () => {
    document.querySelector('#signUpButton').addEventListener('click', registerNewUser);
    document.querySelector('#logInButton').addEventListener('click', logInUser);
    document.querySelector('#logOutButton').addEventListener('click', logOutUser);
    document.querySelector('#forgotPasswordLink').addEventListener('click', resetPasswordMail);
});