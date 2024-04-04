const router = require("express").Router();

const thoughtRoutes = require('./thought');
// const userRoutes = require("./api/user");
// const reactionRoutes = require("./api/reaction");

router.use("/thoughts", thoughtRoutes);


// router.use("/api", apiRoutes);
// router.use("/", reactionRoutes);

module.exports = router;

