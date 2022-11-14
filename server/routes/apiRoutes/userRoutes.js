const router = require('express').Router();
const {
    getUser,
    postUser
} = require('../../controllers/userController');

router.route('/').get(getUser).post(postUser)

module.exports = router