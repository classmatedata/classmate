const createCourseTable = `CREATE TABLE  courses  (
   courseId   SERIAL PRIMARY KEY ,
   courseName varchar(30) ,
   courseLang varchar(2) 
)`;

const addDataToCourseTable = `
INSERT INTO courses (courseId, courseName, courseLang) VALUES
(1, 'מתמטיקה', 'he'),
(2, 'פיזיקה', 'he'),
(3, 'כימיה', 'he'),
(4, 'מדעי המחשב', 'he'),
(5, 'ביולוגיה', 'he'),
(6, 'תנך', 'he'),
(7, 'ספרות', 'he'),
(8, 'היסטוריה', 'he'),
(9, 'אזרחות', 'he'),
(10, 'עברית', 'he');
`;

module.exports = {
    createCourseTable,
    addDataToCourseTable,
    //     getStudents,
    //     getStudentById,
    //     checkEmailExists,
    //     addStudent,
    //     updateStudent,
    //     removeStudent,
}