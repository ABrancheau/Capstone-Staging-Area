var express = require('express');
var router = express.Router();
var controller = require('../controllers/reservation');

/* GET reservation page */
router.get('/', controller.reservation);

module.exports = router;