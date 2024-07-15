const pool = require('../db');
const queries = require('./queries');


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
const addCourseToUser = async (req, res) => {
    try {
        const { userid, courseid } = req.body;
        const client = await pool.connect();
        const results = await client.query(queries.addUserCourse, [userid, courseid]);
        client.release();
        res.status(200).json(results.rows);
    }



    
module.exports = {
        getUsers,
        getUserById,
        getUserByEmail,
        getUserByFirebaseUid,

        addUser,

        // updateTeacher,
        // updateAdmin,
        // updateUser,
        // addUserSpokenLang,
        // updateUserGUILang,
    }