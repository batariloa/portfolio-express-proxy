const { cacheMiddleware } = require("../middleware/cacheMiddleware");
const { getData } = require("../controller/gitController");
const { Router } = require("express");
const router = Router();
router.get("/api", cacheMiddleware, getData);

module.exports = { router };
