const express = require('express');
const router = express.Router();
const { getlikes } = require('../controllers/likes');

router.get( '/' , getlikes);

module.exports = router;
