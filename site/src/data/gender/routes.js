const { Router } = require('express');
const verifyToken = require('../../app/middleware.js');
const controllerLang = require('./controller.js');
const routerLang = Router();

routerLang.get("/", verifyToken, controllerLang.getGenders);
routerLang.get("/:lang", verifyToken, controllerLang.getGenderByLang);

module.exports = routerLang;