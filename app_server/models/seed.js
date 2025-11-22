// bring in DB connection and the 
// schemas for Animal, Dog, and Monkey
const Mongoose = require('./db');
const Animal = require('./animalSchema');
const Dog = require('./dogSchema');
const Monkey = require('./monkeySchema');

// read seed data from json files (will not read data with different
// discriminators from a single file)
var fs = require('fs');
var dogs = JSON.parse(fs.readFileSync('./data/dogs.json', 'utf8'));
var monkeys = JSON.parse(fs.readFileSync('./data/monkeys.json', 'utf8'));

// delete any existing records, then insert seed data
const seedDB = async () => {
    await Animal.deleteMany({});
    await Animal.insertMany(dogs);
    await Animal.insertMany(monkeys);
}

// close the MongoDB connection and exit
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
})