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

    async addRestaurant(req, res) {
        const obj = await new Promise((resolve, reject) => {
            const obj = Restaurant.findOne({}).sort({ _id: -1 }).limit(1)
            resolve(obj);
        });

        const newId = obj.id + 1;
        const { body } = req;

        const newRestaurant = new Restaurant({
            "id": newId,
            "name": body.name,
            "address": body.address,
            "style": body.style,
            "price": body.price,
            "rate": body.rate
        });

        const result = newRestaurant.save();
        if (result) {
            res.json(newRestaurant)
        } else {
            res.status(404).send("Error, could NOT save restaurant");
        }
    },

    deleteRestaurant(req, res) {
        const restaurantToDelete = req.params.id;
        Restaurant.deleteOne({ id: restaurantToDelete })
            .then(docs => res.json(docs))
            .catch(err => console.log(`Error, could NOT delete restaurant ${restaurantToDelete} from database: ${err}`));
    },

    updateRestaurant(req, res) {
        const restaurantToUpdate = req.params.id;
        const { body } = req;
        Restaurant.findOneAndUpdate({ id: restaurantToUpdate }, body)
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error, could NOT update restaurant ${restaurantToUpdate}: ${err}`))
    }
}