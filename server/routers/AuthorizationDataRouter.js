const { Router } = require("express");
const artistController = require("../controllers/ArtistsController");
const authorizationDataController = require("../controllers/AuthorizationDataController");
const collectorController = require("../controllers/CollectorsController");

const router = new Router();

router.post("/login", authorizationDataController.login);
router.post("/register", authorizationDataController.checkEmail);
router.post("/register/artist", artistController.create);
router.post("/register/collector", collectorController.create);

module.exports = router;
