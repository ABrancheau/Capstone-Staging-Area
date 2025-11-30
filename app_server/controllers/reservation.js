const animalsEndpoint = 'http://localhost:3000/api/animals';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

/* GET reservation view */
const reservation = async function(req, res, next) {
    await fetch(animalsEndpoint, options)
        .then((res) => res.json())
        .then((json) => {
            // let message = null;
            res.render("reservation", {title: "Grazioso Salvare", animals: json});
        })
        .catch((err) => res.status(500).send(err.message));
};

module.exports = {
    reservation
}