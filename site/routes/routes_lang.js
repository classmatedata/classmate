const { Router } = require('express');
const verifyToken = require('../middleware/middleware_auth');
const controllerLang = require('../controller/controller_lang');
const routerLang = Router();

routerLang.get("/", verifyToken, controllerLang.getLangs);
routerLang.post("/", verifyToken, controllerLang.addLang);

routerLang.put("/:lang", verifyToken, controllerLang.updateLang);
routerLang.patch("/:lang", verifyToken, controllerLang.updateLangName);

routerLang.patch("/:lang/dir", verifyToken, controllerLang.updateLangDir);

routerLang.delete("/:lang", verifyToken, controllerLang.deleteLang);

module.exports = routerLang;