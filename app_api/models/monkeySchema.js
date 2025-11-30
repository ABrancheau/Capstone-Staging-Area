const animalModel = require('./animalSchema');
const mongoose = require('mongoose');

//define the monkeySchema
const monkeySchema = new mongoose.Schema({
    tailLength: {type: String, required: true},
    bodyHeight: {type: String, required: true},
    bodyLength: {type: String, required: true},
    species: {type: String, required: true}
});

animalModel.discriminator('Monkey', monkeySchema);
module.exports = mongoose.model('Monkey');