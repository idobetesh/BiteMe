const Restaurant = require('../models/restaurant');

exports.customerDbController = {

    getRestaurants(req, res) {
        Restaurant.find({})
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error retrieving data from DB: ${err}`));
    },

    getRestaurant(req, res) {
        // Need to fix!
        Restaurant.findOne({ req.params.id })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting data from DB: ${err}`));
    }
}
