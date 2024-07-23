const pool = require('../config/config_db');
const queries = require('../queries/queries_course');


const getCourses = async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query(queries.getCourses);
        client.release();
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }

}
// if course with id and lang exists - returns its name
// else returns ""
const checkCourseByIdAndLangExistsFn = async (course_id, lang) => {
    try {
        console.log("getCourseByIdAndLang:", queries.getCourseByIdAndLang, course_id, lang);
        if (course_id != NaN && lang != NaN) {
            const client = await pool.connect();
            const results = await client.query(queries.getCourseByIdAndLang, [course_id, lang]);
            client.release();
            if (results.rows.length) {
                return results.rows[0].coursename;
            }
        } else {
            console.error("courseid or lang are missing");
            throw ("courseid or lang are missing");
        }
    }
    catch (error) {
        console.error("Error executing checkCourseByIdAndLangExistsFn query:", error);
    }
    return "";
}

// if course with id and lang exists - returns true, 
// else returns false
const checkCourseByIdExistsFn = async (course_id) => {
    try {
        console.log(queries.getCourseById, course_id);
        if (course_id != NaN) {
            const client = await pool.connect();
            const results = await client.query(queries.getCourseById, [course_id]);
            client.release();
            if (results.rows.length) {
                return true;
            }
        } else {
            console.error("courseid is missing");
            throw ("courseid is missing");
        }
    }
    catch (error) {
        console.error("Error executing checkCourseByIdExistsFn query:", error);
    }
    return false;
}
const getCourseById = async (req, res) => {

    const id = parseInt(req.params.courseId);
    console.log(queries.getCourseById, id);
    if (id != NaN) {
        const client = await pool.connect();
        const results = await client.query(queries.getCourseById, [id]);
        client.release();
        res.status(200).json(results.rows);

    } else {
        throw ("no courseid given");
    }
}

const getCourseTopicsByCourseId = (req, res) => {
    const id = parseInt(req.params.courseId);

    console.log(queries.getCourseTopicsByCourseId, id);

    pool.query(queries.getCourseTopicsByCourseId, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}
const checkCourseWithNameExistsFn = async (coursename, lang) => {
    try {
        const client = await pool.connect();
        const results = await client.query(queries.checkCourseWithNameExists, [coursename, lang]);
        client.release();
        if (results.rows.length) {
            return results.rows[0].courseid;
        }

    } catch (error) {
        console.error("Error executing checkCourseWithNameExists query:", error);
    }
    return 0;
}
const addCourseFn = async (coursename, lang) => {
    try {
        console.log(queries.addCourse, coursename, lang);
        const client = await pool.connect();
        const results = await client.query(queries.addCourse, [coursename, lang, null, null]);
        client.release();
        if (results.rows.length) {
            const nextTextId = results.rows[0].next_text_id;
            const courseId = results.rows[0].course_id;
            console.log('Next text ID:', nextTextId);
            console.log('Course ID:', courseId);
            return courseId;
        }

    } catch (error) {
        console.error("Error executing addCourse query:", error);
    }

    return 0;
}

const addCourseWithIdFn = async (course_id, coursename, lang) => {
    try {
        console.log("addCourseWithIdFn", queries.addCourseWithId, course_id, coursename, lang);
        const client = await pool.connect();
        const results = await client.query(queries.addCourseWithId, [course_id, coursename, lang, null]);
        client.release();
        if (results.rows.length) {
            const textId = results.rows[0].text_id;
            console.log('text ID:', textId);
            return course_id;
        }

    } catch (error) {
        console.error("Error executing addCourse query:", error);
    }

    return 0;
}
const updateCourseFn = async (courseId, coursename, lang) => {
    try {
        console.log("updateCourse", queries.updateCourse, courseId, coursename, lang);
        const client = await pool.connect();
        const results = await client.query(queries.updateCourse, [courseId, coursename, lang, null]);
        client.release();
        if (results.rows.length) {
            const textId = results.rows[0].text_id;
            console.log('text ID:', textId);
            return textId;
        }

    } catch (error) {
        console.error("Error executing updateCourse query:", error);
    }

    return 0;
}

const addCourse = async (req, res) => {
    const id = parseInt(req.params.courseId);
    const { coursename, lang } = req.body;
    console.log(queries.getCourseTopicsByCourseId, id, coursename, lang);
    let courseID = await checkCourseWithNameExistsFn(coursename, lang);
    if (courseID > 0) {
        res.status(200).json({ 'courseid': courseID, 'status': 'already exists' });
        return;
    }

    courseID = await addCourseFn(coursename, lang);
    if (courseID > 0) {
        res.status(201).json({ 'courseid': courseID, 'status': 'added new course' });
        return;
    }
}

const updateCourse = async (req, res) => {
    const id = parseInt(req.params.courseId);
    const { coursename, lang } = req.body;
    console.log("updateCourse id:", id);
    // if course with id exists:
    //   - if course with id and lang exists - update its name
    //   - else add  new (name,lang) to the same course
    // else add new course
    if (id != NaN && (coursename != "" && coursename != NaN) && (lang != "" && lang != NaN)) {
        if (checkCourseByIdExistsFn(id)) {
            let course_name = await checkCourseByIdAndLangExistsFn(id, lang);
            console.log("updateCourse-> checkCourseByIdAndLangExistsFn course name : ", course_name);
            if (course_name == "") {
                console.log("so: addCourseWithIdFn");
                await addCourseWithIdFn(id, coursename, lang);
                res.status(201).json({ 'status': `course added  ${id} ${coursename} ${lang}` });
            } else if (course_name == coursename) {
                console.log("so: do nothing");
                res.status(200).json({ 'status': 'already exists' });
            } else { //course_name != coursename
                console.log("so: updateCourseFn");
                await updateCourseFn(id, coursename, lang);
                res.status(201).json({ 'status': `course updated  ${id} ${coursename} ${lang} ` });
            }
        } else {
            res.status(200).json({ 'status': `error, no course with id ${id}` });
        }
    }
    return;
}
const removeCourseFn = async (courseId) => {
    try {
        console.log("removeCourse", queries.removeCourse, courseId);
        const client = await pool.connect();
        await client.query(queries.removeCourse, [courseId]);
        client.release();
        return true;
    } catch (error) {
        console.error("Error executing removeCourse query:", error);
    }

    return false;
};

const removeCourse = async (req, res) => {
    const id = parseInt(req.params.courseId);

    console.log("removeCourse id:", id);
    // if course with id exists:
    //   - if course with id and lang exists - update its name
    //   - else add  new (name,lang) to the same course
    // else add new course
    if (id != NaN) {
        let result = await removeCourseFn(id);
        if (result) {
            res.status(200).json({ 'status': `course removed  ${id} ` });
        } else {
            res.status(200).json({ 'status': `can't remove course ${id} ` });
        }

    }
    return;
}



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

    addCourse,
    updateCourse,
    removeCourse,
    //     getStudents,
    //     getStudentById,
    //     addStudent,
    //     updateStudent,
    //     removeStudent,
}