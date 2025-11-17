var fs = require('fs');
var animals = JSON.parse(fs.readFileSync('./data/animals.json', 'utf8'));

/* GET reservation view */
const reservation = (req, res) => {
    res.render('reservation', {title: 'Grazioso Salvare', animals})
}

module.exports = {
    reservation
}