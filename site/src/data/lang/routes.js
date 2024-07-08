const { Router } = require('express');
const verifyToken = require('../../app/middleware.js');
const controllerLang = require('./controller.js');
const routerLang = Router();

routerCourses.get("/", verifyToken, controllerLang.getLangs);
routerCourses.post("/", verifyToken, controllerLang.addLang);
routerCourses.update("/:lang", verifyToken, controllerLang.updateLang);
routerCourses.delete("/:lang", verifyToken, controllerLang.deleteLang);

module.exports = routerLang;