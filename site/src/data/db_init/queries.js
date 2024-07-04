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

const createCourseTopicsTable = `CREATE TABLE  courseTopics (
    topicId SERIAL PRIMARY KEY  NOT NULL,
    courseId int  NOT NULL,
    topicTitle varchar(50) NOT NULL
   )`;

const addDataToCourseTopicsTable = `INSERT INTO courseTopics (courseId, topicId, topicTitle) VALUES
(1, 1, 'בעיות תנועה'),
    (1, 2, 'בעיות תנועה'),
    (1, 3, 'סדרות'),
    (1, 4, 'הסתברות'),
    (1, 5, 'טריגונומטריה'),
    (1, 6, 'גיאומטריה'),
    (1, 7, 'חשבון דיפרנציאלי ואינטגרלי'),
    (1, 8, 'הנדסה אנליטית'),
    (1, 9, 'וקטורים'),
    (1, 10, 'מספרים מרוכבים'),
    (1, 11, 'פונקציות מעריכיות'),
    (2, 12, 'אור'),
    (2, 13, 'עדשות כדוריות דקות'),
    (2, 14, 'העין וליקויי ראייה'),
    (2, 15, 'קינמטיקה'),
    (2, 16, 'וקטורים'),
    (2, 17, 'כוחות ומצבי התמדה'),
    (2, 18, 'החוק השני של ניוטון'),
    (2, 19, 'קרינה וחומר'),
    (2, 20, 'מכניקה'),
    (2, 21, 'חשמל'),
    (3, 22, 'מבנה האטום'),
    (3, 23, 'הטבלה המחזורית'),
    (3, 24, 'מבנה וקישור'),
    (3, 25, 'סטוכיומטריה'),
    (3, 26, 'חמצון-חיזור'),
    (3, 27, 'חומצות ובסיסים'),
    (3, 28, 'אנרגיה'),
    (3, 29, 'חומצות שומן'),
    (3, 30, 'שיווי משקל'),
    (3, 31, 'תרמודינמיקה'),
    (4, 32, 'תנאים'),
    (4, 33, 'לולאות'),
    (4, 34, 'מחרוזות'),
    (4, 35, 'מערכים'),
    (4, 36, 'עצמים ומחלקות'),
    (4, 37, 'רקורסיה'),
    (4, 38, 'סיבוכיות'),
    (4, 39, 'מבני נתונים'),
    (4, 40, 'מודלים חישוביים'),
    (4, 41, 'תכנות מונחה עצמים'),
    (5, 42, 'התא ומאפייניו'),
    (5, 43, 'מחזור התא'),
    (5, 44, 'החומר התורשתי'),
    (5, 45, 'תורשה'),
    (5, 46, 'מוטציות'),
    (5, 47, 'מערכות בגוף'),
    (5, 49, 'הכבד'),
    (5, 50, 'אקולוגיה'),
    (5, 51, 'השפעת האדם על הסביבה'),
    (5, 52, 'חיידקים ונגיפים'),
    (6, 53, 'בריאת העולם'),
    (6, 54, 'סיפורי אברהם ויצחק'),
    (6, 55, 'סיפורי יעקב'),
    (6, 56, 'סיפורי יוסף'),
    (6, 57, 'שמות'),
    (6, 58, 'חוק וחברה'),
    (6, 59, 'שיבת ציון'),
    (6, 60, 'נביא ונבואה'),
    (6, 61, 'מזמורי תהילים'),
    (6, 62, 'ספרות החוכמה'),
    (7, 63, 'בעל זבוב / גולדינג'),
    (7, 64, 'הרופא וגרושתו / עגנון'),
    (7, 65, 'האדונית והרוכל / עגנון'),
    (7, 66, 'צלליות / גוטפרוינד'),
    (7, 67, 'סיפורים מתורגמים'),
    (7, 68, 'שירת ימי הביניים'),
    (7, 69, 'שירת ביאליק'),
    (7, 70, 'שירת רחל המשוררת'),
    (7, 71, 'שירת המאה העשרים'),
    (7, 72, 'אנטיגונה / סופוקלס'),
    (8, 73, 'הלאומיות'),
    (8, 74, 'תנועה לאומית מדגימה'),
    (8, 75, 'הציונות'),
    (8, 76, 'השואה 1933-1939'),
    (8, 77, 'השואה 1939-1945'),
    (8, 78, 'המאבק על הקמת המדינה'),
    (8, 79, 'העברת שאלת ארץ ישראל לאום'),
    (8, 80, 'מלחמת העצמאות'),
    (8, 81, 'מלחמת יום כיפור'),
    (8, 82, 'מלחמת ששת הימים'),
    (9, 83, 'הכרזת העצמאות'),
    (9, 84, 'דמוקרטיה'),
    (9, 85, 'גבולות בדמוקרטיה'),
    (9, 86, 'זכויות'),
    (9, 87, 'מדינת ישראל כמדינה יהודית'),
    (9, 88, 'אשכול מעורבות אזרחית ופיקוח על רשויות השלטון'),
    (9, 89, 'אשכול רשויות מקומיות'),
    (9, 90, 'אשכול שיטת בחירות ומפלגות'),
    (9, 91, 'אשכול תקשורת ופוליטיקה בישראל'),
    (9, 92, 'אשכול העולם היהודי'),
    (10, 93, 'הבנת הנקרא'),
    (10, 94, 'כתיבה ממזגת'),
    (10, 95, 'שם המספר'),
    (10, 96, 'מילות יחס'),
    (10, 97, 'אותיות השימוש'),
    (10, 98, 'מערכת הצורות'),
    (10, 99, 'תחביר');
`;

module.exports = {
    createCourseTable,
    addDataToCourseTable,
    createCourseTopicsTable,
    addDataToCourseTopicsTable,
    //     getStudents,
    //     getStudentById,
    //     checkEmailExists,
    //     addStudent,
    //     updateStudent,
    //     removeStudent,
}