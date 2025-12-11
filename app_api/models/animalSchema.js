const mongoose = require('mongoose');

const options = {discriminatorKey: 'animalType'};

// define the animal schema
const animalSchema = new mongoose.Schema(
    {
        code: {type: String, required: true},
        name: {type: String, required: true, index: true},
        reserved: {type: Boolean, required: true, index: true},
        gender: {type: String, required: true},
        age: {type: String, required: true},
        weight: {type: String, required: true},
        acquisitionDate: {type: String, required: true},
        acquisitionCountry: {type: String, required: true},
        trainingStatus: {type: String, required: true},
        inServiceCountry: {type: String, required: true},
    },
    options);

module.exports = mongoose.model('animals', animalSchema);