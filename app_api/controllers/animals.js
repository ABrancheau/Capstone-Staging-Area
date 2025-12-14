const mongoose = require('mongoose');
const Animal = require('../models/animalSchema');
const Dog = require('../models/dogSchema');
const Monkey = require('../models/monkeySchema');
const Model = mongoose.model('animals');

// GET: /animals - lists of all rescue animals
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const animalsList = async(req, res) => {
    const q = await Model
        .find({}) // no filter, return all records
        .exec();

        if(!q) {
            // if the database returned no data
            return res
                .status(404)
                .json(err);
        }
        else {
            // return resulting animal list
            return res
                .status(200)
                .json(q);
        }
};


// GET: /dogs - lists of all rescue dogs
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const dogsList = async(req, res) => {
    const q = await Model
        .find({'animalType': 'Dog'}) // dog filter, return all dog records
        .exec();

        if(!q) {
            // if the database returned no data
            return res
                .status(404)
                .json(err);
        }
        else {
            // return resulting dog list
            return res
                .status(200)
                .json(q);
        }
};


// GET: /monkeys - lists of all rescue monkeys
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const monkeysList = async(req, res) => {
    const q = await Model
        .find({'animalType': 'Monkey'}) // monkey filter, return all monkey records
        .exec();

        if(!q) {
            // if the database returned no data
            return res
                .status(404)
                .json(err);
        }
        else {
            // return resulting monkey list
            return res
                .status(200)
                .json(q);
        }
};

// GET: /amimals/:animalCode - lists a single animal
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const animalsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code': req.params.animalCode }) // return single record
        .exec();

    if(!q) {
        // if the database returned no data
        return res
            .status(404)
            .json(err);
    }
    else {
        // return resulting animal list
        return res
            .status(200)
            .json(q);
    }
}

// GET: /dogs/:animalCode - lists a single dog
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const dogsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code': req.params.animalCode }) // return single record
        .exec();

    if(!q) {
        // if the database returned no data
        return res
            .status(404)
            .json(err);
    }
    else {
        // return resulting animal list
        return res
            .status(200)
            .json(q);
    }
}

// GET: /monkeys/:animalCode - lists a single monkey
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const monkeysFindByCode = async(req, res) => {
    const q = await Model
        .find({'code': req.params.animalCode }) // return single record
        .exec();

    if(!q) {
        // if the database returned no data
        return res
            .status(404)
            .json(err);
    }
    else {
        // return resulting animal list
        return res
            .status(200)
            .json(q);
    }
}


// POST: /animals - adds a new animal
// regardless of outcome, response must include HTML status code
// and JSON message to requesting client
const animalsAddAnimal = async(req, res) => {
    const newAnimal = new Animal({
        code: req.body.code,
        name: req.body.name,
        reserved: req.body.reserved,
        gender: req.body.gender,
        age: req.body.age,
        weight: req.body.weight,
        acquisitionDate: req.body.acquisitionDate,
        acquisitionCountry: req.body.acquisitionCountry,
        trainingStatus: req.body.trainingStatus,
        inServiceCountry: req.body.inServiceCountry,
        animalType: req.body.animalType,
        breed: req.body.breed,
        tailLength: req.body.tailLength,
        bodyHeight: req.body.bodyHeight,
        bodyLength: req.body.bodyLength,
        species: req.body.species
    });

    const q = await newAnimal.save();

        if(!q){
            // database returned no data
            return res
                .status(400)
                .json(err);
        }
        else {
            // return new animal
            return res
                .status(201)
                .json(q);
        }

};

// POST: /monkeys - adds a new monkey
// regardless of outcome, response must include HTML status code
// and JSON message to requesting client
const monkeysAddMonkey = async(req, res) => {
    const newMonkey = new Monkey({
        code: req.body.code,
        name: req.body.name,
        reserved: req.body.reserved,
        gender: req.body.gender,
        age: req.body.age,
        weight: req.body.weight,
        acquisitionDate: req.body.acquisitionDate,
        acquisitionCountry: req.body.acquisitionCountry,
        trainingStatus: req.body.trainingStatus,
        inServiceCountry: req.body.inServiceCountry,
        animalType: req.body.animalType,
        tailLength: req.body.tailLength,
        bodyHeight: req.body.bodyHeight,
        bodyLength: req.body.bodyLength,
        species: req.body.species
    });

    const q = await newMonkey.save();

        if(!q){
            // database returned no data
            return res
                .status(400)
                .json(err);
        }
        else {
            // return new animal
            return res
                .status(201)
                .json(q);
        }

};




