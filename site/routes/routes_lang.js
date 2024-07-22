const { Router } = require('express');
//const verifyToken = require('../middleware/middleware_auth');
const ctr = require('../controller/controller_lang');
const rtr = Router();

rtr.get("/", ctr.getLangs);
rtr.get("/:lang", ctr.getLang);

rtr.post("/", ctr.addLang);

rtr.put("/:lang", ctr.updateLang);
rtr.patch("/:lang", ctr.updateLangName);

rtr.patch("/:lang/dir", ctr.updateLangDir);

rtr.delete("/:lang", ctr.deleteLang);

module.exports = rtr;