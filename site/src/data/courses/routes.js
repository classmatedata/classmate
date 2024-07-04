const { Router } = require('express');
const verifyToken = require('../../app/middleware.js');
const controllerCourses = require('./controller.js');
const routerCourses = Router();


routerCourses.get("/", verifyToken, controllerCourses.getCourses);
// router.get("/courseTopics/:courseId", verifyToken, controller.getCourseTopicsByCourse);
routerCourses.get("/:courseId", verifyToken, controllerCourses.getCourseById);
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