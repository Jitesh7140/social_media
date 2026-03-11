const express = require('express');
const router = express.Router();
const {  getposts , addposts } = require('../controllers/posts');

router.get('/',getposts );
router.post('/',addposts );

module.exports = router;
