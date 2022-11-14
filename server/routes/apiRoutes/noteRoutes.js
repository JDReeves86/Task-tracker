const router = require('express').Router();
const {
    getNote,
    postNote
} = require('../../controllers/noteController')

router.route('/').get(getNote).post(postNote)

module.exports = router