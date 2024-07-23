const pool = require('../config/config_db');
const queries = require('../queries/queries_user');


const getUsers = async (req, res) => {
    try {

        const client = await pool.connect();
        const result = await client.query(queries.getUsers);
        client.release();
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }

}


const getUserById = async (req, res) => {
    try {
        const userid = req.params.userid;

        if (userid != NaN) {
            const client = await pool.connect();
            const results = await client.query(queries.getUserById, [userid]);
            client.release();
            res.status(200).json(results.rows);

        } else {
            throw ("no userid given");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;

        if (email != NaN) {
            const client = await pool.connect();
            const results = await client.query(queries.getUserByEmail, [email]);
            client.release();
            res.status(200).json(results.rows);

        } else {
            throw ("no email given");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}


const getUserByFirebaseUid = async (req, res) => {
    try {
        const uid = req.params.uid;

        if (uid != NaN) {
            const client = await pool.connect();
            const results = await client.query(queries.getUserByFirebaseUid, [uid]);
            client.release();
            res.status(200).json(results.rows);

        } else {
            throw ("no uid given");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

const addUser = async (req, res) => {
    try {
        const { email, languicode, firstname, lastname, uid } = req.body;
        if (email != NaN) {
            const client = await pool.connect();

            const gendercode = 'C';
            const results = await client.query(queries.addUser, [email, languicode, firstname, lastname, gendercode, uid]);
            client.release();
            res.status(200).json(results.rows);

        } else {
            throw ("expected parameters are { email, uid, firstname, lastname }");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

const getTeachers = async (req, res) => {
    try {

        const client = await pool.connect();
        const result = await client.query(queries.getTeachers);
        client.release();
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }

}

const addTeacher = async (req, res) => {
    try {
        console.log("add teacher");
        const { userid, hoursToVolonteer } = req.body;
        console.log("add teacher", userid, hoursToVolonteer);
        const client = await pool.connect();

        const result = await client.query(queries.addOrUpdateTeacher, [userid, hoursToVolonteer]);
        client.release();
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }

}

const addTeacherToCourse = async (req, res) => {
    try {
        const { userid, courseid } = req.body;
        const client = await pool.connect();
        const results = await client.query(queries.addTeacherTocourse, [userid, courseid]);
        client.release();
        res.status(200).json(results.rows);
    }
    catch (error) {
        console.error('Error adding course to user:', error);
        res.status(500).json({ error: 'An error occurred while adding the course to the user.' });
    }

}



module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    getUserByFirebaseUid,

    addUser,

    getTeachers,
    addTeacher,
    addTeacherToCourse,

    // updateTeacher,
    // updateAdmin,
    // updateUser,
    // addUserSpokenLang,
    // updateUserGUILang,
}