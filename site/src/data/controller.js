const pool = require('../db');
const queries = require('./queries');
const queries_init = require('./queries_create_database');

const initDatabase = (req, res) => {
    let results_records = [];
    pool.query(queries_init.createCourseTable, (error, results) => {
        if (error) throw error;
        results_records.push({ status: 'OK', query: queries_init.createCourseTable, res: results });
    })
    pool.query(queries_init.addDataToCourseTable, (error, results) => {
        if (error) throw error;
        results_records.push({ status: 'OK', query: queries_init.addDataToCourseTable, res: results });
    })
    res.status(200).json(results_records);
}
const test = (req, res) => {

    res.status(200).send("test data controller.");

}
const getCourses = (req, res) => {
    pool.query(queries.getCourses, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}
// const getStudentById = (req, res) => {
//     const id = parseInt(req.params.id);

//     pool.query(queries.getStudentById, [id], (error, results) => {
//         if (error) throw error;
//         res.status(200).json(results.rows);
//     })
// }

// const addStudent = (req, res) => {
//     const { name, email, age, dob } = req.body;
//     // check if the email exists
//     pool.query(queries.checkEmailExists, [email], (error, results) => {
//         if (results.rows.length) {
//             res.send("Email already exists.");
//         }
//     })

//     // add student to database
//     pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
//         if (error) throw error;
//         res.status(201).send("Student created Succesfully!");
//     })
// }
// const updateStudent = (req, res) => {
//     const id = parseInt(req.params.id);
//     const { name } = req.body;
//     pool.query(queries.getStudentById, [id], (error, results) => {

//         if (error) throw error;
//         const noStudentFound = !results.rows.length;
//         if (noStudentFound) {
//             res.status(200).send("Student does not exist in the database.");
//         }

//         pool.query(queries.updateStudent, [id, name], (error, results) => {
//             if (error) throw error;
//             res.status(200).send("Student updated successfully.");
//         });
//     });
// }
// const removeStudent = (req, res) => {
//     const id = parseInt(req.params.id);
//     //if student exists in db
//     //delete student from db
//     pool.query(queries.getStudentById, [id], (error, results) => {

//         if (error) throw error;
//         const noStudentFound = !results.rows.length;
//         if (noStudentFound) {
//             res.status(200).send("Student does not exist in the database.");
//         }

//         pool.query(queries.removeStudent, [id], (error, results) => {
//             if (error) throw error;
//             res.status(200).send("Student removed successfully from database.");
//         });
//     });
// }

module.exports = {
    initDatabase,
    test,
    getCourses,
    //     getStudents,
    //     getStudentById,
    //     addStudent,
    //     updateStudent,
    //     removeStudent,
}