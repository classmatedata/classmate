class testController {
    getCourses(req, res) {
        const teacherCourses = {
            "1": "Course 1",
            "2": "Course 2",
            "3": "Course 3",
        };
        res.send(teacherCourses);
    }
}

module.exports = new testController();