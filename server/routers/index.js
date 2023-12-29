const { Router } = require("express");
const authRouter = require("./AuthorizationDataRouter");
const protectedRouter = require("./routers");
const authMiddleware = require("../middleware/authMiddleware");

const router = new Router();

router.use("/auth", authRouter);
router.use("/api", authMiddleware, protectedRouter);

module.exports = router;