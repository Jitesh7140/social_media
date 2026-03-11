const express = require('express');
const router = express.Router();
const {  postlogin , postlogout , postregister  } = require('../controllers/auth');

router.post( '/login' , postlogin);
router.post( '/register' , postregister);
router.post( '/logout' , postlogout);

module.exports = router;
