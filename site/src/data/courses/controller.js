const pool = require('../db');
const queries = require('./queries');



const getCourses = (req, res) => {

    pool.query(queries.getCourses, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}
const getCourseById = (req, res) => {

    const id = parseInt(req.params.courseId);
    if (id != NaN) {
        pool.query(queries.getCourseById, [id], (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        })
    } else {
        throw ("no courseid given");
    }
}

const getCourseTopicsByCourseId = (req, res) => {
    const id = parseInt(req.params.courseId);

    pool.query(queries.getCourseTopicsByCourseId, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

// const getCoursesAndTopics = (req, res) => {
//     console.log("getCoursesAndTopics");
//     pool.query(queries.getCoursesAndTopics, (error, results) => {
//         if (error) throw error;
//         console.log(results);
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

    getCourses,
    getCourseById,
    getCourseTopicsByCourseId,
    //     getStudents,
    //     getStudentById,
    //     addStudent,
    //     updateStudent,
    //     removeStudent,
}