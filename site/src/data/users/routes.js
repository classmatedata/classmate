const { Router } = require('express');
const verifyToken = require('../../app/middleware.js');
const ctr = require('./controller.js');
const rtr = Router();

rtr.get("/", ctr.getUsers);
rtr.get("/:userid", verifyToken, ctr.getUserById);
rtr.get("/email/:email", verifyToken, ctr.getUserByEmail);
rtr.get("/uid/:uid", verifyToken, ctr.getUserByFirebaseUid);

// create or append a new 
rtr.post("/", verifyToken, ctr.addUser);
// rtr.post("/:userid", verifyToken, ctr.updateUser);
// rtr.post("/teacher/", verifyToken, ctr.updateTeacher);
// rtr.post("/admin/", verifyToken, ctr.updateAdmin);

// rtr.post("/:userid/spokenlang/:lang", verifyToken, ctr.addUserSpokenLang);
// rtr.delete("/:userid/spokenlang/:lang", verifyToken, ctr.updateUser);

// // update 
// rtr.patch("/gui/:lang", verifyToken, ctr.updateUserGUILang);

// create or replace a new with .put
//to /courses/ route:
//rtr.put("/teacher/:userid", verifyToken, ctr.addCourseToTeacher);

module.exports = rtr;