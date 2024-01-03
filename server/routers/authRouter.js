const { Router } = require("express");
const artistController = require("../controllers/artistController");
const authController = require("../controllers/authController");
const collectorController = require("../controllers/collectorController");

const router = new Router();

router.post("/artist/register", artistController.create);
router.post("/collector/register", collectorController.create);
router.post("/login", authController.login);

module.exports = router;