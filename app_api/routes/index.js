const express = require("express"); // express app
const router = express.Router();    // router logic

// import controllers to route
const animalsController = require("../controllers/animals");

// define route for animals endpoint
router
    .route("/animals")
    .get(animalsController.animalsList) // GET method routes animalsList
    .post(animalsController.animalsAddAnimal); // POST method adds an animal

// GET method routes animalsFindByCode, requires parameter
// PUT method routes animalsUpdateAnimal, requires parameter
router
    .route('/animals/:animalCode')
    .get(animalsController.animalsFindByCode)
    .put(animalsController.animalsUpdateAnimal);

// define route for dogs endpoint
router
    .route('/dogs')
    .get(animalsController.dogsList);

// GET method routes dogsFindByCode, requires parameter
// PUT method routes dogsUpdateDog, requires parameter
router
    .route('/dogs/:animalCode')
    .get(animalsController.dogsFindByCode)
    .put(animalsController.dogsUpdateDog);


    // define route for monkeys endpoint
router
    .route('/monkeys')
    .get(animalsController.monkeysList);

// GET method routes monkeysFindByCode, requires parameter
// PUT method routes monkeysUpdateMonkey, requires parameter
router
    .route('/monkeys/:animalCode')
    .get(animalsController.monkeysFindByCode)
    .put(animalsController.monkeysUpdateMonkey);

module.exports = router;