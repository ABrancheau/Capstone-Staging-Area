/* GET reservation view */
const reservation = (req, res) => {
    res.render('reservation', {title: 'Grazioso Salvare'})
}

module.exports = {
    reservation
}