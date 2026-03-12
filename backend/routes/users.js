const express = require('express');
const router = express.Router();
const { getuser , verifyuser , getUserprofile , updateUser} = require('../controllers/users');

router.get('/', verifyuser, getuser); 

router.get("/find/:userId", getUserprofile);
router.put("/find/:userId", updateUser);

module.exports = router;
