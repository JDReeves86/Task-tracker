const router = require('express').Router();
const { userLogin } = require('../controllers/homeController')

router.route('/login').get(userLogin)

module.exports = router