

const userAddDataValidate = {
    email: {
        isEmail: { errorMessage: "Please provide valid email" },
    },

    languicode: {
        isString: { errorMessage: "Gender should be string" },
        isIn: {
            options: [["he", "en", "ar", "ru"]],
            errorMessage: "GUI lang is invalid",
        },
    },
    firstname: {
        exists: {
            errorMessage: "User firstname is required",
            options: { checkFalsy: true },
        },
        isString: { errorMessage: "User firstname should be string" },
    },
    lastname: {
        exists: {
            errorMessage: "User lastname is required",
            options: { checkFalsy: true },
        },
        isString: { errorMessage: "User lastname should be string" },
    },
    uid: {
        exists: {
            errorMessage: "User uid is required",
            options: { checkFalsy: true },
        },
        isString: { errorMessage: "User uid should be string" },
    }
    // ,
    // password: {
    //     exists: { errorMessage: "Password is required" },
    //     isString: { errorMessage: "password should be string" },
    //     isLength: {
    //         options: { min: 5 },
    //         errorMessage: "Password should be at least 5 characters",
    //     },
    // },

    // gender: {
    //     isString: { errorMessage: "Gender should be string" },
    //     isIn: {
    //         options: [["Male", "Female", "Other"]],
    //         errorMessage: "Gender is invalid",
    //     },
    // },
    // dateOfBirth: {
    //     isDate: { errorMessage: "DOB should be string" },
    // },
    // phoneNumber: {
    //     isString: { errorMessage: "phone number should be string" },
    //     options: (value) => {
    //         value.length === 10;
    //     },
    //     errorMessage: "Phone number should be 10 digits",
    // },
};

module.exports = {
    userAddDataValidate,
}