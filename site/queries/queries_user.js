const getUsers = `SELECT * FROM getUsers();`;
const getUserById = `SELECT * FROM getUserById($1)`;
const getUserByEmail = `SELECT * FROM getUsers() WHERE email=$1;`;
const getUserByFirebaseUid = `SELECT * FROM getUsers() WHERE firebase_uid=$1;`;


const addUser = `INSERT INTO public.classmate(
	 email, languicode, firstname, lastname, classmategendercode, firebase_uid)
	VALUES ( $1, $2, $3, $4, $5, $6);`;

const getTeachers = `SELECT * from classmateteacher;`;
const addOrUpdateTeacher = `CALL addOrUpdateTeacher($1, $2);`;

// getTeacherCourses
const addTeacherToCourse = `INSERT INTO teachercourses(
        teacherid, courseid)
        VALUES ($1, $2);`

// getUserSpokenLang
// addUserSpokenLang
// removeUserSpokenLang
// updateUserGender

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    getUserByFirebaseUid,

    addUser,

    getTeachers,
    addOrUpdateTeacher,

    addTeacherToCourse,

}