/* GET Homepage */
const index = (req, res) => {
    res.render('index', {title: "Grazioso Salvare"})
}

module.exports = {
    index
}