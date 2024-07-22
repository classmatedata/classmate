const { Router } = require('express');
const verifyToken = require('../middleware/middleware_auth');
const ctr = require('../controller/controller_user');
const rtr = Router();
const { checkSchema } = require("express-validator");
const validateUserData = require("../model/validation_user");

rtr.get("/", ctr.getUsers);
// rtr.get("/:userid", verifyToken, ctr.getUserById);
// rtr.get("/email/:email", verifyToken, ctr.getUserByEmail);
// rtr.get("/uid/:uid", verifyToken, ctr.getUserByFirebaseUid);
rtr.get("/teacher", ctr.getTeachers);


rtr.get("/email/:email", ctr.getUserByEmail);
rtr.get("/uid/:uid", ctr.getUserByFirebaseUid);
rtr.get("/:userid", ctr.getUserById);

// create or append a new
//rtr.post("/", verifyToken, ctr.addUser);

// add User
//rtr.post("/", verifyToken, checkSchema(validateUserData.userAddDataValidate), ctr.addUser);
rtr.post("/", verifyToken, checkSchema(validateUserData.userAddDataValidate), ctr.addUser);

// rtr.post("/:userid", verifyToken, ctr.updateUser);
// rtr.post("/teacher/", verifyToken, ctr.updateTeacher);
// rtr.post("/admin/", verifyToken, ctr.updateAdmin);

// rtr.post("/:userid/spokenlang/:lang", verifyToken, ctr.addUserSpokenLang);
// rtr.delete("/:userid/spokenlang/:lang", verifyToken, ctr.updateUser);

// // update
// rtr.patch("/gui/:lang", verifyToken, ctr.updateUserGUILang);

// create or replace a new with .put
//to /courses/ route

rtr.put("/teacher/", ctr.addTeacher);

module.exports = rtr;