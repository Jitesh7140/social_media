const express = require('express');
const router = express.Router();
const {  getposts } = require('../controllers/posts');

router.get('/',getposts );

module.exports = router;
