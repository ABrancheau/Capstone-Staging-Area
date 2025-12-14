const animalModel = require('./animalSchema');
const mongoose = require('mongoose');

// define the dogSchema with discriminator
const dogSchema = new mongoose.Schema({
    breed: {type: String, required: true},
});

animalModel.discriminator('Dog', dogSchema);
module.exports = mongoose.model('Dog');