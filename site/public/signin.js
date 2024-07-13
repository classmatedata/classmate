
function toggleVisibility(...selectors) {
    selectors.forEach(selector => {
        document.querySelector(selector).classList.toggle("hdn");
    });
}

function validateSignInInputNewUser() {
    let alertDivs = document.querySelectorAll(".alert");
    alertDivs.forEach(div => div.classList.add("hdn"));

    let firstname = document.querySelector('#signUpFirstName').value.trim();
    let lastname = document.querySelector('#signUpLastName').value.trim();
    let email = document.querySelector('#signUpEmail').value.trim();
    let password = document.querySelector('#signUpPassword').value;
    let password_confirm = document.querySelector('#signUpConfirmPassword').value;

    let isValid = true;

    if (firstname.length < 1) {
        document.querySelector('#signUpFirstName_info').classList.remove("hdn");
        isValid = false;
    } else {
        document.querySelector('#signUpFirstName_info').classList.add("hdn");
    }

    if (lastname.length < 1) {
        document.querySelector('#signUpLastName_info').classList.remove("hdn");
        isValid = false;
    } else {
        document.querySelector('#signUpLastName_info').classList.add("hdn");
    }

    if (email.length < 1) {
        document.querySelector('#signUpEmail_info').classList.remove("hdn");
        isValid = false;
    } else {
        document.querySelector('#signUpEmail_info').classList.add("hdn");
    }

    if (password.length < 4) {
        document.querySelector('#signUpPassword_info').classList.remove("hdn");
        isValid = false;
    } else {
        document.querySelector('#signUpPassword_info').classList.add("hdn");
    }

    if (password !== password_confirm) {
        document.querySelector('#signUpConfirmPassword_info').classList.remove("hdn");
        isValid = false;
    } else {
        document.querySelector('#signUpConfirmPassword_info').classList.add("hdn");
    }


    return isValid;
}

function handleFirebaseError(error, errorScope, displayErrorElementSelector) {
    //let errorMessage = `Error signing in: ${error.message}`;
    let errorMessage = `Error ${errorScope}: ${error.message}`;
    if (error.code) {
        switch (error.code) {
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address format.';
                break;
            case 'auth/user-disabled':
                errorMessage = 'This user account has been disabled.';
                break;
            case 'auth/user-not-found':
                errorMessage = 'No user found with this email.';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password.';
                break;
            case 'auth/email-already-in-use':
                errorMessage = 'This email address is already in use.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address format.';
                break;
            case 'auth/weak-password':
                errorMessage = 'Password is too weak.';
                break;
            case 'auth/invalid-credential':
                errorMessage = 'Password or email are not found.';
                break;
            default:
                errorMessage = `Error  ${errorScope}: ${error.message}`;
                break;
        }
    }

    document.querySelector(displayErrorElementSelector).innerText = errorMessage;
    document.querySelector(displayErrorElementSelector).classList.remove("hdn");
}

function registerNewUser() {
    if (!validateSignInInputNewUser()) return;

    let email = document.querySelector('#signUpEmail').value.trim();
    let password = document.querySelector('#signUpPassword').value;
    let firstname = document.querySelector('#signUpFirstName').value.trim();
    let lastname = document.querySelector('#signUpLastName').value.trim();
    let languicode = document.querySelector('#lang').value;

    let data = { email, password };
    console.log('register to firebase', data);
    fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(async (response) => {
        if (!response.ok) {
            const errorDetail = await response.json();
            throw new Error(errorDetail.message || 'Failed to register');
        }
        return response.json();
    })
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log("user:", user);
            // ...
            localStorage.setItem("user_uid", user.uid);
            localStorage.setItem("user_data", JSON.stringify(user));

            let classmate = { email, languicode, firstname, lastname, uid: user.uid };
            console.log("create user in DB with:", JSON.stringify(classmate));
            console.log(classmate);
            fetch('/api/users/', {
                method: 'POST',
                body: JSON.stringify(classmate)
            }).then(async (response) => {
                if (!response.ok) {
                    const errorDetail = await response.json();
                    throw new Error(errorDetail.message || 'Failed to add user to DB');
                }
                return response.json();
            })
                .then((resdata) => {
                    console.log(`user added to DB: ${JSON.stringify(resdata)}`);
                    localStorage.setItem("user_id", resdata.userid);
                    localStorage.setItem("user_name", resdata.username);
                    // Navigate to the start configuration page
                    window.location.href = 'start_config.html';
                });
        })
        .catch((error) => {
            handleFirebaseError(error, `Couldn't create new account!`, '#signUpForm_info');
        });
};

