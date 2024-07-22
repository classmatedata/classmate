const { Router } = require('express');
const verifyToken = require('../middleware/middleware_auth');
const ctrl = require('../controller/controller_gender');
const rtr = Router();

// rtr.get("/", verifyToken, ctrl.getGenders);
// rtr.get("/:lang", verifyToken, ctrl.getGendersByLang);

rtr.get("/", ctrl.getGenders);
rtr.get("/:lang", ctrl.getGendersByLang);

module.exports = rtr;