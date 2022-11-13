const express = require("express");
const router = express.Router();
const taskRoutes = require("./taskRoutes");
const userRoutes = require('./userRoutes');

router.use("/tasks", taskRoutes);
router.use('/users', userRoutes);

module.exports = router;