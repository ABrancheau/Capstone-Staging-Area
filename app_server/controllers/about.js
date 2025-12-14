/* GET about view */
const about = (req, res) => {
    res.render('about', {title: 'Grazioso Salvare'})
}

module.exports = {
    about
}