const { Router } = require("express");
const artistController = require("../controllers/artistController");
const collectorController = require("../controllers/collectorController");

const router = new Router();

router.get("/artists", artistController.getAll);
router.get("/collectors", collectorController.getAll);

module.exports = router;