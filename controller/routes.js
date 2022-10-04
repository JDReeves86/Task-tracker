const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.status(200).render('all')
    } catch(err) {res.status(500).json('errrrorrrrr')}
})

module.exports = router;