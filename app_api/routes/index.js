const express = require("express"); // express app
const router = express.Router();    // router logic
const jwt = require('jsonwebtoken'); // enable JSON web tokens

// import controllers to route
const animalsController = require("../controllers/animals");
const authController = require("../controllers/authentication");


// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
    // console.log('In Middleware');
    const authHeader = req.headers['authorization'];
    // console.log('Auth Header: ' + authHeader);
    if(authHeader == null) {
            console.log('Auth header required but not present.');
            return res.sendStatus(401);
        }
        let headers = authHeader.split(' ');
        if(headers.length < 1) {
            console.log('Not enough tokens in auth header: ' +
                headers.length);
            return res.sendStatus(501);
        }
        const token = authHeader.split(' ')[1];
        // console.log('Token: ' + token);
        if(token == null) {
            console.log('Null bearer token');
            return res.sendStatus(401);
        }
        // console.log(process.env.JWT_SECRET);

        // console.log(jwt.decode(token));
        const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
            if(err) {
                return res.sendStatus(401).json('Token validation error.');
            }
            req.auth = verified; // Set the auth paramto the decoded object
        });
    next(); // We need to continue or this will hang forever
}


router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

// define route for animals endpoint
router
    .route("/animals")
    .get(animalsController.animalsList) // GET method routes animalsList
    .post(authenticateJWT, animalsController.animalsAddAnimal); // POST method adds an animal

// GET method routes animalsFindByCode, requires parameter
// PUT method routes animalsUpdateAnimal, requires parameter
router
    .route('/animals/:animalCode')
    .get(animalsController.animalsFindByCode)
    .put(authenticateJWT, animalsController.animalsUpdateAnimal);

// define route for dogs endpoint
router
    .route('/dogs')
    .get(animalsController.dogsList)
    .post(authenticateJWT, animalsController.dogsAddDog); // POST method adds a dog

// GET method routes dogsFindByCode, requires parameter
// PUT method routes dogsUpdateDog, requires parameter
router
    .route('/dogs/:animalCode')
    .get(animalsController.dogsFindByCode)
    .put(authenticateJWT, animalsController.dogsUpdateDog);


    // define route for monkeys endpoint
router
    .route('/monkeys')
    .get(animalsController.monkeysList)
    .post(authenticateJWT, animalsController.monkeysAddMonkey); // POST method adds a monkey

// GET method routes monkeysFindByCode, requires parameter
// PUT method routes monkeysUpdateMonkey, requires parameter
router
    .route('/monkeys/:animalCode')
    .get(animalsController.monkeysFindByCode)
    .put(authenticateJWT, animalsController.monkeysUpdateMonkey);

module.exports = router;