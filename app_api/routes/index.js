const express = require("express"); // express app
const router = express.Router();    // router logic

// import controllers to route
const animalsController = require("../controllers/animals");

// define route for animals endpoint
router
    .route("/animals")
    .get(animalsController.animalsList); // GET method routes animalsList

// GET method routes animalsFindByCode, requires parameter
router
    .route('/animals/:animalCode')
    .get(animalsController.animalsFindByCode);

module.exports = router;