// POST: /dogs - adds a new dog
// regardless of outcome, response must include HTML status code
// and JSON message to requesting client
const dogsAddDog = async(req, res) => {
    const newDog = new Dog({
        code: req.body.code,
        name: req.body.name,
        reserved: req.body.reserved,
        gender: req.body.gender,
        age: req.body.age,
        weight: req.body.weight,
        acquisitionDate: req.body.acquisitionDate,
        acquisitionCountry: req.body.acquisitionCountry,
        trainingStatus: req.body.trainingStatus,
        inServiceCountry: req.body.inServiceCountry,
        animalType: req.body.animalType,
        breed: req.body.breed
    });

    const q = await newDog.save();

        if(!q){
            // database returned no data
            return res
                .status(400)
                .json(err);
        }
        else {
            // return new animal
            return res
                .status(201)
                .json(q);
        }

};


// PUT: /animals/:animalCode - edits an existing animal
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const animalsUpdateAnimal = async(req, res) => {
    const q = await Model
        .findOneAndUpdate(
            { 'code' : req.params.animalCode },
            {
                code: req.body.code,
                name: req.body.name,
                reserved: req.body.reserved,
                gender: req.body.gender,
                age: req.body.age,
                weight: req.body.weight,
                acquisitionDate: req.body.acquisitionDate,
                acquisitionCountry: req.body.acquisitionCountry,
                trainingStatus: req.body.trainingStatus,
                inServiceCountry: req.body.inServiceCountry,
                animalType: req.body.animalType,
                breed: req.body.breed,
                tailLength: req.body.tailLength,
                bodyHeight: req.body.bodyHeight,
                bodyLength: req.body.bodyLength,
                species: req.body.species
            })
        .exec();
    if(!q){ 
        // Database returned no data
        return res
        .status(400)
        .json(err);
    } 
    else { 
        // Return resulting updated animal
        return res
        .status(201)
        .json(q);
    }
};


// PUT: /dogs/:animalCode - edits an existing dog
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const dogsUpdateDog = async(req, res) => {
    const q = await Model
        .findOneAndUpdate(
            { 'code' : req.params.animalCode },
            {
                code: req.body.code,
                name: req.body.name,
                reserved: req.body.reserved,
                gender: req.body.gender,
                age: req.body.age,
                weight: req.body.weight,
                acquisitionDate: req.body.acquisitionDate,
                acquisitionCountry: req.body.acquisitionCountry,
                trainingStatus: req.body.trainingStatus,
                inServiceCountry: req.body.inServiceCountry,
                animalType: req.body.animalType,
                breed: req.body.breed
            })
        .exec();
    if(!q){ 
        // Database returned no data
        return res
        .status(400)
        .json(err);
    } 
    else { 
        // Return resulting updated animal
        return res
        .status(201)
        .json(q);
    }
};


// PUT: /monkeys/:animalCode - edits an existing monkey
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const monkeysUpdateMonkey = async(req, res) => {
    const q = await Model
        .findOneAndUpdate(
            { 'code' : req.params.animalCode },
            {
                code: req.body.code,
                name: req.body.name,
                reserved: req.body.reserved,
                gender: req.body.gender,
                age: req.body.age,
                weight: req.body.weight,
                acquisitionDate: req.body.acquisitionDate,
                acquisitionCountry: req.body.acquisitionCountry,
                trainingStatus: req.body.trainingStatus,
                inServiceCountry: req.body.inServiceCountry,
                animalType: req.body.animalType,
                tailLength: req.body.tailLength,
                bodyHeight: req.body.bodyHeight,
                bodyLength: req.body.bodyLength,
                species: req.body.species
            })
        .exec();
    if(!q){ 
        // Database returned no data
        return res
        .status(400)
        .json(err);
    } 
    else { 
        // Return resulting updated animal
        return res
        .status(201)
        .json(q);
    }
};

module.exports = {
    animalsList,
    dogsList,
    monkeysList,
    animalsFindByCode,
    dogsFindByCode,
    monkeysFindByCode,
    animalsAddAnimal,
    dogsAddDog,
    monkeysAddMonkey,
    animalsUpdateAnimal,
    dogsUpdateDog,
    monkeysUpdateMonkey
};