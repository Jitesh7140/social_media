const express = require('express');
const router = express.Router();
const { getuser , verifyuser } = require('../controllers/users');

router.get('/', verifyuser, getuser);

module.exports = router;
