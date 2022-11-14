const express = require("express");
const router = express.Router();
const taskRoutes = require("./taskRoutes");
const userRoutes = require('./userRoutes');
const noteRoutes = require('./noteRoutes');

router.use("/tasks", taskRoutes);
router.use('/users', userRoutes);
router.use('/notes', noteRoutes);

module.exports = router;