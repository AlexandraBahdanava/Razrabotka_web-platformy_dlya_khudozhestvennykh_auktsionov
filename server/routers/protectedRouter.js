const { Router } = require("express");
const artistController = require("../controllers/artistController");
const collectorController = require("../controllers/collectorController");

const router = new Router();

router.get("/artists", artistController.create);
router.get("/collectors", collectorController.create);

module.exports = router;