const { Router } = require('express');
const verifyToken = require('../app_middleware.js');
const controller = require('./controller.js');
const router = Router();
router.get("/test", verifyToken, controller.test);
router.get("/courses", verifyToken, controller.getCourses);
// router.post("/courses", controller.addCourse);

// router.get("/courses/:courseId", controller.getCourseById);
// router.put("/courses/:courseId", controller.updateCourse);
// router.delete("/courses/:courseId", controller.removeCourse);

// router.get("/courses/:courseId/topics", controller.getTopics);
// router.post("/courses/:courseId/topics", controller.addTopic);

// router.get("/courses/:courseId/topics/:topicId", controller.getTopicById);
// router.put("/courses/:courseId/topics/:topicId", controller.updateTopic);
// router.delete("/courses/:id/topics/:topicId", controller.removeTopic);

module.exports = router;