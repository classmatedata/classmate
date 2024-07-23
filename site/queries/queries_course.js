const getCourses = `SELECT * FROM getCourses()`;
const getCourseById = `SELECT * FROM getCourseById( $1);`
const getCourseByIdAndLang = `SELECT * FROM getCourseByIdAndLang( $1, $2);`
const getCoursesWithTopics = `SELECT * FROM getCoursesWithTopics($1);`

const getCourseTopicsByCourseId = `SELECT * FROM getCourseTopicsByCourseId($1,$2);`;



// const checkEmailExists = "SELECT s FROM students s WHERE s.email = $1";
// const addStudent = "INSERT INTO students (name, email, age, dob) VALUES($1, $2, $3, $4);";
// const updateStudent = "UPDATE students SET name = $2 WHERE id = $1"
// const removeStudent = "DELETE FROM students WHERE id = $1";

const checkCourseWithNameExists = `SELECT * FROM getCourseIdByName( $1, $2);`
const checkCourseTopicWithNameExists = `SELECT * FROM getCourseTopicIdByName( $1, $2,$3);`
//courseid,topicname, lang
// getCourseTopicByName( 3, 'אנרגיה','he'); 
// checkCourseTopicWithNameExists(1, 'שם הנושא','he')

const addCourse = `CALL addCourse($1, $2, $3, $4);`; // courseName, courselang
const addCourseWithId = `CALL addCourseWithId($1, $2, $3, $4);`;// [course_id, coursename, lang, null]
const updateCourse = `CALL updateCourse($1, $2, $3, $4);`; //courseId, courseName, courselang
const removeCourse = `CALL removeCourse($1);`;
// const addCourseTopic = `call addCourseTopic($1,$2,'he');`;//courseid,topicname, lang

// const updateCourse = `call updateCourseName($1,$2,'he');`;//courseid,coursename,lang
// const updateCourseTopic = `call updateCourseTopicName($1,$2,'he');`;//topicid,topicname,lang

// const removeCourse = `call removeCourse($1,$2,'he');`;//courseid,coursename,lang
// const removeCourseTopic = `call removeCourseTopic($1,$2,'he');`;//topicid,topicname,lang



module.exports = {
    getCourses,
    getCourseById,
    getCourseByIdAndLang,
    getCoursesWithTopics,
    getCourseTopicsByCourseId,
    checkCourseWithNameExists,
    checkCourseTopicWithNameExists,
    addCourse,
    addCourseWithId,
    updateCourse,
    removeCourse,

}