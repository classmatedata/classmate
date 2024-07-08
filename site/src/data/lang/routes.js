const { Router } = require('express');
const verifyToken = require('../../app/middleware.js');
const controllerLang = require('./controller.js');
const routerLang = Router();

routerLang.get("/", verifyToken, controllerLang.getLangs);
routerLang.post("/", verifyToken, controllerLang.addLang);

routerLang.put("/:lang", verifyToken, controllerLang.updateLang);
routerLang.patch("/:lang", verifyToken, controllerLang.updateLangName);

routerLang.patch("/:lang/dir", verifyToken, controllerLang.updateLangDir);

routerLang.delete("/:lang", verifyToken, controllerLang.deleteLang);

module.exports = routerLang;