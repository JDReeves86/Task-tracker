const router = require('express').Router();
const {
    getTask,
    postTask
} = require('../../controllers/taskController');

router.route('/').get(getTask).post(postTask)

module.exports = router

