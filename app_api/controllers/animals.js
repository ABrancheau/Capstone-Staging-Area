const mongoose = require('mongoose');
const Animal = require('../models/animalSchema');
const Dog = require('../models/dogSchema');
const Monkey = require('../models/monkeySchema');
const Model = mongoose.model('rescueAnimal');

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

module.exports = {
    animalsList,
    animalsFindByCode
};