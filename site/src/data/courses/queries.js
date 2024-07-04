const getCourses = "SELECT * FROM courses";

// const getCoursesAndTopics = `SELECT courses.courseid, courseName, 
// 	jsonb_object_agg(topicid, topictitle) 
// 	FROM courses JOIN courseTopics 
// 	ON courses.courseid = courseTopics.courseid 
// 	GROUP BY coursetopics.courseid, courses.courseid, courses.courseName`;

const getCourseById = "SELECT * FROM courses WHERE courseid = $1";
const getCourseTopicsByCourseId = "SELECT * FROM courseTopics WHERE courseid = $1";

// const checkEmailExists = "SELECT s FROM students s WHERE s.email = $1";
// const addStudent = "INSERT INTO students (name, email, age, dob) VALUES($1, $2, $3, $4);";
// const updateStudent = "UPDATE students SET name = $2 WHERE id = $1"
// const removeStudent = "DELETE FROM students WHERE id = $1";

module.exports = {
    getCourses,
    getCourseById,
    getCourseTopicsByCourseId,
    //     getStudents,
    //     getStudentById,
    //     checkEmailExists,
    //     addStudent,
    //     updateStudent,
    //     removeStudent,
}