const { Router } = require("express");
const artistController = require("../controllers/ArtistsController");
const authController = require("../controllers/AuthorizationDataController");
const collectorController = require("../controllers/CollectorsController");

const router = new Router();

router.post("/login", authController.login);
router.post("/register/artist", artistController.create);
router.post("/register/company", collectorController.create);

module.exports = router;