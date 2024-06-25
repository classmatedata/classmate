//https://www.codingnepalweb.com/free-login-registration-form-html-css/
//https://youtu.be/T9K8bkMEA3Q?si=OhyCYF4tZURlexLG&t=12419
// npm run build
import { mySignInWithGoogle, getCurrentUserInfo } from './login_functions'



document.addEventListener('DOMContentLoaded', function () {
    console.log('DOMContentLoaded loaded');

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
    document.querySelector('#loginWithGoogle').addEventListener('click', mySignInWithGoogle);
});