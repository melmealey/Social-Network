const router = require("express").Router();

const thoughtRoutes = require('./thought');
const userRoutes = require("./user");
const reactionRoutes = require("./reaction");

router.use("/thoughts", thoughtRoutes);
router.use("/user", userRoutes);
// router.use("/reaction", reactionRoutes);

module.exports = router;

