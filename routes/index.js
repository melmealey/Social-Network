const router = require("express").Router();

const userRoutes = require("./api/user");
const thoughtRoutes = require("./api/thought");
const reactionRoutes = require("./api/reaction");

app.use("/", userRoutes);
app.use("/", thoughtRoutes);
app.use("/", reactionRoutes);

module.exports = router;

