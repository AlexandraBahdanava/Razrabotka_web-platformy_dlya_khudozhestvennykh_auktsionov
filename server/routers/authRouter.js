const { Router } = require("express");
const artistController = require("../controllers/artistController");
const authController = require("../controllers/authController");
const collectorController = require("../controllers/collectorController");

const router = new Router();

router.post("/login", authController.login);
router.post("/register/artist", artistController.create);
router.post("/register/company", collectorController.create);

module.exports = router;