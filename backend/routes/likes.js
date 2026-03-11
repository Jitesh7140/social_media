const express = require('express');
const router = express.Router();
const { getlikes , toggleLike } = require('../controllers/likes');

router.get( '/' , getlikes);
router.post('/' , toggleLike)

module.exports = router;
