var express = require('express');
var router = express.Router();
var controller = require('../controllers/mission');

/* GET mission page */
router.get('/', controller.mission);

module.exports = router;