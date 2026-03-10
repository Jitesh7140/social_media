const express = require('express');
const router = express.Router();
const { getcomments  } = require('../controllers/comments');

router.get( '/' , getcomments);

module.exports = router;
