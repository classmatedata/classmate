const { Router } = require('express');
const verifyToken = require('../middleware/middleware_auth');
const controllerCourses = require('../controller/controller_course');
const routerCourses = Router();


routerCourses.get("/", controllerCourses.getCourses);
routerCourses.post("/", controllerCourses.addCourse);

// routerCourses.get("/", verifyToken, controllerCourses.getCourses);
// routerCourses.post("/", verifyToken, controllerCourses.addCourse);

// routerCourses.get("/json", verifyToken, controllerCourses.getCoursesJson);
routerCourses.get("/:courseId", verifyToken, controllerCourses.getCourseById);
routerCourses.put("/:courseId", verifyToken, controllerCourses.updateCourse);
routerCourses.delete("/:courseId", verifyToken, controllerCourses.removeCourse);

routerCourses.get("/:courseId/topics", verifyToken, controllerCourses.getCourseTopicsByCourseId);


//router.get("/coursesAndTopics", controller.getCoursesAndTopics);

// router.post("/courses", controller.addCourse);

// router.get("/courses/:courseId", controller.getCourseById);
// router.put("/courses/:courseId", controller.updateCourse);
// router.delete("/courses/:courseId", controller.removeCourse);

// router.get("/courses/:courseId/topics", controller.getTopics);
// router.post("/courses/:courseId/topics", controller.addTopic);

// router.get("/courses/:courseId/topics/:topicId", controller.getTopicById);
// router.put("/courses/:courseId/topics/:topicId", controller.updateTopic);
// router.delete("/courses/:id/topics/:topicId", controller.removeTopic);

module.exports = routerCourses;