/* GET mission view */
const mission = (req, res) => {
    res.render('mission', {title: 'Grazioso Salvare'})
}

module.exports = {
    mission
}