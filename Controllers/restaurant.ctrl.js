const Restaurant = require('../models/restaurant');

exports.restaurantController = {

    getRestaurants(req, res) {
        Restaurant.find({})
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error, could NOT get to database: ${err}`));
    },

    getRestaurant(req, res) {
        Restaurant.findOne({ id: req.params.id })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error, could NOT get to database: ${err}`));
    },
}