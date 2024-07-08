const { Router } = require('express');
const verifyToken = require('../../app/middleware.js');
const controllerDBinit = require('./controller.js');
const routerDBinit = Router();

routerDBinit.get("/", controllerDBinit.test);
routerDBinit.get("/test", controllerDBinit.test);
routerDBinit.get("/testv", verifyToken, controllerDBinit.test);
module.exports = routerDBinit;