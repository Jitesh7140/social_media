const express = require('express');
const router = express.Router();
const { getrelationship , addrelationship , deleterelationship } = require('../controllers/relationship');
 

router.get("/", getrelationship);
router.post("/", addrelationship);
router.delete("/",  deleterelationship);

module.exports = router;
