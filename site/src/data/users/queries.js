const getUsers = `SELECT * FROM getUsers();`;
const getUserById = `SELECT * FROM getUserById($1)`;
const getUserByEmail = `SELECT * FROM getUsers() WHERE email=$1;`;
const getUserByFirebaseUid = `SELECT * FROM getUsers() WHERE firebase_uid=$1;`;

//const getTeachers = `SELECT * FROM getTeachers();`;

const addUser = `INSERT INTO public.classmate(
	 email, languicode, firstname, lastname, classmategendercode, firebase_uid)
	VALUES ( $1, $2, $3, $4, $5, $6);`;

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    getUserByFirebaseUid,
    //getTeachers,
    addUser,
}