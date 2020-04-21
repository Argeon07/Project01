const express = require('express');
const router = express.Router();

// @route    POST api/message
// @desc     Register user
// @access   Public
router.get('/', (req, res)  => res.send('Message router'));

module.exports = router;