function logInUser() {
    let email = document.querySelector('#logInEmailInput').value;
    let password = document.querySelector('#logInPasswordInput').value;
    console.log('login email:', email, ", password:", password);
    let data = { email: email, password: password };
    fetch('/api/auth/login', {
        method: 'POST',
        mode: 'same-origin',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    }).then(async (response) => {
        if (!response.ok) {
            const errorDetail = await response.json();
            throw new Error(errorDetail.message || 'Failed to login');
        }
        return response.json();
    })
        .then((x) => {
            // Signed up 
            console.log(x);
            const user = x.userCredential.user;
            // ...
            console.log(x.message);
            console.log(`new user ${user}: ${JSON.stringify(x.userCredential)}`);
            console.log(`logged in user ${JSON.stringify(user)}`);
            localStorage.setItem("user_uid", user.uid);
            localStorage.setItem("user_data", JSON.stringify(user));

            document.querySelector('#dispalyIsLoggedInDiv').innerHTML =
                `logged in user: ${JSON.stringify(user.email)}`;
            //hide login form

            toggleVisibility('#loginForm', '#logOutButton', '#btn_next_page');

            document.querySelector('#logInEmailInput').value = "";
            document.querySelector('#logInPasswordInput').value = "";
            localStorage.setItem("user_id", resdata.userid);
            localStorage.setItem("user_name", resdata.username);

            // Navigate to the start configuration page
            window.location.href = 'start_config.html';
        })
        .catch((error) => {
            handleFirebaseError(error, 'login', '#logInForm_info');
        });
};



function logOutUser() {
    fetch('/api/auth/logout', {
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
    let email_val = document.querySelector('#logInEmailInput').value.trim();
    if (email_val.length < 3) {
        handleFirebaseError({ code: '', message: 'non valid email' }, 'reset email', '#logInEmailInput_info');
        return;
    }
    console.log('log in email:', email_val);
    let data = { email: email_val };

    fetch('/api/auth/reset-password', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Failed to reset password');
        }
        return response.json();
    })
        .then((x) => {
            console.log(`reset password in user ${JSON.stringify(x.message)}`);
            document.querySelector('#forgotPasswordLink_info').classList.remove('hdn');
            document.querySelector('#forgotPasswordLink_info_email').innerText = email_val;
            document.querySelector('#forgotPasswordLink_info_email').classList.remove('hdn');

            //hide login form

            document.querySelector('#logInEmailInput').value = "";
            document.querySelector('#logInPasswordInput').value = "";
        })
        .catch((error) => {
            console.error('Error resetting password:', error);
            if (error.code === 'auth/user-not-found') {
                // Handle user not found error (Firebase specific)
                handleFirebaseError(error, 'reset password', '#logInEmailInput_info');
            } else {
                // Handle other errors
                console.error(`Error resetting password: ${error.message}`);
                // Display error message or handle accordingly
            }
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
    document.querySelector('#signUpFirstName').addEventListener('input', validateSignInInputNewUser);
    document.querySelector('#signUpLastName').addEventListener('input', validateSignInInputNewUser);
    document.querySelector('#signUpEmail').addEventListener('input', validateSignInInputNewUser);
    document.querySelector('#signUpPassword').addEventListener('input', validateSignInInputNewUser);
    document.querySelector('#signUpConfirmPassword').addEventListener('input', validateSignInInputNewUser);

    document.querySelector('#signUpButton').addEventListener('click', registerNewUser);
    document.querySelector('#logInButton').addEventListener('click', logInUser);
    document.querySelector('#logOutButton').addEventListener('click', logOutUser);
    document.querySelector('#forgotPasswordLink').addEventListener('click', resetPasswordMail);
});