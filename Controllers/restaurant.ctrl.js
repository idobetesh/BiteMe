const Restaurant = require('../Models/restaurant');
const { saveToLog } = require('../Logs/logger');

exports.restaurantController = {

    getRestaurants(req, res) {
        Restaurant.find({})
            .then(docs => { res.json(docs) })
            // .then(saveToLog({ msg: "Get restaurants", statusCode: res.statusCode }))
            .catch(err => console.log(`Error, could NOT get to database: ${err}`));
    },

    getRestaurant(req, res) {
        if (req.params.id) {
            Restaurant.findOne({ id: req.params.id })
                .then(docs => { res.json(docs)})
                .catch(err => console.log(`Error, could NOT get to database: ${err}`));
        }
    },

    async addRestaurant(req, res) {
        const obj = await new Promise((resolve, reject) => {
            const obj = Restaurant.findOne({}).sort({ _id: -1 }).limit(1);
            resolve(obj);
        });

        const query = Restaurant.where({ name: req.body.name });
        query.findOne((err, rest) => {
            if (err)
                console.log(err);

            if (rest) {
                /* restaurant exists in DB ? rest.count++ : create new restaurant and push to the DB*/
                Restaurant.updateOne({ _id: rest._id }, { $inc: { count: 1 } }).exec();
            } else {
                const newId = obj.id + 1;
                const { body } = req;

                const newRestaurant = new Restaurant({
                    "id": newId,
                    "name": body.name,
                    "address": body.address,
                    "price": body.price,
                    "rate": body.rate,
                    "open": body.open,
                    "count": 1
                });
                const result = newRestaurant.save();
                if (result) {
                    res.json(newRestaurant)
                } else {
                    res.status(404).send("Error, could NOT save restaurant");
                }
            }
        });
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